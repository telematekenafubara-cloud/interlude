import { defineHandler } from "nitro";
import {
  getHolderByApiKey,
  seedHolders,
} from "../../../../src/lib/impressions.server";
import { corsJson } from "../../../lib/cors";

/** GET /api/holders/me — Authorization: Bearer <apiKey> or x-interlude-key */
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
  try {
    await seedHolders();
    const holder = await getHolderByApiKey(key);
    if (!holder) {
      return corsJson({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    return corsJson({
      ok: true,
      holder,
      holderShare: 0.35,
      waiterShare: 0.4,
      interludeShare: 0.25,
    });
  } catch (err) {
    console.error("[holders/me]", err);
    return corsJson({ ok: false, error: "server_error" }, { status: 500 });
  }
});
