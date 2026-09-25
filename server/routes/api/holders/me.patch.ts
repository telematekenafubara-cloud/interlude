import { defineHandler } from "nitro";
import {
  getHolderByApiKey,
  seedHolders,
  updateHolderDomains,
} from "../../../../src/lib/impressions.server";
import { corsJson } from "../../../lib/cors";

/** PATCH /api/holders/me — update domain allowlist with Holder API key. */
export default defineHandler(async (event) => {
  const key =
    event.req.headers.get("x-interlude-key") ||
    (() => {
      const auth = event.req.headers.get("authorization") || "";
      const m = /^Bearer\s+(.+)$/i.exec(auth);
      return m?.[1] ?? null;
    })();
  if (!key) {
    return corsJson({ ok: false, error: "auth_required" }, { status: 401 });
  }

  let body: { domains?: string[] };
  try {
    body = (await event.req.json()) as typeof body;
  } catch {
    return corsJson({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  try {
    await seedHolders();
    const holder = await getHolderByApiKey(key);
    if (!holder) {
      return corsJson({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    const domains = await updateHolderDomains(holder.id, body.domains ?? []);
    return corsJson({
      ok: true,
      id: holder.id,
      domains,
      holderShare: 0.35,
    });
  } catch (err) {
    console.error("[holders/me patch]", err);
    return corsJson({ ok: false, error: "server_error" }, { status: 500 });
  }
});
