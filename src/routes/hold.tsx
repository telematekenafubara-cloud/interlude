import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HoldStage } from "@/components/hold-stage";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { ADS, FORMATS, SKIP_AFTER_MS, SPOT_MS, type FormatId } from "@/lib/ads";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hold")({ component: HoldPage });

function HoldPage() {
  const [format, setFormat] = useState<FormatId>("cinematic");
  const spec = FORMATS.find((f) => f.id === format) ?? FORMATS[0];
  const adId = ADS[FORMATS.findIndex((f) => f.id === format)]?.id ?? ADS[0].id;

  return (
    <div className="min-h-dvh bg-background pb-16 text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
              The unit
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl">
              A Hold.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              A labeled, skippable brand film in the seconds an AI spends
              thinking. It is not a feed ad. It is not under the answer. It
              occupies the well, then the answer arrives.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Spec k={`${SKIP_AFTER_MS / 1000}s`} v="Skip arrow" />
              <Spec k={`${SPOT_MS / 1000}s`} v="Each spot" />
              <Spec k="Ad" v="Always labeled" />
            </dl>
            <p className="mt-8 text-sm text-muted-foreground">
              Lives in{" "}
              <Link
                to="/holder"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Holder
              </Link>
              . Credits{" "}
              <Link
                to="/bank"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Bank
              </Link>{" "}
              for the watcher and the Holder. Wrap it on{" "}
              <Link
                to="/install"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Install
              </Link>
              .
            </p>
          </div>
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id)}
                  className={cn(
                    "h-11 rounded-md px-3 text-sm",
                    f.id === format
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {f.name.replace(" Hold", "").replace(" Think", "").replace(" Pause", "")}
                </button>
              ))}
            </div>
            <HoldStage format={format} adId={adId} autoPlay />
            <p className="mt-3 text-sm text-muted-foreground">{spec.detail}</p>
          </div>
        </div>

        <section className="mt-20 border-t border-border pt-12">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
            Hold Formats
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
            The Hold family.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Three shapes. One rule: labeled, skippable, only in the wait. Pick a
            unit to play it in the well above.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {FORMATS.map((f, i) => {
              const ad = ADS[i];
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id)}
                  className={cn(
                    "group overflow-hidden rounded-2xl text-left shadow-[0_0_0_1px_rgba(244,241,234,0.08)]",
                    f.id === format ? "bg-muted" : "bg-card",
                  )}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={ad.still}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-background/55 px-2 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] backdrop-blur-sm">
                      {f.kicker}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-2xl">{f.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {f.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-10">
            <Button asChild>
              <Link to="/studio">Run a Hold — for advertisers</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-serif text-3xl tracking-tight">{k}</dt>
      <dd className="mt-1 text-sm text-muted-foreground">{v}</dd>
    </div>
  );
}
