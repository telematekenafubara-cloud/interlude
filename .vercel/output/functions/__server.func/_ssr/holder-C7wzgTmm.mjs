import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ChevronLeft, l as Check, o as EyeOff, u as ArrowUp } from "../_libs/lucide-react.mjs";
import { C as nextFormat, S as nextAdId, _ as SKIP_AFTER_MS, b as adById, r as useBankStore, v as SPOT_MS, w as randomAdId, x as formatLabel } from "./router-B0-yeu4t.mjs";
import { r as cn } from "./marks-CpZHMeh2.mjs";
import { r as unlockHoldAudio } from "./watch-B_0QX3N9.mjs";
import { t as HoldPlayer } from "./hold-player-CJGIj7Dh.mjs";
import { t as HOLDER_DEFINITION } from "./definition-C2TCvqAS.mjs";
import { n as SiteFooter, r as SiteNav } from "./site-nav-CiPk068N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/holder-C7wzgTmm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PhoneFrame({ clock, carrier, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full min-w-0 max-w-[360px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-[32px] border border-border bg-card p-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.7)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex h-[min(36.5rem,calc(100dvh-8.5rem))] flex-col overflow-hidden rounded-[24px] bg-background",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBar, {
						clock,
						carrier
					}),
					children,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-x-0 bottom-1.5 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-28 rounded-full bg-foreground/25" })
					})
				]
			})
		})
	});
}
function StatusBar({ clock, carrier }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-11 shrink-0 items-end justify-between px-5 pb-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.8125rem] font-medium tabular-nums text-foreground",
				children: clock
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 pb-px text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.625rem] font-medium tracking-wide",
						children: carrier
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-end gap-px",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-0.5 rounded-sm bg-foreground/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-0.5 rounded-sm bg-foreground/60" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-0.5 rounded-sm bg-foreground/80" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-0.5 rounded-sm bg-foreground" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-2.5 w-5 rounded-[2px] border border-foreground/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-auto block h-full w-3/4 bg-foreground/80" })
					})
				]
			})
		]
	});
}
function PhoneHeader({ title, subtitle, initials, verified, onReset, showReset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-14 shrink-0 items-center gap-3 border-b border-border px-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-11 place-items-center text-subtle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: "size-5",
					strokeWidth: 1.75
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-9 shrink-0 place-items-center rounded-full bg-muted text-[0.6875rem] font-medium text-foreground",
				children: initials
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1 truncate text-sm font-medium text-foreground",
					children: [title, verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-3.5 place-items-center rounded-full bg-hold text-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-2.5",
							strokeWidth: 3
						})
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-subtle",
					children: subtitle
				})]
			}),
			showReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onReset,
				className: "h-11 px-2 text-xs text-muted-foreground hover:text-foreground",
				children: "Reset"
			}) : null
		]
	});
}
function Bubble({ mine, from, text, time }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex", mine ? "justify-end" : "justify-start"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("max-w-[84%] rounded-2xl px-3 py-2", mine ? "rounded-br-md bg-accent text-accent-foreground" : "rounded-bl-md bg-muted text-foreground"),
			children: [
				!mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.625rem] font-medium uppercase tracking-[0.12em] text-hold",
					children: from
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whitespace-pre-wrap text-[0.8125rem] leading-relaxed",
					children: text
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-1 text-right text-[0.625rem] tabular-nums", mine ? "text-accent-foreground/60" : "text-subtle"),
					children: time
				})
			]
		})
	});
}
var WAIT_SURFACES = [
	{
		id: "thread",
		n: "01",
		kicker: "Business chat · fintech, telco, e-commerce",
		holderType: "Business chat",
		holderLine: "A verified company thread. The lookup is the wait. The brand owns this well.",
		name: "Palms Line",
		channel: "Palms Line",
		verified: true,
		lastSeen: "online",
		initials: "PL",
		carrier: "ShoreNet",
		clock: "10:14",
		prompt: "Abeg wetin be my airtime and data so?",
		placeholder: "Message",
		answer: "Tola, airtime na ₦1,240. Data 6.2GB, expires 14 Sep. Reply 1 for ₦500 airtime · 2 for 1.5GB (30 days) · 3 to talk to a person.",
		hint: "A verified business thread. The lookup is the wait. The Hold sits between your message and their reply.",
		thread: [
			{
				from: "Palms Line",
				text: "Your Palms wallet top-up of ₦5,000 landed. Want airtime, data, or the shop?",
				time: "Yesterday"
			},
			{
				from: "You",
				text: "Airtime. Abeg how much remain?",
				time: "Yesterday",
				mine: true
			},
			{
				from: "Palms Line",
				text: "I dey check am. One second.",
				time: "09:41"
			}
		]
	},
	{
		id: "shore",
		n: "02",
		kicker: "In-app bank / fintech assistant",
		holderType: "Bank assistant",
		holderLine: "Home, balance, then the assistant. Processing is already a full-screen stare.",
		name: "Shore",
		channel: "Tola Adeyemi",
		lastSeen: "Secure session",
		initials: "TA",
		carrier: "5G",
		clock: "10:14",
		prompt: "Send 15k to my landlord, the Lekki Gate one",
		placeholder: "Ask Shore…",
		answer: "₦15,000 to ADEWALE KOLAWOLE · 0123481926 · Shore. Name match 96%. Shore Current ₦214,580.00 → ₦199,580.00 after send. Enter your 4-digit PIN to confirm. Nothing has left the account.",
		hint: "Home, balance, then the assistant. ‘Processing’ is already a full-screen stare. That is the well.",
		thread: [{
			from: "Shore",
			text: "You hid your balance. I can still move money if you confirm with PIN.",
			time: "08:02"
		}]
	},
	{
		id: "prep",
		n: "03",
		kicker: "School / exam / homework AI",
		holderType: "School",
		holderLine: "A tutor in the thread, an exam clock on the phone. The school or app owns this well.",
		name: "Prep Hall",
		channel: "Physics · Paper 1",
		lastSeen: "Amaka · tutor",
		initials: "PH",
		carrier: "MTN-d",
		clock: "10:14",
		prompt: "Abeg explain refraction, the one they like in objective.",
		placeholder: "Ask Amaka…",
		answer: "Refraction: light bends when it enters a new medium (air → water) because its speed changes. Exam wants: incident ray, refracted ray, and the normal at the point of incidence. Snell: n = sin i / sin r. Don’t mix it with reflection — that’s same medium, i = r. This is practice, not a board paper.",
		hint: "Cheap phone, exam clock, a tutor in the thread. Keep the Hold small and skippable.",
		thread: [
			{
				from: "Amaka",
				text: "Question 12: A ray of light travels from air into water. Which quantity remains the same? A. Speed  B. Wavelength  C. Frequency  D. Direction",
				time: "10:02"
			},
			{
				from: "You",
				text: "I put C. Frequency.",
				time: "10:06",
				mine: true
			},
			{
				from: "Amaka",
				text: "Correct. Frequency doesn’t change. You’re on 12/40. Next is refraction — ask if it’s still wahala.",
				time: "10:07"
			}
		]
	},
	{
		id: "civic",
		n: "04",
		kicker: "Government and telco web chat",
		holderType: "Civic desk",
		holderLine: "USSD on the web companion. The operator or ministry owns this well.",
		name: "Service Desk",
		channel: "*734# on the web",
		lastSeen: "Session 2:14",
		initials: "SD",
		carrier: "ShoreNet",
		clock: "10:14",
		prompt: "1",
		placeholder: "Reply 0-4",
		answer: "SHORE CONNECT\nSIM replace\nNIN match: OK\nVisit: Palms shop, Admiralty, Lekki\nBring: NIN slip + passport photograph\nEst. time: 20 min\nFee: ₦1,500\n\n0 Menu   00 End",
		hint: "The code is text. The Hold lives on the slow web companion people already open when *734# spins.",
		thread: []
	},
	{
		id: "forge",
		n: "05",
		kicker: "Local chatbot builders · agencies",
		holderType: "Agency builder",
		holderLine: "One preview. Every SME bot they wrap inherits the Hold. The agency is the Holder.",
		name: "Forge",
		channel: "Preview · Palms Shop",
		lastSeen: "Customer view",
		initials: "PS",
		carrier: "Wi-Fi",
		clock: "10:14",
		prompt: "Where is my package? PL-4401",
		placeholder: "Message Palms Shop",
		answer: "PL-4401 is out for delivery. Left Ikeja hub 9:12. Rider: Chinedu. Window 2–6pm, Lekki Phase 1. Share gate PIN 4401. Not in? We hold till tomorrow 11am.",
		hint: "The agency ships one preview. Every SME bot they wrap inherits the Hold.",
		thread: [
			{
				from: "Palms Shop",
				text: "Hi Tola — Palms Shop. We have PL-4401 (white sneakers, 42) packed from Ikeja.",
				time: "09:14"
			},
			{
				from: "You",
				text: "Can I still change to 43?",
				time: "09:16",
				mine: true
			},
			{
				from: "Palms Shop",
				text: "Too late to resize — it’s on the bike. I can start a return once it lands. Track it here anytime.",
				time: "09:18"
			}
		]
	},
	{
		id: "hall",
		n: "06",
		kicker: "Self-hosted campus / company chat",
		holderType: "Campus hall",
		holderLine: "A university or company owns this well. LibreChat-class software. They can install Interlude.",
		name: "Hall",
		channel: "ECO 101 · Dr. Bello",
		lastSeen: "Notes · campus Wi-Fi",
		initials: "H",
		carrier: "eduroam",
		clock: "10:14",
		prompt: "Summarise yesterday’s notes on demand. Short.",
		placeholder: "Ask Hall…",
		answer: "Demand = willingness and ability to buy at a price. Quantity demanded = one point on the curve. The curve shifts when income, taste, or the price of substitutes change (ceteris paribus). Price itself causes a movement along the curve, not a shift. Dr. Bello’s slide 7 is the diagram to redraw.",
		hint: "A university owns this well. LibreChat-class software. They can install Interlude. ChatGPT cannot.",
		thread: [
			{
				from: "Hall",
				text: "Uploaded: ECO101_lecture_04.pdf (2.4 MB) · yesterday 16:40 · Faculty of Social Sciences.",
				time: "Yesterday"
			},
			{
				from: "You",
				text: "I’ll read it later. Can you keep it to the definitions? I have a test.",
				time: "08:55",
				mine: true
			},
			{
				from: "Hall",
				text: "Ready when you are. Ask for demand, supply, or the whole hour.",
				time: "08:55"
			}
		]
	}
];
var WAIT_MS = 7e3;
function useWaitSession(surface) {
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [prompt, setPrompt] = (0, import_react.useState)(surface.prompt);
	const [adId, setAdId] = (0, import_react.useState)("northline");
	const [format, setFormat] = (0, import_react.useState)("cinematic");
	const [elapsedMs, setElapsedMs] = (0, import_react.useState)(0);
	const [exiting, setExiting] = (0, import_react.useState)(false);
	const [tick, setTick] = (0, import_react.useState)(0);
	const [pickedId, setPickedId] = (0, import_react.useState)(null);
	const [answerReady, setAnswerReady] = (0, import_react.useState)(false);
	const adIdRef = (0, import_react.useRef)(adId);
	const formatRef = (0, import_react.useRef)("cinematic");
	const elapsedRef = (0, import_react.useRef)(0);
	const skipRef = (0, import_react.useRef)(false);
	const workReadyRef = (0, import_react.useRef)(false);
	const sessionRef = (0, import_react.useRef)(0);
	const finishedRef = (0, import_react.useRef)(false);
	adIdRef.current = adId;
	formatRef.current = format;
	(0, import_react.useEffect)(() => {
		sessionRef.current += 1;
		finishedRef.current = false;
		skipRef.current = false;
		workReadyRef.current = false;
		elapsedRef.current = 0;
		formatRef.current = "cinematic";
		setPhase("idle");
		setPrompt(surface.prompt);
		setElapsedMs(0);
		setExiting(false);
		setAnswerReady(false);
		setPickedId(null);
		setFormat("cinematic");
		setAdId(randomAdId());
	}, [surface.id, surface.prompt]);
	(0, import_react.useEffect)(() => {
		if (phase !== "hold") return;
		workReadyRef.current = false;
		setAnswerReady(false);
		const session = sessionRef.current;
		const work = window.setTimeout(() => {
			if (session === sessionRef.current) {
				workReadyRef.current = true;
				setAnswerReady(true);
			}
		}, WAIT_MS);
		return () => window.clearTimeout(work);
	}, [phase, surface.id]);
	(0, import_react.useEffect)(() => {
		if (phase !== "hold") return;
		const session = sessionRef.current;
		const t0 = performance.now();
		elapsedRef.current = 0;
		let raf = 0;
		let closed = false;
		const loop = (now) => {
			if (closed || finishedRef.current || session !== sessionRef.current) return;
			const e = now - t0;
			elapsedRef.current = e;
			setElapsedMs(e);
			if (e >= 8e3) {
				closed = true;
				useBankStore.getState().credit({
					adId: adIdRef.current,
					skipped: false,
					source: `waits-${surface.id}`
				});
				const nextFmt = nextFormat(formatRef.current);
				const next = nextAdId(adIdRef.current, nextFmt);
				formatRef.current = nextFmt;
				adIdRef.current = next;
				setFormat(nextFmt);
				setAdId(next);
				setPickedId(null);
				setElapsedMs(0);
				setTick((n) => n + 1);
				return;
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			closed = true;
			cancelAnimationFrame(raf);
		};
	}, [
		phase,
		tick,
		surface.id
	]);
	function finish() {
		if (finishedRef.current) return;
		finishedRef.current = true;
		sessionRef.current += 1;
		setExiting(true);
		window.setTimeout(() => {
			setPhase("done");
			setExiting(false);
			setElapsedMs(0);
			setAnswerReady(false);
		}, 280);
	}
	function start() {
		unlockHoldAudio();
		skipRef.current = false;
		workReadyRef.current = false;
		finishedRef.current = false;
		elapsedRef.current = 0;
		formatRef.current = "cinematic";
		sessionRef.current += 1;
		setAdId(randomAdId());
		setFormat("cinematic");
		setPickedId(null);
		setAnswerReady(false);
		setElapsedMs(0);
		setExiting(false);
		setTick((n) => n + 1);
		setPhase("hold");
	}
	function skip() {
		if (elapsedRef.current < 5e3) return;
		if (finishedRef.current) return;
		skipRef.current = true;
		useBankStore.getState().credit({
			adId: adIdRef.current,
			skipped: true,
			source: `waits-${surface.id}`
		});
		finish();
	}
	return {
		phase,
		prompt,
		setPrompt,
		ad: adById(adId),
		format,
		elapsedMs,
		canSkip: elapsedMs >= SKIP_AFTER_MS,
		exiting,
		tick,
		pickedId,
		answerReady,
		start,
		skip,
		pick: (option) => setPickedId(option.id),
		reset: () => {
			sessionRef.current += 1;
			finishedRef.current = false;
			setPhase("idle");
			setElapsedMs(0);
			setExiting(false);
			setAnswerReady(false);
			setPickedId(null);
		}
	};
}
function HoldWell({ session }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-1.5 px-0.5 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle",
		children: [formatLabel(session.format), " Hold"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldPlayer, {
		format: session.format,
		ad: session.ad,
		elapsedMs: session.elapsedMs,
		holdMs: SPOT_MS,
		canSkip: session.canSkip,
		exiting: session.exiting,
		reduceMotion: false,
		compact: true,
		onSkip: session.skip,
		onCta: () => void 0,
		onPick: session.pick,
		pickedId: session.pickedId
	}, session.tick)] });
}
function HolderPage() {
	const [id, setId] = (0, import_react.useState)(WAIT_SURFACES[0].id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background pb-16 text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto min-w-0 max-w-6xl px-4 py-6 sm:px-6 sm:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
							children: "The Holder"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 max-w-xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl",
							children: "Who owns the wait."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base",
							children: HOLDER_DEFINITION
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12 sm:mt-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
								children: "Types of Holders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-serif text-3xl tracking-tight sm:text-4xl",
								children: "Six kinds. Same Hold."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground",
								children: "A Holder is classified by the well they already operate. Each of the six phones below is that product — send a line, and Holds keep playing until you skip."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3",
								children: WAIT_SURFACES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setId(s.id);
										document.getElementById(`holder-${s.id}`)?.scrollIntoView({
											behavior: "smooth",
											block: "start"
										});
									},
									className: cn("rounded-2xl p-4 text-left shadow-[0_0_0_1px_rgba(244,241,234,0.08)] transition-colors duration-200 sm:p-5", s.id === id ? "bg-muted" : "bg-card hover:bg-muted/60"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle sm:text-[0.6875rem]",
											children: [
												s.n,
												" · ",
												s.holderType
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-1.5 font-serif text-xl sm:text-2xl",
											children: s.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm",
											children: s.holderLine
										})
									]
								}, s.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
								children: "Where Africa already waits"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 max-w-xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl",
								children: "Six phones. Same Hold."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base",
								children: "Send a line in any of the six. Holds keep playing — Cinematic, Native, then Playable — until you skip. Same as Holdey."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid min-w-0 items-start gap-10 md:grid-cols-2",
								children: WAIT_SURFACES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									id: `holder-${s.id}`,
									className: "min-w-0 scroll-mt-24",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle",
											children: [
												s.n,
												" · ",
												s.holderType
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1.5 font-serif text-2xl",
											children: s.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mb-5 mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground",
											children: s.hint
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfacePhone, { surface: s })
									]
								}, s.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-8 text-sm text-muted-foreground",
								children: [
									"Watching credits",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/bank",
										className: "text-foreground underline-offset-4 hover:underline",
										children: "Bank"
									}),
									"."
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function SurfacePhone({ surface }) {
	const session = useWaitSession(surface);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PhoneFrame, {
		clock: surface.clock,
		carrier: surface.carrier,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneHeader, {
				title: surface.id === "forge" ? "Palms Shop" : surface.id === "civic" ? "Shore Connect" : surface.name,
				subtitle: surface.verified ? `${surface.channel} · ${surface.lastSeen}` : surface.lastSeen,
				initials: surface.initials,
				verified: surface.verified,
				onReset: session.reset,
				showReset: session.phase !== "idle"
			}),
			surface.id === "shore" && session.phase === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoreHome, {}) : null,
			surface.id === "prep" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrepBanner, {}) : null,
			surface.id === "forge" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "bg-muted px-3 py-1.5 text-center text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle",
				children: "Forge preview · customer phone"
			}) : null,
			surface.id === "hall" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-b border-border px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.14em] text-subtle",
				children: surface.channel
			}) : null,
			surface.id === "civic" && session.phase === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CivicMenu, { onPick: session.start }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3 py-3",
					children: [
						surface.thread.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bubble, { ...line }, `${line.time}-${i}`)),
						session.phase !== "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bubble, {
							mine: true,
							from: "You",
							text: session.prompt,
							time: surface.clock
						}) : null,
						session.phase === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "answer-in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bubble, {
								from: surface.id === "prep" ? "Amaka" : surface.id === "forge" ? "Palms Shop" : surface.id === "thread" ? "Palms Line" : surface.name,
								text: surface.answer,
								time: surface.clock
							})
						}) : null
					]
				}),
				session.phase === "hold" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 px-3 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldWell, { session })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 px-1 text-[0.6875rem] text-subtle",
						children: session.answerReady ? "Reply is ready. Skip to read it." : surface.id === "civic" ? "Please wait…" : surface.id === "shore" ? "Checking name match…" : "Typing…"
					})]
				}) : null,
				surface.id !== "civic" || session.phase !== "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex shrink-0 items-end gap-2 border-t border-border px-3 pb-5 pt-2",
					onSubmit: (e) => {
						e.preventDefault();
						if (session.phase !== "hold") session.start();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: session.prompt,
						onChange: (e) => session.setPrompt(e.target.value),
						disabled: session.phase === "hold",
						placeholder: surface.placeholder,
						className: "h-11 min-w-0 flex-1 rounded-full bg-muted px-4 text-sm text-foreground outline-none ring-ring/70 focus:ring-2 disabled:opacity-50",
						"aria-label": "Message",
						suppressHydrationWarning: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: session.phase === "hold",
						"aria-label": "Send",
						className: "grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground disabled:opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
							className: "size-4",
							strokeWidth: 2
						})
					})]
				}) : null
			] })
		]
	});
}
function ShoreHome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shrink-0 border-b border-border px-4 py-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: "Shore Current"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
					className: "size-3.5 text-subtle",
					strokeWidth: 1.75
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 font-serif text-2xl tabular-nums tracking-tight",
				children: "₦214,580.00"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex gap-2",
				children: [
					"Send",
					"Bills",
					"Airtime"
				].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-muted px-3 py-1 text-xs text-foreground",
					children: l
				}, l))
			})
		]
	});
}
function PrepBanner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-border px-4 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-foreground",
					children: "Physics · Paper 1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tabular-nums text-hold",
					children: "38:12 left"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1.5 h-1 overflow-hidden rounded-full bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-[30%] bg-hold" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[0.625rem] text-subtle",
				children: "12 / 40 · Amaka is in this thread"
			})
		]
	});
}
function CivicMenu({ onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "whitespace-pre-wrap font-sans text-[0.8125rem] leading-relaxed text-foreground",
				children: `SHORE CONNECT
Welcome Tola
1. Replace SIM
2. NIN / BVN
3. Report mast
4. Pay bill
0. End`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-subtle",
				children: "Reply with a number"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: [
					["1", "Replace SIM"],
					["2", "NIN / BVN help"],
					["3", "Report a mast"],
					["4", "Pay a bill"],
					["0", "Back to *734#"]
				].map(([n, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: n === "0",
					onClick: n === "0" ? void 0 : onPick,
					className: "flex h-12 w-full items-center gap-3 rounded-xl bg-muted px-4 text-left text-sm text-foreground disabled:opacity-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium tabular-nums text-hold",
						children: n
					}), label]
				}) }, n))
			})
		]
	});
}
//#endregion
export { HolderPage as component };
