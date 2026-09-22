import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { LandingDemo } from "@/components/landing-demo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-dvh bg-background pb-16 text-foreground">
      <SiteNav />
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-3 sm:px-6">
          <img
            src="/og.jpg?v=16"
            alt="Interlude. Ask Holdey. A Hold plays. Then the answer."
            width={1200}
            height={630}
            className="aspect-[1200/630] w-full rounded-xl object-cover object-center"
          />
        </section>
        <section className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6 sm:pb-10">
          <div className="max-w-xl">
            <LandingDemo />
          </div>
        </section>
        <Hero />
        <Proof />
        <How />
        <Why />
        <Close />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
      <p className="rise-in text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
        A new ad format
      </p>
      <h1 className="rise-in stagger-1 mt-4 max-w-3xl font-serif text-[2.75rem] leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
        The wait is the inventory.
      </h1>
      <p className="rise-in stagger-2 mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
        People spend seconds staring at a thinking model. Interlude places a
        Hold in those seconds — timed, labeled, skippable — then the answer
        arrives.
      </p>
    </section>
  );
}

function Proof() {
  const items = [
    { k: "8s", v: "Each Hold" },
    { k: "5s", v: "Until the skip arrow" },
    { k: "1 well", v: "Nothing else on screen" },
    { k: "0 feed", v: "No scroll-past" },
  ];
  return (
    <section className="border-y border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.k} className="bg-background px-4 py-6 sm:px-6">
            <p className="font-serif text-3xl tabular-nums leading-none">{item.k}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function How() {
  const steps = [
    {
      n: "01",
      t: "A question is asked",
      d: "The model starts thinking. Attention is complete, unused, and already paid for by the wait.",
    },
    {
      n: "02",
      t: "A Hold occupies the well",
      d: "A labeled Hold fills the well. Skip arrow after five seconds. If you leave it, the next brand starts — the wait stays occupied.",
    },
    {
      n: "03",
      t: "The answer dissolves in",
      d: "The brand received a full look. The product did not get slower. The wait had somewhere to go.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
        How Interlude works
      </p>
      <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        Dead air, recaptured.
      </h2>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n}>
            <p className="font-serif text-2xl text-hold">{s.n}</p>
            <h3 className="mt-3 font-serif text-2xl leading-tight">{s.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {s.d}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Why() {
  const points = [
    {
      t: "The user already agreed to wait",
      d: "A Hold does not invent interruption. It occupies time that was going to pass anyway.",
    },
    {
      t: "There is no feed to scroll past",
      d: "One question. One well. Viewability is a property of the interface, not a bid.",
    },
    {
      t: "Intent is sitting in the composer",
      d: "They just typed a need. The brand is adjacent to a real question, not a vacant banner slot.",
    },
    {
      t: "The reward is on the other side",
      d: "The answer is the end card. Completion is structural. Skip exists so trust can.",
    },
  ];
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
            Why this inventory exists
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight">
            Attention was always in the spinner.
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.t}>
              <h3 className="font-medium text-foreground">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
          If your product makes people wait, you already have inventory.
        </p>
        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          Wrap the call you already make. A Hold plays in the well. After five
          seconds, a skip arrow. Then the answer arrives.
        </p>
        <p className="mt-4 text-sm text-subtle">
          Prototype by Telema Tekena Fubara · Built with Grok, September 2026
          <br />
          © 2026 Telema Tekena Fubara. All rights reserved.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/install">
              Add to your app
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/studio">Run a Hold</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
