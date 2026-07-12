-- BuildFest Kashmir — initial schema
-- Run via: npx supabase db push  (or paste into the Supabase SQL editor)

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_slug text not null,
  full_name text not null,
  email text not null,
  college text not null,
  branch text not null,
  experience_level text not null check (experience_level in ('beginner','intermediate','advanced')),
  github_url text,
  linkedin_url text,
  discord_handle text,
  team_name text
);

create table if not exists public.team_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  role text not null,
  full_name text not null,
  email text not null,
  message text not null
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  subject text not null,
  message text not null
);

alter table public.registrations enable row level security;
alter table public.team_applications enable row level security;
alter table public.contact_messages enable row level security;

-- Public can insert (submit forms); reads are restricted to the service role
-- (organizer dashboard uses the service key server-side, never the anon key).
create policy "Public can submit registrations" on public.registrations
  for insert to anon with check (true);

create policy "Public can submit team applications" on public.team_applications
  for insert to anon with check (true);

create policy "Public can submit contact messages" on public.contact_messages
  for insert to anon with check (true);
