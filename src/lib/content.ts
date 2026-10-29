// Public content, read from Supabase when it is configured and from the built-in data otherwise.
// If Supabase is configured but a request fails, the built-in data is shown rather than an empty page.
import { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import { supabase } from './supabase';
import { galleryPhotos, type GalleryPhoto } from '../data/gallery';
import { ghanaRegionsData, type GhanaRegion, type HubItem } from '../data/hubs';

export interface EventItem {
  year: string;
  period: string;
  startWeek: string;
  endWeek: string;
  title: string;
  description: string;
}

const EVENTS_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-aplqN60mPJjeRsfamC7Rb-0gxgfjrNfgoORastJ8DsRAqtC-TPZ-7Aq7q1ewzruwSLBdC63T99qn/pub?output=csv';

type SheetRow = Record<'Year' | 'Period' | 'Start Week' | 'End Week' | 'Event / Programme' | 'Main activity shown in plan', string>;

function fetchEventsFromSheet(): Promise<EventItem[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<SheetRow>(EVENTS_SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const rows = res.data
          .filter((e) => e.Year && e.Period && e['Event / Programme'])
          .map((e) => ({
            year: e.Year,
            period: e.Period,
            startWeek: e['Start Week'],
            endWeek: e['End Week'],
            title: e['Event / Programme'],
            description: e['Main activity shown in plan'],
          }));
        if (rows.length) resolve(rows);
        else reject(new Error('Empty calendar'));
      },
      error: reject,
    });
  });
}

async function fetchEvents(): Promise<EventItem[]> {
  if (!supabase) return fetchEventsFromSheet();
  const { data, error } = await supabase
    .from('events')
    .select('year, period, start_week, end_week, title, description')
    .eq('published', true)
    .order('year')
    .order('sort');
  if (error) throw error;
  return (data ?? []).map((e) => ({
    year: String(e.year),
    period: e.period,
    startWeek: e.start_week,
    endWeek: e.end_week,
    title: e.title,
    description: e.description,
  }));
}

export type Load<T> = { state: 'loading' } | { state: 'error' } | { state: 'ready'; data: T };

/** The events calendar. `attempt` re-runs the request when the visitor taps "Try again". */
export function useEvents(attempt: number): Load<EventItem[]> {
  const [load, setLoad] = useState<Load<EventItem[]>>({ state: 'loading' });
  useEffect(() => {
    let cancelled = false;
    fetchEvents().then(
      (data) => !cancelled && setLoad({ state: 'ready', data }),
      () => !cancelled && setLoad({ state: 'error' }),
    );
    return () => {
      cancelled = true;
    };
  }, [attempt]);
  return load;
}

// One request per page load, shared by every component that asks.
let galleryRequest: Promise<GalleryPhoto[] | null> | null = null;
let hubsRequest: Promise<Map<string, HubItem[]> | null> | null = null;

function loadGallery() {
  if (!supabase) return Promise.resolve(null);
  galleryRequest ??= (async () => {
    const { data, error } = await supabase!
      .from('gallery_photos')
      .select('src, caption, grp, ratio')
      .eq('published', true)
      .order('sort');
    if (error) return null;
    return (data ?? []).map((p) => ({ src: p.src, caption: p.caption, group: p.grp, ratio: Number(p.ratio) }) as GalleryPhoto);
  })();
  return galleryRequest;
}

function loadHubs() {
  if (!supabase) return Promise.resolve(null);
  hubsRequest ??= (async () => {
    const { data, error } = await supabase!
      .from('hubs')
      .select('region_id, name, type, location, detail, description')
      .eq('published', true)
      .order('sort');
    if (error) return null;
    const byRegion = new Map<string, HubItem[]>();
    for (const h of data ?? []) {
      const list = byRegion.get(h.region_id) ?? [];
      list.push({ name: h.name, type: h.type, location: h.location, detail: h.detail, description: h.description || undefined });
      byRegion.set(h.region_id, list);
    }
    return byRegion;
  })();
  return hubsRequest;
}

export function useGalleryPhotos(): GalleryPhoto[] {
  const [photos, setPhotos] = useState(galleryPhotos);
  useEffect(() => {
    let cancelled = false;
    loadGallery().then((p) => !cancelled && p && setPhotos(p));
    return () => {
      cancelled = true;
    };
  }, []);
  return photos;
}

/** The Ghana regions with their hubs and clubs. Region names and map positions stay in code. */
export function useRegions(): GhanaRegion[] {
  const [byRegion, setByRegion] = useState<Map<string, HubItem[]> | null>(null);
  useEffect(() => {
    let cancelled = false;
    loadHubs().then((m) => !cancelled && m && setByRegion(m));
    return () => {
      cancelled = true;
    };
  }, []);
  return useMemo(
    () => (byRegion ? ghanaRegionsData.map((r) => ({ ...r, hubs: byRegion.get(r.id) ?? [] })) : ghanaRegionsData),
    [byRegion],
  );
}
