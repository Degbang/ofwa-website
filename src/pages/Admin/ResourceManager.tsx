import React, { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ImagePlus, Pencil, Plus, Trash2 } from 'lucide-react';
import { GALLERY_BUCKET, supabase } from '../../lib/supabase';
import type { Field, Resource } from './resources';
import styles from './Admin.module.css';

type Row = Record<string, string | number | boolean | null> & { id: string; sort: number; published: boolean };
type Draft = Record<string, string | number | boolean>;

const MAX_UPLOAD = 8 * 1024 * 1024;

/** Natural width over height of an image file, so the gallery can balance its columns before images load. */
function measure(file: File): Promise<number> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve(Math.round((img.naturalWidth / img.naturalHeight) * 100) / 100 || 1.5);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve(1.5);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

export const ResourceManager: React.FC<{ resource: Resource }> = ({ resource }) => {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<{ id: string | null; draft: Draft } | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    let q = supabase.from(resource.table).select('*');
    for (const col of resource.orderBy) q = q.order(col);
    const { data, error: err } = await q;
    if (err) setError(err.message);
    else {
      setError('');
      setRows(data as Row[]);
    }
  }, [resource]);

  useEffect(() => {
    // Fetching is the external system this effect synchronises with; state is set when it answers.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const startNew = () => setEditing({ id: null, draft: { ...resource.defaults } });
  const startEdit = (row: Row) => {
    const draft: Draft = {};
    for (const key of [...resource.fields.map((f) => f.name), 'published', 'ratio', 'region_id']) {
      if (key in row && row[key] !== null) draft[key] = row[key] as string | number | boolean;
    }
    setEditing({ id: row.id, draft });
  };
  const set = (name: string, value: string | number | boolean) =>
    setEditing((e) => (e ? { ...e, draft: { ...e.draft, [name]: value } } : e));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !editing) return;
    for (const f of resource.fields) {
      if (f.required && !String(editing.draft[f.name] ?? '').trim()) {
        setError(`${f.label} is required.`);
        return;
      }
    }
    setSaving(true);
    setError('');
    const payload = { ...editing.draft };
    const res = editing.id
      ? await supabase.from(resource.table).update(payload).eq('id', editing.id)
      : await supabase.from(resource.table).insert({ ...payload, sort: (rows ?? []).reduce((m, r) => Math.max(m, r.sort), -1) + 1 });
    setSaving(false);
    if (res.error) return setError(res.error.message);
    setEditing(null);
    void load();
  };

  const remove = async (row: Row) => {
    if (!supabase) return;
    const { error: err } = await supabase.from(resource.table).delete().eq('id', row.id);
    setConfirmId(null);
    if (err) return setError(err.message);
    void load();
  };

  const togglePublished = async (row: Row) => {
    if (!supabase) return;
    const { error: err } = await supabase.from(resource.table).update({ published: !row.published }).eq('id', row.id);
    if (err) return setError(err.message);
    void load();
  };

  // Events are listed by year, so an event only trades places with a neighbour in the same year.
  const canMove = (i: number, dir: -1 | 1) => {
    const other = rows?.[i + dir];
    return Boolean(other) && (resource.key !== 'events' || other!.year === rows![i].year);
  };

  const move = async (index: number, dir: -1 | 1) => {
    if (!supabase || !rows) return;
    const a = rows[index];
    const b = rows[index + dir];
    if (!b) return;
    // Give the pair distinct, swapped positions even if they were equal.
    const [sa, sb] = a.sort === b.sort ? [b.sort + dir, b.sort] : [b.sort, a.sort];
    const results = await Promise.all([
      supabase.from(resource.table).update({ sort: sa }).eq('id', a.id),
      supabase.from(resource.table).update({ sort: sb }).eq('id', b.id),
    ]);
    const failed = results.find((r) => r.error);
    if (failed?.error) setError(failed.error.message);
    void load();
  };

  const upload = async (file: File | undefined) => {
    if (!supabase || !file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return setError('Choose a JPEG, PNG or WebP image.');
    if (file.size > MAX_UPLOAD) return setError('That image is over 8 MB. Resize it and try again.');
    setUploading(true);
    setError('');
    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
    const path = `${crypto.randomUUID()}.${ext}`;
    const [ratio, up] = await Promise.all([
      measure(file),
      supabase.storage.from(GALLERY_BUCKET).upload(path, file, { cacheControl: '31536000', contentType: file.type }),
    ]);
    setUploading(false);
    if (up.error) return setError(up.error.message);
    set('src', supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path).data.publicUrl);
    set('ratio', ratio);
  };

  const renderField = (f: Field) => {
    const value = editing?.draft[f.name] ?? '';
    const id = `f-${f.name}`;
    if (f.type === 'image') {
      return (
        <div className="field" key={f.name}>
          <span>{f.label}</span>
          {value ? <img className={styles.preview} src={String(value)} alt="" /> : null}
          <label className={`btn btn-line ${styles.upload}`}>
            <ImagePlus size={16} aria-hidden="true" /> {uploading ? 'Uploading' : value ? 'Replace photo' : 'Choose photo'}
            <input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(e) => void upload(e.target.files?.[0])} className="sr-only" />
          </label>
        </div>
      );
    }
    return (
      <label className="field" key={f.name} htmlFor={id}>
        <span>{f.label}{f.required ? '' : ' (optional)'}</span>
        {f.type === 'textarea' ? (
          <textarea id={id} rows={4} value={String(value)} onChange={(e) => set(f.name, e.target.value)} />
        ) : f.type === 'select' ? (
          <select id={id} value={String(value)} onChange={(e) => set(f.name, e.target.value)}>
            {f.options?.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            type={f.type === 'number' ? 'number' : 'text'}
            value={String(value)}
            onChange={(e) => set(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
          />
        )}
        {f.hint && <small className={styles.hint}>{f.hint}</small>}
      </label>
    );
  };

  const cell = (row: Row, col: string) => String(row[col] ?? '');

  return (
    <div>
      <div className={styles.head}>
        <p className={styles.intro}>{resource.intro}</p>
        {!editing && (
          <button type="button" className="btn btn-brand" onClick={startNew}>
            <Plus size={16} aria-hidden="true" /> Add {resource.singular}
          </button>
        )}
      </div>

      {error && <div className="notice" role="alert">{error}</div>}

      {editing ? (
        <form className={styles.form} onSubmit={save}>
          <h2 className="subtitle">{editing.id ? `Edit ${resource.singular}` : `New ${resource.singular}`}</h2>
          {resource.fields.map(renderField)}
          <label className={styles.check}>
            <input type="checkbox" checked={Boolean(editing.draft.published)} onChange={(e) => set('published', e.target.checked)} />
            Show on the website
          </label>
          <div className={styles.actions}>
            <button type="submit" className="btn btn-brand" disabled={saving || uploading}>{saving ? 'Saving' : 'Save'}</button>
            <button type="button" className="btn btn-line" onClick={() => { setEditing(null); setError(''); }}>Cancel</button>
          </div>
        </form>
      ) : rows === null ? (
        <p className={styles.state}>Loading</p>
      ) : rows.length === 0 ? (
        <p className={styles.state}>Nothing here yet. Add the first {resource.singular}.</p>
      ) : (
        <ul className={styles.list}>
          {rows.map((row, i) => (
            <li key={row.id} className={row.published ? '' : styles.hidden}>
              {resource.key === 'gallery' && <img className={styles.thumb} src={String(row.src)} alt="" loading="lazy" />}
              <div className={styles.rowMain}>
                <strong>{cell(row, resource.columns[0])}</strong>
                <span>{resource.columns.slice(1).map((c) => cell(row, c)).filter(Boolean).join(' · ')}</span>
              </div>
              <div className={styles.rowActions}>
                <button type="button" className={styles.pill} aria-pressed={row.published} onClick={() => void togglePublished(row)}>
                  {row.published ? 'Shown' : 'Hidden'}
                </button>
                {resource.orderBy.includes('sort') && (
                  <>
                    <button type="button" className={styles.icon} aria-label={`Move ${cell(row, resource.columns[0])} up`} disabled={!canMove(i, -1)} onClick={() => void move(i, -1)}><ArrowUp size={16} /></button>
                    <button type="button" className={styles.icon} aria-label={`Move ${cell(row, resource.columns[0])} down`} disabled={!canMove(i, 1)} onClick={() => void move(i, 1)}><ArrowDown size={16} /></button>
                  </>
                )}
                <button type="button" className={styles.icon} aria-label={`Edit ${cell(row, resource.columns[0])}`} onClick={() => startEdit(row)}><Pencil size={16} /></button>
                {confirmId === row.id ? (
                  <span className={styles.confirm}>
                    Delete?
                    <button type="button" className={styles.pill} onClick={() => void remove(row)}>Yes</button>
                    <button type="button" className={styles.pill} onClick={() => setConfirmId(null)}>No</button>
                  </span>
                ) : (
                  <button type="button" className={styles.icon} aria-label={`Delete ${cell(row, resource.columns[0])}`} onClick={() => setConfirmId(row.id)}><Trash2 size={16} /></button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
