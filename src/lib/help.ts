/** Local Interlude FAQ so Holdey can navigate the site even if the model is down. */

import {
  HOLDER_DEFINITION,
  INTERLUDE_DEFINITION,
  WAIT_DEFINITION,
} from "@/lib/definition";
import {
  COMPLETE_CPM,
  FULL_CPM,
  HOLDER_PAYOUT_FLOOR,
  HOLDER_SHARE,
  INTERLUDE_SHARE,
  PAYOUT_FLOOR,
  SKIP_CPM,
  VIEWER_SHARE,
  usdExact,
} from "@/lib/rates";

const PAGES = [
  { path: "/hold", name: "Hold", line: "The ad unit. Play cinematic, native, or playable Holds." },
  { path: "/holder", name: "Holder", line: "Who owns the wait. Six types: business chat, bank, school, civic desk, agency, campus." },
  { path: "/bank", name: "Bank", line: "Watcher and Holder wallets. 40% watcher, 35% Holder, 25% Interlude. Full watch on /watch pays more." },
  { path: "/install", name: "Install", line: "Drop-in hold.js. Interlude.holder() then whileWaiting()." },
  { path: "/studio", name: "Run a Hold", line: "Advertiser desk. Samples, place a finished Hold, or generate with Holdey." },
  { path: "/proposal", name: "Proposal", line: "Funding note. $80k seed. Expected Revenue at 50,000 Holders." },
  { path: "/ask", name: "Ask Holdey", line: "Full Holdey. A Hold plays while it thinks, then the reply." },
];

const MONTHLY_EARN = (() => {
  const complete = COMPLETE_CPM / 1000;
  const skip = SKIP_CPM / 1000;
  const full = FULL_CPM / 1000;
  const waiter = complete * VIEWER_SHARE;
  const holder = complete * HOLDER_SHARE;
  const interlude = complete * INTERLUDE_SHARE;
  const days = 30;
  const dau = 200;
  const waiterMonth = waiter * dau * days;
  const holderMonth = holder * dau * days;
  return `A completed Hold: the advertiser pays ${usdExact(complete)} (${usdExact(COMPLETE_CPM)} CPM ÷ 1,000). Split with every decimal: Waiter ${VIEWER_SHARE.toFixed(2)} = ${usdExact(waiter)}, Holder ${HOLDER_SHARE.toFixed(2)} = ${usdExact(holder)}, Interlude ${INTERLUDE_SHARE.toFixed(2)} = ${usdExact(interlude)}.

If you are the Waiter and you complete 200 Holds a day for 30 days: 6,000 × ${usdExact(waiter)} = ${usdExact(waiterMonth)}. Skip is ${usdExact(skip * VIEWER_SHARE)} each. Sit through the full Interlude page and that Hold is ${usdExact(full * VIEWER_SHARE)} for you. Payout from ${usdExact(PAYOUT_FLOOR)}.

If you are the Holder and 200 people a day complete one Hold in your well for 30 days: 6,000 × ${usdExact(holder)} = ${usdExact(holderMonth)}. Skip is ${usdExact(skip * HOLDER_SHARE)} each; full watch ${usdExact(full * HOLDER_SHARE)}. Payout from ${usdExact(HOLDER_PAYOUT_FLOOR)}. More Holds per wait scales that number. Demo ledger on /bank — not cash yet.`;
})();

const FAQ: { keys: string[]; answer: string }[] = [
  {
    keys: ["what is interlude", "what's interlude", "whats interlude"],
    answer: INTERLUDE_DEFINITION,
  },
  {
    keys: ["what is a hold", "what's a hold", "whats a hold", "what is hold"],
    answer: `A Hold is the labeled film in the thinking well. ${WAIT_DEFINITION} It starts the moment you send a question. Skip after five seconds. If you leave it, the next brand starts. Tap the Hold to open the full unskippable film on Interlude — extra Waiter pay if you stay. See /hold.`,
  },
  {
    keys: ["who is a holder", "who's a holder", "whos a holder", "who is holder"],
    answer: HOLDER_DEFINITION,
  },
  {
    keys: [
      "how much can i earn monthly",
      "how much can i earn",
      "earn monthly",
      "monthly earn",
    ],
    answer: MONTHLY_EARN,
  },
  {
    keys: ["network", "auction", "openrtb", "vast", "dsp", "google ads"],
    answer:
      "A Hold is sold as skippable video: house ads and direct orders first. An exchange is not connected. Split on a completed Hold is watcher 40%, Holder 35%, Interlude 25%. That buying map stays inside the company.",
  },
  {
    keys: ["holder", "host", "publisher", "own the chat", "app owner", "types of holders"],
    answer:
      "The Holder is the owner of the chat or app where the Hold plays — not the Waiter. Six types live on /holder: business chat, bank assistant, school, civic desk, agency builder, campus hall. They earn 35% of what Interlude held. Set Interlude.holder(\"your-app\") on Install.",
  },
  {
    keys: ["bank", "paid", "earn", "payout", "naira", "money", "cpm"],
    answer:
      "Bank is at /bank. Advertisers pay Interlude to hold space for a Hold. Interlude holds that money, then what is left is Waiter Bank 40% (the person who sat through it) and Holder Bank 35% (the owner of the chat). Interlude keeps 25%. Completed CPM $22, skip $12. Waiter payout from $25, Holder from $100. Demo ledger — not cash yet.",
  },
  {
    keys: ["install", "sdk", "hold.js", "wrap", "chatgpt", "gemini", "claude"],
    answer:
      "Install is at /install. Put hold.js in an app you control. You cannot inject Holds into ChatGPT, Grok, Gemini, or Claude. WhatsApp and Snapchat threads: play on a page you own.",
  },
  {
    keys: ["place", "advertiser", "run a hold", "studio", "generate", "brand"],
    answer:
      "Advertisers go to /studio (Run a Hold). Three paths: play samples, place an already-made Hold, or generate copy with Holdey then place it. Demo insertion, not a live buy.",
  },
  {
    keys: ["wait", "whatsapp", "bank assistant", "jamb", "africa", "phones"],
    answer:
      "Holder is at /holder. Six types of Holders, then six phones: Palms Line, Shore, Prep Hall, Service Desk, Forge, Hall. That is who owns the wait in Africa.",
  },
  {
    keys: ["hold", "skip", "5 second", "format", "cinematic"],
    answer:
      "A Hold is the labeled film in the thinking well. It starts the moment you send a question. Skip arrow at 5 seconds. Tap the Hold if you like it — Interlude opens the full unskippable film. Stay to the end (no pause, no leaving) and Waiter Bank is credited extra. See /hold.",
  },
  {
    keys: ["proposal", "investor", "funding", "80000", "seed", "expected revenue", "revenue"],
    answer:
      "Proposal is at /proposal. $80,000 for 18 months. Expected Revenue: 50,000 Holders × 200 people/day. Working month advertisers pay about $12.6m; Interlude’s 25% gross is about $3.14m. Plan, not invoices. Print to PDF.",
  },
  {
    keys: ["who", "telema", "owner", "rights"],
    answer:
      "Prototype by Telema Tekena Fubara. Built with Grok, September 2026. All rights reserved. Footer of every page.",
  },
  {
    keys: ["aether", "holdey", "chat box", "ask aether", "ask holdey"],
    answer:
      "Holdey is Interlude’s in-house box. Home demo, Ask, and Run a Hold. Send a question — a Hold starts in the wait. It plays until you skip. Skip, then ask again and the ads return.",
  },
  {
    keys: ["faq", "help", "how", "where", "navigate", "pages", "site"],
    answer:
      "Pages: /hold the unit, /holder who owns the wait, /bank money, /install the SDK, /studio place ads, /proposal funding. Ask again with a name if you want one of those opened in words.",
  },
];

export const HELP_PROMPTS = [
  "What is Interlude",
  "What is a Hold",
  "Who is a Holder",
  "How much can I earn monthly?",
];

export function answerProduct(question: string): string | null {
  const q = question
    .toLowerCase()
    .replace(/[?.!’'‘]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const hit = FAQ.slice(0, 4).find((f) =>
    f.keys.some((k) => {
      const key = k.replace(/[?.!’'‘]+/g, " ").replace(/\s+/g, " ").trim();
      return q === key || q.includes(key);
    }),
  );
  return hit?.answer ?? null;
}

export function answerHelp(question: string): string | null {
  const q = question.toLowerCase();
  const hit = FAQ.find((f) => f.keys.some((k) => q.includes(k)));
  if (hit) return hit.answer;
  const page = PAGES.find(
    (p) => q.includes(p.name.toLowerCase()) || q.includes(p.path),
  );
  if (page) return `${page.name} is at ${page.path}. ${page.line}`;
  return null;
}
