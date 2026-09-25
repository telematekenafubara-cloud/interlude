import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import {
  HeldStrip,
  HolderBank,
  SplitSheet,
  Thousand,
  WaiterBank,
} from "@/components/bank-sections";
import { HOLDER_SHARE, INTERLUDE_SHARE, VIEWER_SHARE, shareLabel } from "@/lib/rates";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bank")({ component: BankPage });

type Segment = "waiter" | "holder";

function BankPage() {
  const [seg, setSeg] = useState<Segment>("waiter");
  return (
    <div className="min-h-dvh bg-background pb-16 text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
          Interlude bank
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl">
          Interlude holds the money. The banks show what is left.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Advertisers pay Interlude to hold space for a Hold. Interlude receives
          that payment. What is left is credited here: {shareLabel(VIEWER_SHARE)}{" "}
          to Waiter Bank, {shareLabel(HOLDER_SHARE)} to Holder Bank. Interlude
          keeps {shareLabel(INTERLUDE_SHARE)}. Splits keep every decimal — no
          rounding until you cash out.
        </p>
        <SplitSheet />
        <HeldStrip />
        <div className="mt-8 flex flex-wrap gap-2">
          {(
            [
              ["waiter", "Waiter Bank"],
              ["holder", "Holder Bank"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setSeg(id)}
              className={cn(
                "h-11 rounded-md px-3 text-sm",
                seg === id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        {seg === "waiter" ? <WaiterBank /> : <HolderBank />}
        <Thousand highlight={seg} />
      </main>
      <SiteFooter />
    </div>
  );
}
