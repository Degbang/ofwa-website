-- OFWA website content and admin access.
-- Run once in the Supabase SQL editor (or `supabase db push`), then run seed.sql.

-- Who may edit. Matched by sign-in email, so staff can be added before they have signed in.
create table if not exists public.admins (
  email text primary key check (email = lower(email)),
  note text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  year int not null check (year between 2000 and 2100),
  period text not null,            -- "March", "May - June"
  start_week text not null default '',
  end_week text not null default '',
  title text not null,
  description text not null default '',
  published boolean not null default true,
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  src text not null,               -- site path (/img/...) or a public storage URL
  caption text not null,
  grp text not null check (grp in ('Campaigns', 'Training', 'Hubs', 'Community')),
  ratio numeric not null default 1.5 check (ratio > 0.2 and ratio < 5),
  published boolean not null default true,
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.hubs (
  id uuid primary key default gen_random_uuid(),
  region_id text not null,         -- matches a region id in src/data/hubs.ts, e.g. 'ashanti'
  name text not null,
  type text not null check (type in ('Hub', 'Club')),
  location text not null,
  detail text not null default '',
  description text not null default '',
  published boolean not null default true,
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

do $$
declare t text;
begin
  foreach t in array array['events', 'gallery_photos', 'hubs'] loop
    execute format('drop trigger if exists touch on public.%I', t);
    execute format('create trigger touch before update on public.%I for each row execute function public.touch_updated_at()', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read published" on public.%I', t);
    execute format('create policy "public read published" on public.%I for select using (published or public.is_admin())', t);
    execute format('drop policy if exists "admins write" on public.%I', t);
    execute format('create policy "admins write" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Admins may read the list (to see who has access); changing it is done in the SQL editor only.
alter table public.admins enable row level security;
drop policy if exists "admins read" on public.admins;
create policy "admins read" on public.admins for select using (public.is_admin());

-- Public bucket for uploaded gallery photos. Anyone can view, only admins can change.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gallery', 'gallery', true, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "gallery admins write" on storage.objects;
create policy "gallery admins write" on storage.objects for all
  using (bucket_id = 'gallery' and public.is_admin())
  with check (bucket_id = 'gallery' and public.is_admin());

-- Add the first admin (replace the address), then invite them from Authentication > Users:
-- insert into public.admins (email, note) values ('you@example.org', 'Site owner');
