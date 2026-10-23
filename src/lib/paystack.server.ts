/**
 * Paystack helpers — TEST only. sk_live_ keys are refused everywhere.
 * Never log or return the secret.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export type PaystackMode = "test" | "live" | "missing" | "unknown";

export function paystackMode(): PaystackMode {
  const k = process.env.PAYSTACK_SECRET_KEY?.trim();
  if (!k) return "missing";
  if (k.startsWith("sk_test_")) return "test";
  if (k.startsWith("sk_live_")) return "live";
  return "unknown";
}

/** Returns the TEST secret, or throws paystack_secret_missing / paystack_live_forbidden. */
export function paystackTestSecret(): string {
  const k = process.env.PAYSTACK_SECRET_KEY?.trim();
  if (!k) throw new Error("paystack_secret_missing");
  if (k.startsWith("sk_live_")) throw new Error("paystack_live_forbidden");
  return k;
}

export async function paystackInitialize(input: {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
}): Promise<{ authorizationUrl: string; accessCode: string; reference: string }> {
  const secret = paystackTestSecret();
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { authorization: `Bearer ${secret}`, "content-type": "application/json" },
    body: JSON.stringify({
      email: input.email,
      amount: input.amountKobo,
      currency: "NGN",
      reference: input.reference,
      callback_url: input.callbackUrl,
      metadata: input.metadata,
    }),
  });
  const data = (await res.json()) as {
    status?: boolean;
    message?: string;
    data?: { authorization_url?: string; access_code?: string; reference?: string };
  };
  if (!res.ok || !data.status || !data.data?.authorization_url) {
    throw new Error(`paystack_init_failed:${data.message || res.status}`);
  }
  return {
    authorizationUrl: data.data.authorization_url,
    accessCode: data.data.access_code || "",
    reference: data.data.reference || input.reference,
  };
}

export async function paystackVerify(reference: string): Promise<{
  status: string;
  amountKobo: number;
  currency: string;
}> {
  const secret = paystackTestSecret();
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: { authorization: `Bearer ${secret}` } },
  );
  const data = (await res.json()) as {
    status?: boolean;
    message?: string;
    data?: { status?: string; amount?: number; currency?: string };
  };
  if (!res.ok || !data.status || !data.data) {
    throw new Error(`paystack_verify_failed:${data.message || res.status}`);
  }
  return {
    status: data.data.status || "unknown",
    amountKobo: Number(data.data.amount || 0),
    currency: data.data.currency || "NGN",
  };
}

/** Paystack webhook: x-paystack-signature = HMAC-SHA512(rawBody, secret). */
export function verifyPaystackSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  let secret: string;
  try {
    secret = paystackTestSecret();
  } catch {
    return false;
  }
  const expected = createHmac("sha512", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}
