create type public.app_role as enum ('author','staff','admin');
create type public.project_stage as enum ('draft','quoted','ordered','content','design','review','publishing','launched');
create type public.source_type as enum ('idea','manuscript','audio','monograph','interview');
create type public.pricing_type as enum ('per_word','per_hour','flat','quote','tiered');
create type public.order_status as enum ('quoted','paid','in_progress','delivered','approved');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.is_staff(_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role in ('staff','admin'))
$$;

create policy "Users read own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.is_staff(auth.uid()));

create policy "Read own profile or staff" on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_staff(auth.uid()));
create policy "Insert own profile" on public.profiles for insert to authenticated
  with check (id = auth.uid());
create policy "Update own profile" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'))
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'author')
  on conflict do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table public.services (
  code text primary key,
  name text not null,
  description text,
  module text not null check (module in ('A','B','C','D','P')),
  pricing_type public.pricing_type not null,
  base_price numeric(12,4),
  premium_price numeric(12,4),
  price_note text,
  sort_order integer not null default 0,
  active boolean not null default true
);
grant select on public.services to anon, authenticated;
grant insert, update, delete on public.services to authenticated;
grant all on public.services to service_role;
alter table public.services enable row level security;
create policy "Anyone can view services" on public.services for select to anon, authenticated using (true);
create policy "Admins manage services" on public.services for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

insert into public.services (code, name, description, module, pricing_type, base_price, premium_price, price_note, sort_order) values
  ('ghostwriting','Ghostwriting','We write your book from your idea or outline. You stay the author.','A','quote',null,null,null,10),
  ('edit_developmental','Developmental editing','Structure, story and argument.','A','per_word',2.5,null,null,20),
  ('edit_line','Line editing','Sentence-level flow, voice and clarity.','A','per_word',2.5,null,null,30),
  ('edit_copy','Copy editing','Grammar, consistency and house style.','A','per_word',2.5,null,null,40),
  ('proofreading','Proofreading','A final pass for typos and layout slips.','A','per_word',2.5,null,null,50),
  ('transform_audio','Audio to book','We transcribe your recording and shape speech into prose.','A','per_hour',20000,null,null,60),
  ('transform_interview','Interview to book','Recorded interviews turned into a structured book.','A','per_hour',20000,null,null,70),
  ('transform_monograph','Monograph to book','Academic text rewritten for a general reader. One price for the whole monograph, not per word.','A','flat',60000,null,'Up to',80),
  ('cover_design','Cover design','Front, spine and back cover, print-ready.','B','flat',150000,null,null,110),
  ('interior_design','Interior design','Typesetting, front and back matter, print-ready PDF.','B','flat',150000,null,null,120),
  ('ebook_file','Ebook file','Reflowable EPUB, validated before upload.','B','flat',100000,null,null,130),
  ('pkg_ebook','E-Book package','Edited, formatted and live in ebook stores.','P','tiered',100000,250000,null,200),
  ('pkg_print','Print Book package','A professionally designed paperback or hardcover.','P','tiered',300000,500000,null,210),
  ('pkg_audio','Audio Add-On','Your book narrated and produced for audio stores.','P','tiered',100000,250000,null,220),
  ('isbn_setup','ISBN set-up (per format)','We handle the paperwork; you stay publisher of record.','D','flat',15000,null,null,310),
  ('distribution_setup','Distribution set-up (per store)','Listing set-up on one online bookstore.','D','flat',10000,null,null,320),
  ('launch_plan','Launch plan','Dated launch timeline, press kit and reviewer outreach.','D','tiered',300000,750000,null,330),
  ('book_website','Book website','A single-book site with a buy page and email sign-up.','D','tiered',300000,750000,null,340),
  ('digital_marketing','Digital marketing','Social posts, email list set-up and ad guidance. Ad spend not included.','D','tiered',100000,250000,'Excluding ads',350);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  title text not null,
  subtitle text,
  author_name text,
  genre text,
  language text not null default 'English',
  source_type public.source_type not null default 'manuscript',
  trim_size text not null default '6x9' check (trim_size in ('5x8','5.5x8.5','6x9','8.5x11')),
  binding text not null default 'paperback' check (binding in ('paperback','hardcover')),
  paper text not null default 'white' check (paper in ('white','cream')),
  word_count integer not null default 0 check (word_count >= 0),
  audio_hours numeric(6,2) not null default 0 check (audio_hours >= 0),
  page_count_est integer,
  ai_assisted boolean not null default false,
  rights_confirmed boolean not null default false,
  package text check (package in ('ebook','print')),
  package_tier text not null default 'standard' check (package_tier in ('standard','premium')),
  notes text,
  launch_date date,
  stage public.project_stage not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index projects_owner_idx on public.projects(owner_id);
grant select, insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;

create or replace function public.is_project_owner(_project_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.projects where id = _project_id and owner_id = auth.uid())
$$;

create or replace function public.can_edit_project(_project_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.projects
    where id = _project_id and owner_id = auth.uid() and stage in ('draft','quoted'))
$$;

create policy "Owner or staff read projects" on public.projects for select to authenticated
  using (owner_id = auth.uid() or public.is_staff(auth.uid()));
create policy "Authors create own projects" on public.projects for insert to authenticated
  with check (owner_id = auth.uid());
create policy "Owner or staff update projects" on public.projects for update to authenticated
  using (owner_id = auth.uid() or public.is_staff(auth.uid()))
  with check (owner_id = auth.uid() or public.is_staff(auth.uid()));
create policy "Owner deletes early projects" on public.projects for delete to authenticated
  using (owner_id = auth.uid() and stage in ('draft','quoted'));

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  service_code text not null references public.services(code),
  quantity numeric(12,2) not null default 1 check (quantity >= 0),
  tier text check (tier in ('standard','premium')),
  unit_price numeric(12,4),
  price numeric(14,2),
  in_package boolean not null default false,
  status public.order_status not null default 'quoted',
  assignee_id uuid,
  created_at timestamptz not null default now()
);
create index orders_project_idx on public.orders(project_id);
grant select, insert, update, delete on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;

create policy "Owner or staff read orders" on public.orders for select to authenticated
  using (public.is_project_owner(project_id) or public.is_staff(auth.uid()));
create policy "Owner adds lines to early projects" on public.orders for insert to authenticated
  with check (public.can_edit_project(project_id) or public.is_staff(auth.uid()));
create policy "Staff update orders" on public.orders for update to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));
create policy "Owner removes lines from early projects" on public.orders for delete to authenticated
  using (public.can_edit_project(project_id) or public.is_staff(auth.uid()));

create or replace function public.price_order_line()
returns trigger language plpgsql security definer set search_path = public as $$
declare svc public.services%rowtype;
begin
  if public.is_staff(auth.uid()) then
    return new;
  end if;
  if tg_op = 'UPDATE' then
    new.service_code := old.service_code;
    new.quantity := old.quantity;
    new.tier := old.tier;
    new.unit_price := old.unit_price;
    new.price := old.price;
    new.in_package := old.in_package;
    return new;
  end if;
  select * into svc from public.services where code = new.service_code;
  if not found or not svc.active then
    raise exception 'Unknown service %', new.service_code;
  end if;
  if svc.pricing_type = 'quote' or svc.base_price is null then
    new.tier := null;
    new.unit_price := null;
    new.price := null;
  elsif svc.pricing_type = 'tiered' then
    new.tier := coalesce(new.tier, 'standard');
    new.quantity := 1;
    new.unit_price := case when new.tier = 'premium' then coalesce(svc.premium_price, svc.base_price) else svc.base_price end;
    new.price := round(new.unit_price, 2);
  else
    new.tier := null;
    new.unit_price := svc.base_price;
    new.price := round(new.quantity * svc.base_price, 2);
  end if;
  new.status := 'quoted';
  return new;
end;
$$;
create trigger orders_price_line before insert or update on public.orders
  for each row execute function public.price_order_line();

create table public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  kind text not null check (kind in ('manuscript','audio','transcript','consent','cover','interior','epub','audio_final','reference')),
  name text not null,
  storage_path text not null,
  size_bytes bigint,
  version integer not null default 1,
  uploaded_by uuid not null default auth.uid(),
  created_at timestamptz not null default now()
);
create index project_files_project_idx on public.project_files(project_id);
grant select, insert, delete on public.project_files to authenticated;
grant all on public.project_files to service_role;
alter table public.project_files enable row level security;
create policy "Owner or staff read files" on public.project_files for select to authenticated
  using (public.is_project_owner(project_id) or public.is_staff(auth.uid()));
create policy "Owner or staff add files" on public.project_files for insert to authenticated
  with check (uploaded_by = auth.uid() and (public.is_project_owner(project_id) or public.is_staff(auth.uid())));
create policy "Uploader or staff remove files" on public.project_files for delete to authenticated
  using (uploaded_by = auth.uid() or public.is_staff(auth.uid()));

create or replace function public.guard_project_update()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  new.updated_at := now();
  if new.owner_id is distinct from old.owner_id and not public.is_staff(auth.uid()) then
    raise exception 'Cannot change the owner of a project';
  end if;
  if new.stage is distinct from old.stage and not public.is_staff(auth.uid()) then
    if not (old.stage in ('draft','quoted') and new.stage in ('draft','quoted','ordered')) then
      raise exception 'Only Publish Plug staff can move a book to this stage';
    end if;
    if new.stage = 'ordered' then
      if coalesce(current_setting('app.paying', true), '') <> 'on' then
        raise exception 'Please pay for your order to place it';
      end if;
      if not exists (select 1 from public.orders where project_id = new.id) then
        raise exception 'Add at least one service before placing the order';
      end if;
      if exists (select 1 from public.orders where project_id = new.id and price is null) then
        raise exception 'Some services are waiting for a custom quote from our team';
      end if;
      if new.source_type = 'monograph' and not new.rights_confirmed then
        raise exception 'Please confirm you hold the rights to this monograph';
      end if;
      if new.source_type = 'interview' and not exists (
        select 1 from public.project_files where project_id = new.id and kind = 'consent') then
        raise exception 'Please upload a consent form for each interviewee';
      end if;
    end if;
  end if;
  return new;
end;
$$;
create trigger projects_guard_update before update on public.projects
  for each row execute function public.guard_project_update();

create or replace function public.after_project_ordered()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.stage = 'ordered' and old.stage is distinct from 'ordered' then
    update public.orders set status = 'paid' where project_id = new.id and status = 'quoted';
  end if;
  return new;
end;
$$;
create trigger projects_after_ordered after update on public.projects
  for each row execute function public.after_project_ordered();

create or replace function public.can_access_project_path(_path text)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_staff(auth.uid()) or exists (
    select 1 from public.projects
    where id::text = split_part(_path, '/', 1) and owner_id = auth.uid())
$$;

create policy "Project members read files" on storage.objects for select to authenticated
  using (bucket_id = 'project-files' and public.can_access_project_path(name));
create policy "Project members upload files" on storage.objects for insert to authenticated
  with check (bucket_id = 'project-files' and public.can_access_project_path(name));
create policy "Project members delete files" on storage.objects for delete to authenticated
  using (bucket_id = 'project-files' and public.can_access_project_path(name));

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  owner_id uuid not null,
  amount numeric(14,2) not null,
  currency text not null default 'NGN',
  card_brand text not null,
  card_last4 text not null check (card_last4 ~ '^[0-9]{4}$'),
  reference text not null unique,
  status text not null default 'succeeded',
  test_mode boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.payments to authenticated;
grant all on public.payments to service_role;
alter table public.payments enable row level security;
create policy "Owners and staff read payments" on public.payments
  for select to authenticated
  using (owner_id = auth.uid() or public.is_staff(auth.uid()));
create index payments_project_idx on public.payments(project_id);

create or replace function public.pay_for_book(_project_id uuid, _card_brand text, _card_last4 text)
returns public.payments
language plpgsql security definer set search_path to 'public' as $$
declare
  p public.projects%rowtype;
  total numeric;
  pay public.payments%rowtype;
begin
  select * into p from public.projects where id = _project_id and owner_id = auth.uid() for update;
  if not found then raise exception 'Book not found'; end if;
  if p.stage <> 'quoted' then raise exception 'This book is not waiting for payment'; end if;
  if _card_last4 !~ '^[0-9]{4}$' then raise exception 'Invalid card'; end if;

  select coalesce(sum(price), 0) into total from public.orders where project_id = _project_id;

  perform set_config('app.paying', 'on', true);
  update public.projects set stage = 'ordered' where id = _project_id;
  perform set_config('app.paying', '', true);

  insert into public.payments (project_id, owner_id, amount, currency, card_brand, card_last4, reference)
  values (
    _project_id, auth.uid(),
    round(total, 2), 'NGN',
    left(coalesce(nullif(_card_brand, ''), 'Card'), 20),
    _card_last4,
    'PP-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))
  )
  returning * into pay;
  return pay;
end;
$$;
revoke execute on function public.pay_for_book(uuid, text, text) from public, anon;
grant execute on function public.pay_for_book(uuid, text, text) to authenticated;

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  sender_id uuid not null default auth.uid(),
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);
create index messages_project_idx on public.messages(project_id, created_at);
grant select, insert on public.messages to authenticated;
grant all on public.messages to service_role;
alter table public.messages enable row level security;
create policy "Owner or staff read messages" on public.messages for select to authenticated
  using (public.is_project_owner(project_id) or public.is_staff(auth.uid()));
create policy "Owner or staff send messages" on public.messages for insert to authenticated
  with check (sender_id = auth.uid() and (public.is_project_owner(project_id) or public.is_staff(auth.uid())));