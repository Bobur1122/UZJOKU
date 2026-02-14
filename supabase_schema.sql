-- Supabase schema for UniNews
-- Update admin email in policies if needed.

create extension if not exists "pgcrypto";

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  content text not null,
  category text not null,
  image_url text not null,
  author text not null,
  date date not null default current_date,
  views integer not null default 0,
  is_draft boolean not null default false,
  translations jsonb null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  id integer primary key,
  announcement text null,
  logo_url text null,
  updated_at timestamptz not null default now()
);

insert into public.settings (id, announcement, logo_url)
values (1, null, null)
on conflict (id) do nothing;

create table if not exists public.article_views (
  id bigserial primary key,
  article_id uuid not null references public.articles(id) on delete cascade,
  anon_id text not null,
  created_at timestamptz not null default now(),
  unique (article_id, anon_id)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

drop trigger if exists settings_set_updated_at on public.settings;
create trigger settings_set_updated_at
before update on public.settings
for each row execute function public.set_updated_at();

create or replace function public.record_article_view(
  p_article_id uuid,
  p_anon_id text
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_rowcount integer;
  v_views integer;
begin
  insert into public.article_views (article_id, anon_id)
  values (p_article_id, p_anon_id)
  on conflict do nothing;

  get diagnostics v_rowcount = row_count;
  if v_rowcount > 0 then
    update public.articles
    set views = views + 1
    where id = p_article_id
    returning views into v_views;
  else
    select views into v_views from public.articles where id = p_article_id;
  end if;

  return v_views;
end;
$$;

grant execute on function public.record_article_view(uuid, text) to anon, authenticated;

alter table public.articles enable row level security;
alter table public.settings enable row level security;
alter table public.article_views enable row level security;

-- Articles policies
create policy "Public read published articles"
on public.articles for select
using (is_draft = false);

create policy "Admin read all articles"
on public.articles for select
using (
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);

create policy "Admin insert articles"
on public.articles for insert
with check (
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);

create policy "Admin update articles"
on public.articles for update
using (
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
)
with check (
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);

create policy "Admin delete articles"
on public.articles for delete
using (
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);

-- Settings policies
create policy "Public read settings"
on public.settings for select
using (true);

create policy "Admin insert settings"
on public.settings for insert
with check (
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);

create policy "Admin update settings"
on public.settings for update
using (
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
)
with check (
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);

-- Article views policies (insert-only)
create policy "Public insert article views"
on public.article_views for insert
with check (true);

-- Storage buckets
insert into storage.buckets (id, name, public)
values ('news-images', 'news-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- Storage policies for news images
create policy "Public read news images"
on storage.objects for select
using (bucket_id = 'news-images');

create policy "Admin insert news images"
on storage.objects for insert
with check (
  bucket_id = 'news-images' and
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);

create policy "Admin update news images"
on storage.objects for update
using (
  bucket_id = 'news-images' and
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);

create policy "Admin delete news images"
on storage.objects for delete
using (
  bucket_id = 'news-images' and
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);

-- Storage policies for site assets (logo)
create policy "Public read site assets"
on storage.objects for select
using (bucket_id = 'site-assets');

create policy "Admin insert site assets"
on storage.objects for insert
with check (
  bucket_id = 'site-assets' and
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);

create policy "Admin update site assets"
on storage.objects for update
using (
  bucket_id = 'site-assets' and
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);

create policy "Admin delete site assets"
on storage.objects for delete
using (
  bucket_id = 'site-assets' and
  auth.role() = 'authenticated' and
  (auth.jwt() ->> 'email') = 'ortiqboyevb50@gmail.com'
);
