import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, ImagePlus, X } from "lucide-react";
import { AetherMark } from "@/components/marks";
import { HoldPlayer } from "@/components/hold-player";
import { ModelPicker } from "@/components/model-picker";
import { askGrok, mediaIntent, shouldAnimateStill, wantsImageEdit, wantsVideo } from "@/lib/ask-grok";
import {
  SKIP_AFTER_MS,
  SPOT_MS,
  SUGGESTED_PROMPTS,
  adById,
  formatLabel,
  nextAdId,
  nextFormat,
  randomAdId,
  type FormatId,
  type PlayableOption,
} from "@/lib/ads";
import { HOLD_BRIEFS, parseHold, type HoldDraft } from "@/lib/hold-brief";
import { useAiRouting } from "@/lib/ai-routing";
import { answerProduct } from "@/lib/help";
import { unlockHoldAudio } from "@/lib/hold-audio";
import { useHoldStore } from "@/lib/hold-store";
import { cn } from "@/lib/utils";

type Role = "user" | "assistant";
type ChatMessage = {
  id: string;
  role: Role;
  text: string;
  imageUrl?: string;
  videoUrl?: string;
};

type Phase = "idle" | "holding" | "exiting" | "waiting";

const DEMO_PROMPT = "Write a two-sentence toast for a friend’s new studio.";
const DEMO_ANSWER =
  "To the room you’re about to fill — may the work be loud and the door stay unlocked for the people who make you braver. Here’s to the studio, and to finally having a place that can hold all of it.";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

async function stillFromFile(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Need a picture.");
  }
  const blobUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const node = new Image();
      node.onload = () => resolve(node);
      node.onerror = () => reject(new Error("Could not read that picture."));
      node.src = blobUrl;
    });
    const max = 1280;
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not read that picture.");
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 0.82);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduce;
}

export function AetherChat({
  live = true,
  compact = false,
  demo = false,
  kind = "chat",
  onHoldSpec,
  onClose,
  className,
}: {
  live?: boolean;
  compact?: boolean;
  demo?: boolean;
  kind?: "chat" | "hold" | "help";
  onHoldSpec?: (draft: HoldDraft) => void;
  onClose?: () => void;
  className?: string;
}) {
  const adId = useHoldStore((s) => s.adId);
  const autoRotate = useHoldStore((s) => s.autoRotate);
  const setAdId = useHoldStore((s) => s.setAdId);
  const recordHold = useHoldStore((s) => s.recordHold);
  const routing = useAiRouting((s) => s.routing);

  const reduceMotion = useReducedMotion();
  const [prompt, setPrompt] = useState("");
  const [still, setStill] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [activeAdId, setActiveAdId] = useState(adId);
  const [activeFormat, setActiveFormat] = useState<FormatId>("cinematic");
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [ctaHit, setCtaHit] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [answerReady, setAnswerReady] = useState(false);
  const [impression, setImpression] = useState(0);
  const [session, setSession] = useState(0);
  const pendingRef = useRef<Promise<{
    text: string;
    error?: string;
    imageUrl?: string;
    videoUrl?: string;
  }> | null>(null);
  const workReadyRef = useRef(false);
  const workResultRef = useRef<{
    text: string;
    error?: string;
    imageUrl?: string;
    videoUrl?: string;
  } | null>(null);
  const startedRef = useRef(0);
  const skipRef = useRef(false);
  const ctaRef = useRef(false);
  const pickRef = useRef(false);
  const sessionDoneRef = useRef(false);
  const genRef = useRef(0);
  const activeAdIdRef = useRef(adId);
  const listRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const busyRef = useRef(false);
  const activeFormatRef = useRef<FormatId>("cinematic");

  const ad = adById(activeAdId);
  const holdMs = SPOT_MS;
  const canSkip = elapsedMs >= SKIP_AFTER_MS;
  activeAdIdRef.current = activeAdId;

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, phase, impression]);

  useEffect(() => {
    if (phase !== "holding") return;
    const gen = genRef.current;
    const t0 = performance.now();
    startedRef.current = t0;
    let raf = 0;
    let closed = false;
    const loop = (now: number) => {
      if (closed || gen !== genRef.current) return;
      const elapsed = now - t0;
      setElapsedMs(elapsed);
      if (elapsed >= SPOT_MS) {
        closed = true;
        handleSpotEnd(gen);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      closed = true;
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, impression]);

  function recordSpot(skipped: boolean) {
    recordHold({
      completed: !skipped,
      skipped,
      attentionMs: Math.min(SPOT_MS, performance.now() - startedRef.current),
      cta: ctaRef.current,
      playablePick: pickRef.current,
      adId: activeAdIdRef.current,
      source: kind === "help" ? "aether-help" : demo ? "aether-demo" : "aether",
    });
  }

  function handleSpotEnd(gen: number) {
    if (gen !== genRef.current) return;
    if (skipRef.current || sessionDoneRef.current) return;
    recordSpot(false);
    // Ads keep playing until skip — even if the answer is already ready.
    const nextFmt = nextFormat(activeFormatRef.current);
    const next = nextAdId(activeAdIdRef.current, nextFmt);
    activeFormatRef.current = nextFmt;
    activeAdIdRef.current = next;
    if (live && autoRotate) setAdId(next);
    setActiveFormat(nextFmt);
    setActiveAdId(next);
    setPickedId(null);
    setCtaHit(false);
    setElapsedMs(0);
    ctaRef.current = false;
    pickRef.current = false;
    setImpression((n) => n + 1);
  }

  async function beginHold(text: string, attached?: string | null) {
    let q = text.trim();
    const lastStill = [...messages]
      .reverse()
      .find((m) => m.imageUrl)?.imageUrl;
    const attachedNow = attached || still;
    const reuseStill =
      Boolean(lastStill) &&
      (wantsVideo(q) || wantsImageEdit(q) || shouldAnimateStill(q, Boolean(attachedNow)));
    const source = attachedNow || (reuseStill ? lastStill : undefined);
    if (!q && source) q = "Turn this image into a short video.";
    if (!q || busyRef.current) return;
    busyRef.current = true;
    unlockHoldAudio();
    const gen = ++genRef.current;
    const servingId = live && autoRotate ? randomAdId() : adId;
    if (live && autoRotate) setAdId(servingId);
    activeAdIdRef.current = servingId;
    activeFormatRef.current = "cinematic";
    setActiveAdId(servingId);
    setActiveFormat("cinematic");
    setPickedId(null);
    setCtaHit(false);
    setSkipped(false);
    setAnswerReady(false);
    setElapsedMs(0);
    skipRef.current = false;
    ctaRef.current = false;
    pickRef.current = false;
    sessionDoneRef.current = false;
    workReadyRef.current = false;
    workResultRef.current = null;
    setSession((n) => n + 1);
    setImpression((n) => n + 1);
    setMessages((m) => [
      ...m,
      { id: uid(), role: "user", text: q, imageUrl: attachedNow || undefined },
    ]);
    setPrompt("");
    setStill(null);
    setPhase("holding");

    const local =
      kind === "hold" ||
      mediaIntent(q) ||
      wantsVideo(q) ||
      wantsImageEdit(q)
        ? null
        : answerProduct(q);
    const history = messages
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.text }));
    const provider =
      kind === "hold"
        ? routing.hold
        : mediaIntent(q) === "image" || wantsImageEdit(q)
          ? routing.image
          : mediaIntent(q) === "video" ||
              wantsVideo(q) ||
              shouldAnimateStill(q, Boolean(source))
            ? routing.video
            : routing.chat;
    const work =
      local
        ? Promise.resolve({ text: local })
        : live
          ? askGrok({
              data: {
                prompt: q,
                kind: kind === "hold" ? "hold" : "chat",
                history,
                imageUrl: source,
                provider,
              },
            })
              .then((res) =>
                res.ok
                  ? {
                      text: res.text,
                      imageUrl: res.imageUrl,
                      videoUrl: res.videoUrl,
                    }
                  : { text: "", error: res.error },
              )
              .catch(() => ({
                text: "",
                error: "Holdey could not answer.",
              }))
          : new Promise<{ text: string }>((resolve) => {
              window.setTimeout(
                () => resolve({ text: DEMO_ANSWER }),
                12000,
              );
            });

    pendingRef.current = work;
    work.then((result) => {
      if (gen !== genRef.current) return;
      workReadyRef.current = true;
      workResultRef.current = result;
      setAnswerReady(true);
    });
  }

  async function finishHold(
    gen: number,
    text: string,
    error?: string,
    media?: { imageUrl?: string; videoUrl?: string },
  ) {
    if (gen !== genRef.current) return;
    if (sessionDoneRef.current) return;
    sessionDoneRef.current = true;
    const reply =
      text ||
      error ||
      "The model didn’t return an answer. The Hold still ran — try another question.";
    setMessages((m) => [
      ...m,
      {
        id: uid(),
        role: "assistant",
        text: reply,
        imageUrl: media?.imageUrl,
        videoUrl: media?.videoUrl,
      },
    ]);
    if (kind === "hold" && onHoldSpec && text) {
      const spec = parseHold(text);
      if (spec) onHoldSpec(spec);
    }
    if (skipRef.current) {
      setPhase("idle");
    } else {
      setPhase("exiting");
      await new Promise((r) => setTimeout(r, reduceMotion ? 0 : 380));
      if (gen !== genRef.current) return;
      setPhase("idle");
    }
    pendingRef.current = null;
    busyRef.current = false;
  }

  async function onSkip() {
    if (!canSkip) return;
    const gen = genRef.current;
    skipRef.current = true;
    setSkipped(true);
    recordSpot(true);
    if (workReadyRef.current && workResultRef.current) {
      await finishHold(
        gen,
        workResultRef.current.text,
        workResultRef.current.error,
        {
          imageUrl: workResultRef.current.imageUrl,
          videoUrl: workResultRef.current.videoUrl,
        },
      );
      return;
    }
    const pending = pendingRef.current;
    setPhase("waiting");
    if (!pending) return;
    const result = await pending;
    if (gen !== genRef.current) return;
    await finishHold(gen, result.text, result.error, {
      imageUrl: result.imageUrl,
      videoUrl: result.videoUrl,
    });
  }

  function onCta() {
    ctaRef.current = true;
    setCtaHit(true);
  }

  function onPick(option: PlayableOption) {
    pickRef.current = true;
    setPickedId(option.id);
  }

  const busy = phase === "holding" || phase === "exiting" || phase === "waiting";
  const lastUser = messages.reduce(
    (acc, m, i) => (m.role === "user" ? i : acc),
    -1,
  );
  const beforeHold = lastUser >= 0 ? messages.slice(0, lastUser + 1) : messages;
  const afterHold = lastUser >= 0 ? messages.slice(lastUser + 1) : [];
  const showHold = phase === "holding" || phase === "exiting";

  return (
    <div
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]",
        compact ? "h-[34rem] sm:h-[40rem]" : "h-full",
        className,
      )}
    >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2 text-foreground">
          <AetherMark className="size-3.5 text-hold" />
          <span className="text-sm font-medium">Holdey</span>
          <span className="text-xs text-subtle">
            {kind === "hold"
              ? "Writes Holds"
              : "Holds by Interlude"}
          </span>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 items-center rounded-md px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Close
          </button>
        ) : null}
      </div>

      <div
        ref={listRef}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4"
      >
        {messages.length === 0 && !busy ? <EmptyCopy kind={kind} /> : null}

        {beforeHold.map((msg) => (
          <Bubble
            key={msg.id}
            role={msg.role}
            text={msg.text}
            imageUrl={msg.imageUrl}
            videoUrl={msg.videoUrl}
            links={kind === "help"}
          />
        ))}
        {afterHold.map((msg) => (
          <Bubble
            key={msg.id}
            role={msg.role}
            text={msg.text}
            imageUrl={msg.imageUrl}
            videoUrl={msg.videoUrl}
            links={kind === "help"}
          />
        ))}
        {phase === "waiting" ? (
          <p className="shimmer-text text-sm">Holdey is still making it…</p>
        ) : null}
        {ctaHit && phase === "idle" ? (
          <p className="text-xs text-subtle">Hold click recorded for {ad.name}.</p>
        ) : null}
      </div>

      {showHold ? (
        <div className="shrink-0 px-3 pb-2">
          <p className="mb-1.5 px-0.5 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle">
            {formatLabel(activeFormat)} Hold
          </p>
          <HoldPlayer
            key={impression}
            format={activeFormat}
            ad={ad}
            elapsedMs={elapsedMs}
            holdMs={holdMs}
            canSkip={canSkip && !skipped}
            exiting={phase === "exiting"}
            reduceMotion={reduceMotion}
            compact
            onSkip={() => void onSkip()}
            onCta={onCta}
            onPick={onPick}
            pickedId={pickedId}
          />
          {answerReady && phase === "holding" ? (
            <p className="mt-2 text-xs text-subtle">
              Answer is ready. Skip to read it.
            </p>
          ) : null}
        </div>
      ) : null}

      {messages.length === 0 && !busy ? (
        <SuggestedPrompts
          kind={kind}
          onPick={(q) => {
            unlockHoldAudio();
            if (fieldRef.current) fieldRef.current.value = q;
            setPrompt(q);
            void beginHold(q);
          }}
        />
      ) : null}

      <ModelPicker task={kind === "hold" ? "hold" : "chat"} />
      <form
        className="relative z-10 shrink-0 bg-card p-3 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          const typed = fieldRef.current?.value ?? prompt;
          void beginHold(typed, still);
        }}
      >
        {still && kind !== "hold" ? (
          <div className="mb-2 flex items-center gap-2">
            <img src={still} alt="" className="h-14 w-14 rounded-md object-cover" />
            <p className="min-w-0 flex-1 text-xs text-muted-foreground">
              Still attached. Ask Holdey to turn it into a video.
            </p>
            <button
              type="button"
              aria-label="Remove still"
              onClick={() => setStill(null)}
              className="grid size-11 place-items-center rounded-md text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" strokeWidth={2} />
            </button>
          </div>
        ) : null}
        <div className="flex items-end gap-2 rounded-xl bg-muted p-2 shadow-[0_0_0_1px_rgba(244,241,234,0.06)]">
          {kind !== "hold" ? (
            <>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (!file) return;
                  void stillFromFile(file)
                    .then((data) => setStill(data))
                    .catch(() => setStill(null));
                }}
              />
              <button
                type="button"
                aria-label="Attach a still"
                disabled={busy}
                onClick={() => fileRef.current?.click()}
                className="grid size-11 shrink-0 place-items-center rounded-md text-muted-foreground hover:text-foreground disabled:opacity-40"
              >
                <ImagePlus className="size-4" strokeWidth={2} />
              </button>
            </>
          ) : null}
          <textarea
            ref={fieldRef}
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void beginHold(e.currentTarget.value);
              }
            }}
            rows={1}
            maxLength={2000}
            disabled={busy}
            placeholder={
              kind === "hold"
                ? "Describe the brand…"
                : "Ask Holdey, or attach a still…"
            }
            suppressHydrationWarning
            className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-foreground outline-none placeholder:text-subtle"
          />
          <button
            type="submit"
            disabled={busy}
            aria-label="Send"
            className="grid size-11 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground disabled:opacity-40"
          >
            <ArrowUp className="size-4" strokeWidth={2} />
          </button>
        </div>
      </form>
    </div>
  );
}

function Bubble({
  role,
  text,
  links,
  imageUrl,
  videoUrl,
}: {
  role: Role;
  text: string;
  links?: boolean;
  imageUrl?: string;
  videoUrl?: string;
}) {
  const mine = role === "user";
  return (
    <div className={cn("flex", mine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[90%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
          mine
            ? "rounded-br-sm bg-muted text-foreground"
            : "rounded-bl-sm text-foreground",
        )}
      >
        {links && !mine ? <LinkedCopy text={text} /> : text}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="mt-2 w-full rounded-md"
          />
        ) : null}
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            playsInline
            preload="metadata"
            className="mt-2 w-full rounded-md"
          />
        ) : null}
      </div>
    </div>
  );
}

const SITE_PATHS = [
  "/hold",
  "/holder",
  "/waits",
  "/bank",
  "/install",
  "/studio",
  "/network",
  "/proposal",
  "/ask",
] as const;

function LinkedCopy({ text }: { text: string }) {
  const re = /(\/(?:hold|holder|waits|bank|install|studio|network|proposal|ask))/g;
  const bits = text.split(re);
  return (
    <>
      {bits.map((bit, i) =>
        (SITE_PATHS as readonly string[]).includes(bit) ? (
          <Link
            key={`${bit}-${i}`}
            to={bit}
            className="underline underline-offset-4"
          >
            {bit}
          </Link>
        ) : (
          <span key={i}>{bit}</span>
        ),
      )}
    </>
  );
}

function EmptyCopy({ kind }: { kind?: "chat" | "hold" | "help" }) {
  const title =
    kind === "hold"
      ? "Describe the brand. Holdey writes the Hold."
      : kind === "help"
        ? "Ask Interlude. A Hold starts when you send."
        : "Ask Holdey. A Hold plays while it thinks.";
  const body =
    kind === "hold"
      ? "Holdey is Interlude’s in-house box. A Hold plays in the wait. Skip to read the spec, then place it."
      : "Ask a question, a picture, or a short video. Attach a still to turn it into a clip. Say add or remove a detail to update a picture. Interlude holds the wait until you skip.";
  return (
    <div className="flex min-h-full flex-col justify-end gap-3 py-2">
      <p className="font-serif text-2xl leading-tight text-foreground">{title}</p>
      <p className="max-w-md text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function SuggestedPrompts({
  kind,
  onPick,
}: {
  kind?: "chat" | "hold" | "help";
  onPick: (q: string) => void;
}) {
  const prompts =
    kind === "hold" ? HOLD_BRIEFS : SUGGESTED_PROMPTS;
  return (
    <div className="shrink-0 bg-card px-3 pb-1 pt-2">
      <p className="px-0.5 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle">
        Try one
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2 pb-2">
        {prompts.map((q) => (
          <button
            key={q}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPick(q);
            }}
            className="min-h-11 rounded-lg bg-muted px-3 py-2 text-left text-xs leading-snug text-foreground sm:text-sm"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

