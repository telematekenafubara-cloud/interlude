import { getAdvertiserByKey } from "../../src/lib/advertisers.server";

export function advertiserKey(event: { req: { headers: Headers } }): string | null {
  const k = event.req.headers.get("x-interlude-key");
  if (k) return k;
  const m = /^Bearer\s+(.+)$/i.exec(event.req.headers.get("authorization") || "");
  return m?.[1] ?? null;
}

export async function requireAdvertiser(event: { req: { headers: Headers } }) {
  return getAdvertiserByKey(advertiserKey(event));
}
