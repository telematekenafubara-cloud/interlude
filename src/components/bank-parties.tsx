import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BankLiabilityPanel } from "@/components/bank-liability";
import {
  ConnectHolder,
  ConnectWaiter,
  IdRow,
  Ledger,
  Stat,
} from "@/components/bank-helpers";
import { useBankStore } from "@/lib/bank-store";
import {
  COMPLETE_CPM,
  FULL_CPM,
  HOLDER_PAYOUT_FLOOR,
  HOLDER_SHARE,
  INTERLUDE_SHARE,
  PAYOUT_FLOOR,
  SKIP_CPM,
  VIEWER_SHARE,
  settleMany,
  shareLabel,
  usdExact,
} from "@/lib/rates";
import { cn } from "@/lib/utils";

type Segment = "waiter" | "holder";

export function WaiterBank() {
  const totals = useBankStore((s) => s.totals);
  const viewerId = useBankStore((s) => s.viewerId);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const remaining = Math.max(0, PAYOUT_FLOOR - totals.viewer);
  const holdsToFloor = Math.ceil(
    remaining / ((COMPLETE_CPM / 1000) * VIEWER_SHARE),
  );
  const ready = mounted && totals.viewer >= PAYOUT_FLOOR;

  return (
    <div className="mt-10">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
        Waiter Bank
      </p>
      <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
        You waited. You watched. This is yours.
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        After Interlude holds the advertiser’s payment, {shareLabel(VIEWER_SHARE)} of
        it is what is left for you — the Waiter who sat through the Hold.
        That remainder is this dashboard. Payout from {usdExact(PAYOUT_FLOOR)}.
      </p>
      <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-3">
        <Stat
          k={`Left for you · ${shareLabel(VIEWER_SHARE)}`}
          v={mounted ? usdExact(totals.viewer) : usdExact(0)}
          large
        />
        <Stat
          k="Of Interlude held"
          v={
            mounted
              ? `${shareLabel(VIEWER_SHARE)} of ${usdExact(totals.advertiser)}`
              : shareLabel(VIEWER_SHARE)
          }
        />
        <Stat k="Holds watched" v={mounted ? String(totals.views) : "0"} />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {ready
          ? "Ready to settle."
          : `About ${holdsToFloor.toLocaleString()} completed Holds to ${usdExact(PAYOUT_FLOOR)}.`}
      </p>
      <IdRow
        label="Waiter ID"
        value={mounted ? viewerId : "il_••••••••"}
      />
      <BankLiabilityPanel party="waiter" waiterId={mounted ? viewerId : null} />
      <ConnectWaiter />
      <Ledger kind="waiter" />
    </div>
  );
}

export function HolderBank() {
  const totals = useBankStore((s) => s.totals);
  const holderId = useBankStore((s) => s.holderId);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const remaining = Math.max(0, HOLDER_PAYOUT_FLOOR - (totals.holder ?? 0));
  const holdsToFloor = Math.ceil(
    remaining / ((COMPLETE_CPM / 1000) * HOLDER_SHARE),
  );
  const ready = mounted && (totals.holder ?? 0) >= HOLDER_PAYOUT_FLOOR;

  return (
    <div className="mt-10">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
        Holder Bank
      </p>
      <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
        You own the wait. This is yours.
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        After Interlude holds the advertiser’s payment, {shareLabel(HOLDER_SHARE)} of
        it is what is left for you — the Holder who owns the wait. That
        remainder is this dashboard. Payout from {usdExact(HOLDER_PAYOUT_FLOOR)}.
        Call{" "}
        <code className="text-foreground">Interlude.holder("your-app")</code>{" "}
        on{" "}
        <Link
          to="/install"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Install
        </Link>
        .
      </p>
      <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-3">
        <Stat
          k={`Left for you · ${shareLabel(HOLDER_SHARE)}`}
          v={mounted ? usdExact(totals.holder ?? 0) : usdExact(0)}
          large
        />
        <Stat
          k="Of Interlude held"
          v={
            mounted
              ? `${shareLabel(HOLDER_SHARE)} of ${usdExact(totals.advertiser)}`
              : shareLabel(HOLDER_SHARE)
          }
        />
        <Stat k="Holds served" v={mounted ? String(totals.views) : "0"} />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {ready
          ? "Ready to settle."
          : `About ${holdsToFloor.toLocaleString()} completed Holds to ${usdExact(HOLDER_PAYOUT_FLOOR)}.`}
      </p>
      <IdRow
        label="Holder ID"
        value={mounted ? holderId : "ho_••••••••"}
      />
      <BankLiabilityPanel party="holder" />
      <ConnectHolder />
      <Ledger kind="holder" />
    </div>
  );
}

export function Thousand({ highlight }: { highlight: Segment }) {
  const [views, setViews] = useState(1000);
  const [skipPct, setSkipPct] = useState(0);
  const mix = settleMany(views, skipPct / 100);

  return (
    <section className="mt-20">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
        The 1,000-Hold settlement
      </p>
      <h2 className="mt-3 max-w-xl font-serif text-3xl sm:text-4xl">
        What 1,000 views are actually worth.
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Brands pay Interlude to hold space. Interlude holds the full CPM. What
        is left: Waiter Bank {shareLabel(VIEWER_SHARE)}, Holder Bank{" "}
        {shareLabel(HOLDER_SHARE)}, Interlude {shareLabel(INTERLUDE_SHARE)}.
        Completed {usdExact(COMPLETE_CPM)} CPM, skip {usdExact(SKIP_CPM)}. Tap a
        Hold and stay through the full Interlude page for {usdExact(FULL_CPM)}{" "}
        CPM extra. The table uses the unrounded split.
      </p>

      <div className="mt-8 flex flex-wrap items-end gap-4">
        <label className="block">
          <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
            Views
          </span>
          <input
            type="number"
            min={1}
            max={100000}
            value={views}
            onChange={(e) => setViews(Number(e.target.value) || 0)}
            className="mt-1 block h-11 w-32 rounded-md bg-muted px-3 text-sm tabular-nums outline-none"
          />
        </label>
        <div>
          <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
            Skip rate
          </p>
          <div className="mt-1 flex gap-1">
            {[
              { n: 0, l: "None skip" },
              { n: 30, l: "30% skip" },
              { n: 100, l: "All skip" },
            ].map((b) => (
              <button
                key={b.n}
                type="button"
                onClick={() => setSkipPct(b.n)}
                className={cn(
                  "h-11 rounded-md px-3 text-sm",
                  skipPct === b.n
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {b.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]">
        <table className="w-full text-left text-sm">
          <thead className="text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
            <tr className="border-b border-border">
              <th className="px-5 py-3 font-medium">Party</th>
              <th className="px-5 py-3 font-medium">What they do</th>
              <th className="px-5 py-3 text-right font-medium">USD</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            <Row
              party="Advertiser → Interlude"
              note="Pays to hold space. Interlude holds it first."
              amount={mix.advertiser}
              strong
            />
            <Row
              party="Waiter Bank"
              note={`${usdExact(mix.advertiser)} × ${VIEWER_SHARE.toFixed(2)}`}
              amount={mix.viewer}
              you={highlight === "waiter"}
            />
            <Row
              party="Holder Bank"
              note={`${usdExact(mix.advertiser)} × ${HOLDER_SHARE.toFixed(2)}`}
              amount={mix.holder}
              you={highlight === "holder"}
            />
            <Row
              party="Interlude"
              note={`${usdExact(mix.advertiser)} × ${INTERLUDE_SHARE.toFixed(2)}`}
              amount={mix.interlude}
            />
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function Row({
  party,
  note,
  amount,
  strong,
  you,
}: {
  party: string;
  note: string;
  amount: number;
  strong?: boolean;
  you?: boolean;
}) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="px-5 py-4 font-medium">{party}</td>
      <td className="px-5 py-4 text-muted-foreground">{note}</td>
      <td
        className={cn(
          "px-5 py-4 text-right font-serif text-2xl",
          you && "text-hold",
          strong && "text-foreground",
        )}
      >
        {usdExact(amount)}
      </td>
    </tr>
  );
}
