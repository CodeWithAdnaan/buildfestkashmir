-- BuildFest Kashmir — Supabase Storage Buckets & Policies

-- Create storage buckets agar ni ae toh...vrna bhoosda ni kryo poore code kaaa
insert into storage.buckets (id, name, public)
values 
  ('avatars', 'avatars', true),
  ('blog-images', 'blog-images', true),
  ('event-attachments', 'event-attachments', true)
on conflict (id) do nothing;

-- RLS Policies for avatars bucket
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Authenticated users can upload avatar images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'avatars');

create policy "Users can update their own avatar image"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'avatars');

-- RLS Policies for blog-images bucket
create policy "Blog images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'blog-images');

create policy "Authenticated users can upload blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images');

-- RLS Policies for event-attachments bucket
create policy "Event attachments are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'event-attachments');

create policy "Authenticated users can upload event attachments"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'event-attachments');
