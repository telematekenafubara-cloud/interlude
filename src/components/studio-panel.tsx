import type { ReactNode } from "react";
import { ADS, FORMATS, type FormatId } from "@/lib/ads";
import { useHoldStore } from "@/lib/hold-store";
import { cn } from "@/lib/utils";

export function StudioPanel() {
  const format = useHoldStore((s) => s.format);
  const adId = useHoldStore((s) => s.adId);
  const autoRotate = useHoldStore((s) => s.autoRotate);
  const metrics = useHoldStore((s) => s.metrics);
  const setFormat = useHoldStore((s) => s.setFormat);
  const setAdId = useHoldStore((s) => s.setAdId);
  const setAutoRotate = useHoldStore((s) => s.setAutoRotate);

  const completion =
    metrics.holds === 0
      ? "—"
      : `${Math.round((metrics.completed / metrics.holds) * 100)}%`;
  const avg =
    metrics.holds === 0
      ? "—"
      : `${(metrics.attentionMs / metrics.holds / 1000).toFixed(1)}s`;

  return (
    <aside className="flex min-h-0 flex-col gap-6 overflow-y-auto rounded-2xl bg-card p-4 shadow-[0_0_0_1px_rgba(244,241,234,0.08)] sm:p-5">
      <div>
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle">
          Interlude studio
        </p>
        <h2 className="mt-1 font-serif text-2xl leading-tight">Preview a Hold</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a format and a brand, then ask Holdey. The Hold plays in the
          wait. After five seconds, a skip arrow. If you leave it, the next
          Hold starts. Completed Holds credit your Bank.
        </p>
      </div>

      <Field label="Format">
        <div className="grid grid-cols-1 gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFormat(f.id)}
              className={cn(
                "rounded-lg px-3 py-2.5 text-left shadow-[0_0_0_1px_rgba(244,241,234,0.08)]",
                format === f.id
                  ? "bg-muted text-foreground"
                  : "bg-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="block text-sm font-medium text-foreground">
                {f.name}
              </span>
              <span className="mt-0.5 block text-xs leading-snug">
                {f.summary}
              </span>
            </button>
          ))}
        </div>
      </Field>

      <Field label="Brand">
        <div className="flex max-h-48 flex-wrap gap-2 overflow-y-auto pr-1">
          {ADS.map((ad) => (
            <button
              key={ad.id}
              type="button"
              onClick={() => {
                setAdId(ad.id);
                setAutoRotate(false);
              }}
              className={cn(
                "h-9 rounded-md px-3 text-sm",
                adId === ad.id && !autoRotate
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {ad.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAutoRotate(true)}
            className={cn(
              "h-9 rounded-md px-3 text-sm",
              autoRotate
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            Rotate
          </button>
        </div>
      </Field>

      <Field label="This session">
        <dl className="grid grid-cols-2 gap-3">
          <Stat k="Holds" v={String(metrics.holds)} />
          <Stat k="Completion" v={completion} />
          <Stat k="Avg. attention" v={avg} />
          <Stat k="Brand taps" v={String(metrics.cta)} />
        </dl>
      </Field>

      <p className="text-xs leading-relaxed text-subtle">
        Answers come from a live model. Holds never start until you ask, and
        they are always labeled. A skip ends the spot; the answer still arrives.
      </p>
      <FormatHint format={format} />
    </aside>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle">
        {label}
      </p>
      {children}
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-muted px-3 py-2.5">
      <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">
        {k}
      </dt>
      <dd className="mt-1 font-serif text-2xl tabular-nums leading-none">{v}</dd>
    </div>
  );
}

function FormatHint({ format }: { format: FormatId }) {
  const copy: Record<FormatId, string> = {
    cinematic: "The answer well becomes a short film, then dissolves.",
    native: "A sponsored card sits in the thread, then the answer follows.",
    playable: "Touch a note, finish, or season during the wait.",
  };
  return <p className="text-sm text-muted-foreground">{copy[format]}</p>;
}
