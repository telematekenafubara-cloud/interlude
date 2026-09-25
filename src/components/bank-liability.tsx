import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchBankBalance,
  requestBankWithdraw,
  submitBankKyc,
  type BankBalanceResponse,
} from "@/lib/bank-api";
import { useHolderSession } from "@/lib/holder-session";

type Segment = "waiter" | "holder";

export function BankLiabilityPanel({
  party,
  waiterId,
}: {
  party: Segment;
  waiterId?: string | null;
}) {
  const holderSession = useHolderSession((s) => s.session);
  const [data, setData] = useState<BankBalanceResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [nin, setNin] = useState("");
  const [bvn, setBvn] = useState("");
  const [bankCode, setBankCode] = useState("058");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const refresh = useCallback(async () => {
    setErr(null);
    if (party === "holder" && !holderSession?.apiKey) {
      setData(null);
      return;
    }
    if (party === "waiter" && !waiterId) {
      setData(null);
      return;
    }
    try {
      const res = await fetchBankBalance({
        party,
        apiKey: holderSession?.apiKey,
        waiterId,
      });
      if (!res.ok) {
        setErr(res.error || "balance_failed");
        setData(null);
        return;
      }
      setData(res);
    } catch {
      setErr("balance_failed");
    }
  }, [party, holderSession?.apiKey, waiterId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onKyc = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const res = await submitBankKyc({
        party,
        apiKey: holderSession?.apiKey,
        partyId: waiterId || undefined,
        nin,
        bvn,
        bankCode,
        accountNumber,
        accountName,
      });
      setMsg(res.ok ? res.note || "KYC saved." : res.error || "kyc_failed");
      if (res.ok) {
        setNin("");
        setBvn("");
        setAccountNumber("");
        await refresh();
      }
    } finally {
      setBusy(false);
    }
  };

  const onWithdraw = async () => {
    const available = data?.balance?.availableKobo ?? 0;
    const min = data?.balance?.minWithdrawalKobo ?? 200_000;
    const amount = available;
    if (amount < min) {
      setMsg(`Need at least ${data?.minWithdrawalNgn || "₦2,000"} available.`);
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const res = await requestBankWithdraw({
        party,
        apiKey: holderSession?.apiKey,
        partyId: waiterId || undefined,
        amountKobo: amount,
      });
      setMsg(res.message || res.error || (res.ok ? "Withdraw submitted." : "withdraw_failed"));
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  if (party === "holder" && !holderSession?.apiKey) {
    return (
      <div
        className="mt-8 rounded-xl bg-card p-5 shadow-[0_0_0_1px_rgba(244,241,234,0.08)]"
        data-testid="bank-liability-holder-locked"
      >
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
          Interlude Bank liability · server
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in via{" "}
          <Link to="/onboard" className="text-foreground underline-offset-4 hover:underline">
            Onboard
          </Link>{" "}
          (Holder API key) to see accrued ₦ liability, KYC, and withdraw. Local
          demo balances above are not cash until a Paystack TEST transfer
          succeeds.
        </p>
      </div>
    );
  }

  const bal = data?.balance;
  const kyc = data?.kyc;
  const ready =
    Boolean(data?.canWithdraw) && (bal?.availableKobo ?? 0) >= (bal?.minWithdrawalKobo ?? 200_000);

  return (
    <div
      className="mt-8 space-y-4 rounded-xl bg-card p-5 shadow-[0_0_0_1px_rgba(244,241,234,0.08)]"
      data-testid={`bank-liability-${party}`}
    >
      <div>
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
          Interlude Bank liability · server · {party}
        </p>
        <p className="mt-2 font-serif text-3xl tabular-nums tracking-tight">
          {bal?.availableNgn ?? "₦0.00"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Accrued liability (not paid). Split of TEST net after VAT 7.5% + ~1.5%
          fees: Waiter 40% · Holder 35% · Interlude 25%. Min cash-out{" "}
          {data?.minWithdrawalNgn || "₦2,000"}. TEST net per cleared Hold:{" "}
          {data?.testNetNgn || "—"}.
        </p>
        {err ? (
          <p className="mt-2 text-sm text-destructive">{err}</p>
        ) : null}
        <p className="mt-1 text-xs text-subtle">
          Credited {bal ? (bal.creditedKobo / 100).toFixed(2) : "0"} · pending{" "}
          {bal ? (bal.pendingKobo / 100).toFixed(2) : "0"} · paid{" "}
          {bal ? (bal.paidKobo / 100).toFixed(2) : "0"} (₦)
        </p>
      </div>

      <div className="rounded-md bg-muted/60 px-3 py-3 text-sm">
        <p className="font-medium">
          KYC: {kyc?.status || "none"}
          {kyc?.accountLast4 ? ` · ****${kyc.accountLast4}` : ""}
          {kyc?.accountName ? ` · ${kyc.accountName}` : ""}
        </p>
        {kyc?.status !== "verified" ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <input
              className="h-10 rounded-md bg-background px-3 text-sm outline-none"
              placeholder="NIN"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              autoComplete="off"
            />
            <input
              className="h-10 rounded-md bg-background px-3 text-sm outline-none"
              placeholder="BVN"
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
              autoComplete="off"
            />
            <input
              className="h-10 rounded-md bg-background px-3 text-sm outline-none"
              placeholder="Bank code (e.g. 058)"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
            />
            <input
              className="h-10 rounded-md bg-background px-3 text-sm outline-none"
              placeholder="Account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              autoComplete="off"
            />
            <input
              className="h-10 rounded-md bg-background px-3 text-sm outline-none sm:col-span-2"
              placeholder="Account name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
            <Button
              type="button"
              size="sm"
              disabled={busy}
              onClick={() => void onKyc()}
              className="sm:col-span-2"
            >
              Save KYC
            </Button>
          </div>
        ) : (
          <p className="mt-1 text-xs text-muted-foreground">
            KYC complete. Withdraw when available ≥ min.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          disabled={busy || !ready}
          onClick={() => void onWithdraw()}
          data-testid={`bank-withdraw-${party}`}
        >
          Withdraw available
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={busy}
          onClick={() => void refresh()}
        >
          Refresh
        </Button>
      </div>
      {msg ? <p className="text-sm text-muted-foreground">{msg}</p> : null}
      <p className="text-xs text-subtle">
        We never claim this is paid until Paystack TEST transfer succeeds.
      </p>
    </div>
  );
}
