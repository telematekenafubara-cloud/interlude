-- Holder category exclusions (e.g. sportsbook, alcohol).
alter table holders add column if not exists blocked_categories text[] not null default '{}';

-- Advertisers (self-serve console). API key stored as sha256 hash only.
create table if not exists advertisers (
  id text primary key,
  name text not null,
  email text not null,
  api_key_hash text not null unique,
  api_key_prefix text not null,
  created_at timestamptz not null default now()
);

-- Campaigns. status: pending_payment -> active (on verified Paystack payment).
create table if not exists campaigns (
  id text primary key,
  advertiser_id text not null references advertisers(id),
  name text not null,
  headline text not null,
  body text not null default '',
  cta text not null default '',
  click_url text,
  image_url text,
  category text not null,
  tier text not null check (tier in ('starter', 'growth')),
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'active', 'paused', 'expired')),
  paid_until timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists campaigns_advertiser_idx on campaigns(advertiser_id, created_at desc);
create index if not exists campaigns_active_idx on campaigns(status, paid_until);

-- Paystack checkout payments (TEST). Idempotent on reference.
create table if not exists campaign_payments (
  reference text primary key,
  campaign_id text not null references campaigns(id),
  advertiser_id text not null references advertisers(id),
  tier text not null check (tier in ('starter', 'growth')),
  amount_kobo bigint not null check (amount_kobo > 0),
  status text not null default 'initialized'
    check (status in ('initialized', 'success', 'failed', 'abandoned')),
  authorization_url text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists campaign_payments_campaign_idx on campaign_payments(campaign_id);
