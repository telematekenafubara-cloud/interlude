-- holders
create table if not exists holders (
  id text primary key,              -- public holder slug e.g. 'holdey'
  name text not null,
  api_key_hash text not null,       -- sha256 hex of secret key
  api_key_prefix text not null,     -- first 8 chars for display
  domains text[] not null default '{}',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

-- impressions
create table if not exists impressions (
  id text primary key,              -- client-generated uuid / idempotency key
  holder_id text not null references holders(id),
  ad_id text not null,
  viewer_id text,
  skipped boolean not null,
  source text not null default 'hold.js',
  page_origin text,
  user_agent text,
  ip_hash text,                     -- hash of IP, not raw
  status text not null default 'accepted', -- accepted | rejected_duplicate | rejected_rate | rejected_bot | rejected_sig
  reject_reason text,
  created_at timestamptz not null default now()
);
create unique index if not exists impressions_id_uidx on impressions(id);
create index if not exists impressions_holder_created_idx on impressions(holder_id, created_at desc);
create index if not exists impressions_viewer_created_idx on impressions(viewer_id, created_at desc);
