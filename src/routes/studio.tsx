import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { AD_CATEGORIES } from "@/lib/ad-categories";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio")({ component: Studio });

const KEY = "interlude.advertiserKey";
const TIERS = {
  starter: { label: "Starter", price: "₦20,000 / 30 days", weight: 1 },
  growth: { label: "Growth", price: "₦100,000 / 30 days", weight: 7 },
} as const;

type Stats = { accepted: number; completed: number; skipped: number; rejected: number };
type Campaign = {
  id: string;
  name: string;
  headline: string;
  body: string;
  cta: string;
  clickUrl: string | null;
  category: string;
  tier: "starter" | "growth";
  status: string;
  paidUntil: string | null;
  stats: Stats;
};
type Me = { advertiser: { id: string; name: string; email: string; apiKeyPrefix: string }; campaigns: Campaign[] };

const field =
  "mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-hold";

function api(key: string, path: string, init: RequestInit = {}) {
  return fetch(path, {
    ...init,
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json", ...(init.headers || {}) },
  }).then(async (r) => ({ status: r.status, json: (await r.json()) as Record<string, unknown> }));
}

function Studio() {
  const [key, setKey] = useState<string | null>(null);
  const [fresh, setFresh] = useState<string | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    setKey(window.localStorage.getItem(KEY));
  }, []);

  const refresh = useCallback(async () => {
    if (!key) return;
    const r = await api(key, "/api/advertisers/me");
    if (r.status === 401) {
      window.localStorage.removeItem(KEY);
      setKey(null);
      return;
    }
    if (r.json.ok) setMe(r.json as unknown as Me);
  }, [key]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Paystack callback: /studio?verify=1&reference=…
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const ref = p.get("reference") || p.get("trxref");
    if (!ref) return;
    setNote("Verifying payment with Paystack…");
    fetch(`/api/campaigns/verify?reference=${encodeURIComponent(ref)}`)
      .then((r) => r.json())
      .then((j: { ok?: boolean; status?: string }) => {
        setNote(j.ok ? "Payment verified — campaign is live in rotation." : `Payment not confirmed (${j.status || "error"}).`);
        window.history.replaceState(null, "", "/studio");
        void refresh();
      })
      .catch(() => setNote("Could not verify payment. Refresh to retry."));
  }, [refresh]);

  function signedUp(k: string) {
    window.localStorage.setItem(KEY, k);
    setFresh(k);
    setKey(k);
  }

  return (
    <div className="min-h-dvh bg-background pb-16 text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold">Advertiser console</p>
        <h1 className="mt-3 font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl">Put your Hold in the wait.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Create a campaign, pay with Paystack (TEST mode), and it enters rotation. Growth carries 7× the
          serve weight of Starter and gets priority when both compete. That is relative share of voice —
          delivery depends on Holder traffic and category blocks, and no number of Holds is promised.
        </p>
        {note ? <p className="mt-6 rounded-md bg-muted px-4 py-3 text-sm">{note}</p> : null}
        {!key ? (
          <SignupForm onDone={signedUp} />
        ) : (
          <>
            {fresh ? (
              <div className="mt-8 rounded-md border border-hold/40 bg-card p-4 text-sm">
                <p className="font-medium">Your advertiser key (shown once — saved in this browser):</p>
                <code className="mt-2 block break-all text-xs">{fresh}</code>
              </div>
            ) : null}
            {me ? (
              <p className="mt-8 text-sm text-muted-foreground">
                Signed in as <span className="text-foreground">{me.advertiser.name}</span> ({me.advertiser.email}) ·{" "}
                <button
                  type="button"
                  className="underline-offset-4 hover:underline"
                  onClick={() => {
                    window.localStorage.removeItem(KEY);
                    setKey(null);
                    setMe(null);
                  }}
                >
                  sign out
                </button>
              </p>
            ) : null}
            <CampaignForm apiKey={key} onCreated={refresh} />
            <CampaignList apiKey={key} campaigns={me?.campaigns ?? []} onChange={refresh} />
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function SignupForm({ onDone }: { onDone: (key: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [existing, setExisting] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const r = await fetch("/api/advertisers/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email }),
    }).then((x) => x.json() as Promise<{ ok?: boolean; apiKey?: string; error?: string }>);
    setBusy(false);
    if (r.ok && r.apiKey) onDone(r.apiKey);
    else setErr(r.error === "email_invalid" ? "Enter a valid email." : "Signup failed.");
  }
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      <form onSubmit={submit} className="space-y-4 rounded-2xl bg-card p-6">
        <h2 className="font-serif text-2xl">New advertiser</h2>
        <label className="block text-sm">
          Brand / company
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="block text-sm">
          Billing email (Paystack receipt)
          <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        {err ? <p className="text-sm text-red-400">{err}</p> : null}
        <Button type="submit" disabled={busy}>{busy ? "Creating…" : "Create account"}</Button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (existing.trim()) onDone(existing.trim());
        }}
        className="space-y-4 rounded-2xl bg-card p-6"
      >
        <h2 className="font-serif text-2xl">Have a key?</h2>
        <label className="block text-sm">
          Advertiser key
          <input className={field} value={existing} onChange={(e) => setExisting(e.target.value)} placeholder="ila_…" />
        </label>
        <Button type="submit" variant="outline">Sign in</Button>
      </form>
    </div>
  );
}

function CampaignForm({ apiKey, onCreated }: { apiKey: string; onCreated: () => void }) {
  const [f, setF] = useState({ name: "", headline: "", body: "", cta: "", clickUrl: "", category: "music", tier: "starter" });
  const [err, setErr] = useState<string | null>(null);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    const r = await api(apiKey, "/api/campaigns", { method: "POST", body: JSON.stringify(f) });
    if (r.json.ok) {
      setF({ ...f, name: "", headline: "", body: "", cta: "", clickUrl: "" });
      onCreated();
    } else setErr(String(r.json.error || "failed"));
  }
  return (
    <form onSubmit={submit} className="mt-8 grid gap-4 rounded-2xl bg-card p-6 sm:grid-cols-2">
      <h2 className="font-serif text-2xl sm:col-span-2">New campaign</h2>
      <label className="text-sm">Campaign name<input className={field} value={f.name} onChange={set("name")} required /></label>
      <label className="text-sm">Headline (shown in the Hold)<input className={field} value={f.headline} onChange={set("headline")} maxLength={120} required /></label>
      <label className="text-sm sm:col-span-2">Body<input className={field} value={f.body} onChange={set("body")} maxLength={400} /></label>
      <label className="text-sm">CTA label<input className={field} value={f.cta} onChange={set("cta")} maxLength={40} placeholder="Listen now" /></label>
      <label className="text-sm">Click URL<input className={field} type="url" value={f.clickUrl} onChange={set("clickUrl")} placeholder="https://" /></label>
      <label className="text-sm">
        Category
        <select className={field} value={f.category} onChange={set("category")}>
          {AD_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <label className="text-sm">
        Tier
        <select className={field} value={f.tier} onChange={set("tier")}>
          <option value="starter">Starter — ₦20,000 / 30 days (weight 1)</option>
          <option value="growth">Growth — ₦100,000 / 30 days (weight 7, priority)</option>
        </select>
      </label>
      {err ? <p className="text-sm text-red-400 sm:col-span-2">{err}</p> : null}
      <div className="sm:col-span-2"><Button type="submit">Create campaign</Button></div>
    </form>
  );
}

function CampaignList({ apiKey, campaigns, onChange }: { apiKey: string; campaigns: Campaign[]; onChange: () => void }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  async function buy(id: string) {
    setBusy(id);
    setErr(null);
    const r = await api(apiKey, "/api/campaigns/checkout", { method: "POST", body: JSON.stringify({ campaignId: id }) });
    setBusy(null);
    if (r.json.ok && typeof r.json.authorizationUrl === "string") window.location.href = r.json.authorizationUrl;
    else setErr(`Checkout failed: ${String(r.json.error || r.status)}${r.json.detail ? ` (${String(r.json.detail)})` : ""}`);
  }
  if (!campaigns.length) return <p className="mt-8 text-sm text-muted-foreground">No campaigns yet.</p>;
  return (
    <div className="mt-8 space-y-4">
      {err ? <p className="text-sm text-red-400">{err}</p> : null}
      {campaigns.map((c) => {
        const t = TIERS[c.tier];
        const live = c.status === "active" && (!c.paidUntil || new Date(c.paidUntil) > new Date());
        return (
          <div key={c.id} className="rounded-2xl bg-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-xl">{c.name}</h3>
              <span className={cn("rounded-full px-2.5 py-0.5 text-xs", live ? "bg-emerald-500/15 text-emerald-300" : "bg-muted text-muted-foreground")}>
                {live ? `Live until ${new Date(c.paidUntil!).toLocaleDateString()}` : c.status === "pending_payment" ? "Awaiting payment" : c.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              “{c.headline}” · {c.category} · {t.label} ({t.price}, weight {t.weight})
            </p>
            <dl className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
              {(["accepted", "completed", "skipped", "rejected"] as const).map((k) => (
                <div key={k} className="rounded-md bg-muted py-2">
                  <dt className="text-[0.625rem] uppercase tracking-[0.12em] text-subtle">{k === "accepted" ? "Holds served" : k}</dt>
                  <dd className="mt-0.5 text-lg">{c.stats[k]}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-xs text-muted-foreground">
              From the impressions ledger. Rejected = failed fraud/viewability checks; not billed to Holders.
            </p>
            {!live ? (
              <Button className="mt-4" size="sm" disabled={busy === c.id} onClick={() => buy(c.id)}>
                {busy === c.id ? "Opening Paystack…" : `Pay ${t.price.split(" /")[0]} with Paystack (TEST)`}
              </Button>
            ) : null}
            <button type="button" className="ml-3 text-xs text-muted-foreground hover:text-foreground" onClick={onChange}>Refresh</button>
          </div>
        );
      })}
    </div>
  );
}
