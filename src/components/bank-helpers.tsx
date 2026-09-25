import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adById } from "@/lib/ads";
import { useBankStore } from "@/lib/bank-store";
import {
  COMPLETE_CPM,
  FULL_CPM,
  HOLDER_SHARE,
  INTERLUDE_SHARE,
  SKIP_CPM,
  VIEWER_SHARE,
  settleOne,
  shareLabel,
  usdExact,
} from "@/lib/rates";
import { cn } from "@/lib/utils";

type Segment = "waiter" | "holder";

export function Stat({
  k,
  v,
  large,
}: {
  k: string;
  v: string;
  large?: boolean;
}) {
  return (
    <div className="bg-card px-5 py-6">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
        {k}
      </p>
      <p
        className={cn(
          "mt-2 font-serif tabular-nums leading-none tracking-tight",
          large ? "text-4xl sm:text-5xl" : "text-3xl",
        )}
      >
        {v}
      </p>
    </div>
  );
}

export function IdRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-6 flex min-w-0 flex-wrap items-center gap-2 rounded-md bg-card py-1 pl-3 pr-1 shadow-[0_0_0_1px_rgba(244,241,234,0.08)]">
      <span className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-subtle">
        {label}
      </span>
      <code className="text-sm text-foreground">{value}</code>
      <button
        type="button"
        className="inline-flex h-11 items-center gap-1.5 rounded-md px-3 text-sm text-muted-foreground hover:text-foreground"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
      >
        {copied ? (
          <Check className="size-3.5" strokeWidth={1.75} />
        ) : (
          <Copy className="size-3.5" strokeWidth={1.75} />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export function SplitSheet() {
  const rows = [
    { name: "Completed", cpm: COMPLETE_CPM, skip: false },
    { name: "Skipped at 5s", cpm: SKIP_CPM, skip: true },
    { name: "Full watch", cpm: FULL_CPM, skip: "full" as const },
  ];
  return (
    <section className="mt-10 overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]">
      <div className="border-b border-border px-5 py-5">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
          Actual split · every decimal
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          CPM is per 1,000 Holds. One Hold is CPM ÷ 1,000. Then{" "}
          {VIEWER_SHARE.toFixed(2)} Waiter, {HOLDER_SHARE.toFixed(2)} Holder,{" "}
          {INTERLUDE_SHARE.toFixed(2)} Interlude. Nothing is rounded in the
          credit.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
            <tr className="border-b border-border">
              <th className="px-5 py-3 font-medium">Event</th>
              <th className="px-5 py-3 text-right font-medium">CPM</th>
              <th className="px-5 py-3 text-right font-medium">Per Hold</th>
              <th className="px-5 py-3 text-right font-medium">
                Waiter {VIEWER_SHARE.toFixed(2)}
              </th>
              <th className="px-5 py-3 text-right font-medium">
                Holder {HOLDER_SHARE.toFixed(2)}
              </th>
              <th className="px-5 py-3 text-right font-medium">
                Interlude {INTERLUDE_SHARE.toFixed(2)}
              </th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {rows.map((row) => {
              const pay =
                row.skip === "full"
                  ? {
                      advertiser: FULL_CPM / 1000,
                      viewer: (FULL_CPM / 1000) * VIEWER_SHARE,
                      holder: (FULL_CPM / 1000) * HOLDER_SHARE,
                      interlude: (FULL_CPM / 1000) * INTERLUDE_SHARE,
                    }
                  : settleOne(row.skip);
              return (
                <tr key={row.name} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-medium">{row.name}</td>
                  <td className="px-5 py-4 text-right">{usdExact(row.cpm)}</td>
                  <td className="px-5 py-4 text-right text-foreground">
                    {usdExact(pay.advertiser)}
                    <span className="mt-0.5 block text-[0.625rem] uppercase tracking-[0.12em] text-subtle">
                      {usdExact(row.cpm)} ÷ 1,000
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {usdExact(pay.viewer)}
                    <span className="mt-0.5 block text-[0.625rem] uppercase tracking-[0.12em] text-subtle">
                      {usdExact(pay.advertiser)} × {VIEWER_SHARE.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {usdExact(pay.holder)}
                    <span className="mt-0.5 block text-[0.625rem] uppercase tracking-[0.12em] text-subtle">
                      {usdExact(pay.advertiser)} × {HOLDER_SHARE.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {usdExact(pay.interlude)}
                    <span className="mt-0.5 block text-[0.625rem] uppercase tracking-[0.12em] text-subtle">
                      {usdExact(pay.advertiser)} × {INTERLUDE_SHARE.toFixed(2)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function HeldStrip() {
  const totals = useBankStore((s) => s.totals);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const held = mounted ? totals.advertiser : 0;
  return (
    <div className="mt-10 overflow-hidden rounded-2xl bg-border">
      <div className="bg-card px-5 py-5">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
          Advertisers paid · Interlude holds
        </p>
        <p className="mt-2 font-serif text-4xl tabular-nums tracking-tight sm:text-5xl">
          {usdExact(held)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Paid to reserve Hold space. Not in either bank until it is split.
        </p>
      </div>
      <div className="grid gap-px sm:grid-cols-3">
        <Stat
          k={`Waiter Bank · ${shareLabel(VIEWER_SHARE)}`}
          v={usdExact(mounted ? totals.viewer : 0)}
        />
        <Stat
          k={`Holder Bank · ${shareLabel(HOLDER_SHARE)}`}
          v={usdExact(mounted ? totals.holder ?? 0 : 0)}
        />
        <Stat
          k={`Interlude keeps · ${shareLabel(INTERLUDE_SHARE)}`}
          v={usdExact(mounted ? totals.interlude : 0)}
        />
      </div>
    </div>
  );
}

export function ConnectWaiter() {
  const connected = useBankStore((s) => s.connected);
  const setConnected = useBankStore((s) => s.setConnected);
  const apps = [
    {
      id: "aether",
      name: "Holdey",
      line: "Ask. A Hold plays. Waiter Bank is credited.",
      to: "/studio" as const,
    },
    {
      id: "quill",
      name: "Quill",
      line: "The sample app on Install. Uses hold.js.",
      to: "/install" as const,
    },
    {
      id: "holdjs",
      name: "Any wait with hold.js",
      line: "Interlude.identify(waiterId) before whileWaiting.",
      to: "/install" as const,
    },
  ];
  return (
    <ul className="mt-8 grid gap-3">
      {apps.map((app) => (
        <li
          key={app.id}
          className="flex flex-col gap-3 rounded-xl bg-card p-4 shadow-[0_0_0_1px_rgba(244,241,234,0.08)] sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-medium">{app.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{app.line}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setConnected(app.id, !connected[app.id])}
              className={cn(
                "h-11 rounded-md px-3 text-sm",
                connected[app.id]
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {connected[app.id] ? "Connected" : "Connect"}
            </button>
            <Button asChild variant="outline" size="sm">
              <Link to={app.to}>Open</Link>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ConnectHolder() {
  return (
    <div className="mt-8 rounded-xl bg-card p-5 shadow-[0_0_0_1px_rgba(244,241,234,0.08)]">
      <p className="font-medium">Claim the well</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        You cannot connect ChatGPT, Claude, or Gemini. You can wrap a product
        you ship. Set the Holder, then wrap the wait.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-md bg-muted p-4 text-[0.8125rem] text-foreground">
        <code>{`Interlude.holder("your-app");
await Interlude.whileWaiting(well, () => askModel(prompt));`}</code>
      </pre>
      <Button asChild className="mt-4" size="sm">
        <Link to="/install">Open Install</Link>
      </Button>
    </div>
  );
}

export function Ledger({ kind }: { kind: Segment }) {
  const ledger = useBankStore((s) => s.ledger);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const per =
    kind === "waiter"
      ? (COMPLETE_CPM / 1000) * VIEWER_SHARE
      : (COMPLETE_CPM / 1000) * HOLDER_SHARE;
  return (
    <section className="mt-12">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
        {kind === "waiter" ? "Waiter ledger" : "Holder ledger"}
      </p>
      <h3 className="mt-2 font-serif text-2xl">
        {kind === "waiter" ? "Holds you watched" : "Holds you served"}
      </h3>
      {ledger.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Play a Hold on Holder, Holdey, or Install. Each completed spot adds{" "}
          {usdExact(per)} to this bank.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]">
          {ledger.slice(0, 12).map((row) => {
            const ad = adById(row.adId);
            const amount = kind === "waiter" ? row.viewer : row.holder;
            return (
              <li
                key={row.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{ad.name}</p>
                  <p className="text-xs text-subtle">
                    {row.skipped ? "Skipped at 5s" : "Completed"} · {row.source}
                  </p>
                  <p className="mt-1 text-[0.6875rem] tabular-nums text-muted-foreground">
                    {usdExact(row.advertiser)} × {VIEWER_SHARE.toFixed(2)} /{" "}
                    {HOLDER_SHARE.toFixed(2)} / {INTERLUDE_SHARE.toFixed(2)} ={" "}
                    {usdExact(row.viewer)} waiter · {usdExact(row.holder)} holder
                    · {usdExact(row.interlude)} Interlude
                  </p>
                </div>
                <p className="shrink-0 font-serif text-lg text-hold">
                  +{usdExact(amount ?? 0)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
