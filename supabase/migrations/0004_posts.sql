-- BuildFest Kashmir — Blog Posts Table Schema

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  date text not null,
  author text not null,
  author_role text not null,
  read_time text not null,
  tags text[] not null default '{}',
  gradient text not null,
  image text,
  content text[] not null default '{}',
  published boolean default true not null,
  created_at timestamptz default now()
);

alter table public.posts enable row level security;

-- Public can view published blog posts
create policy "Published posts are viewable by everyone"
  on public.posts for select
  using (published = true);
