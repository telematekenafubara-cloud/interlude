import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { askGrok } from "@/lib/ask-grok";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/install")({ component: InstallPage });

declare global {
  interface Window {
    Interlude?: {
      whileWaiting: <T>(
        el: HTMLElement | string,
        work: () => Promise<T>,
      ) => Promise<T>;
      identify?: (id: string) => void;
      holder?: (id: string) => void;
    };
  }
}

const SNIPPETS = {
  vanilla: `<script src="/hold.js"></script>
<script>
  Interlude.holder("shore-bank");
  Interlude.identify(watcherId);
  const answer = await Interlude.whileWaiting(
    document.getElementById("reply"),
    () => askModel(prompt)
  );
</script>`,
  react: `Interlude.holder("shore-bank");
Interlude.identify(watcherId);
const answer = await Interlude.whileWaiting(
  wellRef.current,
  () => askModel(prompt)
);`,
  fetch: `Interlude.holder("your-app");
const data = await Interlude.whileWaiting(
  replyNode,
  () => askModel(prompt)
);`,
};

function InstallPage() {
  return (
    <div className="min-h-dvh bg-background pb-16 text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
          Drop-in for any AI product you ship
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl">
          One wrap around the request. The Hold plays in the wait.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Interlude does not inject into ChatGPT, Claude, or Gemini — those are
          not your apps. Put it in the product you control: a chatbot, a support
          agent, a coding assistant, a search box. After five seconds, a skip
          arrow. Then the answer. Selling that wait on an exchange is company
          work, not part of this install.
        </p>
        <div className="mt-14 grid min-w-0 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <SnippetPanel />
          <ForeignDemo />
        </div>
        <Steps />
      </main>
      <SiteFooter />
    </div>
  );
}

function SnippetPanel() {
  const [tab, setTab] = useState<keyof typeof SNIPPETS>("vanilla");
  const tabs: { id: keyof typeof SNIPPETS; label: string }[] = [
    { id: "vanilla", label: "HTML" },
    { id: "react", label: "React" },
    { id: "fetch", label: "Any fetch" },
  ];
  return (
    <div className="min-w-0">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle">
        The whole integration
      </p>
      <h2 className="mt-2 font-serif text-3xl">whileWaiting</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Load <code className="text-foreground">hold.js</code>. Point it at the
        node where the answer will appear. Pass the function that talks to your
        model. Interlude occupies that node until the model returns — skip arrow
        at five seconds, then the next Hold if you leave it.
      </p>
      <div className="mt-5 flex gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "h-10 rounded-md px-3 text-sm",
              tab === t.id
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <CodeBlock code={SNIPPETS[tab]} />
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mt-3 min-w-0 overflow-hidden rounded-xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]">
      <button
        type="button"
        className="absolute right-2 top-2 z-10 inline-flex h-11 items-center gap-1.5 rounded-md bg-card/90 px-3 text-xs text-muted-foreground hover:text-foreground"
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
      >
        {copied ? (
          <Check className="size-3.5" strokeWidth={1.75} />
        ) : (
          <Copy className="size-3.5" strokeWidth={1.75} />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="max-w-full overflow-x-auto p-4 pr-24 text-[0.75rem] leading-relaxed text-foreground sm:text-[0.8125rem]">
        <code className="block w-max min-w-full">{code}</code>
      </pre>
    </div>
  );
}

function useHoldScript() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const mark = () => {
      window.Interlude?.holder?.("quill");
      setReady(true);
    };
    if (window.Interlude) {
      mark();
      return;
    }
    const s = document.createElement("script");
    s.src = "/hold.js";
    s.async = true;
    s.onload = mark;
    document.body.appendChild(s);
    return () => {
      s.onload = null;
    };
  }, []);
  return ready;
}

function ForeignDemo() {
  const ready = useHoldScript();
  const wellRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState("Explain espresso in two sentences.");
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function send() {
    const text = prompt.trim();
    if (!text || busy || !window.Interlude) return;
    setBusy(true);
    setError("");
    setReply("");
    await new Promise<void>((r) => requestAnimationFrame(() => r()));
    const wellNow = wellRef.current;
    if (!wellNow || !window.Interlude) {
      setBusy(false);
      return;
    }
    try {
      const result = await window.Interlude.whileWaiting(wellNow, () =>
        askGrok({ data: { prompt: text } }),
      );
      if (result.ok) setReply(result.text);
      else setError(result.error);
    } catch {
      setError("The Hold ran. The model did not return.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-w-0">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle">
        A third-party app, with the snippet on
      </p>
      <h2 className="mt-2 font-serif text-3xl">Quill</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        This is not Interlude chrome. It is a generic writing model using{" "}
        <code className="text-foreground">Interlude.whileWaiting</code>. Ask it
        something. Wait five seconds for the skip arrow, or let the next Hold
        start.
      </p>
      <div className="mt-5 overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]">
        <div className="flex h-12 items-center justify-between border-b border-border px-4">
          <span className="text-sm font-medium">Quill</span>
          <span className="text-xs text-subtle">hold.js loaded</span>
        </div>
        <div
          ref={wellRef}
          className="relative min-h-72 bg-muted/40 p-4 text-sm leading-relaxed"
        >
          {busy ? null : reply ? (
            <p className="text-foreground">{reply}</p>
          ) : error ? (
            <p className="text-muted-foreground">{error}</p>
          ) : (
            <p className="text-subtle">The answer will land here.</p>
          )}
        </div>
        <form
          className="flex items-end gap-2 border-t border-border p-3"
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            maxLength={400}
            disabled={busy || !ready}
            placeholder="Ask Quill…"
            className="h-11 min-w-0 flex-1 rounded-md bg-muted px-3 text-sm text-foreground outline-none placeholder:text-subtle"
          />
          <Button type="submit" disabled={busy || !ready || !prompt.trim()}>
            Ask
          </Button>
        </form>
      </div>
    </div>
  );
}

function Steps() {
  const items = [
    {
      n: "01",
      t: "Ship hold.js",
      d: "Ship the script with your product, or load it from Interlude. One file. No framework.",
    },
    {
      n: "02",
      t: "Wrap the model call",
      d: "Interlude.holder(\"your-app\") then whileWaiting(answerNode, () => askModel(prompt)). The Holder is you — you own the wait.",
    },
    {
      n: "03",
      t: "Skip, or the next Hold starts",
      d: "After five seconds a skip arrow appears. If you leave it, the playlist continues until the model is ready. Then the answer lands.",
    },
  ];
  return (
    <section className="mt-20 border-t border-border pt-16">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
        Three steps
      </p>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
        Not a network. A wrap.
      </h2>
      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {items.map((s) => (
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
