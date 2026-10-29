import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** Null until the Supabase project is configured; the public site then serves its built-in content. */
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;

export const GALLERY_BUCKET = 'gallery';
