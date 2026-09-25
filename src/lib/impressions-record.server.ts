/**
 * Record + count APIs for the Hold impression ledger.
 */
import { getSql } from "@/lib/db";
import {
  checkRateLimits,
  classifyViewability,
  markRateAccepted,
  softBotCheck,
  verifyBeacon,
  type BeaconBody,
  type ImpressionStatus,
} from "./impressions-core.server";
import { seedHolders } from "./impressions-holders.server";

const RATE_VIEWER = 60;
const RATE_IP = 120;
const RATE_HOLDER = 2000;
const RATE_WINDOW_MS = 60 * 60 * 1000;

export type RecordInput = BeaconBody & {
  userAgent?: string | null;
  ipHash?: string | null;
  signature?: string | null;
  apiKey?: string | null;
};

export type RecordResult = {
  ok: boolean;
  status: ImpressionStatus;
  reason?: string;
  counts?: Awaited<ReturnType<typeof holderCounts>>;
};

async function dbRateBackup(
  holderId: string,
  viewerId: string | null | undefined,
  ipHash: string | null | undefined,
): Promise<string | null> {
  const sql = await getSql();
  const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
  const holderRows = await sql<{ n: number }>`
    select count(*)::int as n from impressions
    where holder_id = ${holderId} and status = 'accepted' and created_at >= ${since}::timestamptz`;
  if ((holderRows[0]?.n ?? 0) >= RATE_HOLDER) return "holder_rate_db";

  if (viewerId) {
    const rows = await sql<{ n: number }>`
      select count(*)::int as n from impressions
      where viewer_id = ${viewerId} and status = 'accepted' and created_at >= ${since}::timestamptz`;
    if ((rows[0]?.n ?? 0) >= RATE_VIEWER) return "viewer_rate_db";
  }
  if (ipHash) {
    const rows = await sql<{ n: number }>`
      select count(*)::int as n from impressions
      where ip_hash = ${ipHash} and status = 'accepted' and created_at >= ${since}::timestamptz`;
    if ((rows[0]?.n ?? 0) >= RATE_IP) return "ip_rate_db";
  }
  return null;
}

export async function recordImpression(input: RecordInput): Promise<RecordResult> {
  await seedHolders();

  const verify = await verifyBeacon({
    body: input,
    signature: input.signature,
    apiKey: input.apiKey,
  });

  let status: ImpressionStatus = "accepted";
  let rejectReason: string | null = null;

  if (!verify.ok) {
    status = verify.status;
    rejectReason = verify.reason;
  } else {
    // Soft bot / headless — still store for audit
    const bot = softBotCheck({
      userAgent: input.userAgent,
      webdriver: input.webdriver,
    });
    if (bot) {
      status = "rejected_bot";
      rejectReason = bot;
    } else {
      const view = classifyViewability({
        skipped: input.skipped,
        watchMs: input.watchMs,
      });
      if (!view.ok) {
        status = "rejected_viewability";
        rejectReason = view.reason;
      } else {
        const memRate = checkRateLimits({
          viewerId: input.viewer,
          ipHash: input.ipHash,
          holderId: input.holder,
        });
        if (memRate) {
          status = "rejected_rate";
          rejectReason = memRate;
        } else {
          const dbRate = await dbRateBackup(input.holder, input.viewer, input.ipHash);
          if (dbRate) {
            status = "rejected_rate";
            rejectReason = dbRate;
          }
        }
      }
    }
  }

  const sql = await getSql();

  // Idempotency: if id already exists, return duplicate (do not overwrite)
  const existing = await sql<{ id: string; status: string }>`
    select id, status from impressions where id = ${input.id} limit 1`;
  if (existing[0]) {
    const counts = await holderCounts(input.holder);
    return {
      ok: existing[0].status === "accepted",
      status: "rejected_duplicate",
      reason: "duplicate_id",
      counts,
    };
  }

  // Holder must exist for FK — seed already ran; if auth said unknown, skip insert
  if (status === "rejected_holder") {
    return { ok: false, status, reason: rejectReason ?? undefined };
  }

  try {
    const watchMs =
      input.watchMs == null || !Number.isFinite(Number(input.watchMs))
        ? null
        : Math.round(Number(input.watchMs));
    await sql.query(
      `insert into impressions
        (id, holder_id, ad_id, viewer_id, skipped, source, page_origin, user_agent, ip_hash, status, reject_reason, watch_ms)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        input.id,
        input.holder,
        input.ad,
        input.viewer ?? null,
        input.skipped,
        input.source || "hold.js",
        input.pageOrigin ?? null,
        input.userAgent ?? null,
        input.ipHash ?? null,
        status,
        rejectReason,
        watchMs,
      ],
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (/unique|duplicate/i.test(msg)) {
      const counts = await holderCounts(input.holder);
      return {
        ok: false,
        status: "rejected_duplicate",
        reason: "duplicate_id",
        counts,
      };
    }
    throw err;
  }

  if (status === "accepted") {
    markRateAccepted({
      viewerId: input.viewer,
      ipHash: input.ipHash,
      holderId: input.holder,
    });
  }

  const counts = await holderCounts(input.holder);
  return {
    ok: status === "accepted",
    status,
    reason: rejectReason ?? undefined,
    counts,
  };
}

export type HolderCounts = {
  holder: string;
  allTime: {
    accepted: number;
    completed: number;
    skipped: number;
    rejected: number;
  };
  last24h: {
    accepted: number;
    completed: number;
    skipped: number;
    rejected: number;
  };
};

export async function holderCounts(holderId: string): Promise<HolderCounts> {
  const sql = await getSql();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  async function bucket(sinceIso: string | null) {
    const rows = sinceIso
      ? await sql<{
          accepted: number;
          completed: number;
          skipped: number;
          rejected: number;
        }>`
        select
          count(*) filter (where status = 'accepted')::int as accepted,
          count(*) filter (where status = 'accepted' and skipped = false)::int as completed,
          count(*) filter (where status = 'accepted' and skipped = true)::int as skipped,
          count(*) filter (where status <> 'accepted')::int as rejected
        from impressions
        where holder_id = ${holderId} and created_at >= ${sinceIso}::timestamptz`
      : await sql<{
          accepted: number;
          completed: number;
          skipped: number;
          rejected: number;
        }>`
        select
          count(*) filter (where status = 'accepted')::int as accepted,
          count(*) filter (where status = 'accepted' and skipped = false)::int as completed,
          count(*) filter (where status = 'accepted' and skipped = true)::int as skipped,
          count(*) filter (where status <> 'accepted')::int as rejected
        from impressions
        where holder_id = ${holderId}`;
    const r = rows[0];
    return {
      accepted: r?.accepted ?? 0,
      completed: r?.completed ?? 0,
      skipped: r?.skipped ?? 0,
      rejected: r?.rejected ?? 0,
    };
  }

  return {
    holder: holderId,
    allTime: await bucket(null),
    last24h: await bucket(since),
  };
}
