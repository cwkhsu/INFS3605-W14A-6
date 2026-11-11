-- CafeCast database setup
-- Run this once in Supabase: SQL Editor › New query › paste › Run.

-- 1. One row per café, owned by the signed-in user. All of the café's data lives in `data` (JSON).
create table if not exists public.cafes (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null unique default auth.uid() references auth.users (id) on delete cascade,
  name        text not null default 'My café',
  dataset     text not null default 'mine' check (dataset in ('mine', 'littlefern', 'demo')),
  data        jsonb,
  updated_at  timestamptz not null default now()
);

-- 2. Row-level security: each owner can only see and change their own café.
alter table public.cafes enable row level security;

drop policy if exists "Owners read their cafe"   on public.cafes;
drop policy if exists "Owners create their cafe" on public.cafes;
drop policy if exists "Owners update their cafe" on public.cafes;
drop policy if exists "Owners delete their cafe" on public.cafes;

create policy "Owners read their cafe"   on public.cafes for select using (auth.uid() = owner_id);
create policy "Owners create their cafe" on public.cafes for insert with check (auth.uid() = owner_id);
create policy "Owners update their cafe" on public.cafes for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "Owners delete their cafe" on public.cafes for delete using (auth.uid() = owner_id);


-- 3. Little Fern Café for Nick.
--    FIRST create the user in Authentication › Users › Add user › Create new user:
--      Email: nick@littlefern.com.au   Password: LittleFern#2026   (tick "Auto Confirm User")
--    THEN run the statement below. The café's stock, menu and 6 weeks of sales load on Nick's first sign-in.
--    Run it again any time to restore Little Fern to its original data.
insert into public.cafes (owner_id, name, dataset)
select id, 'Little Fern Café', 'littlefern'
from auth.users
where email = 'nick@littlefern.com.au'
on conflict (owner_id) do update
  set name = excluded.name, dataset = excluded.dataset, data = null, updated_at = now();
