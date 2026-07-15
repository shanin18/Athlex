-- ============================================================
-- Athllo — Stripe webhook idempotency (0002)
-- ============================================================

create table webhook_events (
  id text primary key, -- Stripe event id
  type text not null,
  processed_at timestamptz not null default now()
);

alter table webhook_events enable row level security;
-- No policies: only the service role (which bypasses RLS) writes here.
