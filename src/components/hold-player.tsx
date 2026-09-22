import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { SkipArrow } from "@/components/skip-arrow";
import { unlockHoldAudio } from "@/lib/hold-audio";
import { openWatch } from "@/lib/watch";
import { formatLabel, type Advertiser, type FormatId, type PlayableOption } from "@/lib/ads";
import { cn } from "@/lib/utils";

type HoldPlayerProps = {
  format: FormatId;
  ad: Advertiser;
  elapsedMs: number;
  holdMs: number;
  canSkip: boolean;
  exiting: boolean;
  reduceMotion: boolean;
  compact?: boolean;
  onSkip: () => void;
  onCta: () => void;
  onPick?: (option: PlayableOption) => void;
  pickedId?: string | null;
};

export function HoldPlayer({
  format,
  ad,
  elapsedMs,
  holdMs,
  canSkip,
  exiting,
  reduceMotion,
  compact = false,
  onSkip,
  onCta,
  onPick,
  pickedId,
}: HoldPlayerProps) {
  const remaining = Math.max(0, holdMs - elapsedMs);
  const pct = Math.min(100, (elapsedMs / holdMs) * 100);
  const remainingLabel = (remaining / 1000).toFixed(1);
  const sound = useAdSound(ad, reduceMotion);

  function openFull(e?: React.MouseEvent) {
    e?.stopPropagation();
    onCta();
    openWatch(ad.id);
  }

  if (format === "native") {
    return (
      <div
        className={cn(
          "cursor-pointer overflow-hidden rounded-xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]",
          exiting && "hold-exit",
        )}
        onClick={() => openFull()}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFull();
          }
        }}
        aria-label={`Watch ${ad.name} full on Interlude`}
      >
        <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
          <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-md outline outline-1 -outline-offset-1 outline-foreground/10 sm:h-28 sm:w-36">
            {sound.visual}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
                  {formatLabel(format)} hold · {ad.category}
                </p>
                <h3 className="mt-1 font-serif text-xl leading-tight text-foreground">
                  {ad.name}
                </h3>
              </div>
              <HoldControls
                remainingLabel={remainingLabel}
                hasSound={sound.hasSound}
                muted={sound.muted}
                onToggle={sound.toggle}
                canSkip={canSkip}
                onSkip={onSkip}
                compact
              />
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
              {ad.tagline}
            </p>
            <button
              type="button"
              onClick={(e) => openFull(e)}
              className="mt-3 inline-flex h-9 items-center gap-1 rounded-md bg-accent px-3 text-sm font-medium text-accent-foreground"
            >
              Watch full
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
        <HoldBar pct={pct} />
      </div>
    );
  }

  const pick =
    ad.playable?.options.find((o) => o.id === pickedId) ??
    ad.playable?.options[0];

  return (
    <div
      className={cn(
        "relative isolate cursor-pointer overflow-hidden rounded-xl bg-card",
        compact
          ? format === "playable"
            ? "min-h-[16.5rem] sm:min-h-[18.5rem]"
            : "h-48 sm:h-56"
          : format === "cinematic"
            ? "aspect-[16/10] sm:aspect-[16/9]"
            : "min-h-72 sm:min-h-80",
        exiting && "hold-exit",
      )}
      onClick={() => openFull()}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openFull();
        }
      }}
      aria-label={`Watch ${ad.name} full on Interlude`}
    >
      {sound.visual}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={
          format === "playable" && pick
            ? { backgroundColor: pick.wash }
            : undefined
        }
      />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between p-3 sm:p-4">
        <div className="pointer-events-none flex items-center gap-2">
          <span className="rounded-full bg-background/55 px-2 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-foreground backdrop-blur-sm">
            Ad · {formatLabel(format)}
          </span>
          <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-foreground/70">
            {ad.category}
          </span>
        </div>
        <HoldControls
          remainingLabel={remainingLabel}
          hasSound={sound.hasSound}
          muted={sound.muted}
          onToggle={sound.toggle}
          canSkip={canSkip}
          onSkip={onSkip}
          compact={compact}
        />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10",
          compact ? "p-3 pr-28 sm:p-4 sm:pr-32" : "p-4 sm:p-6",
        )}
      >
        <p
          className={cn(
            "font-serif leading-none tracking-tight text-foreground",
            compact ? "text-2xl" : "text-3xl sm:text-4xl",
          )}
        >
          {ad.name}
        </p>
        <p
          className={cn(
            "mt-2 text-foreground/80",
            compact
              ? "line-clamp-2 text-sm leading-snug"
              : "max-w-md text-sm leading-relaxed sm:text-base",
          )}
        >
          {format === "playable" && pick ? pick.line : ad.tagline}
        </p>

        {format === "playable" && ad.playable ? (
          <div className={cn("mt-3", compact && "mt-2")}>
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-foreground/60">
              {ad.playable.prompt}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {ad.playable.options.map((option) => {
                const selected = option.id === (pickedId ?? ad.playable!.options[0].id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPick?.(option);
                    }}
                    className={cn(
                      "pointer-events-auto rounded-md px-2.5 font-medium",
                      compact ? "h-8 text-xs" : "h-10 px-3 text-sm",
                      selected
                        ? "bg-accent text-accent-foreground"
                        : "bg-background/50 text-foreground backdrop-blur-sm",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={(e) => openFull(e)}
          className={cn(
            "pointer-events-auto inline-flex items-center gap-1.5 rounded-md bg-accent font-medium text-accent-foreground",
            compact
              ? "mt-3 h-9 px-3 text-sm"
              : "mt-4 h-11 px-4 text-sm",
          )}
        >
          Watch full
          <ArrowUpRight className="size-4" strokeWidth={1.75} />
        </button>
        {compact ? null : (
          <p className="mt-1.5 text-[0.625rem] uppercase tracking-[0.14em] text-foreground/55">
            Tap the Hold · extra pay if you stay
          </p>
        )}
      </div>

      <HoldBar pct={pct} overlay />
    </div>
  );
}

function useAdSound(ad: Advertiser, reduceMotion: boolean) {
  const ref = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(Boolean(ad.video) && !reduceMotion);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setUseVideo(Boolean(ad.video) && !reduceMotion);
    setMuted(true);
  }, [ad.id, ad.video, reduceMotion]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !useVideo) return;
    let cancelled = false;
    unlockHoldAudio();
    v.volume = 0.9;

    const start = () => {
      if (cancelled) return;
      v.muted = true;
      void v
        .play()
        .then(() => {
          if (cancelled) return;
          v.muted = false;
          setMuted(false);
        })
        .catch(() => {
          if (cancelled) return;
          v.muted = true;
          setMuted(true);
          void v.play().catch(() => undefined);
        });
    };

    if (v.readyState >= 2) start();
    else v.addEventListener("canplay", start, { once: true });

    return () => {
      cancelled = true;
      v.pause();
    };
  }, [ad.id, ad.video, useVideo]);

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    unlockHoldAudio();
    const v = ref.current;
    const next = !muted;
    setMuted(next);
    if (v) {
      v.muted = next;
      if (!next) void v.play();
    }
  }

  const video =
    useVideo && ad.video ? (
      <video
        ref={ref}
        key={ad.video}
        src={ad.video}
        poster={ad.still}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
        onError={() => setUseVideo(false)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    ) : null;

  const still = (
    <img
      src={ad.still}
      alt=""
      className={cn(
        "absolute inset-0 h-full w-full object-cover",
        !reduceMotion && "kenburns",
      )}
    />
  );

  return {
    muted,
    toggle,
    hasSound: Boolean(ad.video) && !reduceMotion,
    visual: video ?? still,
  };
}

function HoldControls({
  remainingLabel,
  hasSound,
  muted,
  onToggle,
  canSkip,
  onSkip,
  compact,
}: {
  remainingLabel: string;
  hasSound: boolean;
  muted: boolean;
  onToggle: (e: React.MouseEvent) => void;
  canSkip: boolean;
  onSkip: () => void;
  compact?: boolean;
}) {
  return (
    <div className="relative z-30 flex shrink-0 flex-col items-end gap-1.5">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "tabular-nums text-xs",
            compact ? "text-muted-foreground" : "text-foreground/80",
          )}
        >
          {remainingLabel}s
        </span>
        {hasSound ? <SoundToggle muted={muted} onToggle={onToggle} /> : null}
      </div>
      {canSkip ? (
        <SkipArrow
          onSkip={onSkip}
          className={compact ? "h-9 px-3 text-xs" : undefined}
        />
      ) : null}
    </div>
  );
}

function SoundToggle({
  muted,
  onToggle,
}: {
  muted: boolean;
  onToggle: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={muted ? "Unmute ad" : "Mute ad"}
      className="grid size-11 shrink-0 place-items-center rounded-full bg-background/70 text-foreground shadow-[0_0_0_1px_rgba(244,241,234,0.18)] backdrop-blur-sm"
    >
      {muted ? (
        <VolumeX className="size-4" strokeWidth={2} />
      ) : (
        <Volume2 className="size-4" strokeWidth={2} />
      )}
    </button>
  );
}

function HoldBar({ pct, overlay }: { pct: number; overlay?: boolean }) {
  return (
    <div
      className={cn(
        "h-0.5 w-full overflow-hidden bg-foreground/15",
        overlay && "absolute inset-x-0 bottom-0 z-20",
      )}
    >
      <div
        className="h-full origin-left bg-accent"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
