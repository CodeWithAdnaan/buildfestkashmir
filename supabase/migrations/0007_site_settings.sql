-- Create site_settings table for dynamic homepage & site configuration
create table if not exists public.site_settings (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.site_settings enable row level security;

-- Allow public read access to site_settings
create policy "Anyone can read site settings"
  on public.site_settings
  for select
  using (true);

-- Allow admins/organizers to update or insert site settings
create policy "Admins and organizers can manage site settings"
  on public.site_settings
  for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'organizer')
    )
  );
