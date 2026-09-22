import type { ReactNode } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function PhoneFrame({
  clock,
  carrier,
  children,
}: {
  clock: string;
  carrier: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full min-w-0 max-w-[360px]">
      <div className="rounded-[32px] border border-border bg-card p-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.7)]">
        <div className="relative flex h-[min(36.5rem,calc(100dvh-8.5rem))] flex-col overflow-hidden rounded-[24px] bg-background">
          <StatusBar clock={clock} carrier={carrier} />
          {children}
          <div className="pointer-events-none absolute inset-x-0 bottom-1.5 flex justify-center">
            <div className="h-1 w-28 rounded-full bg-foreground/25" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ clock, carrier }: { clock: string; carrier: string }) {
  return (
    <div className="relative flex h-11 shrink-0 items-end justify-between px-5 pb-1.5">
      <p className="text-[0.8125rem] font-medium tabular-nums text-foreground">
        {clock}
      </p>
      <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-muted" />
      <div className="flex items-center gap-1.5 pb-px text-foreground">
        <span className="text-[0.625rem] font-medium tracking-wide">
          {carrier}
        </span>
        <span className="flex items-end gap-px" aria-hidden>
          <span className="h-1.5 w-0.5 rounded-sm bg-foreground/40" />
          <span className="h-2 w-0.5 rounded-sm bg-foreground/60" />
          <span className="h-2.5 w-0.5 rounded-sm bg-foreground/80" />
          <span className="h-3 w-0.5 rounded-sm bg-foreground" />
        </span>
        <span className="h-2.5 w-5 rounded-[2px] border border-foreground/80">
          <span className="ml-auto block h-full w-3/4 bg-foreground/80" />
        </span>
      </div>
    </div>
  );
}

export function PhoneHeader({
  title,
  subtitle,
  initials,
  verified,
  onReset,
  showReset,
}: {
  title: string;
  subtitle: string;
  initials: string;
  verified?: boolean;
  onReset: () => void;
  showReset: boolean;
}) {
  return (
    <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-3">
      <span className="grid size-11 place-items-center text-subtle">
        <ChevronLeft className="size-5" strokeWidth={1.75} />
      </span>
      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-[0.6875rem] font-medium text-foreground">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 truncate text-sm font-medium text-foreground">
          {title}
          {verified ? (
            <span className="grid size-3.5 place-items-center rounded-full bg-hold text-background">
              <Check className="size-2.5" strokeWidth={3} />
            </span>
          ) : null}
        </p>
        <p className="truncate text-xs text-subtle">{subtitle}</p>
      </div>
      {showReset ? (
        <button
          type="button"
          onClick={onReset}
          className="h-11 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          Reset
        </button>
      ) : null}
    </div>
  );
}

export function Bubble({
  mine,
  from,
  text,
  time,
}: {
  mine?: boolean;
  from: string;
  text: string;
  time: string;
}) {
  return (
    <div className={cn("flex", mine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[84%] rounded-2xl px-3 py-2",
          mine
            ? "rounded-br-md bg-accent text-accent-foreground"
            : "rounded-bl-md bg-muted text-foreground",
        )}
      >
        {!mine ? (
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-hold">
            {from}
          </p>
        ) : null}
        <p className="whitespace-pre-wrap text-[0.8125rem] leading-relaxed">
          {text}
        </p>
        <p
          className={cn(
            "mt-1 text-right text-[0.625rem] tabular-nums",
            mine ? "text-accent-foreground/60" : "text-subtle",
          )}
        >
          {time}
        </p>
      </div>
    </div>
  );
}
