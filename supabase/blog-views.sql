-- Run once in the Supabase SQL Editor.
create table if not exists public.blog_view_counts (
  slug text primary key check (slug in ('college', 'chennai', 'kosal', 'teaching')),
  views bigint not null default 0 check (views >= 0)
);

create table if not exists public.blog_view_events (
  slug text not null references public.blog_view_counts(slug) on delete cascade,
  visitor_id uuid not null,
  viewed_at timestamptz not null default now(),
  primary key (slug, visitor_id)
);

insert into public.blog_view_counts (slug, views) values
  ('college', 698),
  ('chennai', 713),
  ('kosal', 734),
  ('teaching', 754)
on conflict (slug) do nothing;

create or replace function public.record_blog_view(p_slug text, p_visitor_id uuid)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  inserted_count integer;
  current_views bigint;
begin
  if p_slug not in ('college', 'chennai', 'kosal', 'teaching') then
    raise exception 'Unknown blog';
  end if;

  insert into public.blog_view_events (slug, visitor_id)
  values (p_slug, p_visitor_id)
  on conflict (slug, visitor_id) do nothing;
  get diagnostics inserted_count = row_count;

  if inserted_count = 1 then
    update public.blog_view_counts
       set views = views + 1
     where slug = p_slug
     returning views into current_views;
  else
    select views into current_views
      from public.blog_view_counts
     where slug = p_slug;
  end if;

  return current_views;
end;
$$;

revoke all on function public.record_blog_view(text, uuid) from public, anon, authenticated;
grant execute on function public.record_blog_view(text, uuid) to service_role;

-- Keep direct table access server-only. The API route uses the service role key.
alter table public.blog_view_counts enable row level security;
alter table public.blog_view_events enable row level security;
revoke all on public.blog_view_counts, public.blog_view_events from anon, authenticated;
grant select on public.blog_view_counts to service_role;
grant all on public.blog_view_events to service_role;
