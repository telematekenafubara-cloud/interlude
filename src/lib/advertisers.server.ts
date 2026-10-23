/**
 * Advertiser console — signup, campaigns, Paystack TEST checkout, activation, stats.
 * Relative share of voice only — no Hold-count guarantee.
 */
import { randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";
import { hashKey } from "@/lib/impressions-core.server";
import { normalizeCategory } from "@/lib/ad-categories";
import type { Campaign } from "@/lib/ad-decision";
import { paystackInitialize, paystackVerify } from "@/lib/paystack.server";

export const TIER_PRICE_KOBO = { starter: 2_000_000, growth: 10_000_000 } as const;
export type PaidTier = keyof typeof TIER_PRICE_KOBO;
export const CAMPAIGN_DAYS = 30;

function rid(prefix: string, n = 10): string {
  return `${prefix}_${randomBytes(n).toString("hex")}`;
}

export type Advertiser = { id: string; name: string; email: string; apiKeyPrefix: string };

export async function signupAdvertiser(input: { name: string; email: string }): Promise<
  Advertiser & { apiKey: string }
> {
  const name = String(input.name || "").trim().slice(0, 120);
  const email = String(input.email || "").trim().toLowerCase().slice(0, 200);
  if (!name) throw new Error("name_required");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("email_invalid");
  const id = rid("adv", 8);
  const apiKey = `ila_${randomBytes(24).toString("base64url")}`;
  const sql = await getSql();
  await sql.query(
    `insert into advertisers (id, name, email, api_key_hash, api_key_prefix) values ($1,$2,$3,$4,$5)`,
    [id, name, email, hashKey(apiKey), apiKey.slice(0, 8)],
  );
  return { id, name, email, apiKeyPrefix: apiKey.slice(0, 8), apiKey };
}

export async function getAdvertiserByKey(key: string | null): Promise<Advertiser | null> {
  if (!key || key.length < 8) return null;
  const sql = await getSql();
  const rows = await sql<{ id: string; name: string; email: string; api_key_prefix: string }>`
    select id, name, email, api_key_prefix from advertisers where api_key_hash = ${hashKey(key)} limit 1`;
  const r = rows[0];
  return r ? { id: r.id, name: r.name, email: r.email, apiKeyPrefix: r.api_key_prefix } : null;
}

function cleanUrl(raw: unknown): string | null {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString().slice(0, 500) : null;
  } catch {
    return null;
  }
}

export type CampaignRow = {
  id: string;
  name: string;
  headline: string;
  body: string;
  cta: string;
  clickUrl: string | null;
  imageUrl: string | null;
  category: string;
  tier: PaidTier;
  status: string;
  paidUntil: string | null;
  createdAt: string;
};

export async function createCampaign(
  advertiserId: string,
  input: Record<string, unknown>,
): Promise<CampaignRow> {
  const name = String(input.name || "").trim().slice(0, 120);
  const headline = String(input.headline || "").trim().slice(0, 120);
  const body = String(input.body || "").trim().slice(0, 400);
  const cta = String(input.cta || "").trim().slice(0, 40);
  const category = normalizeCategory(input.category);
  const tier = input.tier === "growth" ? "growth" : input.tier === "starter" ? "starter" : null;
  if (!name || !headline) throw new Error("name_and_headline_required");
  if (!category) throw new Error("category_invalid");
  if (!tier) throw new Error("tier_invalid");
  const id = rid("cmp", 8);
  const sql = await getSql();
  await sql.query(
    `insert into campaigns (id, advertiser_id, name, headline, body, cta, click_url, image_url, category, tier)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [id, advertiserId, name, headline, body, cta, cleanUrl(input.clickUrl), cleanUrl(input.imageUrl), category, tier],
  );
  const c = await getCampaign(advertiserId, id);
  if (!c) throw new Error("campaign_create_failed");
  return c;
}

type DbCampaign = {
  id: string;
  name: string;
  headline: string;
  body: string;
  cta: string;
  click_url: string | null;
  image_url: string | null;
  category: string;
  tier: PaidTier;
  status: string;
  paid_until: string | null;
  created_at: string;
  advertiser_id: string;
  advertiser_name?: string;
};

function mapCampaign(r: DbCampaign): CampaignRow {
  return {
    id: r.id,
    name: r.name,
    headline: r.headline,
    body: r.body,
    cta: r.cta,
    clickUrl: r.click_url,
    imageUrl: r.image_url,
    category: r.category,
    tier: r.tier,
    status: r.status,
    paidUntil: r.paid_until,
    createdAt: r.created_at,
  };
}

export async function getCampaign(advertiserId: string, id: string): Promise<CampaignRow | null> {
  const sql = await getSql();
  const rows = await sql<DbCampaign>`
    select id, name, headline, body, cta, click_url, image_url, category, tier, status,
      paid_until::text as paid_until, created_at::text as created_at, advertiser_id
    from campaigns where id = ${id} and advertiser_id = ${advertiserId} limit 1`;
  return rows[0] ? mapCampaign(rows[0]) : null;
}

export type CampaignStats = { accepted: number; completed: number; skipped: number; rejected: number };

export async function listCampaignsWithStats(
  advertiserId: string,
): Promise<Array<CampaignRow & { stats: CampaignStats }>> {
  const sql = await getSql();
  const rows = await sql<DbCampaign>`
    select id, name, headline, body, cta, click_url, image_url, category, tier, status,
      paid_until::text as paid_until, created_at::text as created_at, advertiser_id
    from campaigns where advertiser_id = ${advertiserId} order by created_at desc`;
  const ids = rows.map((r) => r.id);
  const stats = new Map<string, CampaignStats>();
  if (ids.length) {
    const s = await sql.query<{ ad_id: string; status: string; skipped: boolean; n: string | number }>(
      `select ad_id, status, skipped, count(*)::int as n from impressions
       where ad_id = any($1) group by ad_id, status, skipped`,
      [ids],
    );
    for (const r of s) {
      const cur = stats.get(r.ad_id) ?? { accepted: 0, completed: 0, skipped: 0, rejected: 0 };
      const n = Number(r.n);
      if (r.status === "accepted") {
        cur.accepted += n;
        if (r.skipped) cur.skipped += n;
        else cur.completed += n;
      } else cur.rejected += n;
      stats.set(r.ad_id, cur);
    }
  }
  return rows.map((r) => ({
    ...mapCampaign(r),
    stats: stats.get(r.id) ?? { accepted: 0, completed: 0, skipped: 0, rejected: 0 },
  }));
}

/** Active paid campaigns (status active, paid_until in future) for /api/decision. */
export async function loadActiveDbCampaigns(): Promise<Campaign[]> {
  const sql = await getSql();
  const rows = await sql<DbCampaign>`
    select c.id, c.name, c.headline, c.body, c.cta, c.click_url, c.image_url, c.category, c.tier,
      c.status, c.paid_until::text as paid_until, c.created_at::text as created_at, c.advertiser_id,
      a.name as advertiser_name
    from campaigns c join advertisers a on a.id = c.advertiser_id
    where c.status = 'active' and (c.paid_until is null or c.paid_until > now())`;
  return rows.map((r) => ({
    id: r.id,
    adId: r.id,
    tier: r.tier,
    active: true,
    category: r.category,
    advertiserName: r.advertiser_name || r.name,
    creative: {
      headline: r.headline,
      body: r.body,
      cta: r.cta,
      clickUrl: r.click_url,
      imageUrl: r.image_url,
    },
  }));
}

export async function startCheckout(input: {
  advertiser: Advertiser;
  campaignId: string;
  callbackUrl?: string;
}): Promise<{ reference: string; authorizationUrl: string; amountKobo: number; tier: PaidTier }> {
  const c = await getCampaign(input.advertiser.id, input.campaignId);
  if (!c) throw new Error("campaign_not_found");
  const amountKobo = TIER_PRICE_KOBO[c.tier];
  const reference = rid("ilpay", 10);
  const init = await paystackInitialize({
    email: input.advertiser.email,
    amountKobo,
    reference,
    callbackUrl: input.callbackUrl,
    metadata: { campaignId: c.id, advertiserId: input.advertiser.id, tier: c.tier },
  });
  const sql = await getSql();
  await sql.query(
    `insert into campaign_payments (reference, campaign_id, advertiser_id, tier, amount_kobo, status, authorization_url)
     values ($1,$2,$3,$4,$5,'initialized',$6)`,
    [reference, c.id, input.advertiser.id, c.tier, amountKobo, init.authorizationUrl],
  );
  return { reference, authorizationUrl: init.authorizationUrl, amountKobo, tier: c.tier };
}

/**
 * Verify with Paystack and activate the campaign. Idempotent; used by both the
 * callback/verify endpoint and the webhook. Amount must match the tier price.
 */
export async function confirmPayment(reference: string): Promise<{
  ok: boolean;
  status: string;
  campaignId?: string;
  paidUntil?: string | null;
}> {
  const sql = await getSql();
  const rows = await sql<{ reference: string; campaign_id: string; amount_kobo: string | number; status: string }>`
    select reference, campaign_id, amount_kobo, status from campaign_payments where reference = ${reference} limit 1`;
  const p = rows[0];
  if (!p) return { ok: false, status: "unknown_reference" };
  if (p.status === "success") {
    const c = await sql<{ paid_until: string | null }>`
      select paid_until::text as paid_until from campaigns where id = ${p.campaign_id}`;
    return { ok: true, status: "success", campaignId: p.campaign_id, paidUntil: c[0]?.paid_until ?? null };
  }
  const v = await paystackVerify(reference);
  if (v.status !== "success") {
    if (v.status === "failed" || v.status === "abandoned") {
      await sql.query(`update campaign_payments set status = $1 where reference = $2`, [v.status, reference]);
    }
    return { ok: false, status: v.status, campaignId: p.campaign_id };
  }
  if (v.amountKobo < Number(p.amount_kobo) || v.currency !== "NGN") {
    await sql.query(`update campaign_payments set status = 'failed' where reference = $1`, [reference]);
    return { ok: false, status: "amount_mismatch", campaignId: p.campaign_id };
  }
  const updated = await sql.query<{ reference: string }>(
    `update campaign_payments set status = 'success', paid_at = now()
     where reference = $1 and status <> 'success' returning reference`,
    [reference],
  );
  if (updated.length) {
    await sql.query(
      `update campaigns set status = 'active',
         paid_until = greatest(coalesce(paid_until, now()), now()) + ($2 || ' days')::interval
       where id = $1`,
      [p.campaign_id, String(CAMPAIGN_DAYS)],
    );
  }
  const c = await sql<{ paid_until: string | null }>`
    select paid_until::text as paid_until from campaigns where id = ${p.campaign_id}`;
  return { ok: true, status: "success", campaignId: p.campaign_id, paidUntil: c[0]?.paid_until ?? null };
}
