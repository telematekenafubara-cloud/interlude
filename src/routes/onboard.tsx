import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Check, Copy } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import {
  signupHolderClient,
  useHolderSession,
} from "@/lib/holder-session";
import { HOLDER_SHARE, shareLabel } from "@/lib/rates";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboard")({ component: OnboardPage });

function OnboardPage() {
  const session = useHolderSession((s) => s.session);
  const setSession = useHolderSession((s) => s.setSession);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-dvh bg-background pb-16 text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">
          Holder onboarding
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl">
          Become a Holder.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Sign up with a Holder id and the domains you own. Interlude returns an
          API key once. After Interlude holds advertiser payment,{" "}
          <strong className="text-foreground">
            {shareLabel(HOLDER_SHARE)}
          </strong>{" "}
          is what is left for Holder Bank — that is your cut. Credits and
          payouts come later; this step is identity, key, and domain allowlist.
        </p>

        {mounted && session ? (
          <SignedUpCard session={session} onClear={() => setSession(null)} />
        ) : (
          <SignupForm onDone={(s) => setSession(s)} />
        )}

        <ol className="mt-12 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">1 · Signup</span> —
            pick a Holder id (not reserved: holdey, demo, …).
          </li>
          <li>
            <span className="font-medium text-foreground">2 · Key</span> — copy
            the API key; Interlude will not show it again.
          </li>
          <li>
            <span className="font-medium text-foreground">3 · Domains</span> —
            allowlist the hosts where you serve Holds.
          </li>
          <li>
            <span className="font-medium text-foreground">4 · Bank</span> — open{" "}
            <Link
              to="/bank"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Interlude Bank
            </Link>{" "}
            → Holder Bank. You should see{" "}
            <strong className="text-foreground">35%</strong> (
            {shareLabel(HOLDER_SHARE)}) as your share.
          </li>
        </ol>
      </main>
      <SiteFooter />
    </div>
  );
}

function SignupForm({
  onDone,
}: {
  onDone: (s: {
    id: string;
    name: string;
    apiKey: string;
    apiKeyPrefix: string;
    domains: string[];
    signedUpAt: number;
  }) => void;
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [domainsRaw, setDomainsRaw] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const domains = domainsRaw
      .split(/[\s,]+/)
      .map((d) => d.trim())
      .filter(Boolean);
    const res = await signupHolderClient({ id, name, domains });
    setBusy(false);
    if (!res.ok) {
      setError(
        res.error === "holder_id_taken"
          ? "That Holder id is taken."
          : res.error === "holder_id_reserved"
            ? "That id is reserved (holdey, demo, …)."
            : res.error === "rate_limited"
              ? "Too many signups from this network. Try later."
              : res.error === "invalid_holder_id"
                ? "Use 2–64 letters, numbers, _ or -."
                : "Signup failed. Try again.",
      );
      return;
    }
    onDone(res.session);
  }

  const field =
    "mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-hold";

  return (
    <form
      onSubmit={submit}
      className="mt-10 space-y-5 rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgba(244,241,234,0.08)]"
    >
      <label className="block text-sm">
        <span className="font-medium">Holder id</span>
        <input
          className={field}
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="shore-bank"
          required
          minLength={2}
          maxLength={64}
          pattern="[A-Za-z0-9_-]+"
          autoComplete="off"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Display name</span>
        <input
          className={field}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Shore Bank"
          required
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Domain allowlist</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          Hosts you own, comma-separated (e.g. app.shore.ng, localhost)
        </span>
        <input
          className={field}
          value={domainsRaw}
          onChange={(e) => setDomainsRaw(e.target.value)}
          placeholder="app.example.com, localhost"
        />
      </label>
      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={busy} className="w-full sm:w-auto">
        {busy ? "Creating…" : "Create Holder"}
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Holder Bank share is fixed at {shareLabel(HOLDER_SHARE)} (35%). After
        signup, open Bank for KYC, accrued ₦ liability, and Paystack TEST
        withdraw (min ₦2,000).
      </p>
    </form>
  );
}

function SignedUpCard({
  session,
  onClear,
}: {
  session: {
    id: string;
    name: string;
    apiKey: string;
    apiKeyPrefix: string;
    domains: string[];
  };
  onClear: () => void;
}) {
  return (
    <div className="mt-10 space-y-4 rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgba(244,241,234,0.08)]">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-hold">
        You are a Holder
      </p>
      <h2 className="font-serif text-2xl tracking-tight">{session.name}</h2>
      <CopyRow label="Holder id" value={session.id} />
      <CopyRow label="API key (keep secret)" value={session.apiKey} secret />
      <div>
        <p className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-subtle">
          Domains
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {session.domains.length
            ? session.domains.join(", ")
            : "None yet — add them on Bank → Holder."}
        </p>
      </div>
      <div className="rounded-lg bg-muted px-4 py-3 text-sm">
        <p className="font-medium text-foreground">
          Holder Bank · {shareLabel(HOLDER_SHARE)}
        </p>
        <p className="mt-1 text-muted-foreground">
          After Interlude holds payment, 35% is what is left for you as a
          liability until Paystack TEST cash-out. Open Bank for balance, KYC,
          and withdraw (≥ ₦2,000).
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button asChild size="sm">
          <Link to="/bank">Open Holder Bank</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link to="/install">Install hold.js</Link>
        </Button>
        <button
          type="button"
          className="h-9 rounded-md px-3 text-sm text-muted-foreground hover:text-foreground"
          onClick={onClear}
        >
          Sign up another
        </button>
      </div>
      <pre className="overflow-x-auto rounded-md bg-muted p-4 text-[0.8125rem]">
        <code>{`Interlude.holder("${session.id}");`}</code>
      </pre>
    </div>
  );
}

function CopyRow({
  label,
  value,
  secret,
}: {
  label: string;
  value: string;
  secret?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(!secret);
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2 rounded-md bg-muted py-1 pl-3 pr-1">
      <span className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-subtle">
        {label}
      </span>
      <code className={cn("min-w-0 truncate text-sm", !revealed && "blur-sm")}>
        {revealed ? value : "••••••••••••••••"}
      </code>
      {secret ? (
        <button
          type="button"
          className="h-9 rounded-md px-2 text-xs text-muted-foreground hover:text-foreground"
          onClick={() => setRevealed((v) => !v)}
        >
          {revealed ? "Hide" : "Show"}
        </button>
      ) : null}
      <button
        type="button"
        className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground hover:text-foreground"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
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
    </div>
  );
}
