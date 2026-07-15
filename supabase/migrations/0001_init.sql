-- ============================================================
-- Athllo — initial schema (0001)
-- Postgres / Supabase. Enums, tables, indexes, RLS policies.
-- ============================================================

-- ---------- Extensions ----------
create extension if not exists pg_trgm;

-- ---------- Enums ----------
create type user_role as enum ('athlete', 'sponsor', 'admin');
create type verification_status as enum ('unverified', 'pending', 'verified', 'rejected');
create type career_stage as enum ('amateur', 'semi_pro', 'pro');
create type deal_status as enum ('draft', 'in_review', 'active', 'completed', 'cancelled');
create type opportunity_status as enum ('draft', 'open', 'active', 'completed', 'cancelled');
create type inquiry_status as enum ('new', 'read', 'replied', 'archived');
create type subscription_tier as enum ('free', 'pro', 'elite');

-- ---------- Lookups ----------
create table sports (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text
);

create table industries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

-- ---------- Users (mirrors auth.users) ----------
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role user_role not null default 'athlete',
  full_name text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Athlete profiles ----------
create table athlete_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  slug text not null unique,
  display_name text not null,
  headline text,
  bio text,
  sport_id uuid references sports(id),
  location text,
  career_stage career_stage,
  achievements jsonb not null default '[]',
  social_stats jsonb not null default '{}',
  total_reach integer not null default 0,
  campaign_rate numeric,
  availability text,
  verification_status verification_status not null default 'unverified',
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Sponsor profiles ----------
create table sponsor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  slug text not null unique,
  company_name text not null,
  industry_id uuid references industries(id),
  description text,
  logo_url text,
  website_url text,
  company_size text,
  budget_min numeric,
  budget_max numeric,
  verification_status verification_status not null default 'unverified',
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Opportunities ----------
create table opportunities (
  id uuid primary key default gen_random_uuid(),
  sponsor_id uuid not null references sponsor_profiles(id) on delete cascade,
  title text not null,
  description text,
  budget_min numeric,
  budget_max numeric,
  requirements text,
  deliverables text,
  status opportunity_status not null default 'draft',
  application_deadline timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Deals ----------
create table deals (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete set null,
  athlete_id uuid not null references athlete_profiles(id) on delete cascade,
  sponsor_id uuid not null references sponsor_profiles(id) on delete cascade,
  title text not null,
  terms text,
  amount numeric not null default 0,
  currency text not null default 'USD',
  status deal_status not null default 'draft',
  stripe_payment_intent_id text,
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Inquiries ----------
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references users(id) on delete cascade,
  recipient_id uuid not null references users(id) on delete cascade,
  subject text not null,
  message text not null,
  related_opportunity_id uuid references opportunities(id) on delete set null,
  related_deal_id uuid references deals(id) on delete set null,
  status inquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

-- ---------- Subscriptions ----------
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  tier subscription_tier not null default 'free',
  status text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Transactions ----------
create table transactions (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid references deals(id) on delete set null,
  payer_id uuid references users(id) on delete set null,
  payee_id uuid references users(id) on delete set null,
  amount numeric not null,
  currency text not null default 'USD',
  platform_fee numeric not null default 0,
  stripe_charge_id text,
  stripe_transfer_id text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- ---------- Saved profiles ----------
create table saved_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  saved_user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, saved_user_id)
);

-- ---------- Audit log ----------
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references users(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- ---------- Indexes ----------
create index idx_athlete_sport on athlete_profiles (sport_id);
create index idx_athlete_verif on athlete_profiles (verification_status);
create index idx_athlete_reach on athlete_profiles (total_reach desc);
create index idx_athlete_name_trgm on athlete_profiles using gin (display_name gin_trgm_ops);
create index idx_sponsor_name_trgm on sponsor_profiles using gin (company_name gin_trgm_ops);
create index idx_deals_status on deals (status);
create index idx_inquiries_recipient on inquiries (recipient_id, status);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table users enable row level security;
alter table athlete_profiles enable row level security;
alter table sponsor_profiles enable row level security;
alter table opportunities enable row level security;
alter table deals enable row level security;
alter table inquiries enable row level security;
alter table subscriptions enable row level security;
alter table transactions enable row level security;
alter table saved_profiles enable row level security;
alter table audit_logs enable row level security;

-- Helper: is the current user an admin?
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from users where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- users: readable by self + admin; writable by self.
create policy users_select on users for select
  using (id = auth.uid() or is_admin());
create policy users_update on users for update
  using (id = auth.uid());

-- athlete_profiles: public read; owner write; admin all.
create policy athlete_read on athlete_profiles for select using (true);
create policy athlete_write on athlete_profiles for all
  using (user_id = auth.uid() or is_admin())
  with check (user_id = auth.uid() or is_admin());

-- sponsor_profiles: public read; owner write; admin all.
create policy sponsor_read on sponsor_profiles for select using (true);
create policy sponsor_write on sponsor_profiles for all
  using (user_id = auth.uid() or is_admin())
  with check (user_id = auth.uid() or is_admin());

-- opportunities: public read of open; owner manages; admin all.
create policy opp_read on opportunities for select
  using (status <> 'draft' or exists (
    select 1 from sponsor_profiles s where s.id = sponsor_id and s.user_id = auth.uid()
  ) or is_admin());
create policy opp_write on opportunities for all
  using (exists (select 1 from sponsor_profiles s where s.id = sponsor_id and s.user_id = auth.uid()) or is_admin())
  with check (exists (select 1 from sponsor_profiles s where s.id = sponsor_id and s.user_id = auth.uid()) or is_admin());

-- inquiries: only sender or recipient (or admin).
create policy inquiry_access on inquiries for all
  using (sender_id = auth.uid() or recipient_id = auth.uid() or is_admin())
  with check (sender_id = auth.uid() or is_admin());

-- subscriptions: owner + admin.
create policy sub_access on subscriptions for select
  using (user_id = auth.uid() or is_admin());

-- transactions: parties + admin.
create policy tx_access on transactions for select
  using (payer_id = auth.uid() or payee_id = auth.uid() or is_admin());

-- saved_profiles: owner only.
create policy saved_access on saved_profiles for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- audit_logs: admin only.
create policy audit_read on audit_logs for select using (is_admin());

-- ============================================================
-- Trigger: mirror new auth users into public.users
-- ============================================================
create or replace function handle_new_user() returns trigger as $$
begin
  insert into public.users (id, email, role)
  values (
    new.id,
    new.email,
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'athlete')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();