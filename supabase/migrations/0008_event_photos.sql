-- Add photos column to events table
alter table public.events 
  add column if not exists photos jsonb not null default '[]'::jsonb;
