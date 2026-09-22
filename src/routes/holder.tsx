import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUp, EyeOff } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import {
  Bubble,
  PhoneFrame,
  PhoneHeader,
} from "@/components/phone-frame";
import { HoldWell, useWaitSession } from "@/components/wait-session";
import {
  WAIT_SURFACES,
  type WaitSurface,
} from "@/lib/africa-waits";
import { HOLDER_DEFINITION } from "@/lib/definition";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/holder")({ component: HolderPage });

function HolderPage() {
  const [id, setId] = useState(WAIT_SURFACES[0].id);

  return (
    <div className="min-h-dvh bg-background pb-16 text-foreground">
      <SiteNav />
      <main className="mx-auto min-w-0 max-w-6xl px-4 py-6 sm:px-6 sm:py-12">
        <section>
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
            The Holder
          </p>
          <h1 className="mt-3 max-w-xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl">
            Who owns the wait.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {HOLDER_DEFINITION}
          </p>
        </section>

        <section className="mt-12 sm:mt-16">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
            Types of Holders
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
            Six kinds. Same Hold.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A Holder is classified by the well they already operate. Each of
            the six phones below is that product — send a line, and Holds keep
            playing until you skip.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {WAIT_SURFACES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setId(s.id);
                  document
                    .getElementById(`holder-${s.id}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "rounded-2xl p-4 text-left shadow-[0_0_0_1px_rgba(244,241,234,0.08)] transition-colors duration-200 sm:p-5",
                  s.id === id ? "bg-muted" : "bg-card hover:bg-muted/60",
                )}
              >
                <p className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle sm:text-[0.6875rem]">
                  {s.n} · {s.holderType}
                </p>
                <h3 className="mt-1.5 font-serif text-xl sm:text-2xl">{s.name}</h3>
                <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {s.holderLine}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
            Where Africa already waits
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl">
            Six phones. Same Hold.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Send a line in any of the six. Holds keep playing — Cinematic,
            Native, then Playable — until you skip. Same as Holdey.
          </p>
          <div className="mt-8 grid min-w-0 items-start gap-10 md:grid-cols-2">
            {WAIT_SURFACES.map((s) => (
              <div
                key={s.id}
                id={`holder-${s.id}`}
                className="min-w-0 scroll-mt-24"
              >
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle">
                  {s.n} · {s.holderType}
                </p>
                <p className="mt-1.5 font-serif text-2xl">{s.name}</p>
                <p className="mb-5 mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {s.hint}
                </p>
                <SurfacePhone surface={s} />
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Watching credits{" "}
            <Link
              to="/bank"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Bank
            </Link>
            .
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function SurfacePhone({ surface }: { surface: WaitSurface }) {
  const session = useWaitSession(surface);

  return (
    <PhoneFrame clock={surface.clock} carrier={surface.carrier}>
      <PhoneHeader
        title={
          surface.id === "forge"
            ? "Palms Shop"
            : surface.id === "civic"
              ? "Shore Connect"
              : surface.name
        }
        subtitle={
          surface.verified
            ? `${surface.channel} · ${surface.lastSeen}`
            : surface.lastSeen
        }
        initials={surface.initials}
        verified={surface.verified}
        onReset={session.reset}
        showReset={session.phase !== "idle"}
      />

      {surface.id === "shore" && session.phase === "idle" ? (
        <ShoreHome />
      ) : null}
      {surface.id === "prep" ? <PrepBanner /> : null}
      {surface.id === "forge" ? (
        <p className="bg-muted px-3 py-1.5 text-center text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle">
          Forge preview · customer phone
        </p>
      ) : null}
      {surface.id === "hall" ? (
        <p className="border-b border-border px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.14em] text-subtle">
          {surface.channel}
        </p>
      ) : null}

      {surface.id === "civic" && session.phase === "idle" ? (
        <CivicMenu onPick={session.start} />
      ) : (
        <>
          <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3 py-3">
            {surface.thread.map((line, i) => (
              <Bubble key={`${line.time}-${i}`} {...line} />
            ))}

            {session.phase !== "idle" ? (
              <Bubble
                mine
                from="You"
                text={session.prompt}
                time={surface.clock}
              />
            ) : null}

            {session.phase === "done" ? (
              <div className="answer-in">
                <Bubble
                  from={
                    surface.id === "prep"
                      ? "Amaka"
                      : surface.id === "forge"
                        ? "Palms Shop"
                        : surface.id === "thread"
                          ? "Palms Line"
                          : surface.name
                  }
                  text={surface.answer}
                  time={surface.clock}
                />
              </div>
            ) : null}
          </div>

          {session.phase === "hold" ? (
            <div className="shrink-0 px-3 pb-2">
              <div className="overflow-hidden rounded-xl">
                <HoldWell session={session} />
              </div>
              <p className="mt-1.5 px-1 text-[0.6875rem] text-subtle">
                {session.answerReady
                  ? "Reply is ready. Skip to read it."
                  : surface.id === "civic"
                    ? "Please wait…"
                    : surface.id === "shore"
                      ? "Checking name match…"
                      : "Typing…"}
              </p>
            </div>
          ) : null}

          {surface.id !== "civic" || session.phase !== "idle" ? (
            <form
              className="flex shrink-0 items-end gap-2 border-t border-border px-3 pb-5 pt-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (session.phase !== "hold") session.start();
              }}
            >
              <input
                value={session.prompt}
                onChange={(e) => session.setPrompt(e.target.value)}
                disabled={session.phase === "hold"}
                placeholder={surface.placeholder}
                className="h-11 min-w-0 flex-1 rounded-full bg-muted px-4 text-sm text-foreground outline-none ring-ring/70 focus:ring-2 disabled:opacity-50"
                aria-label="Message"
                suppressHydrationWarning
              />
              <button
                type="submit"
                disabled={session.phase === "hold"}
                aria-label="Send"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground disabled:opacity-40"
              >
                <ArrowUp className="size-4" strokeWidth={2} />
              </button>
            </form>
          ) : null}
        </>
      )}
    </PhoneFrame>
  );
}

function ShoreHome() {
  return (
    <div className="shrink-0 border-b border-border px-4 py-2.5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-subtle">Shore Current</p>
        <EyeOff className="size-3.5 text-subtle" strokeWidth={1.75} />
      </div>
      <p className="mt-0.5 font-serif text-2xl tabular-nums tracking-tight">
        ₦214,580.00
      </p>
      <div className="mt-2 flex gap-2">
        {["Send", "Bills", "Airtime"].map((l) => (
          <span
            key={l}
            className="rounded-full bg-muted px-3 py-1 text-xs text-foreground"
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function PrepBanner() {
  return (
    <div className="border-b border-border px-4 py-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-foreground">Physics · Paper 1</p>
        <p className="text-xs tabular-nums text-hold">38:12 left</p>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-[30%] bg-hold" />
      </div>
      <p className="mt-1 text-[0.625rem] text-subtle">12 / 40 · Amaka is in this thread</p>
    </div>
  );
}

function CivicMenu({ onPick }: { onPick: () => void }) {
  const items = [
    ["1", "Replace SIM"],
    ["2", "NIN / BVN help"],
    ["3", "Report a mast"],
    ["4", "Pay a bill"],
    ["0", "Back to *734#"],
  ] as const;
  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 py-4">
      <pre className="whitespace-pre-wrap font-sans text-[0.8125rem] leading-relaxed text-foreground">
        {`SHORE CONNECT
Welcome Tola
1. Replace SIM
2. NIN / BVN
3. Report mast
4. Pay bill
0. End`}
      </pre>
      <p className="mt-4 text-xs text-subtle">Reply with a number</p>
      <ul className="mt-3 space-y-2">
        {items.map(([n, label]) => (
          <li key={n}>
            <button
              type="button"
              disabled={n === "0"}
              onClick={n === "0" ? undefined : onPick}
              className="flex h-12 w-full items-center gap-3 rounded-xl bg-muted px-4 text-left text-sm text-foreground disabled:opacity-40"
            >
              <span className="font-medium tabular-nums text-hold">{n}</span>
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
