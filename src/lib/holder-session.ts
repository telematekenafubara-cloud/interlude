/**
 * Client-side Holder session after public signup.
 * API key is stored only in the browser (localStorage) — shown once at signup.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { persistStorage } from "@/lib/storage";

export type HolderSession = {
  id: string;
  name: string;
  apiKey: string;
  apiKeyPrefix: string;
  domains: string[];
  signedUpAt: number;
};

type HolderSessionState = {
  session: HolderSession | null;
  setSession: (s: HolderSession | null) => void;
  clear: () => void;
  setDomains: (domains: string[]) => void;
};

export const useHolderSession = create<HolderSessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clear: () => set({ session: null }),
      setDomains: (domains) =>
        set((s) =>
          s.session ? { session: { ...s.session, domains } } : s,
        ),
    }),
    {
      name: "interlude-holder-session",
      storage: persistStorage,
    },
  ),
);

export async function signupHolderClient(input: {
  id: string;
  name: string;
  domains?: string[];
}): Promise<
  | { ok: true; session: HolderSession; holderShare: number }
  | { ok: false; error: string }
> {
  const res = await fetch("/api/holders/signup", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await res.json()) as {
    ok?: boolean;
    error?: string;
    id?: string;
    apiKey?: string;
    apiKeyPrefix?: string;
    domains?: string[];
    holderShare?: number;
    name?: string;
  };
  if (!res.ok || !data.ok || !data.id || !data.apiKey) {
    return { ok: false, error: data.error || "signup_failed" };
  }
  const session: HolderSession = {
    id: data.id,
    name: input.name.trim() || data.id,
    apiKey: data.apiKey,
    apiKeyPrefix: data.apiKeyPrefix || data.apiKey.slice(0, 8),
    domains: data.domains ?? [],
    signedUpAt: Date.now(),
  };
  return {
    ok: true,
    session,
    holderShare: data.holderShare ?? 0.35,
  };
}

export async function fetchHolderMe(
  apiKey: string,
): Promise<
  | {
      ok: true;
      holder: {
        id: string;
        name: string;
        apiKeyPrefix: string;
        domains: string[];
      };
      holderShare: number;
    }
  | { ok: false; error: string }
> {
  const res = await fetch("/api/holders/me", {
    headers: { "x-interlude-key": apiKey },
  });
  const data = (await res.json()) as {
    ok?: boolean;
    error?: string;
    holder?: {
      id: string;
      name: string;
      apiKeyPrefix: string;
      domains: string[];
    };
    holderShare?: number;
  };
  if (!res.ok || !data.ok || !data.holder) {
    return { ok: false, error: data.error || "unauthorized" };
  }
  return {
    ok: true,
    holder: data.holder,
    holderShare: data.holderShare ?? 0.35,
  };
}

export async function patchHolderDomains(
  apiKey: string,
  domains: string[],
): Promise<{ ok: true; domains: string[] } | { ok: false; error: string }> {
  const res = await fetch("/api/holders/me", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "x-interlude-key": apiKey,
    },
    body: JSON.stringify({ domains }),
  });
  const data = (await res.json()) as {
    ok?: boolean;
    error?: string;
    domains?: string[];
  };
  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error || "update_failed" };
  }
  return { ok: true, domains: data.domains ?? [] };
}
