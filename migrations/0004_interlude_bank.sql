-- Interlude Bank (step 7) — liabilities until cash-out via Paystack TEST transfer.
-- Ledger tag conceptually: interlude_bank.
-- Amounts are integer kobo (₦1 = 100 kobo). Never claim "paid" until transfer succeeds.

-- KYC + payout destination (Holder or Waiter). Full NIN/BVN/account never stored in cleartext.
create table if not exists bank_kyc (
  party_kind text not null check (party_kind in ('holder', 'waiter')),
  party_id text not null,
  status text not null default 'none'
    check (status in ('none', 'pending', 'verified')),
  nin_hash text,
  bvn_hash text,
  nin_last4 text,
  bvn_last4 text,
  bank_code text,
  account_number_hash text,
  account_number_last4 text,
  account_name text,
  paystack_recipient_code text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  primary key (party_kind, party_id)
);

-- Credit rows: one liability line per (impression, party). Idempotent — never double-credit.
create table if not exists bank_credits (
  id text primary key,
  impression_id text not null references impressions(id),
  party_kind text not null check (party_kind in ('waiter', 'holder', 'interlude')),
  party_id text not null,
  amount_kobo bigint not null check (amount_kobo >= 0),
  net_kobo bigint not null check (net_kobo >= 0),
  outcome text not null check (outcome in ('completed', 'skipped', 'rejected')),
  ledger_tag text not null default 'interlude_bank',
  source text not null default 'hold',
  created_at timestamptz not null default now(),
  unique (impression_id, party_kind)
);
create index if not exists bank_credits_party_idx
  on bank_credits(party_kind, party_id, created_at desc);

-- Withdrawal requests. Liability stays until status = success.
create table if not exists bank_withdrawals (
  id text primary key,
  party_kind text not null check (party_kind in ('holder', 'waiter')),
  party_id text not null,
  amount_kobo bigint not null check (amount_kobo > 0),
  status text not null default 'pending'
    check (status in ('pending', 'success', 'failed')),
  paystack_reference text,
  paystack_transfer_code text,
  paystack_transfer_id text,
  fail_reason text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index if not exists bank_withdrawals_party_idx
  on bank_withdrawals(party_kind, party_id, created_at desc);
create unique index if not exists bank_withdrawals_paystack_ref_uidx
  on bank_withdrawals(paystack_reference)
  where paystack_reference is not null;

comment on table bank_credits is
  'interlude_bank liabilities credited from fraud-cleared Holds (or TEST seed). Rejected = no row / NGN 0.';
comment on table bank_withdrawals is
  'Cash-out requests. success only after Paystack TEST transfer accepts; unpaid = still liability.';
