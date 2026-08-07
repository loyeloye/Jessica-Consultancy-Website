-- Jessica site — Supabase schema.
-- Run this once in the Supabase SQL editor (see SETUP.md).
--
-- Security model: every table has RLS on. The public (anon) role can read
-- only published/public content and can never read submissions. Writes are
-- limited to authenticated users — i.e. Jessica, signed into /admin. The
-- form API routes insert submissions using the service-role key, which
-- bypasses RLS and is never exposed to the browser.

-- ---------------------------------------------------------------- extensions
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- helper
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------- blog posts
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  body         text default '',
  cover_image  text,
  cover_alt    text,
  status       text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists posts_status_published_idx
  on public.posts (status, published_at desc);

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
  for each row execute function public.touch_updated_at();

alter table public.posts enable row level security;

drop policy if exists "posts public read published" on public.posts;
create policy "posts public read published" on public.posts
  for select to anon using (status = 'published');

drop policy if exists "posts admin all" on public.posts;
create policy "posts admin all" on public.posts
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------- media library
create table if not exists public.media (
  id         uuid primary key default gen_random_uuid(),
  path       text not null,              -- object path inside the storage bucket
  url        text not null,              -- public URL
  alt        text default '',
  width      int,
  height     int,
  size_bytes int,
  created_at timestamptz not null default now()
);

alter table public.media enable row level security;

drop policy if exists "media public read" on public.media;
create policy "media public read" on public.media
  for select to anon using (true);

drop policy if exists "media admin all" on public.media;
create policy "media admin all" on public.media
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------- campaigns
create table if not exists public.campaigns (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  client       text not null,
  category     text,
  role         text,
  summary      text,
  hero_image   text,
  hero_alt     text,
  scope        text[] default '{}',
  deliverables text[] default '{}',
  stakeholders text[] default '{}',
  objectives   text[] default '{}',
  facts        jsonb  default '[]'::jsonb,   -- [{label, value}]
  gallery      jsonb  default '[]'::jsonb,   -- [{src, alt}]
  outcome      text,
  sort_order   int not null default 0,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists campaigns_touch on public.campaigns;
create trigger campaigns_touch before update on public.campaigns
  for each row execute function public.touch_updated_at();

alter table public.campaigns enable row level security;

drop policy if exists "campaigns public read" on public.campaigns;
create policy "campaigns public read" on public.campaigns
  for select to anon using (published = true);

drop policy if exists "campaigns admin all" on public.campaigns;
create policy "campaigns admin all" on public.campaigns
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------- highlights grid
create table if not exists public.highlights (
  id         uuid primary key default gen_random_uuid(),
  src        text not null,
  alt        text default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.highlights enable row level security;

drop policy if exists "highlights public read" on public.highlights;
create policy "highlights public read" on public.highlights
  for select to anon using (true);

drop policy if exists "highlights admin all" on public.highlights;
create policy "highlights admin all" on public.highlights
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------- site settings
-- Single-row-per-key store for editable copy (hero, stats, contact, etc.)
create table if not exists public.settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

drop trigger if exists settings_touch on public.settings;
create trigger settings_touch before update on public.settings
  for each row execute function public.touch_updated_at();

alter table public.settings enable row level security;

drop policy if exists "settings public read" on public.settings;
create policy "settings public read" on public.settings
  for select to anon using (true);

drop policy if exists "settings admin all" on public.settings;
create policy "settings admin all" on public.settings
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------- submissions
-- Booking inquiries, talent registrations, general contact.
-- No anon policy at all: the public can neither read nor write these
-- directly. Inserts happen server-side via the service-role key.
create table if not exists public.submissions (
  id         uuid primary key default gen_random_uuid(),
  kind       text not null check (kind in ('booking','talent','creative','contact')),
  name       text,
  email      text,
  data       jsonb not null default '{}'::jsonb,
  files      jsonb not null default '[]'::jsonb,   -- [{url, path, name, size}]
  read_at    timestamptz,
  created_at timestamptz not null default now()
);

-- Re-running this file against a database created before the 'creative'
-- kind existed won't retroactively widen the check above (create table if
-- not exists is a no-op on an existing table), so drop and recreate it here.
alter table public.submissions drop constraint if exists submissions_kind_check;
alter table public.submissions add constraint submissions_kind_check
  check (kind in ('booking','talent','creative','contact'));

create index if not exists submissions_kind_created_idx
  on public.submissions (kind, created_at desc);

alter table public.submissions enable row level security;

drop policy if exists "submissions admin read" on public.submissions;
create policy "submissions admin read" on public.submissions
  for select to authenticated using (true);

drop policy if exists "submissions admin update" on public.submissions;
create policy "submissions admin update" on public.submissions
  for update to authenticated using (true) with check (true);

drop policy if exists "submissions admin delete" on public.submissions;
create policy "submissions admin delete" on public.submissions
  for delete to authenticated using (true);

-- ---------------------------------------------------------------- storage
-- Two buckets:
--   media   — public: site photography, blog covers
--   uploads — private: talent headshots and client briefs (contains
--             personal data, so it is never publicly readable; the admin
--             reads them through short-lived signed URLs)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', false)
on conflict (id) do update set public = false;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select to anon using (bucket_id = 'media');

drop policy if exists "media admin write" on storage.objects;
create policy "media admin write" on storage.objects
  for all to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');

drop policy if exists "uploads admin read" on storage.objects;
create policy "uploads admin read" on storage.objects
  for select to authenticated using (bucket_id = 'uploads');
