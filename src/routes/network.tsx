import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { adById } from "@/lib/ads";
import { useBankStore } from "@/lib/bank-store";
import {
  HOLD_BID_JSON,
  MOCK_BIDDERS,
  type MockBidder,
} from "@/lib/openrtb-hold";
import { settleOne, usd, usdFine } from "@/lib/rates";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/network")({ component: NetworkPage });

const STEPS = [
  {
    n: "01",
    title: "Become a company that can sell ads",
    body: "Form the entity. In Nigeria that means CAC, then ARCON before you charge anyone for advertising. Add NDPR rules for viewer IDs. Open Paystack or Flutterwave for payouts. No network will wire money to a prototype.",
  },
  {
    n: "02",
    title: "Name the inventory in industry language",
    body: "A Hold is skippable in-stream video: 6–15 seconds, skip allowed after 5, 100% in-view, sound off until unmute. That maps to IAB VAST 4 and OpenRTB video.skip. Buyers already know this slot. They do not know “AI thinking time” until you describe it that way.",
  },
  {
    n: "03",
    title: "Publishers wrap the wait they already have",
    body: "hold.js occupies the answer well. The app you ship calls Interlude.whileWaiting around askModel(). ChatGPT and Grok cannot be wrapped from the outside. Inventory only exists where a product installs the script.",
  },
  {
    n: "04",
    title: "Fill with house ads first",
    body: "Direct insertion orders from brands you know. No Google required. This demo already does that with a local catalog. House fill proves the format before any exchange will take you seriously.",
  },
  {
    n: "05",
    title: "Then speak VAST and OpenRTB",
    body: "Path A: a VAST tag from Google Ad Manager, played through IMA in the Hold player. Path B: Interlude sends a bid request (400ms budget — the model is already thinking) and DSPs bid skippable video. Path C stays direct IO. Most new formats start on C, add A, then B.",
  },
  {
    n: "06",
    title: "Measure what buyers pay for",
    body: "Fire VAST trackers: impression, first-quartile, skip, complete. Count only if the Hold was on-screen. Skip at 5 seconds is a cheaper CPM ($12) than a full 8-second complete ($22). That is the rate card, not a live auction yet.",
  },
  {
    n: "07",
    title: "Split the money",
    body: "Advertiser pays the CPM. Watcher 40%, Holder 35% (owns the chat), Interlude 25%. Until invoices exist, the Bank page is a ledger of play money.",
  },
  {
    n: "08",
    title: "Pay people for real",
    body: "Monthly from $25, in naira or dollars, through a licensed processor. Connect the Interlude ID from Bank so each impression knows who watched. Do not ask for a ChatGPT password. Do not claim this preview can settle cash.",
  },
] as const;

const PATHS = [
  {
    id: "house",
    name: "House + direct IO",
    status: "Live in this preview",
    detail:
      "Brands you sell yourself. Creative lives in the catalog. No bidstream. This is how every new format starts.",
  },
  {
    id: "vast",
    name: "VAST tag (Ad Manager / IMA)",
    status: "Not connected",
    detail:
      "Publisher or Interlude requests a VAST 4 tag. IMA plays the video in the Hold. Skip comes from the VAST skipoffset. Standard for YouTube-like inventory.",
  },
  {
    id: "rtb",
    name: "OpenRTB 2.6 exchange",
    status: "Not connected",
    detail:
      "Each wait is an auction. DSPs (The Trade Desk, DV360, Xandr) bid in ~400ms. Highest valid skippable video wins. Sample request below.",
  },
] as const;

function NetworkPage() {
  return (
    <div className="min-h-dvh bg-background pb-16 text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Hero />
        <Paths />
        <Auction />
        <Steps />
        <BidSpec />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section>
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
        Demand · protocol · payouts
      </p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl">
        How a Hold gets bought.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        This page is a map, not a live wire to Google. No DSP is bidding.
        The steps below are what Interlude would actually do to sell wait
        time as skippable video.
      </p>
      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-4">
        <FlowCell k="Brand" v="Pays a CPM" d="Through a DSP or a direct order." />
        <FlowCell k="Holder" v="Owns the well" d="35% — the chat or app." />
        <FlowCell k="Watcher" v="Banked 40%" d="Skip at 5s, or watch through." />
        <FlowCell k="Interlude" v="Runs the slot" d="25% — licence, Bank, demand." />
      </div>
    </section>
  );
}

function FlowCell({ k, v, d }: { k: string; v: string; d: string }) {
  return (
    <div className="bg-card px-5 py-5">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle">
        {k}
      </p>
      <p className="mt-2 font-serif text-2xl tracking-tight">{v}</p>
      <p className="mt-1 text-sm text-muted-foreground">{d}</p>
    </div>
  );
}

function Paths() {
  return (
    <section className="mt-20">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle">
        Three ways demand arrives
      </p>
      <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
        Start direct. Add a tag. Then an exchange.
      </h2>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {PATHS.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-hold">
              {p.status}
            </p>
            <h3 className="mt-2 font-serif text-2xl tracking-tight">{p.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {p.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Auction() {
  const credit = useBankStore((s) => s.credit);
  const [phase, setPhase] = useState<"idle" | "bidding" | "won" | "settled">(
    "idle",
  );
  const [winner, setWinner] = useState<MockBidder | null>(null);
  const [skipped, setSkipped] = useState<boolean | null>(null);

  const ranked = useMemo(
    () => [...MOCK_BIDDERS].sort((a, b) => b.cpm - a.cpm),
    [],
  );

  function run() {
    setSkipped(null);
    setWinner(null);
    setPhase("bidding");
    window.setTimeout(() => {
      const w = ranked[0];
      setWinner(w);
      setPhase("won");
    }, 720);
  }

  function settle(didSkip: boolean) {
    if (!winner) return;
    setSkipped(didSkip);
    credit({
      adId: winner.adId,
      skipped: didSkip,
      source: "network-auction",
    });
    setPhase("settled");
  }

  const pay = winner && skipped !== null ? settleOne(skipped) : null;
  const ad = winner ? adById(winner.adId) : null;

  return (
    <section className="mt-20">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle">
        Simulated auction
      </p>
      <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
        A wait goes up for bid.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        This uses house brands only. It is the shape of OpenRTB, not a
        connection to The Trade Desk or Google. Completing or skipping credits
        the Bank at the demo rate card.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {phase === "idle" && "No bid request yet."}
              {phase === "bidding" && "tmax 400ms · three seats responding"}
              {phase === "won" && winner && `Won · ${winner.name} · $${winner.cpm} CPM`}
              {phase === "settled" &&
                winner &&
                `${winner.name} · ${skipped ? "skipped at 5s" : "completed"}`}
            </p>
            <Button
              size="sm"
              variant={phase === "idle" || phase === "settled" ? "primary" : "outline"}
              onClick={run}
              disabled={phase === "bidding"}
            >
              {phase === "idle" ? "Run a Hold auction" : "Run again"}
            </Button>
          </div>

          <ul className="mt-5 space-y-2">
            {ranked.map((b) => {
              const active = phase !== "idle";
              const isWin = winner?.id === b.id && phase !== "bidding";
              return (
                <li
                  key={b.id}
                  className={cn(
                    "flex items-baseline justify-between gap-3 rounded-xl border px-4 py-3",
                    isWin
                      ? "border-hold/40 bg-muted"
                      : "border-border bg-background",
                    !active && "opacity-50",
                  )}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-foreground">{b.name}</p>
                    <p className="text-xs text-subtle">{b.seat}</p>
                  </div>
                  <p className="shrink-0 font-serif text-xl tabular-nums">
                    {active ? `$${b.cpm}` : "—"}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex min-h-56 flex-col justify-between rounded-2xl border border-border bg-card p-5 sm:p-6">
          {phase === "idle" || phase === "bidding" ? (
            <div>
              <p className="font-serif text-2xl tracking-tight">
                {phase === "bidding" ? "Asking demand…" : "Winner plays in the well."}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Highest CPM with a skippable video creative fills the thinking
                seconds. Floor is $12 CPM.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-hold">
                {ad?.category}
              </p>
              <p className="mt-1 font-serif text-3xl tracking-tight">{ad?.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{ad?.tagline}</p>
              {pay && skipped !== null && (
                <dl className="mt-5 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <dt className="text-subtle">Advertiser</dt>
                    <dd className="tabular-nums">{usdFine(pay.advertiser)}</dd>
                  </div>
                  <div>
                    <dt className="text-subtle">Interlude</dt>
                    <dd className="tabular-nums">{usdFine(pay.interlude)}</dd>
                  </div>
                  <div>
                    <dt className="text-subtle">Viewer</dt>
                    <dd className="tabular-nums">{usdFine(pay.viewer)}</dd>
                  </div>
                </dl>
              )}
            </div>
          )}

          {phase === "won" && (
            <div className="mt-6 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => settle(false)}>
                Complete 8s
              </Button>
              <Button size="sm" variant="outline" onClick={() => settle(true)}>
                Skip at 5s
              </Button>
            </div>
          )}
          {phase === "settled" && (
            <p className="mt-6 text-sm text-muted-foreground">
              Credited to{" "}
              <Link to="/bank" className="text-foreground underline-offset-4 hover:underline">
                Bank
              </Link>
              . {usd(25)} floor still applies. No naira moved.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mt-20">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle">
        Integration sequence
      </p>
      <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
        Eight steps. In this order.
      </h2>
      <ol className="mt-8 divide-y divide-border border-y border-border">
        {STEPS.map((step, i) => {
          const on = open === i;
          return (
            <li key={step.n}>
              <button
                type="button"
                className="flex w-full items-start gap-4 py-5 text-left"
                onClick={() => setOpen(on ? -1 : i)}
                aria-expanded={on}
              >
                <span className="w-10 shrink-0 font-serif text-xl text-hold">
                  {step.n}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-foreground">
                    {step.title}
                  </span>
                  {on && (
                    <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function BidSpec() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(HOLD_BID_JSON);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }
  return (
    <section className="mt-20">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle">
        OpenRTB 2.6 · video.skip
      </p>
      <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
        What a Hold looks like to a DSP.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        skip = 1, skipafter = 5, minduration 6, maxduration 15, playback
        method autoplay muted. tmax is 400ms because the model is already
        working — unlike a banner, you are not racing a page load.
      </p>
      <div className="relative mt-6 min-w-0 overflow-hidden rounded-2xl border border-border bg-muted">
        <Button
          size="sm"
          variant="outline"
          className="absolute right-3 top-3 z-10"
          onClick={copy}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
        <pre className="max-h-[28rem] overflow-auto p-5 pr-28 text-xs leading-relaxed text-hold sm:text-sm">
          <code>{HOLD_BID_JSON}</code>
        </pre>
      </div>
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
        Next: wrap your own wait on{" "}
        <Link to="/install" className="text-foreground underline-offset-4 hover:underline">
          Install
        </Link>
        . Earnings land in{" "}
        <Link to="/bank" className="text-foreground underline-offset-4 hover:underline">
          Bank
        </Link>
        .
      </p>
    </section>
  );
}
