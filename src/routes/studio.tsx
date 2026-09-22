import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AetherChat } from "@/components/aether-chat";
import { HoldStage } from "@/components/hold-stage";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { ADS, type Advertiser } from "@/lib/ads";
import { draftToAd, stills, type HoldDraft } from "@/lib/hold-brief";
import { usePlacedStore } from "@/lib/placed-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio")({ component: Studio });

type Tab = "sample" | "place" | "aether";

function Studio() {
  const [tab, setTab] = useState<Tab>("sample");
  const [draft, setDraft] = useState<HoldDraft>({
    name: "",
    category: "",
    tagline: "",
    body: "",
    cta: "",
    still: ADS[0]?.still ?? "/ads/northline.jpg",
  });
  const placed = usePlacedStore((s) => s.holds);
  const place = usePlacedStore((s) => s.place);

  function commit(d: HoldDraft, via: string) {
    if (!d.name.trim() || !d.tagline.trim() || !d.cta.trim()) {
      toast("Need brand, tagline, and CTA.");
      return;
    }
    const id = `pl_${Date.now().toString(36)}`;
    const ad = draftToAd({ ...d, still: d.still || ADS[0]?.still }, id);
    place(ad);
    toast(`${ad.name} is on Interlude`, {
      description: `Placed via ${via}. Demo IO — not live billing.`,
    });
    setTab("sample");
  }

  return (
    <div className="min-h-dvh bg-background pb-16 text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
          For advertisers
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl">
          Run a Hold.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Place a finished film, or let Holdey write one. Samples play here.
          This is a demo insertion — not a live buy.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {(
            [
              ["sample", "Samples"],
              ["place", "Place a Hold"],
              ["aether", "Generate with Holdey"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "h-11 rounded-md px-3 text-sm",
                tab === id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "sample" ? (
          <SampleGrid extra={placed} />
        ) : null}
        {tab === "place" ? (
          <PlaceForm
            draft={draft}
            setDraft={setDraft}
            onPlace={() => commit(draft, "upload")}
          />
        ) : null}
        {tab === "aether" ? (
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="h-[28rem] sm:h-[32rem]">
              <AetherChat
                live
                compact
                kind="hold"
                onHoldSpec={(spec) => setDraft((d) => ({ ...d, ...spec }))}
              />
            </div>
            <PlaceForm
              draft={draft}
              setDraft={setDraft}
              onPlace={() => commit(draft, "Holdey")}
              fromAether
            />
          </div>
        ) : null}

        <p className="mt-12 text-sm text-muted-foreground">
          Watchers see Holds on{" "}
          <Link
            to="/hold"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Hold
          </Link>
          . Holders install on{" "}
          <Link
            to="/install"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Install
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

function SampleGrid({ extra }: { extra: Advertiser[] }) {
  const list = [...extra, ...ADS];
  const [playId, setPlayId] = useState(list[0]?.id ?? ADS[0].id);
  const current = list.find((a) => a.id === playId) ?? ADS[0];

  return (
    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <HoldStage format="cinematic" adId={current.id} autoPlay source="studio" />
      <ul className="grid max-h-[min(36rem,70dvh)] gap-2 overflow-y-auto sm:grid-cols-2 lg:grid-cols-1">
        {list.map((ad) => (
          <li key={ad.id}>
            <button
              type="button"
              onClick={() => setPlayId(ad.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl p-3 text-left shadow-[0_0_0_1px_rgba(244,241,234,0.08)]",
                playId === ad.id ? "bg-muted" : "bg-card",
              )}
            >
              <img
                src={ad.still}
                alt=""
                className="h-14 w-20 shrink-0 rounded-md object-cover"
              />
              <span className="min-w-0">
                <span className="block truncate font-medium">{ad.name}</span>
                <span className="block truncate text-xs text-subtle">
                  {ad.tagline}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlaceForm({
  draft,
  setDraft,
  onPlace,
  fromAether,
}: {
  draft: HoldDraft;
  setDraft: (d: HoldDraft | ((p: HoldDraft) => HoldDraft)) => void;
  onPlace: () => void;
  fromAether?: boolean;
}) {
  const fields: { key: keyof HoldDraft; label: string }[] = [
    { key: "name", label: "Brand" },
    { key: "category", label: "Category" },
    { key: "tagline", label: "Tagline" },
    { key: "body", label: "Body" },
    { key: "cta", label: "CTA" },
  ];
  return (
    <form
      className="mt-10 space-y-4 rounded-2xl bg-card p-5 shadow-[0_0_0_1px_rgba(244,241,234,0.08)]"
      onSubmit={(e) => {
        e.preventDefault();
        onPlace();
      }}
    >
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
        {fromAether ? "Holdey draft" : "Already made"}
      </p>
      {fields.map((f) => (
        <label key={f.key} className="block">
          <span className="text-xs text-subtle">{f.label}</span>
          <input
            value={draft[f.key]}
            onChange={(e) =>
              setDraft((d) => ({ ...d, [f.key]: e.target.value }))
            }
            className="mt-1 h-11 w-full rounded-md bg-muted px-3 text-sm outline-none"
          />
        </label>
      ))}
      <p className="text-xs text-subtle">Still — pick a house frame</p>
      <div className="flex flex-wrap gap-2">
        {stills().map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setDraft((d) => ({ ...d, still: s.src }))}
            className={cn(
              "overflow-hidden rounded-md",
              draft.still === s.src && "ring-2 ring-hold",
            )}
          >
            <img src={s.src} alt={s.name} className="h-14 w-20 object-cover" />
          </button>
        ))}
      </div>
      <Button type="submit">Place this Hold</Button>
    </form>
  );
}
