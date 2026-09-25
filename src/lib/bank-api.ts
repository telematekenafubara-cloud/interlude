/**
 * Client helpers for Interlude Bank liability APIs (server ledger + Paystack TEST).
 */
export type BankBalanceResponse = {
  ok: boolean;
  error?: string;
  party?: string;
  partyId?: string;
  balance?: {
    creditedKobo: number;
    pendingKobo: number;
    paidKobo: number;
    availableKobo: number;
    availableNgn: string;
    minWithdrawalKobo: number;
  };
  kyc?: {
    status: string;
    accountName: string | null;
    accountLast4: string | null;
    bankCode: string | null;
    hasRecipient: boolean;
  };
  canWithdraw?: boolean;
  minWithdrawalNgn?: string;
  testNetNgn?: string;
  shares?: { waiter: number; holder: number; interlude: number };
  note?: string;
};

export async function fetchBankBalance(input: {
  party: "holder" | "waiter";
  apiKey?: string | null;
  waiterId?: string | null;
}): Promise<BankBalanceResponse> {
  const qs =
    input.party === "waiter"
      ? `party=waiter&id=${encodeURIComponent(input.waiterId || "")}`
      : "party=holder";
  const headers: Record<string, string> = {};
  if (input.party === "holder" && input.apiKey) {
    headers["x-interlude-key"] = input.apiKey;
  }
  const res = await fetch(`/api/bank/balance?${qs}`, { headers });
  return (await res.json()) as BankBalanceResponse;
}

export async function submitBankKyc(input: {
  party: "holder" | "waiter";
  apiKey?: string | null;
  partyId?: string;
  nin: string;
  bvn: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
}): Promise<{ ok: boolean; error?: string; status?: string; note?: string }> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  if (input.party === "holder" && input.apiKey) {
    headers["x-interlude-key"] = input.apiKey;
  }
  const res = await fetch("/api/bank/kyc", {
    method: "POST",
    headers,
    body: JSON.stringify({
      party: input.party,
      partyId: input.partyId,
      nin: input.nin,
      bvn: input.bvn,
      bankCode: input.bankCode,
      accountName: input.accountName,
      accountNumber: input.accountNumber,
    }),
  });
  return (await res.json()) as {
    ok: boolean;
    error?: string;
    status?: string;
    note?: string;
  };
}

export async function requestBankWithdraw(input: {
  party: "holder" | "waiter";
  apiKey?: string | null;
  partyId?: string;
  amountKobo: number;
}): Promise<{
  ok: boolean;
  error?: string;
  message?: string;
  status?: string;
  paid?: boolean;
  withdrawalId?: string;
}> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  if (input.party === "holder" && input.apiKey) {
    headers["x-interlude-key"] = input.apiKey;
  }
  const res = await fetch("/api/bank/withdraw", {
    method: "POST",
    headers,
    body: JSON.stringify({
      party: input.party,
      partyId: input.partyId,
      amountKobo: input.amountKobo,
    }),
  });
  return (await res.json()) as {
    ok: boolean;
    error?: string;
    message?: string;
    status?: string;
    paid?: boolean;
    withdrawalId?: string;
  };
}
