create table if not exists public.farm_data (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

revoke all on table public.farm_data from anon, authenticated;
grant select, insert, update on table public.farm_data to authenticated;

alter table public.farm_data enable row level security;

drop policy if exists "Users can read their own farm data" on public.farm_data;
create policy "Users can read their own farm data"
  on public.farm_data
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own farm data" on public.farm_data;
create policy "Users can create their own farm data"
  on public.farm_data
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own farm data" on public.farm_data;
create policy "Users can update their own farm data"
  on public.farm_data
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
