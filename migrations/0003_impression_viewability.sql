-- Viewability audit field + status vocabulary for buyer-trustworthy delivery.
-- completed = accepted AND skipped=false AND watch_ms >= skip threshold (enforced in app)
-- skipped   = accepted AND skipped=true (explicit skip)
-- rejected  = any status <> accepted (sig/skew/rate/bot/viewability/…)
alter table impressions
  add column if not exists watch_ms integer;

comment on column impressions.watch_ms is
  'Client-reported watch duration in ms; required for completed acceptance.';

comment on column impressions.status is
  'accepted | rejected_duplicate | rejected_rate | rejected_bot | rejected_sig | rejected_skew | rejected_holder | rejected_viewability';
