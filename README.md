# Interlude

The wait is the inventory.

**Holdey** answers while a **Hold** plays. Skip after 5 seconds. Ads rotate until skip. Bank, Network, Studio, and the Hold SDK (`/hold.js`) live on the same site.

- Live: [interlude-vert.vercel.app](https://interlude-vert.vercel.app)
- Source: [github.com/telematekenafubara-cloud/interlude](https://github.com/telematekenafubara-cloud/interlude)

Holdey (answers, pictures, clips) is connected on the live site. Secrets stay in Vercel — never in this repository, never in the page, never in share cards.

## Hold SDK

Publishers load:

```html
<script src="https://interlude-vert.vercel.app/hold.js"></script>
```

Then:

```js
Interlude.whileWaiting(async () => {
  const answer = await fetch("/ask", { method: "POST", body: JSON.stringify({ q }) });
  return answer.json();
});
```

Holds skip after 5 seconds; spots rotate every 8 seconds until skip.

## Updating

Push to `main`. The Vercel project rebuilds from this repo.

Share cards use `public/og.jpg` (1200×630). The X feed banner is `public/x-banner.jpg`.


## Interlude Bank (step 7 · Paystack TEST)

Liabilities for Waiter (40%) · Holder (35%) · Interlude (25%) of **net** after VAT 7.5% + ~1.5% fees. Credited only from fraud-cleared accepted Holds (`completed` / `skipped`). Rejected = ₦0. Unpaid balances stay liabilities until a Paystack **TEST** transfer succeeds.

### TEST net placeholder

Real campaign CPM/CPC is not in the DB yet. Each cleared Hold credits `INTERLUDE_TEST_NET_KOBO` (default **10000 kobo = ₦100**) as the net to split. Documented in `scripts/bank-pure.mjs` / `src/lib/bank-math.ts`. Not production revenue.

### Endpoints

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/bank/balance?party=holder` | `x-interlude-key` / Bearer Holder key |
| GET | `/api/bank/balance?party=waiter&id=<viewerId>` | viewer id |
| POST | `/api/bank/kyc` | Holder key or waiter `partyId` |
| POST | `/api/bank/withdraw` | same; min **₦2,000** + KYC verified |
| POST | `/api/bank/credit` | `Authorization: Bearer ${INTERLUDE_ADMIN_TOKEN}` — credit by `impressionId` or `{ "seed": true, "holderId": "holdey", "netKobo": 250000 }` |

### How to demo (TEST)

1. **KYC a Holder**: Onboard → copy API key → Bank → Holder → save NIN/BVN + bank (TEST: Paystack test bank `058` / account `0001234567` often works in sandbox).
2. **Credit**: Play a cleared Hold on Holdey, **or** admin seed:
   ```bash
   curl -sS -X POST https://interlude-vert.vercel.app/api/bank/credit \
     -H "authorization: Bearer $INTERLUDE_ADMIN_TOKEN" \
     -H "content-type: application/json" \
     -d '{"seed":true,"holderId":"holdey","netKobo":250000}'
   ```
   (₦2,500 net → Holder ₦875; seed enough times or raise `netKobo` to clear ₦2,000 min.)
3. **Withdraw**: Bank → Withdraw available (≥ ₦2,000 + KYC). Requires `PAYSTACK_SECRET_KEY=sk_test_…` on Vercel.

### Env

- `PAYSTACK_SECRET_KEY` — **TEST** `sk_test_…` only (required for live transfer attempt)
- `PAYSTACK_WEBHOOK_SECRET` — optional
- `INTERLUDE_TEST_NET_KOBO` — optional TEST net override (kobo)
- Existing: `DATABASE_URL`, `INTERLUDE_ADMIN_TOKEN`

### Accountant note (DB)

`bank_credits` rows are `interlude_bank` liabilities (`amount_kobo` per party). Available = sum(credits) − pending − success `bank_withdrawals`. On Paystack TEST success, withdrawal `status=success` and `paid_at` set — only then is cash-out not a liability. KYC stores **hashes + last4** only (`bank_kyc`), never full NIN/BVN/account in logs.
