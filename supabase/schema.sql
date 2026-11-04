-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Only the server (with the service role key) touches these tables. Row level
-- security is switched on with no policies, so the public API cannot read or
-- write them directly.

create table if not exists settings (
  id int primary key default 1 check (id = 1), -- one row only
  name text not null,
  bio text not null default '',
  -- [{ "label": "Instagram", "href": "https://...", "display": "@name" }, ...] in display order
  contacts jsonb not null default '[]',
  portrait_path text not null,
  portrait_width int not null,
  portrait_height int not null,
  avatar_path text not null,
  avatar_width int not null,
  avatar_height int not null
);

create table if not exists cases (
  id bigint generated always as identity primary key,
  section text not null check (section in ('Endodontics', 'Operative Dentistry', 'Fixed Prosthodontics')),
  title text not null,
  sort_order int not null default 0
);

create table if not exists case_images (
  id bigint generated always as identity primary key,
  case_id bigint not null references cases (id) on delete cascade,
  -- either /cases/... (a file in the repo) or a full Storage URL
  path text not null,
  width int not null,
  height int not null,
  sort_order int not null default 0
);

alter table settings enable row level security;
alter table cases enable row level security;
alter table case_images enable row level security;

-- Public bucket for photos added from /admin (anyone can view, only the server can upload).
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;
