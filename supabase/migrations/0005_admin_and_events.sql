-- BuildFest Kashmir — Admin Roles, Events Table & Management Schema

-- 1. Add role to profiles table
alter table public.profiles
  add column if not exists role text not null default 'user' check (role in ('user', 'organizer', 'admin'));

-- 2. Helper function to check if the active user is an admin or organizer
create or replace function public.is_admin_or_organizer()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('admin', 'organizer')
  );
end;
$$ language plpgsql security definer;

-- 3. Create Events table
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text not null,
  status text not null check (status in ('upcoming', 'past')),
  description text not null,
  overview text not null,
  venue text not null,
  city text not null default 'Srinagar',
  start_date timestamptz not null,
  end_date timestamptz not null,
  prize_pool text not null default '',
  team_size text not null default '2–4 builders',
  registration_open boolean not null default false,
  themes text[] not null default '{}',
  schedule jsonb not null default '[]'::jsonb,
  speakers jsonb not null default '[]'::jsonb,
  mentors jsonb not null default '[]'::jsonb,
  sponsors jsonb not null default '[]'::jsonb,
  prizes jsonb not null default '[]'::jsonb,
  gallery_tiles integer not null default 0,
  attendees integer,
  projects_shipped integer,
  is_tentative boolean not null default false,
  date_label text,
  venue_label text,
  banner_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events enable row level security;

-- Events RLS
create policy "Events are viewable by everyone" on public.events
  for select using (true);

create policy "Admins and organizers can insert events" on public.events
  for insert to authenticated
  with check (public.is_admin_or_organizer());

create policy "Admins and organizers can update events" on public.events
  for update to authenticated
  using (public.is_admin_or_organizer())
  with check (public.is_admin_or_organizer());

create policy "Admins and organizers can delete events" on public.events
  for delete to authenticated
  using (public.is_admin_or_organizer());

-- 4. Registrations Read Policy for Admins/Organizers
create policy "Admins and organizers can view registrations" on public.registrations
  for select to authenticated
  using (public.is_admin_or_organizer());

-- 5. Team Applications Read Policy for Admins/Organizers
create policy "Admins and organizers can view team applications" on public.team_applications
  for select to authenticated
  using (public.is_admin_or_organizer());

-- 6. Contact Messages Read Policy for Admins/Organizers
create policy "Admins and organizers can view contact messages" on public.contact_messages
  for select to authenticated
  using (public.is_admin_or_organizer());

-- 7. Posts RLS for Admins/Organizers
create policy "Admins and organizers can manage posts" on public.posts
  for all to authenticated
  using (public.is_admin_or_organizer())
  with check (public.is_admin_or_organizer());

-- 8. Seed initial events if table is empty
insert into public.events (
  slug, name, tagline, status, description, overview, venue, city,
  start_date, end_date, prize_pool, team_size, registration_open,
  attendees, projects_shipped, themes, schedule, speakers, mentors, sponsors, prizes
) values
(
  'hackdays-srinagar-2026',
  'HACKDAYS - 2026',
  'One day. One campus. Zero excuses.',
  'past',
  'A one-day offline build sprint. A room full of people building something real, shipping it, and demoing it.',
  'HACKDAYS is our flagship offline event — a concentrated one-day build sprint for students across Jammu & Kashmir. Teams gathered to pick a track, build throughout the day, and present live on stage.',
  'CASET College, Srinagar',
  'Srinagar',
  '2026-04-03T09:00:00+05:30',
  '2026-04-03T20:00:00+05:30',
  'Hardware, Swag & Pro Tools',
  '2–4 builders',
  false,
  184,
  42,
  array['AI & Agents', 'Civic Tech', 'Rural Access', 'Developer Tools', 'Open Track'],
  '[
    {"time": "09:00", "title": "Check-in & team formation", "description": "Opening keynote and theme reveal."},
    {"time": "10:00", "title": "Building begins", "description": "Mentors rotate through the floor."},
    {"time": "16:00", "title": "Submissions close", "description": "Push your final commit, record your demo video."},
    {"time": "17:00", "title": "Live demos", "description": "Every team gets 3 minutes on stage."},
    {"time": "19:00", "title": "Awards & closing", "description": "Winners announced, group photo."}
  ]'::jsonb,
  '[
    {"name": "Adnan Farooq", "role": "Ethical Hacker, Gen AI Engineer, Founder of Webryx.in", "org": "BuildFest Kashmir", "image": "/team/adnan.jpg"}
  ]'::jsonb,
  '[
    {"name": "Adnan Farooq", "expertise": "Full Stack Web & App Developer", "image": "/team/adnan.jpg"},
    {"name": "Mehraan Amin", "expertise": "Ethical Hacker, Cloud Engineer, Founder websec.ai, Full Stack Dev", "image": "/team/mehraan.png"},
    {"name": "Mohammad Mushtaq", "expertise": "Ethical Hacker, Co-founder webryx.in, Backend Engineer, Full Stack Dev", "image": "/team/mushtaq.png"},
    {"name": "Aqib Javaid Bhat", "expertise": "GitHub Campus Expert, Domain Expert", "image": "/team/aaqib.png"}
  ]'::jsonb,
  '[
    {"name": "Webryx", "tier": "Title"},
    {"name": "Fastrack", "tier": "Gold"},
    {"name": "Alkhaleej", "tier": "Silver"}
  ]'::jsonb,
  '[
    {"place": "1st Place", "amount": "₹25,000", "note": "Cash + cloud credits + mentorship"},
    {"place": "2nd Place", "amount": "₹15,000", "note": "Cash + pro tooling licenses"},
    {"place": "Best Beginner Team", "amount": "₹10,000", "note": "Hardware kit + workshop passes"}
  ]'::jsonb
),
(
  'promptwars-x-hackdays-srinagar-v2',
  'PROMPTWARS X HACKDAYS V2',
  'Crack the context. Jailbreak the prompt. Win the arena.',
  'upcoming',
  'An adversarial AI arena: craft inputs, bypass filters, and solve reverse-engineering challenges against real LLM defenses.',
  'PROMPTWARS pairs competitive prompt injection and defense with a fast-paced sprint. Red-team adversarial tasks, solve multi-modal AI puzzles, and demonstrate agentic workflows on stage.',
  'Sher-e-Kashmir University of Agricultural Sciences and Technology of Kashmir (SKUAST-K)',
  'Srinagar',
  '2026-05-15T09:30:00+05:30',
  '2026-05-16T18:00:00+05:30',
  '₹50,000 + Cloud Grants',
  'Solo or Teams of 2',
  true,
  null,
  null,
  array['Adversarial AI', 'Agent Security', 'LLM Jailbreaking', 'System Prompt Extraction', 'Autonomous Agents'],
  '[
    {"time": "09:30", "title": "Check-in & Briefing", "description": "Rules of the arena, scoring criteria, and target architectures."},
    {"time": "10:30", "title": "Round 1: Prompt Injection Sprint", "description": "Bypass safety barriers on 5 progressively harder target models."},
    {"time": "13:30", "title": "Lunch & Mentor Sync", "description": "Network with security researchers and GenAI practitioners."},
    {"time": "14:30", "title": "Round 2: Defensive Engineering", "description": "Harden an agentic pipeline against live adversarial attacks."},
    {"time": "17:00", "title": "Live Showdown", "description": "Top 4 teams face off on stage in real-time."},
    {"time": "18:00", "title": "Podium & Grants", "description": "Winners announced, cloud vouchers distributed."}
  ]'::jsonb,
  '[
    {"name": "Adnan Farooq", "role": "Ethical Hacker, Gen AI Engineer, Founder of Webryx.in", "org": "BuildFest Kashmir", "image": "/team/adnan.jpg"}
  ]'::jsonb,
  '[
    {"name": "Adnan Farooq", "expertise": "Full Stack Web & App Developer", "image": "/team/adnan.jpg"},
    {"name": "Mehraan Amin", "expertise": "Ethical Hacker, Cloud Engineer, Founder websec.ai, Full Stack Dev", "image": "/team/mehraan.png"},
    {"name": "Mohammad Mushtaq", "expertise": "Ethical Hacker, Co-founder webryx.in, Backend Engineer, Full Stack Dev", "image": "/team/mushtaq.png"},
    {"name": "Aqib Javaid Bhat", "expertise": "GitHub Campus Expert, Domain Expert", "image": "/team/aaqib.png"}
  ]'::jsonb,
  '[
    {"name": "Webryx", "tier": "Title"},
    {"name": "Fastrack", "tier": "Gold"},
    {"name": "Alkhaleej", "tier": "Silver"}
  ]'::jsonb,
  '[
    {"place": "Grand Winner", "amount": "₹30,000", "note": "Cash + $2,000 Cloud credits"},
    {"place": "Runner Up", "amount": "₹20,000", "note": "Cash + $1,000 Cloud credits"},
    {"place": "Top Red Teamer", "amount": "Special Trophy + Swag", "note": "Awarded for most creative exploit"}
  ]'::jsonb
)
on conflict (slug) do nothing;
