-- BuildFest Kashmir — Add optional custom registration_url to events table
alter table public.events
  add column if not exists registration_url text;
