import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ImagePlus, t as X, u as ArrowUp } from "../_libs/lucide-react.mjs";
import { r as create } from "../_libs/zustand.mjs";
import { C as nextFormat, S as nextAdId, _ as SKIP_AFTER_MS, a as INTERLUDE_SHARE, b as adById, f as usdExact, h as ADS, i as HOLDER_SHARE, o as VIEWER_SHARE, r as useBankStore, v as SPOT_MS, w as randomAdId, x as formatLabel, y as SUGGESTED_PROMPTS } from "./router-B0-yeu4t.mjs";
import { r as cn, t as AetherMark } from "./marks-CpZHMeh2.mjs";
import { r as unlockHoldAudio } from "./watch-B_0QX3N9.mjs";
import { t as HoldPlayer } from "./hold-player-CJGIj7Dh.mjs";
import { a as wantsVideo, i as wantsImageEdit, n as mediaIntent, r as shouldAnimateStill, t as askGrok } from "./ask-grok-6iPN4tOz.mjs";
import { n as INTERLUDE_DEFINITION, r as WAIT_DEFINITION, t as HOLDER_DEFINITION } from "./definition-C2TCvqAS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/aether-chat-Kqgkzyfm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HOLD_BRIEFS = [
	"A Lagos rice brand. Quiet, premium, Sunday pot. 8-second Hold.",
	"A fintech card for market women. Fast, naira, no shouting.",
	"Night-drive headphones. One road, no playlist needed."
];
function stills() {
	return ADS.map((a) => ({
		id: a.id,
		src: a.still,
		name: a.name
	}));
}
function parseHold(text) {
	const grab = (label) => {
		const re = new RegExp(`^${label}\\s*:\\s*(.+)$`, "im");
		return text.match(re)?.[1]?.trim() ?? "";
	};
	let name = grab("BRAND") || grab("NAME");
	let tagline = grab("TAGLINE");
	let cta = grab("CTA");
	let category = grab("CATEGORY") || "Brand";
	let body = grab("BODY") || tagline;
	if (!name || !tagline || !cta) {
		const lines = text.split("\n").map((l) => l.replace(/^\s*[A-Z][A-Z]+\s*:\s*/, "").trim()).filter(Boolean);
		if (lines.length >= 3) {
			name = name || lines[0].slice(0, 32);
			tagline = tagline || lines[1];
			body = body || lines[2];
			cta = cta || lines[3] || "Learn more";
		}
	}
	if (!name || !tagline || !cta) return null;
	return {
		name,
		category,
		tagline,
		body: body || tagline,
		cta,
		still: ADS[0]?.still ?? "/ads/northline.jpg"
	};
}
function draftToAd(draft, id) {
	return {
		id,
		name: draft.name,
		category: draft.category,
		tagline: draft.tagline,
		body: draft.body,
		cta: draft.cta,
		still: draft.still || ADS[0]?.still || "/ads/northline.jpg",
		holdMs: 8e3
	};
}
/** Local Interlude FAQ so Holdey can navigate the site even if the model is down. */
var MONTHLY_EARN = (() => {
	const complete = 22 / 1e3;
	const skip = 12 / 1e3;
	const full = 40 / 1e3;
	const waiter = complete * VIEWER_SHARE;
	const holder = complete * HOLDER_SHARE;
	const interlude = complete * INTERLUDE_SHARE;
	const days = 30;
	const dau = 200;
	const waiterMonth = waiter * dau * days;
	const holderMonth = holder * dau * days;
	return `A completed Hold: the advertiser pays ${usdExact(complete)} (${usdExact(22)} CPM ÷ 1,000). Split with every decimal: Waiter ${VIEWER_SHARE.toFixed(2)} = ${usdExact(waiter)}, Holder ${HOLDER_SHARE.toFixed(2)} = ${usdExact(holder)}, Interlude ${INTERLUDE_SHARE.toFixed(2)} = ${usdExact(interlude)}.

If you are the Waiter and you complete 200 Holds a day for 30 days: 6,000 × ${usdExact(waiter)} = ${usdExact(waiterMonth)}. Skip is ${usdExact(skip * VIEWER_SHARE)} each. Sit through the full Interlude page and that Hold is ${usdExact(full * VIEWER_SHARE)} for you. Payout from ${usdExact(25)}.

If you are the Holder and 200 people a day complete one Hold in your well for 30 days: 6,000 × ${usdExact(holder)} = ${usdExact(holderMonth)}. Skip is ${usdExact(skip * HOLDER_SHARE)} each; full watch ${usdExact(full * HOLDER_SHARE)}. Payout from ${usdExact(100)}. More Holds per wait scales that number. Demo ledger on /bank — not cash yet.`;
})();
var FAQ = [
	{
		keys: [
			"what is interlude",
			"what's interlude",
			"whats interlude"
		],
		answer: INTERLUDE_DEFINITION
	},
	{
		keys: [
			"what is a hold",
			"what's a hold",
			"whats a hold",
			"what is hold"
		],
		answer: `A Hold is the labeled film in the thinking well. ${WAIT_DEFINITION} It starts the moment you send a question. Skip after five seconds. If you leave it, the next brand starts. Tap the Hold to open the full unskippable film on Interlude — extra Waiter pay if you stay. See /hold.`
	},
	{
		keys: [
			"who is a holder",
			"who's a holder",
			"whos a holder",
			"who is holder"
		],
		answer: HOLDER_DEFINITION
	},
	{
		keys: [
			"how much can i earn monthly",
			"how much can i earn",
			"earn monthly",
			"monthly earn"
		],
		answer: MONTHLY_EARN
	},
	{
		keys: [
			"network",
			"auction",
			"openrtb",
			"vast",
			"dsp",
			"google ads"
		],
		answer: "Network is at /network. It is the map of how a Hold gets bought: house ads first, then a VAST tag, then OpenRTB. Nothing is live to Google. Run the sample auction on that page. Split on a completed Hold is watcher 40%, Holder 35%, Interlude 25%."
	},
	{
		keys: [
			"holder",
			"host",
			"publisher",
			"own the chat",
			"app owner",
			"types of holders"
		],
		answer: "The Holder is the owner of the chat or app where the Hold plays — not the Waiter. Six types live on /holder: business chat, bank assistant, school, civic desk, agency builder, campus hall. They earn 35% of what Interlude held. Set Interlude.holder(\"your-app\") on Install."
	},
	{
		keys: [
			"bank",
			"paid",
			"earn",
			"payout",
			"naira",
			"money",
			"cpm"
		],
		answer: "Bank is at /bank. Advertisers pay Interlude to hold space for a Hold. Interlude holds that money, then what is left is Waiter Bank 40% (the person who sat through it) and Holder Bank 35% (the owner of the chat). Interlude keeps 25%. Completed CPM $22, skip $12. Waiter payout from $25, Holder from $100. Demo ledger — not cash yet."
	},
	{
		keys: [
			"install",
			"sdk",
			"hold.js",
			"wrap",
			"chatgpt",
			"gemini",
			"claude"
		],
		answer: "Install is at /install. Put hold.js in an app you control. You cannot inject Holds into ChatGPT, Grok, Gemini, or Claude. WhatsApp and Snapchat threads: play on a page you own."
	},
	{
		keys: [
			"place",
			"advertiser",
			"run a hold",
			"studio",
			"generate",
			"brand"
		],
		answer: "Advertisers go to /studio (Run a Hold). Three paths: play samples, place an already-made Hold, or generate copy with Holdey then place it. Demo insertion, not a live buy."
	},
	{
		keys: [
			"wait",
			"whatsapp",
			"bank assistant",
			"jamb",
			"africa",
			"phones"
		],
		answer: "Holder is at /holder. Six types of Holders, then six phones: Palms Line, Shore, Prep Hall, Service Desk, Forge, Hall. That is who owns the wait in Africa."
	},
	{
		keys: [
			"hold",
			"skip",
			"5 second",
			"format",
			"cinematic"
		],
		answer: "A Hold is the labeled film in the thinking well. It starts the moment you send a question. Skip arrow at 5 seconds. Tap the Hold if you like it — Interlude opens the full unskippable film. Stay to the end (no pause, no leaving) and Waiter Bank is credited extra. See /hold."
	},
	{
		keys: [
			"proposal",
			"investor",
			"funding",
			"80000",
			"seed",
			"expected revenue",
			"revenue"
		],
		answer: "Proposal is at /proposal. $80,000 for 18 months. Expected Revenue: 50,000 Holders × 200 people/day. Working month advertisers pay about $12.6m; Interlude’s 25% gross is about $3.14m. Plan, not invoices. Print to PDF."
	},
	{
		keys: [
			"who",
			"telema",
			"owner",
			"rights"
		],
		answer: "Prototype by Telema Tekena Fubara. Built with Grok, September 2026. All rights reserved. Footer of every page."
	},
	{
		keys: [
			"aether",
			"holdey",
			"chat box",
			"ask aether",
			"ask holdey"
		],
		answer: "Holdey is Interlude’s in-house box. Home demo, Ask, and Run a Hold. Send a question — a Hold starts in the wait. It plays until you skip. Skip, then ask again and the ads return."
	},
	{
		keys: [
			"faq",
			"help",
			"how",
			"where",
			"navigate",
			"pages",
			"site"
		],
		answer: "Pages: /hold the unit, /holder who owns the wait, /bank money, /install the SDK, /studio place ads, /network how ads are bought, /proposal funding. Ask again with a name if you want one of those opened in words."
	}
];
function answerProduct(question) {
	const q = question.toLowerCase().replace(/[?.!’'‘]+/g, " ").replace(/\s+/g, " ").trim();
	return FAQ.slice(0, 4).find((f) => f.keys.some((k) => {
		const key = k.replace(/[?.!’'‘]+/g, " ").replace(/\s+/g, " ").trim();
		return q === key || q.includes(key);
	}))?.answer ?? null;
}
var useHoldStore = create((set) => ({
	format: "cinematic",
	adId: "northline",
	autoRotate: true,
	metrics: {
		holds: 0,
		completed: 0,
		skipped: 0,
		cta: 0,
		attentionMs: 0,
		playablePicks: 0
	},
	setFormat: (format) => set({ format }),
	setAdId: (adId) => set({ adId }),
	setAutoRotate: (autoRotate) => set({ autoRotate }),
	recordHold: ({ completed, skipped, attentionMs, cta, playablePick, adId, source = "studio" }) => {
		set((s) => ({ metrics: {
			holds: s.metrics.holds + 1,
			completed: s.metrics.completed + (completed ? 1 : 0),
			skipped: s.metrics.skipped + (skipped ? 1 : 0),
			cta: s.metrics.cta + (cta ? 1 : 0),
			attentionMs: s.metrics.attentionMs + attentionMs,
			playablePicks: s.metrics.playablePicks + (playablePick ? 1 : 0)
		} }));
		useBankStore.getState().credit({
			adId,
			skipped,
			source
		});
	}
}));
var DEMO_ANSWER = "To the room you’re about to fill — may the work be loud and the door stay unlocked for the people who make you braver. Here’s to the studio, and to finally having a place that can hold all of it.";
function uid() {
	return Math.random().toString(36).slice(2, 10);
}
async function stillFromFile(file) {
	if (!file.type.startsWith("image/")) throw new Error("Need a picture.");
	const blobUrl = URL.createObjectURL(file);
	try {
		const img = await new Promise((resolve, reject) => {
			const node = new Image();
			node.onload = () => resolve(node);
			node.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that picture."));
			node.src = blobUrl;
		});
		const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
		const width = Math.max(1, Math.round(img.width * scale));
		const height = Math.max(1, Math.round(img.height * scale));
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Could not read that picture.");
		ctx.drawImage(img, 0, 0, width, height);
		return canvas.toDataURL("image/jpeg", .82);
	} finally {
		URL.revokeObjectURL(blobUrl);
	}
}
function useReducedMotion() {
	const [reduce, setReduce] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReduce(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);
	return reduce;
}
function AetherChat({ live = true, compact = false, demo = false, kind = "chat", onHoldSpec, onClose, className }) {
	const adId = useHoldStore((s) => s.adId);
	const autoRotate = useHoldStore((s) => s.autoRotate);
	const setAdId = useHoldStore((s) => s.setAdId);
	const recordHold = useHoldStore((s) => s.recordHold);
	const reduceMotion = useReducedMotion();
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [still, setStill] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [elapsedMs, setElapsedMs] = (0, import_react.useState)(0);
	const [activeAdId, setActiveAdId] = (0, import_react.useState)(adId);
	const [activeFormat, setActiveFormat] = (0, import_react.useState)("cinematic");
	const [pickedId, setPickedId] = (0, import_react.useState)(null);
	const [ctaHit, setCtaHit] = (0, import_react.useState)(false);
	const [skipped, setSkipped] = (0, import_react.useState)(false);
	const [answerReady, setAnswerReady] = (0, import_react.useState)(false);
	const [impression, setImpression] = (0, import_react.useState)(0);
	const [session, setSession] = (0, import_react.useState)(0);
	const pendingRef = (0, import_react.useRef)(null);
	const workReadyRef = (0, import_react.useRef)(false);
	const workResultRef = (0, import_react.useRef)(null);
	const startedRef = (0, import_react.useRef)(0);
	const skipRef = (0, import_react.useRef)(false);
	const ctaRef = (0, import_react.useRef)(false);
	const pickRef = (0, import_react.useRef)(false);
	const sessionDoneRef = (0, import_react.useRef)(false);
	const genRef = (0, import_react.useRef)(0);
	const activeAdIdRef = (0, import_react.useRef)(adId);
	const listRef = (0, import_react.useRef)(null);
	const fieldRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const busyRef = (0, import_react.useRef)(false);
	const activeFormatRef = (0, import_react.useRef)("cinematic");
	const ad = adById(activeAdId);
	const holdMs = SPOT_MS;
	const canSkip = elapsedMs >= SKIP_AFTER_MS;
	activeAdIdRef.current = activeAdId;
	(0, import_react.useEffect)(() => {
		listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
	}, [
		messages,
		phase,
		impression
	]);
	(0, import_react.useEffect)(() => {
		if (phase !== "holding") return;
		const gen = genRef.current;
		const t0 = performance.now();
		startedRef.current = t0;
		let raf = 0;
		let closed = false;
		const loop = (now) => {
			if (closed || gen !== genRef.current) return;
			const elapsed = now - t0;
			setElapsedMs(elapsed);
			if (elapsed >= 8e3) {
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
	}, [phase, impression]);
	function recordSpot(skipped) {
		recordHold({
			completed: !skipped,
			skipped,
			attentionMs: Math.min(SPOT_MS, performance.now() - startedRef.current),
			cta: ctaRef.current,
			playablePick: pickRef.current,
			adId: activeAdIdRef.current,
			source: kind === "help" ? "aether-help" : demo ? "aether-demo" : "aether"
		});
	}
	function handleSpotEnd(gen) {
		if (gen !== genRef.current) return;
		if (skipRef.current || sessionDoneRef.current) return;
		recordSpot(false);
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
	async function beginHold(text, attached) {
		let q = text.trim();
		const lastStill = [...messages].reverse().find((m) => m.imageUrl)?.imageUrl;
		const attachedNow = attached || still;
		const reuseStill = Boolean(lastStill) && (wantsVideo(q) || wantsImageEdit(q) || shouldAnimateStill(q, Boolean(attachedNow)));
		const source = attachedNow || (reuseStill ? lastStill : void 0);
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
		setMessages((m) => [...m, {
			id: uid(),
			role: "user",
			text: q,
			imageUrl: attachedNow || void 0
		}]);
		setPrompt("");
		setStill(null);
		setPhase("holding");
		const local = kind === "hold" || mediaIntent(q) || wantsVideo(q) || wantsImageEdit(q) ? null : answerProduct(q);
		const history = messages.slice(-8).map((m) => ({
			role: m.role,
			content: m.text
		}));
		const work = local ? Promise.resolve({ text: local }) : live ? askGrok({ data: {
			prompt: q,
			kind: kind === "hold" ? "hold" : "chat",
			history,
			imageUrl: source
		} }).then((res) => res.ok ? {
			text: res.text,
			imageUrl: res.imageUrl,
			videoUrl: res.videoUrl
		} : {
			text: "",
			error: res.error
		}).catch(() => ({
			text: "",
			error: "Holdey could not answer."
		})) : new Promise((resolve) => {
			window.setTimeout(() => resolve({ text: DEMO_ANSWER }), 12e3);
		});
		pendingRef.current = work;
		work.then((result) => {
			if (gen !== genRef.current) return;
			workReadyRef.current = true;
			workResultRef.current = result;
			setAnswerReady(true);
		});
	}
	async function finishHold(gen, text, error, media) {
		if (gen !== genRef.current) return;
		if (sessionDoneRef.current) return;
		sessionDoneRef.current = true;
		const reply = text || error || "The model didn’t return an answer. The Hold still ran — try another question.";
		setMessages((m) => [...m, {
			id: uid(),
			role: "assistant",
			text: reply,
			imageUrl: media?.imageUrl,
			videoUrl: media?.videoUrl
		}]);
		if (kind === "hold" && onHoldSpec && text) {
			const spec = parseHold(text);
			if (spec) onHoldSpec(spec);
		}
		if (skipRef.current) setPhase("idle");
		else {
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
			await finishHold(gen, workResultRef.current.text, workResultRef.current.error, {
				imageUrl: workResultRef.current.imageUrl,
				videoUrl: workResultRef.current.videoUrl
			});
			return;
		}
		const pending = pendingRef.current;
		setPhase("waiting");
		if (!pending) return;
		const result = await pending;
		if (gen !== genRef.current) return;
		await finishHold(gen, result.text, result.error, {
			imageUrl: result.imageUrl,
			videoUrl: result.videoUrl
		});
	}
	function onCta() {
		ctaRef.current = true;
		setCtaHit(true);
	}
	function onPick(option) {
		pickRef.current = true;
		setPickedId(option.id);
	}
	const busy = phase === "holding" || phase === "exiting" || phase === "waiting";
	const lastUser = messages.reduce((acc, m, i) => m.role === "user" ? i : acc, -1);
	const beforeHold = lastUser >= 0 ? messages.slice(0, lastUser + 1) : messages;
	const afterHold = lastUser >= 0 ? messages.slice(lastUser + 1) : [];
	const showHold = phase === "holding" || phase === "exiting";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-0 flex-col overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]", compact ? "h-[34rem] sm:h-[40rem]" : "h-full", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-12 shrink-0 items-center justify-between border-b border-border px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherMark, { className: "size-3.5 text-hold" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Holdey"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-subtle",
							children: kind === "hold" ? "Writes Holds" : "Holds by Interlude"
						})
					]
				}), onClose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "inline-flex h-8 items-center rounded-md px-2 text-xs text-muted-foreground hover:text-foreground",
					children: "Close"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: listRef,
				className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4",
				children: [
					messages.length === 0 && !busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyCopy, { kind }) : null,
					beforeHold.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bubble, {
						role: msg.role,
						text: msg.text,
						imageUrl: msg.imageUrl,
						videoUrl: msg.videoUrl,
						links: kind === "help"
					}, msg.id)),
					afterHold.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bubble, {
						role: msg.role,
						text: msg.text,
						imageUrl: msg.imageUrl,
						videoUrl: msg.videoUrl,
						links: kind === "help"
					}, msg.id)),
					phase === "waiting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shimmer-text text-sm",
						children: "Holdey is still making it…"
					}) : null,
					ctaHit && phase === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							"Hold click recorded for ",
							ad.name,
							"."
						]
					}) : null
				]
			}),
			showHold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shrink-0 px-3 pb-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-1.5 px-0.5 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle",
						children: [formatLabel(activeFormat), " Hold"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldPlayer, {
						format: activeFormat,
						ad,
						elapsedMs,
						holdMs,
						canSkip: canSkip && !skipped,
						exiting: phase === "exiting",
						reduceMotion,
						compact: true,
						onSkip: () => void onSkip(),
						onCta,
						onPick,
						pickedId
					}, impression),
					answerReady && phase === "holding" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-subtle",
						children: "Answer is ready. Skip to read it."
					}) : null
				]
			}) : null,
			messages.length === 0 && !busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestedPrompts, {
				kind,
				onPick: (q) => {
					unlockHoldAudio();
					if (fieldRef.current) fieldRef.current.value = q;
					setPrompt(q);
					beginHold(q);
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "relative z-10 shrink-0 border-t border-border bg-card p-3",
				onSubmit: (e) => {
					e.preventDefault();
					beginHold(fieldRef.current?.value ?? prompt, still);
				},
				children: [still && kind !== "hold" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: still,
							alt: "",
							className: "h-14 w-14 rounded-md object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "min-w-0 flex-1 text-xs text-muted-foreground",
							children: "Still attached. Ask Holdey to turn it into a video."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Remove still",
							onClick: () => setStill(null),
							className: "grid size-11 place-items-center rounded-md text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								className: "size-4",
								strokeWidth: 2
							})
						})
					]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2 rounded-xl bg-muted p-2 shadow-[0_0_0_1px_rgba(244,241,234,0.06)]",
					children: [
						kind !== "hold" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/jpeg,image/png,image/webp",
							className: "hidden",
							onChange: (e) => {
								const file = e.target.files?.[0];
								e.target.value = "";
								if (!file) return;
								stillFromFile(file).then((data) => setStill(data)).catch(() => setStill(null));
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Attach a still",
							disabled: busy,
							onClick: () => fileRef.current?.click(),
							className: "grid size-11 shrink-0 place-items-center rounded-md text-muted-foreground hover:text-foreground disabled:opacity-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {
								className: "size-4",
								strokeWidth: 2
							})
						})] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							ref: fieldRef,
							name: "prompt",
							value: prompt,
							onChange: (e) => setPrompt(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									beginHold(e.currentTarget.value);
								}
							},
							rows: 1,
							maxLength: 2e3,
							disabled: busy,
							placeholder: kind === "hold" ? "Describe the brand…" : "Ask Holdey, or attach a still…",
							suppressHydrationWarning: true,
							className: "max-h-28 min-h-11 flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-foreground outline-none placeholder:text-subtle"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy,
							"aria-label": "Send",
							className: "grid size-11 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground disabled:opacity-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
								className: "size-4",
								strokeWidth: 2
							})
						})
					]
				})]
			})
		]
	});
}
function Bubble({ role, text, links, imageUrl, videoUrl }) {
	const mine = role === "user";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex", mine ? "justify-end" : "justify-start"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("max-w-[90%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed", mine ? "rounded-br-sm bg-muted text-foreground" : "rounded-bl-sm text-foreground"),
			children: [
				links && !mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedCopy, { text }) : text,
				imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: imageUrl,
					alt: "",
					className: "mt-2 w-full rounded-md"
				}) : null,
				videoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: videoUrl,
					controls: true,
					playsInline: true,
					preload: "metadata",
					className: "mt-2 w-full rounded-md"
				}) : null
			]
		})
	});
}
var SITE_PATHS = [
	"/hold",
	"/holder",
	"/waits",
	"/bank",
	"/install",
	"/studio",
	"/network",
	"/proposal",
	"/ask"
];
function LinkedCopy({ text }) {
	const bits = text.split(/(\/(?:hold|holder|waits|bank|install|studio|network|proposal|ask))/g);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: bits.map((bit, i) => SITE_PATHS.includes(bit) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: bit,
		className: "underline underline-offset-4",
		children: bit
	}, `${bit}-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bit }, i)) });
}
function EmptyCopy({ kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-full flex-col justify-end gap-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-2xl leading-tight text-foreground",
			children: kind === "hold" ? "Describe the brand. Holdey writes the Hold." : kind === "help" ? "Ask Interlude. A Hold starts when you send." : "Ask Holdey. A Hold plays while it thinks."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-md text-sm text-muted-foreground",
			children: kind === "hold" ? "Holdey is Interlude’s in-house box. A Hold plays in the wait. Skip to read the spec, then place it." : "Ask a question, a picture, or a short video. Attach a still to turn it into a clip. Say add or remove a detail to update a picture. Interlude holds the wait until you skip."
		})]
	});
}
function SuggestedPrompts({ kind, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shrink-0 bg-card px-3 pb-1 pt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-0.5 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle",
			children: "Try one"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 grid grid-cols-2 gap-2 pb-2",
			children: (kind === "hold" ? HOLD_BRIEFS : SUGGESTED_PROMPTS).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: (e) => {
					e.preventDefault();
					e.stopPropagation();
					onPick(q);
				},
				className: "min-h-11 rounded-lg bg-muted px-3 py-2 text-left text-xs leading-snug text-foreground sm:text-sm",
				children: q
			}, q))
		})]
	});
}
//#endregion
export { draftToAd as n, stills as r, AetherChat as t };
