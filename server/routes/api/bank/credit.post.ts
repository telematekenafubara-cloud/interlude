import { defineHandler } from "nitro";
import { seedHolders } from "../../../../src/lib/impressions.server";
import {
  creditImpression,
  seedTestCredit,
  formatNgnFromKobo,
} from "../../../../src/lib/bank.server";
import { getSql } from "../../../../src/lib/db";
import { corsJson } from "../../../lib/cors";

function adminOk(event: { req: { headers: Headers } }): boolean {
  const token = process.env.INTERLUDE_ADMIN_TOKEN;
  if (!token) return false;
  const auth = event.req.headers.get("authorization") || "";
  const m = /^Bearer\s+(.+)$/i.exec(auth);
  return Boolean(m?.[1] && m[1] === token);
}

/**
 * POST /api/bank/credit — admin only.
 * Body: { impressionId } to credit an existing accepted Hold,
 * or { seed: true, holderId, viewerId?, netKobo? } for TEST seed.
 */
export default defineHandler(async (event) => {
  if (!adminOk(event)) {
    return corsJson({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await event.req.json()) as Record<string, unknown>;
  } catch {
    return corsJson({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  try {
    await seedHolders();

    if (body.seed === true) {
      const holderId = String(body.holderId || "holdey");
      const result = await seedTestCredit({
        holderId,
        viewerId: body.viewerId ? String(body.viewerId) : undefined,
        netKobo: body.netKobo != null ? Number(body.netKobo) : undefined,
        outcome: body.outcome === "skipped" ? "skipped" : "completed",
      });
      return corsJson({
        ok: true,
        seeded: true,
        impressionId: result.impressionId,
        amounts: result.amounts,
        amountsNgn: {
          net: formatNgnFromKobo(result.amounts.net),
          waiter: formatNgnFromKobo(result.amounts.waiter),
          holder: formatNgnFromKobo(result.amounts.holder),
          interlude: formatNgnFromKobo(result.amounts.interlude),
        },
      });
    }

    const impressionId = String(body.impressionId || "");
    if (!impressionId) {
      return corsJson({ ok: false, error: "impression_id_required" }, { status: 400 });
    }

    const sql = await getSql();
    const rows = await sql<{
      id: string;
      holder_id: string;
      viewer_id: string | null;
      skipped: boolean;
      status: string;
    }>`
      select id, holder_id, viewer_id, skipped, status
      from impressions where id = ${impressionId} limit 1`;
    const row = rows[0];
    if (!row) {
      return corsJson({ ok: false, error: "impression_not_found" }, { status: 404 });
    }
    if (row.status !== "accepted") {
      return corsJson({
        ok: true,
        credited: false,
        reason: "rejected_impression",
        amounts: { outcome: "rejected", net: 0, waiter: 0, holder: 0, interlude: 0 },
      });
    }

    const result = await creditImpression({
      impressionId: row.id,
      holderId: row.holder_id,
      viewerId: row.viewer_id,
      outcome: row.skipped ? "skipped" : "completed",
    });

    return corsJson({
      ok: true,
      credited: result.credited,
      already: result.already ?? false,
      amounts: result.amounts,
    });
  } catch (err) {
    console.error("[bank/credit]", err);
    return corsJson({ ok: false, error: "server_error" }, { status: 500 });
  }
});
