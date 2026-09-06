-- BuildFest Kashmir — Auth Profiles Schema & Trigger

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  updated_at timestamptz default now(),
  full_name text not null,
  avatar_url text,
  github_url text,
  linkedin_url text,
  college text
);

alter table public.profiles enable row level security;

-- RLS Policies for profiles
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can insert their own profile" on public.profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update their own profile" on public.profiles
  for update using ((select auth.uid()) = id);

-- Trigger function to automatically create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
