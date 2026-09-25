/** Shared CORS headers for public impression / holder APIs. */
export const IMPRESSION_CORS: Record<string, string> = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, GET, OPTIONS",
  "access-control-allow-headers":
    "content-type, x-interlude-key, x-interlude-sig, authorization",
  "access-control-max-age": "86400",
};

export function corsJson(data: unknown, init?: { status?: number }): Response {
  return Response.json(data, {
    status: init?.status ?? 200,
    headers: IMPRESSION_CORS,
  });
}

export function corsOptions(): Response {
  return new Response(null, { status: 204, headers: IMPRESSION_CORS });
}

export function clientIp(event: {
  req: { headers: Headers };
}): string {
  const xf = event.req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  const real = event.req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
