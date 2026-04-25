create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  current_slide int not null default 0,
  created_at timestamptz not null default now()
);

create table public.participants (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  nickname text not null,
  avatar_seed text not null,
  joined_at timestamptz not null default now()
);

create table public.text_responses (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  slide_key text not null,
  response_type text not null default 'text',
  content text not null,
  nickname text,
  created_at timestamptz not null default now()
);

create table public.ideas (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  slide_key text not null,
  content text not null,
  nickname text,
  votes_count int not null default 0,
  created_at timestamptz not null default now()
);

create index on public.participants(room_id);
create index on public.text_responses(room_id, slide_key);
create index on public.ideas(room_id, slide_key);

create or replace function public.increment_vote(p_idea_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.ideas set votes_count = votes_count + 1 where id = p_idea_id;
$$;

alter table public.rooms enable row level security;
alter table public.participants enable row level security;
alter table public.text_responses enable row level security;
alter table public.ideas enable row level security;

create policy "rooms_anon_all" on public.rooms for all using (true) with check (true);
create policy "participants_anon_all" on public.participants for all using (true) with check (true);
create policy "text_responses_anon_all" on public.text_responses for all using (true) with check (true);
create policy "ideas_anon_all" on public.ideas for all using (true) with check (true);

alter publication supabase_realtime add table public.rooms;
alter publication supabase_realtime add table public.participants;
alter publication supabase_realtime add table public.text_responses;
alter publication supabase_realtime add table public.ideas;