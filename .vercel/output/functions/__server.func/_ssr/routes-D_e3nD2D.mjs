import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AetherChat } from "./aether-chat-Kqgkzyfm.mjs";
import { n as SiteFooter, r as SiteNav, t as Button } from "./site-nav-CiPk068N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D_e3nD2D.js
var import_jsx_runtime = require_jsx_runtime();
function LandingDemo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-3 rounded-[1.75rem] bg-muted/40 sm:-inset-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherChat, {
				live: true,
				demo: true,
				compact: true,
				className: "h-[min(32rem,calc(100dvh-8rem))] sm:h-[36rem]"
			})
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background pb-16 text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-6xl px-4 pt-3 sm:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/og.jpg?v=14",
						alt: "Interlude. Ask Holdey. A Hold plays. Then the answer.",
						width: 1200,
						height: 630,
						className: "aspect-[1200/630] w-full rounded-xl object-cover object-center"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6 sm:pb-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingDemo, {})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Proof, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Why, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise-in text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
				children: "A new ad format"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "rise-in stagger-1 mt-4 max-w-3xl font-serif text-[2.75rem] leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl",
				children: "The wait is the inventory."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise-in stagger-2 mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg",
				children: "People spend seconds staring at a thinking model. Interlude places a Hold in those seconds — timed, labeled, skippable — then the answer arrives."
			})
		]
	});
}
function Proof() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-4",
			children: [
				{
					k: "8s",
					v: "Each Hold"
				},
				{
					k: "5s",
					v: "Until the skip arrow"
				},
				{
					k: "1 well",
					v: "Nothing else on screen"
				},
				{
					k: "0 feed",
					v: "No scroll-past"
				}
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-background px-4 py-6 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-3xl tabular-nums leading-none",
					children: item.k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: item.v
				})]
			}, item.k))
		})
	});
}
function How() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
				children: "How Interlude works"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 max-w-xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl",
				children: "Dead air, recaptured."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-10 md:grid-cols-3",
				children: [
					{
						n: "01",
						t: "A question is asked",
						d: "The model starts thinking. Attention is complete, unused, and already paid for by the wait."
					},
					{
						n: "02",
						t: "A Hold occupies the well",
						d: "A labeled Hold fills the well. Skip arrow after five seconds. If you leave it, the next brand starts — the wait stays occupied."
					},
					{
						n: "03",
						t: "The answer dissolves in",
						d: "The brand received a full look. The product did not get slower. The wait had somewhere to go."
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-2xl text-hold",
						children: s.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 font-serif text-2xl leading-tight",
						children: s.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted-foreground",
						children: s.d
					})
				] }, s.n))
			})
		]
	});
}
function Why() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
				children: "Why this inventory exists"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-serif text-4xl leading-tight tracking-tight",
				children: "Attention was always in the spinner."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-8 sm:grid-cols-2",
				children: [
					{
						t: "The user already agreed to wait",
						d: "A Hold does not invent interruption. It occupies time that was going to pass anyway."
					},
					{
						t: "There is no feed to scroll past",
						d: "One question. One well. Viewability is a property of the interface, not a bid."
					},
					{
						t: "Intent is sitting in the composer",
						d: "They just typed a need. The brand is adjacent to a real question, not a vacant banner slot."
					},
					{
						t: "The reward is on the other side",
						d: "The answer is the end card. Completion is structural. Skip exists so trust can."
					}
				].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium text-foreground",
					children: p.t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: p.d
				})] }, p.t))
			})]
		})
	});
}
function Close() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-4xl leading-tight tracking-tight sm:text-6xl",
					children: "If your product makes people wait, you already have inventory."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-base text-muted-foreground sm:text-lg",
					children: "Wrap the call you already make. A Hold plays in the well. After five seconds, a skip arrow. Then the answer arrives."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-subtle",
					children: [
						"Prototype by Telema Tekena Fubara · Built with Grok, September 2026",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"© 2026 Telema Tekena Fubara. All rights reserved."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/install",
							children: ["Add to your app", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "size-4",
								strokeWidth: 1.75
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/studio",
							children: "Run a Hold"
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { Home as component };
