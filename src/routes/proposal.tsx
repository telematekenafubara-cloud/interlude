import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { INTERLUDE_DEFINITION, HOLDER_DEFINITION, WAIT_DEFINITION } from "@/lib/definition";
import { POST_EMAIL_BODY, POST_EMAIL_SUBJECT, POST_WHATSAPP, POST_X } from "@/lib/posts";
import { downloadProposalHtml, printProposal } from "@/lib/save-proposal";
import {
  COMPLETE_CPM,
  HOLDER_SHARE,
  INTERLUDE_SHARE,
  SKIP_CPM,
  VIEWER_SHARE,
  pct,
  settleMany,
  usd,
} from "@/lib/rates";

export const Route = createFileRoute("/proposal")({
  component: ProposalPage,
});

const ASK_USD = 80000;
const thousand = settleMany(1000, 0);

function ProposalPage() {
  return (
    <div className="min-h-dvh bg-background pb-16 text-foreground">
      <div className="print:hidden">
        <SiteNav />
      </div>
      <main
        id="proposal-doc"
        className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 print:max-w-none print:px-0 print:py-0"
      >
        <Cover />
        <Posted />
        <Section title="What Interlude is">
          <p className="text-base leading-relaxed text-foreground sm:text-lg">
            {INTERLUDE_DEFINITION}
          </p>
        </Section>
        <TheAsk />
        <Section title="The problem">
          <p>
            Every AI product already makes people wait. In Africa that wait is
            longer: reasoning models, WhatsApp business bots, image tools, and
            phone networks. Today the well is a spinner. Brands cannot buy it.
            Watchers are not paid. The seconds are wasted.
          </p>
          <p className="mt-4">
            ChatGPT and Google sell ads{" "}
            <em>under the answer</em>, not in the think. Kickbacks sells a
            one-line status inside US coding tools. Nobody is the licensed
            wait-time layer for African AI products that local companies
            actually control.
          </p>
        </Section>
        <Section title="The product">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>SDK.</strong> One wrap:{" "}
              <code className="text-hold">
                {"Interlude.whileWaiting(() => askModel())"}
              </code>
              . A Hold occupies the well.
            </li>
            <li>
              <strong>Wait.</strong> {WAIT_DEFINITION}
            </li>
            <li>
              <strong>Holder.</strong> {HOLDER_DEFINITION}
            </li>
            <li>
              <strong>Hold.</strong> 6–15s labeled video. Skip at 5s. Next ad
              if they do not skip. Answer always arrives.
            </li>
            <li>
              <strong>Bank.</strong> Watcher {pct(VIEWER_SHARE)} in naira. Holder
              (the chat owner) {pct(HOLDER_SHARE)}. Interlude{" "}
              {pct(INTERLUDE_SHARE)}. Payout via Paystack / Flutterwave.
            </li>
            <li>
              <strong>Network.</strong> House ads and direct insertion orders
              first. VAST and OpenRTB later. Not a live Google pipe today.
            </li>
          </ul>
        </Section>
        <Economics />
        <ExpectedRevenue />
        <Section title="How we own Nigeria and Africa">
          <p>
            We do not fight ChatGPT or Kickbacks on their home screens. We
            become the default Hold inside waits African products already
            operate.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            <li>
              Licence first: CAC, ARCON, NDPR. Vet every creative. US tools
              skip this; that is the moat.
            </li>
            <li>
              Direct naira insertion orders — MTN, banks, fintech, FMCG —
              before any exchange.
            </li>
            <li>
              SDK in WhatsApp Business AI bots, bank in-app assistants, school
              tools, local chatbot builders. Not a consumer destination app.
              See the six wells on{" "}
              <Link
                to="/holder"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Holder
              </Link>
              .
            </li>
            <li>
              Small, muted, skippable Holds. Pidgin and local languages. Cheap
              on data.
            </li>
            <li>
              Then Ghana, Kenya, South Africa with the same SDK and local
              licences. Not “launch Africa” as one slide.
            </li>
          </ol>
        </Section>
        <Section title="Competition">
          <p>
            Kickbacks / Idlen: text in a coding spinner; pay the developer.
            Aryel Loader Ads: video in the think well; pay the publisher.
            ChatGPT / Google: ads after the answer; never delay generation.
            Claude / Cursor: fill the wait with process and charge a
            subscription.
          </p>
          <p className="mt-4">
            Interlude is video + 5s skip + pay the watcher, only in apps that
            install the script. Closest ideas already exist abroad. This
            company is the African licence, naira Bank, and WhatsApp/bank
            distribution — not a claim to have invented waiting.
          </p>
        </Section>
        <Section title="Go to market">
          <p className="font-medium text-foreground">First 90 days</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Days 1–30: incorporate, ARCON, Paystack, five vetted house ads.</li>
            <li>Days 31–60: one live bot (SME or campus WhatsApp AI) on hold.js.</li>
            <li>Days 61–90: two paying brands on insertion orders; first naira test payout.</li>
          </ul>
          <p className="mt-4 font-medium text-foreground">Eighteen months</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Ten publisher installs (bots, bank or school assistants).</li>
            <li>Repeatable naira IO motion with Lagos agencies.</li>
            <li>Second market (Ghana or Kenya) only after Nigerian invoices exist.</li>
          </ul>
        </Section>
        <UseOfFunds />
        <Section title="Risks we will say out loud">
          <ul className="list-disc space-y-2 pl-5">
            <li>Pre-revenue. This document is not a traction slide.</li>
            <li>
              Fast models shrink short waits. We sell reasoning, agents, video
              gen, and African network delay — not 200ms chat.
            </li>
            <li>ARCON vetting can slow creative. We treat that as the product.</li>
            <li>
              Banks do not lend to prototypes. Equity or a grant is the honest
              first cheque; a facility comes after invoices.
            </li>
            <li>
              We cannot and will not inject ads into ChatGPT, Grok, Gemini, or
              Claude.
            </li>
          </ul>
        </Section>
        <Section title="What exists today">
          <p>
            A working prototype (September 2026, Lagos): Hold player, 5s skip,
            playlist, drop-in hold.js, Bank ledger, Network auction map, live
            model wait in Studio and Quill. Money on screen is a rate card, not
            cash.
          </p>
        </Section>
        <Section title="The founder">
          <p>
            Telema Tekena Fubara conceived this Interlude prototype and owns
            the output of this build as between him and Grok, under SpaceXAI
            consumer terms. The next step is a Nigerian company, not another
            demo.
          </p>
        </Section>
        <p className="mt-16 text-xs leading-relaxed text-subtle print:mt-8">
          Posted publicly 3 September 2026, Lagos. Not an offer of securities.
          Figures are a plan, not audited results. Expected Revenue is the same
          rate card at 50,000 Holders × 200 people/day — not invoices. Rate card:{" "}
          {usd(COMPLETE_CPM)} completed CPM, {usd(SKIP_CPM)} skip CPM, watcher{" "}
          {pct(VIEWER_SHARE)} / Holder {pct(HOLDER_SHARE)} / Interlude{" "}
          {pct(INTERLUDE_SHARE)}.
        </p>
        <p className="mt-8 border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground">
          Prototype by Telema Tekena Fubara. Built with Grok, September 2026.
          <br />
          © 2026 Telema Tekena Fubara. All rights reserved.
        </p>
      </main>
      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}

function Cover() {
  const [note, setNote] = useState("");
  return (
    <header className="border-b border-border pb-10">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
        Posted · September 2026 · Lagos
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl">
        Interlude
      </h1>
      <p className="mt-2 font-serif text-xl text-muted-foreground sm:text-2xl">
        Funding proposal
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Prepared for an investor or a bank.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-2 print:hidden" data-no-print>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            printProposal();
            setNote("If no print dialog opened, use Save — print is blocked in this preview.");
          }}
        >
          Print
        </Button>
        <Button
          type="button"
          size="sm"
          variant="primary"
          onClick={() => {
            const root = document.getElementById("proposal-doc");
            if (!root) return;
            downloadProposalHtml(root);
            setNote("Saved Interlude-funding-proposal.html");
          }}
        >
          Save
        </Button>
        {note ? <p className="basis-full text-xs text-muted-foreground">{note}</p> : null}
      </div>
    </header>
  );
}

function Posted() {
  return (
    <section className="border-b border-border py-10 print:hidden" data-no-print>
      <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">Post this</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Copy a note for X, WhatsApp, or email. I cannot publish to your
        accounts from here.
      </p>
      <div className="mt-6 space-y-4">
        <CopyBlock label="X" text={POST_X} />
        <CopyBlock label="WhatsApp" text={POST_WHATSAPP} />
        <CopyBlock
          label="Email"
          text={`Subject: ${POST_EMAIL_SUBJECT}\n\n${POST_EMAIL_BODY}`}
        />
      </div>
    </section>
  );
}

function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
          {label}
        </p>
        <Button
          size="sm"
          variant="outline"
          type="button"
          onClick={() => {
            void navigator.clipboard.writeText(text).then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1600);
            });
          }}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">
        {text}
      </pre>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-border py-10">
      <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </section>
  );
}

function TheAsk() {
  return (
    <Section title="The ask">
      <p>
        <span className="font-serif text-3xl text-foreground">{usd(ASK_USD)}</span>
        <span className="mt-1 block text-sm">
          Seed capital for 18 months. Equity or SAFE for investors. A bank
          should read this as a partnership brief, not a loan request, until
          there are invoices.
        </span>
      </p>
      <p className="mt-4">
        The cheque buys a licensed Nigerian entity, ARCON-ready creatives, one
        production SDK, ten publisher waits, and two paying brands — not a
        global ad exchange.
      </p>
    </Section>
  );
}

function Economics() {
  return (
    <Section title="Unit economics (demo rate card)">
      <p>
        Premium skippable video, 100% in-view. Not live demand. For 1,000
        completed Holds:
      </p>
      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-4">
        <Stat k="Advertiser pays" v={usd(thousand.advertiser)} />
        <Stat k="Holder" v={usd(thousand.holder)} />
        <Stat k="Watcher bank" v={usd(thousand.viewer)} />
        <Stat k="Interlude" v={usd(thousand.interlude)} />
      </div>
      <p className="mt-4">
        Skip at 5s is {usd(SKIP_CPM)} CPM. Complete is {usd(COMPLETE_CPM)} CPM.
        Split: watcher {pct(VIEWER_SHARE)}, Holder {pct(HOLDER_SHARE)} (owns
        the chat), Interlude {pct(INTERLUDE_SHARE)}. Scale in Africa is default
        SDK in local bots, not a billion ChatGPT impressions.
      </p>
    </Section>
  );
}

const HOLDERS = 50_000;
const DAU_PER_HOLDER = 200;
const PEOPLE_DAY = HOLDERS * DAU_PER_HOLDER;
const MONTH_DAYS = 30;
const TAX_RATE = 0.3;

type ScenarioPlan = {
  name: string;
  questions: number;
  skipRate: number;
  fill: number;
  holdsPerQuestion: number;
  opex: number;
};

const SCENARIOS: ScenarioPlan[] = [
  {
    name: "Quiet",
    questions: 1,
    skipRate: 0.7,
    fill: 0.8,
    holdsPerQuestion: 1,
    opex: 521_000,
  },
  {
    name: "Working",
    questions: 3,
    skipRate: 0.65,
    fill: 0.9,
    holdsPerQuestion: 1,
    opex: 1_416_000,
  },
  {
    name: "Hot",
    questions: 5,
    skipRate: 0.5,
    fill: 1,
    holdsPerQuestion: 1.3,
    opex: 3_343_000,
  },
];

function planScenario(s: ScenarioPlan) {
  const showsDay = Math.round(
    PEOPLE_DAY * s.questions * s.fill * s.holdsPerQuestion,
  );
  const showsMonth = showsDay * MONTH_DAYS;
  const settled = settleMany(showsMonth, s.skipRate);
  const op = settled.interlude - s.opex;
  const tax = op > 0 ? op * TAX_RATE : 0;
  return {
    ...s,
    showsDay,
    showsMonth,
    ...settled,
    op,
    tax,
    net: op - tax,
  };
}

function compactCount(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}bn`;
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return Number.isInteger(m) ? `${m}m` : `${m.toFixed(m >= 10 ? 0 : 1)}m`;
  }
  return n.toLocaleString("en-US");
}

function ExpectedRevenue() {
  const rows = SCENARIOS.map(planScenario);
  const working = rows[1]!;
  const packages = [5_000, 20_000, 50_000, 200_000];

  return (
    <Section title="Expected Revenue">
      <p>
        Plan at{" "}
        <strong className="text-foreground">
          {HOLDERS.toLocaleString("en-US")} Holders × {DAU_PER_HOLDER} people/day
        </strong>{" "}
        = {compactCount(PEOPLE_DAY)} people a day. Same rate card as above.
        Brands pay monthly for the shows we actually deliver. Interlude keeps{" "}
        {pct(INTERLUDE_SHARE)} of that as <strong className="text-foreground">gross</strong> —
        before running the company. Not invoices. Empty wells pay nothing.
      </p>

      <p className="mt-6 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
        Network (monthly)
      </p>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
              <th className="px-4 py-3 font-medium"> </th>
              {rows.map((r) => (
                <th key={r.name} className="px-4 py-3 text-right font-medium">
                  {r.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <SheetRow
              k="Questions / person / day"
              cells={rows.map((r) => String(r.questions))}
            />
            <SheetRow
              k="Skip / fill"
              cells={rows.map(
                (r) => `${Math.round(r.skipRate * 100)}% skip · ${Math.round(r.fill * 100)}% fill`,
              )}
            />
            <SheetRow
              k="Holds shown / month"
              cells={rows.map((r) => compactCount(r.showsMonth))}
            />
            <SheetRow
              k="Holds shown / day"
              cells={rows.map((r) => compactCount(r.showsDay))}
            />
            <SheetRow
              k="Advertisers pay"
              cells={rows.map((r) => usd(r.advertiser, 0))}
              strong
            />
            <SheetRow
              k={`Waiter Bank ${pct(VIEWER_SHARE)}`}
              cells={rows.map((r) => usd(r.viewer, 0))}
            />
            <SheetRow
              k={`Holder Bank ${pct(HOLDER_SHARE)}`}
              cells={rows.map((r) => usd(r.holder, 0))}
            />
            <SheetRow
              k={`Interlude ${pct(INTERLUDE_SHARE)} gross`}
              cells={rows.map((r) => usd(r.interlude, 0))}
              strong
            />
            <SheetRow
              k="Per Holder / month"
              cells={rows.map((r) => usd(r.holder / HOLDERS, 0))}
            />
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-4">
        <Stat k="Working · advertisers" v={usd(working.advertiser, 0)} />
        <Stat
          k={`Interlude ${pct(INTERLUDE_SHARE)} gross`}
          v={usd(working.interlude, 0)}
        />
        <Stat k="Holds shown / month" v={compactCount(working.showsMonth)} />
        <Stat k="Holds shown / day" v={compactCount(working.showsDay)} />
      </div>
      <p className="mt-4">
        Working month written out: advertisers pay{" "}
        <strong className="text-foreground">{usd(working.advertiser, 0)}</strong>
        . Waiters {usd(working.viewer, 0)} ({pct(VIEWER_SHARE)}). Holders{" "}
        {usd(working.holder, 0)} ({pct(HOLDER_SHARE)}).{" "}
        <strong className="text-foreground">
          Interlude {pct(INTERLUDE_SHARE)} gross {usd(working.interlude, 0)}
        </strong>
        . About {compactCount(working.showsMonth)} Holds shown. Each person sees
        about {Math.round(working.showsMonth / PEOPLE_DAY)} paid Holds that
        month. Per Holder stays in the same band (~{usd(working.holder / HOLDERS, 0)}
        ); Interlude’s cheque is the volume.
      </p>

      <p className="mt-8 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
        If Holds pay monthly — how many advertisers
      </p>
      <p className="mt-2">
        You do not need {compactCount(working.showsMonth)} different films. You
        need {usd(working.advertiser, 0)} of booked monthly spend, delivered as
        those shows. A live pool of about 200–500 creatives. Paying Holds at
        working volume:
      </p>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
              <th className="px-4 py-3 font-medium">They pay / month</th>
              <th className="px-4 py-3 text-right font-medium">Shows that package delivers</th>
              <th className="px-4 py-3 text-right font-medium">Advertisers to hit working</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => {
              const shows = Math.round(
                p / (working.advertiser / working.showsMonth),
              );
              const n = Math.round(working.advertiser / p);
              return (
                <tr key={p} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground">{usd(p, 0)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {compactCount(shows)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">
                    ~{n.toLocaleString("en-US")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        Practical mix for working: ~40–80 always-on brands covering about half
        the money, then ~400–700 mid and SME Holds. Unshown inventory is unpaid.
      </p>

      <p className="mt-8 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
        Interlude P&L — the {pct(INTERLUDE_SHARE)} only (monthly)
      </p>
      <p className="mt-2">
        Revenue share is cost of sales. What remains is Interlude’s gross.
        Then people, rails, and selling. Operating costs are a plan at this
        footprint, not a ledger.
      </p>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
              <th className="px-4 py-3 font-medium"> </th>
              {rows.map((r) => (
                <th key={r.name} className="px-4 py-3 text-right font-medium">
                  {r.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <SheetRow
              k={`Revenue (${pct(INTERLUDE_SHARE)} of Holds sold)`}
              cells={rows.map((r) => usd(r.interlude, 0))}
              strong
            />
            <SheetRow
              k="Cloud / auction / SDK"
              cells={[usd(40_000, 0), usd(120_000, 0), usd(280_000, 0)]}
            />
            <SheetRow
              k="Payout rails (~1.5% of 75%)"
              cells={[usd(41_000, 0), usd(141_000, 0), usd(373_000, 0)]}
            />
            <SheetRow
              k="Sales (to book the Holds)"
              cells={[usd(180_000, 0), usd(630_000, 0), usd(1_660_000, 0)]}
            />
            <SheetRow
              k="People (eng, success, finance)"
              cells={[usd(220_000, 0), usd(450_000, 0), usd(900_000, 0)]}
            />
            <SheetRow
              k="ARCON, legal, NDPR, audit"
              cells={[usd(20_000, 0), usd(40_000, 0), usd(70_000, 0)]}
            />
            <SheetRow
              k="Admin, software, office"
              cells={[usd(20_000, 0), usd(35_000, 0), usd(60_000, 0)]}
            />
            <SheetRow
              k="Operating cost"
              cells={rows.map((r) => usd(r.opex, 0))}
            />
            <SheetRow
              k="Operating profit"
              cells={rows.map((r) => usd(r.op, 0))}
              strong
            />
            <SheetRow
              k="Company income tax (30% plan)"
              cells={rows.map((r) => usd(r.tax, 0))}
            />
            <SheetRow
              k="Net profit"
              cells={rows.map((r) => usd(r.net, 0))}
              strong
            />
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-3">
        <Stat k={`Working · ${pct(INTERLUDE_SHARE)} gross`} v={usd(working.interlude, 0)} />
        <Stat k="Working · operating profit" v={usd(working.op, 0)} />
        <Stat k="Working · net (after tax)" v={usd(working.net, 0)} />
      </div>
      <p className="mt-4">
        Working month for Interlude itself: gross {usd(working.interlude, 0)}.
        Run the company −{usd(working.opex, 0)}. Operating profit{" "}
        {usd(working.op, 0)}. Tax {usd(working.tax, 0)}.{" "}
        <strong className="text-foreground">
          Interlude keeps about {usd(working.net, 0)}
        </strong>
        . That is about half of the {pct(INTERLUDE_SHARE)}, and about 10% of
        what advertisers paid. Sales is the line that can eat the take; direct
        naira IOs protect it. Half the wells sold → cut the {pct(INTERLUDE_SHARE)}{" "}
        in a straight line.
      </p>

      <p className="mt-8 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
        Working year (if every month is working)
      </p>
      <div className="mt-3 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <tbody>
            {[
              ["Advertisers pay", usd(working.advertiser * 12, 0)],
              [`Waiters ${pct(VIEWER_SHARE)}`, usd(working.viewer * 12, 0)],
              [`Holders ${pct(HOLDER_SHARE)}`, usd(working.holder * 12, 0)],
              [
                `Interlude ${pct(INTERLUDE_SHARE)} gross`,
                usd(working.interlude * 12, 0),
              ],
              ["Company opex", usd(working.opex * 12, 0)],
              ["Operating profit", usd(working.op * 12, 0)],
              ["Tax 30%", usd(working.tax * 12, 0)],
              ["Interlude net", usd(working.net * 12, 0)],
            ].map(([k, v]) => (
              <tr key={k} className="border-t border-border first:border-t-0">
                <td className="px-4 py-3 text-foreground">{k}</td>
                <td className="px-4 py-3 text-right tabular-nums text-hold">
                  {v}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        Africa’s digital ad market is a few billion dollars a year. Working
        volume here is a few percent of that — possible if Interlude is the
        default wait on African desks and some foreign brands buy in. Nigeria
        digital spend alone cannot clear the hot column. Demand, not boxes, is
        the limit.
      </p>
    </Section>
  );
}

function SheetRow({
  k,
  cells,
  strong,
}: {
  k: string;
  cells: string[];
  strong?: boolean;
}) {
  return (
    <tr className="border-t border-border">
      <th className="px-4 py-3 text-left font-normal text-foreground">{k}</th>
      {cells.map((c, i) => (
        <td
          key={`${k}-${i}`}
          className={`px-4 py-3 text-right tabular-nums ${strong ? "font-medium text-foreground" : ""}`}
        >
          {c}
        </td>
      ))}
    </tr>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-card px-4 py-5">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
        {k}
      </p>
      <p className="mt-2 font-serif text-2xl tabular-nums text-foreground">{v}</p>
    </div>
  );
}

function UseOfFunds() {
  const rows = [
    ["Legal & licence (CAC, ARCON, NDPR)", "15%"],
    ["Production SDK & Hold player", "30%"],
    ["First Holders (WhatsApp bots, bank/school)", "20%"],
    ["Lagos brand sales (direct IO)", "20%"],
    ["Payout rail, vetting ops, float", "15%"],
  ] as const;
  return (
    <Section title="Use of funds">
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k} className="border-t border-border first:border-t-0">
                <td className="px-4 py-3 text-foreground">{k}</td>
                <td className="px-4 py-3 text-right tabular-nums text-hold">
                  {v}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        No spend on injecting ads into frontier apps. No spend on claiming we
        were first on Earth.
      </p>
    </Section>
  );
}
