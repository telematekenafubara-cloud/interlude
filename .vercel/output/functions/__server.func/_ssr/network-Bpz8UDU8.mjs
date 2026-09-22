import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Check, s as Copy } from "../_libs/lucide-react.mjs";
import { b as adById, d as usd, l as settleOne, p as usdFine, r as useBankStore } from "./router-B0-yeu4t.mjs";
import { r as cn } from "./marks-CpZHMeh2.mjs";
import { n as SiteFooter, r as SiteNav, t as Button } from "./site-nav-CiPk068N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/network-Bpz8UDU8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HOLD_BID_JSON = JSON.stringify({
	id: "hold-req-demo",
	at: 1,
	tmax: 400,
	cur: ["USD"],
	imp: [{
		id: "1",
		bidfloor: .012,
		bidfloorcur: "USD",
		video: {
			mimes: ["video/mp4", "video/webm"],
			minduration: 6,
			maxduration: 15,
			protocols: [
				2,
				3,
				7,
				8
			],
			w: 1280,
			h: 720,
			startdelay: 0,
			plcmt: 1,
			skip: 1,
			skipmin: 5,
			skipafter: 5,
			playbackmethod: [1],
			pos: 1,
			linearity: 1
		}
	}],
	site: {
		domain: "publisher.example",
		page: "/chat",
		publisher: { id: "aether" }
	},
	user: { id: "il_viewer" },
	ext: { interlude: {
		format: "hold",
		waitMs: 8e3,
		labeled: true
	} }
}, null, 2);
var MOCK_BIDDERS = [
	{
		id: "solace",
		name: "Maison Solace",
		seat: "direct-io",
		adId: "solace",
		cpm: 28,
		note: "Direct insertion order. Pays for completed Holds."
	},
	{
		id: "northline",
		name: "Northline",
		seat: "house",
		adId: "northline",
		cpm: 22,
		note: "House catalog. Floor for unsold wait."
	},
	{
		id: "harbor",
		name: "Harbor & Pine",
		seat: "open-rtb",
		adId: "harbor",
		cpm: 16,
		note: "Open auction. Skippable video creative."
	}
];
var STEPS = [
	{
		n: "01",
		title: "Become a company that can sell ads",
		body: "Form the entity. In Nigeria that means CAC, then ARCON before you charge anyone for advertising. Add NDPR rules for viewer IDs. Open Paystack or Flutterwave for payouts. No network will wire money to a prototype."
	},
	{
		n: "02",
		title: "Name the inventory in industry language",
		body: "A Hold is skippable in-stream video: 6–15 seconds, skip allowed after 5, 100% in-view, sound off until unmute. That maps to IAB VAST 4 and OpenRTB video.skip. Buyers already know this slot. They do not know “AI thinking time” until you describe it that way."
	},
	{
		n: "03",
		title: "Publishers wrap the wait they already have",
		body: "hold.js occupies the answer well. The app you ship calls Interlude.whileWaiting around askModel(). ChatGPT and Grok cannot be wrapped from the outside. Inventory only exists where a product installs the script."
	},
	{
		n: "04",
		title: "Fill with house ads first",
		body: "Direct insertion orders from brands you know. No Google required. This demo already does that with a local catalog. House fill proves the format before any exchange will take you seriously."
	},
	{
		n: "05",
		title: "Then speak VAST and OpenRTB",
		body: "Path A: a VAST tag from Google Ad Manager, played through IMA in the Hold player. Path B: Interlude sends a bid request (400ms budget — the model is already thinking) and DSPs bid skippable video. Path C stays direct IO. Most new formats start on C, add A, then B."
	},
	{
		n: "06",
		title: "Measure what buyers pay for",
		body: "Fire VAST trackers: impression, first-quartile, skip, complete. Count only if the Hold was on-screen. Skip at 5 seconds is a cheaper CPM ($12) than a full 8-second complete ($22). That is the rate card, not a live auction yet."
	},
	{
		n: "07",
		title: "Split the money",
		body: "Advertiser pays the CPM. Watcher 40%, Holder 35% (owns the chat), Interlude 25%. Until invoices exist, the Bank page is a ledger of play money."
	},
	{
		n: "08",
		title: "Pay people for real",
		body: "Monthly from $25, in naira or dollars, through a licensed processor. Connect the Interlude ID from Bank so each impression knows who watched. Do not ask for a ChatGPT password. Do not claim this preview can settle cash."
	}
];
var PATHS = [
	{
		id: "house",
		name: "House + direct IO",
		status: "Live in this preview",
		detail: "Brands you sell yourself. Creative lives in the catalog. No bidstream. This is how every new format starts."
	},
	{
		id: "vast",
		name: "VAST tag (Ad Manager / IMA)",
		status: "Not connected",
		detail: "Publisher or Interlude requests a VAST 4 tag. IMA plays the video in the Hold. Skip comes from the VAST skipoffset. Standard for YouTube-like inventory."
	},
	{
		id: "rtb",
		name: "OpenRTB 2.6 exchange",
		status: "Not connected",
		detail: "Each wait is an auction. DSPs (The Trade Desk, DV360, Xandr) bid in ~400ms. Highest valid skippable video wins. Sample request below."
	}
];
function NetworkPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background pb-16 text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paths, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Auction, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Steps, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BidSpec, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
			children: "Demand · protocol · payouts"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl",
			children: "How a Hold gets bought."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
			children: "This page is a map, not a live wire to Google. No DSP is bidding. The steps below are what Interlude would actually do to sell wait time as skippable video."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowCell, {
					k: "Brand",
					v: "Pays a CPM",
					d: "Through a DSP or a direct order."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowCell, {
					k: "Holder",
					v: "Owns the well",
					d: "35% — the chat or app."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowCell, {
					k: "Watcher",
					v: "Banked 40%",
					d: "Skip at 5s, or watch through."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowCell, {
					k: "Interlude",
					v: "Runs the slot",
					d: "25% — licence, Bank, demand."
				})
			]
		})
	] });
}
function FlowCell({ k, v, d }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-card px-5 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle",
				children: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-serif text-2xl tracking-tight",
				children: v
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: d
			})
		]
	});
}
function Paths() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "Three ways demand arrives"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-serif text-3xl tracking-tight sm:text-4xl",
				children: "Start direct. Add a tag. Then an exchange."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-3 md:grid-cols-3",
				children: PATHS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-hold",
							children: p.status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-serif text-2xl tracking-tight",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: p.detail
						})
					]
				}, p.id))
			})
		]
	});
}
function Auction() {
	const credit = useBankStore((s) => s.credit);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [winner, setWinner] = (0, import_react.useState)(null);
	const [skipped, setSkipped] = (0, import_react.useState)(null);
	const ranked = (0, import_react.useMemo)(() => [...MOCK_BIDDERS].sort((a, b) => b.cpm - a.cpm), []);
	function run() {
		setSkipped(null);
		setWinner(null);
		setPhase("bidding");
		window.setTimeout(() => {
			const w = ranked[0];
			setWinner(w);
			setPhase("won");
		}, 720);
	}
	function settle(didSkip) {
		if (!winner) return;
		setSkipped(didSkip);
		credit({
			adId: winner.adId,
			skipped: didSkip,
			source: "network-auction"
		});
		setPhase("settled");
	}
	const pay = winner && skipped !== null ? settleOne(skipped) : null;
	const ad = winner ? adById(winner.adId) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "Simulated auction"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-serif text-3xl tracking-tight sm:text-4xl",
				children: "A wait goes up for bid."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base",
				children: "This uses house brands only. It is the shape of OpenRTB, not a connection to The Trade Desk or Google. Completing or skipping credits the Bank at the demo rate card."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								phase === "idle" && "No bid request yet.",
								phase === "bidding" && "tmax 400ms · three seats responding",
								phase === "won" && winner && `Won · ${winner.name} · $${winner.cpm} CPM`,
								phase === "settled" && winner && `${winner.name} · ${skipped ? "skipped at 5s" : "completed"}`
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: phase === "idle" || phase === "settled" ? "primary" : "outline",
							onClick: run,
							disabled: phase === "bidding",
							children: phase === "idle" ? "Run a Hold auction" : "Run again"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-2",
						children: ranked.map((b) => {
							const active = phase !== "idle";
							const isWin = winner?.id === b.id && phase !== "bidding";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: cn("flex items-baseline justify-between gap-3 rounded-xl border px-4 py-3", isWin ? "border-hold/40 bg-muted" : "border-border bg-background", !active && "opacity-50"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm text-foreground",
										children: b.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-subtle",
										children: b.seat
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "shrink-0 font-serif text-xl tabular-nums",
									children: active ? `$${b.cpm}` : "—"
								})]
							}, b.id);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-56 flex-col justify-between rounded-2xl border border-border bg-card p-5 sm:p-6",
					children: [
						phase === "idle" || phase === "bidding" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-2xl tracking-tight",
							children: phase === "bidding" ? "Asking demand…" : "Winner plays in the well."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Highest CPM with a skippable video creative fills the thinking seconds. Floor is $12 CPM."
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-hold",
								children: ad?.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-serif text-3xl tracking-tight",
								children: ad?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: ad?.tagline
							}),
							pay && skipped !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-5 grid grid-cols-3 gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Advertiser"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "tabular-nums",
										children: usdFine(pay.advertiser)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Interlude"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "tabular-nums",
										children: usdFine(pay.interlude)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Viewer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "tabular-nums",
										children: usdFine(pay.viewer)
									})] })
								]
							})
						] }),
						phase === "won" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => settle(false),
								children: "Complete 8s"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => settle(true),
								children: "Skip at 5s"
							})]
						}),
						phase === "settled" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-sm text-muted-foreground",
							children: [
								"Credited to",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/bank",
									className: "text-foreground underline-offset-4 hover:underline",
									children: "Bank"
								}),
								". ",
								usd(25),
								" floor still applies. No naira moved."
							]
						})
					]
				})]
			})
		]
	});
}
function Steps() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "Integration sequence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-serif text-3xl tracking-tight sm:text-4xl",
				children: "Eight steps. In this order."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 divide-y divide-border border-y border-border",
				children: STEPS.map((step, i) => {
					const on = open === i;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full items-start gap-4 py-5 text-left",
						onClick: () => setOpen(on ? -1 : i),
						"aria-expanded": on,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-10 shrink-0 font-serif text-xl text-hold",
							children: step.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium text-foreground",
								children: step.title
							}), on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block text-sm leading-relaxed text-muted-foreground",
								children: step.body
							})]
						})]
					}) }, step.n);
				})
			})
		]
	});
}
function BidSpec() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copy() {
		try {
			await navigator.clipboard.writeText(HOLD_BID_JSON);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "OpenRTB 2.6 · video.skip"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-serif text-3xl tracking-tight sm:text-4xl",
				children: "What a Hold looks like to a DSP."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base",
				children: "skip = 1, skipafter = 5, minduration 6, maxduration 15, playback method autoplay muted. tmax is 400ms because the model is already working — unlike a banner, you are not racing a page load."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-6 min-w-0 overflow-hidden rounded-2xl border border-border bg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					className: "absolute right-3 top-3 z-10",
					onClick: copy,
					children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : "Copy"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "max-h-[28rem] overflow-auto p-5 pr-28 text-xs leading-relaxed text-hold sm:text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: HOLD_BID_JSON })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 max-w-2xl text-sm text-muted-foreground",
				children: [
					"Next: wrap your own wait on",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/install",
						className: "text-foreground underline-offset-4 hover:underline",
						children: "Install"
					}),
					". Earnings land in",
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
	});
}
//#endregion
export { NetworkPage as component };
