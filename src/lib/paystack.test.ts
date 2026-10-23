import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { describe, it } from "node:test";
import { paystackMode, paystackTestSecret, verifyPaystackSignature } from "./paystack.server.ts";

describe("paystack TEST-only guard", () => {
  it("reports missing / test / live without exposing the value", () => {
    delete process.env.PAYSTACK_SECRET_KEY;
    assert.equal(paystackMode(), "missing");
    process.env.PAYSTACK_SECRET_KEY = "sk_test_abc";
    assert.equal(paystackMode(), "test");
    process.env.PAYSTACK_SECRET_KEY = "sk_live_abc";
    assert.equal(paystackMode(), "live");
  });

  it("refuses live keys", () => {
    process.env.PAYSTACK_SECRET_KEY = "sk_live_abc";
    assert.throws(() => paystackTestSecret(), /paystack_live_forbidden/);
  });

  it("verifies webhook HMAC-SHA512 signatures", () => {
    process.env.PAYSTACK_SECRET_KEY = "sk_test_abc";
    const body = JSON.stringify({ event: "charge.success", data: { reference: "r1" } });
    const sig = createHmac("sha512", "sk_test_abc").update(body).digest("hex");
    assert.equal(verifyPaystackSignature(body, sig), true);
    assert.equal(verifyPaystackSignature(body + " ", sig), false);
    assert.equal(verifyPaystackSignature(body, null), false);
    process.env.PAYSTACK_SECRET_KEY = "sk_live_abc";
    assert.equal(verifyPaystackSignature(body, sig), false);
  });
});
