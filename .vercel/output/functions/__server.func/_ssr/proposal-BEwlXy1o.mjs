import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as INTERLUDE_SHARE, c as settleMany, d as usd, i as HOLDER_SHARE, o as VIEWER_SHARE, s as pct } from "./router-B0-yeu4t.mjs";
import { n as INTERLUDE_DEFINITION, r as WAIT_DEFINITION, t as HOLDER_DEFINITION } from "./definition-C2TCvqAS.mjs";
import { n as SiteFooter, r as SiteNav, t as Button } from "./site-nav-CiPk068N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/proposal-BEwlXy1o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var POST_X = `The wait is the inventory.

Interlude turns the seconds an AI spends thinking into a labeled, skippable Hold. Skip arrow at 5s. If you don’t skip, the next ad plays.

Advertiser pays. Watcher 40%. Holder (the chat owner) 35%. Interlude 25%. Naira wallets.

Not inside ChatGPT, Grok, Gemini, or Claude — only in apps that install the script. WhatsApp/Snap threads: we play on a page you own.

$80k seed. 18 months. Lagos.

Prototype by Telema Tekena Fubara. Built with Grok, September 2026.
© 2026 Telema Tekena Fubara. All rights reserved.`;
var POST_WHATSAPP = `Interlude — funding note (Lagos, Sept 2026)

We turn the wait while an AI thinks into a skippable video ad (a Hold). Skip at 5 seconds. Advertiser pays a CPM. Watcher 40%, Holder (chat owner) 35%, Interlude 25%. Naira wallets.

Ask: $80,000 seed / 18 months. Equity or SAFE. Not a bank loan until there are invoices.

Not inside ChatGPT. Inside bots and apps Nigerian companies already control.

Prototype by Telema Tekena Fubara. Full proposal:
© 2026 Telema Tekena Fubara. All rights reserved.`;
var POST_EMAIL_SUBJECT = "Interlude — $80k seed proposal (the wait is the inventory)";
var POST_EMAIL_BODY = `Hello,

I’m sending the Interlude funding proposal.

Interlude is a drop-in SDK and naira wallet. While an AI thinks, a labeled Hold plays in the answer well. Skip at five seconds; the next ad continues if they don’t skip. Advertisers pay a CPM. We split: 40% watcher, 35% Holder (the owner of that chat or app), 25% Interlude.

We are not injecting ads into ChatGPT, Grok, Gemini, Claude, WhatsApp, or Snapchat. Inventory is only in products that install hold.js — bank assistants, school tools, agency bots, campus chat.

Ask: $80,000 for 18 months (equity/SAFE). The cheque is for CAC/ARCON, production SDK, first Holder waits, and two paying naira insertion orders.

This is a prototype (September 2026, Lagos), not traction. Rate card is a plan.

Full document is attached / at the proposal page.

Telema Tekena Fubara
Prototype. Built with Grok, September 2026.
© 2026 Telema Tekena Fubara. All rights reserved.`;
/** Download a printable copy. window.print() is blocked inside the Grok iframe. */
function downloadProposalHtml(source) {
	const clone = source.cloneNode(true);
	clone.querySelectorAll("[data-no-print]").forEach((node) => node.remove());
	const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Interlude — Funding proposal</title>
  <style>
    :root { color-scheme: light; }
    body {
      margin: 0;
      background: #fff;
      color: #111;
      font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
      line-height: 1.55;
    }
    main { max-width: 40rem; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
    h1 { font-size: 2.4rem; font-weight: 400; letter-spacing: -0.03em; margin: 0.3rem 0 0; }
    h2 { font-size: 1.45rem; font-weight: 400; letter-spacing: -0.02em; margin: 0 0 0.75rem; }
    p, li { font-size: 0.98rem; }
    p { margin: 0.6rem 0; }
    ul, ol { padding-left: 1.2rem; }
    code { font-family: ui-monospace, Menlo, monospace; font-size: 0.86em; }
    section, header { border-bottom: 1px solid #ddd; padding: 1.6rem 0; }
    header { padding-top: 0; }
    a { color: inherit; }
    @media print {
      main { padding: 0; max-width: none; }
      section, header { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <main>${clone.innerHTML}</main>
</body>
</html>`;
	const blob = new Blob([html], { type: "text/html;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "Interlude-funding-proposal.html";
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 4e3);
	return true;
}
function printProposal() {
	try {
		window.print();
		return true;
	} catch {
		return false;
	}
}
var ASK_USD = 8e4;
var thousand = settleMany(1e3, 0);
function ProposalPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background pb-16 text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "print:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "proposal-doc",
				className: "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 print:max-w-none print:px-0 print:py-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Posted, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "What Interlude is",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base leading-relaxed text-foreground sm:text-lg",
							children: INTERLUDE_DEFINITION
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TheAsk, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "The problem",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every AI product already makes people wait. In Africa that wait is longer: reasoning models, WhatsApp business bots, image tools, and phone networks. Today the well is a spinner. Brands cannot buy it. Watchers are not paid. The seconds are wasted." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4",
							children: [
								"ChatGPT and Google sell ads",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "under the answer" }),
								", not in the think. Kickbacks sells a one-line status inside US coding tools. Nobody is the licensed wait-time layer for African AI products that local companies actually control."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "The product",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "list-disc space-y-2 pl-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SDK." }),
									" One wrap:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "text-hold",
										children: "Interlude.whileWaiting(() => askModel())"
									}),
									". A Hold occupies the well."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Wait." }),
									" ",
									WAIT_DEFINITION
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Holder." }),
									" ",
									HOLDER_DEFINITION
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Hold." }), " 6–15s labeled video. Skip at 5s. Next ad if they do not skip. Answer always arrives."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Bank." }),
									" Watcher ",
									pct(VIEWER_SHARE),
									" in naira. Holder (the chat owner) ",
									pct(HOLDER_SHARE),
									". Interlude",
									" ",
									pct(INTERLUDE_SHARE),
									". Payout via Paystack / Flutterwave."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Network." }), " House ads and direct insertion orders first. VAST and OpenRTB later. Not a live Google pipe today."] })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Economics, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpectedRevenue, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "How we own Nigeria and Africa",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We do not fight ChatGPT or Kickbacks on their home screens. We become the default Hold inside waits African products already operate." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "mt-4 list-decimal space-y-2 pl-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Licence first: CAC, ARCON, NDPR. Vet every creative. US tools skip this; that is the moat." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Direct naira insertion orders — MTN, banks, fintech, FMCG — before any exchange." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"SDK in WhatsApp Business AI bots, bank in-app assistants, school tools, local chatbot builders. Not a consumer destination app. See the six wells on",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/holder",
										className: "text-foreground underline-offset-4 hover:underline",
										children: "Holder"
									}),
									"."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Small, muted, skippable Holds. Pidgin and local languages. Cheap on data." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Then Ghana, Kenya, South Africa with the same SDK and local licences. Not “launch Africa” as one slide." })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Competition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Kickbacks / Idlen: text in a coding spinner; pay the developer. Aryel Loader Ads: video in the think well; pay the publisher. ChatGPT / Google: ads after the answer; never delay generation. Claude / Cursor: fill the wait with process and charge a subscription." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4",
							children: "Interlude is video + 5s skip + pay the watcher, only in apps that install the script. Closest ideas already exist abroad. This company is the African licence, naira Bank, and WhatsApp/bank distribution — not a claim to have invented waiting."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Go to market",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: "First 90 days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-2 list-disc space-y-1 pl-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Days 1–30: incorporate, ARCON, Paystack, five vetted house ads." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Days 31–60: one live bot (SME or campus WhatsApp AI) on hold.js." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Days 61–90: two paying brands on insertion orders; first naira test payout." })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-medium text-foreground",
								children: "Eighteen months"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-2 list-disc space-y-1 pl-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Ten publisher installs (bots, bank or school assistants)." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Repeatable naira IO motion with Lagos agencies." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Second market (Ghana or Kenya) only after Nigerian invoices exist." })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseOfFunds, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Risks we will say out loud",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "list-disc space-y-2 pl-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pre-revenue. This document is not a traction slide." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Fast models shrink short waits. We sell reasoning, agents, video gen, and African network delay — not 200ms chat." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "ARCON vetting can slow creative. We treat that as the product." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Banks do not lend to prototypes. Equity or a grant is the honest first cheque; a facility comes after invoices." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "We cannot and will not inject ads into ChatGPT, Grok, Gemini, or Claude." })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "What exists today",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A working prototype (September 2026, Lagos): Hold player, 5s skip, playlist, drop-in hold.js, Bank ledger, Network auction map, live model wait in Studio and Quill. Money on screen is a rate card, not cash." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "The founder",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Telema Tekena Fubara conceived this Interlude prototype and owns the output of this build as between him and Grok, under SpaceXAI consumer terms. The next step is a Nigerian company, not another demo." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-16 text-xs leading-relaxed text-subtle print:mt-8",
						children: [
							"Posted publicly 3 September 2026, Lagos. Not an offer of securities. Figures are a plan, not audited results. Expected Revenue is the same rate card at 50,000 Holders × 200 people/day — not invoices. Rate card:",
							" ",
							usd(22),
							" completed CPM, ",
							usd(12),
							" skip CPM, watcher",
							" ",
							pct(VIEWER_SHARE),
							" / Holder ",
							pct(HOLDER_SHARE),
							" / Interlude",
							" ",
							pct(INTERLUDE_SHARE),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground",
						children: [
							"Prototype by Telema Tekena Fubara. Built with Grok, September 2026.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"© 2026 Telema Tekena Fubara. All rights reserved."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "print:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			})
		]
	});
}
function Cover() {
	const [note, setNote] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "border-b border-border pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
				children: "Posted · September 2026 · Lagos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl",
				children: "Interlude"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-serif text-xl text-muted-foreground sm:text-2xl",
				children: "Funding proposal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "Prepared for an investor or a bank."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center gap-2 print:hidden",
				"data-no-print": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: () => {
							printProposal();
							setNote("If no print dialog opened, use Save — print is blocked in this preview.");
						},
						children: "Print"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "primary",
						onClick: () => {
							const root = document.getElementById("proposal-doc");
							if (!root) return;
							downloadProposalHtml(root);
							setNote("Saved Interlude-funding-proposal.html");
						},
						children: "Save"
					}),
					note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "basis-full text-xs text-muted-foreground",
						children: note
					}) : null
				]
			})
		]
	});
}
function Posted() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-b border-border py-10 print:hidden",
		"data-no-print": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl tracking-tight sm:text-3xl",
				children: "Post this"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted-foreground",
				children: "Copy a note for X, WhatsApp, or email. I cannot publish to your accounts from here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBlock, {
						label: "X",
						text: POST_X
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBlock, {
						label: "WhatsApp",
						text: POST_WHATSAPP
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBlock, {
						label: "Email",
						text: `Subject: ${POST_EMAIL_SUBJECT}\n\n${POST_EMAIL_BODY}`
					})
				]
			})
		]
	});
}
function CopyBlock({ label, text }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				type: "button",
				onClick: () => {
					navigator.clipboard.writeText(text).then(() => {
						setCopied(true);
						window.setTimeout(() => setCopied(false), 1600);
					});
				},
				children: copied ? "Copied" : "Copy"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "mt-3 max-h-40 overflow-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground",
			children: text
		})]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-b border-border py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-serif text-2xl tracking-tight sm:text-3xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base",
			children
		})]
	});
}
function TheAsk() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "The ask",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-serif text-3xl text-foreground",
			children: usd(ASK_USD)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-sm",
			children: "Seed capital for 18 months. Equity or SAFE for investors. A bank should read this as a partnership brief, not a loan request, until there are invoices."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4",
			children: "The cheque buys a licensed Nigerian entity, ARCON-ready creatives, one production SDK, ten publisher waits, and two paying brands — not a global ad exchange."
		})]
	});
}
function Economics() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Unit economics (demo rate card)",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Premium skippable video, 100% in-view. Not live demand. For 1,000 completed Holds:" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Advertiser pays",
						v: usd(thousand.advertiser)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Holder",
						v: usd(thousand.holder)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Watcher bank",
						v: usd(thousand.viewer)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Interlude",
						v: usd(thousand.interlude)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4",
				children: [
					"Skip at 5s is ",
					usd(12),
					" CPM. Complete is ",
					usd(22),
					" CPM. Split: watcher ",
					pct(VIEWER_SHARE),
					", Holder ",
					pct(HOLDER_SHARE),
					" (owns the chat), Interlude ",
					pct(INTERLUDE_SHARE),
					". Scale in Africa is default SDK in local bots, not a billion ChatGPT impressions."
				]
			})
		]
	});
}
var HOLDERS = 5e4;
var DAU_PER_HOLDER = 200;
var PEOPLE_DAY = HOLDERS * DAU_PER_HOLDER;
var MONTH_DAYS = 30;
var TAX_RATE = .3;
var SCENARIOS = [
	{
		name: "Quiet",
		questions: 1,
		skipRate: .7,
		fill: .8,
		holdsPerQuestion: 1,
		opex: 521e3
	},
	{
		name: "Working",
		questions: 3,
		skipRate: .65,
		fill: .9,
		holdsPerQuestion: 1,
		opex: 1416e3
	},
	{
		name: "Hot",
		questions: 5,
		skipRate: .5,
		fill: 1,
		holdsPerQuestion: 1.3,
		opex: 3343e3
	}
];
function planScenario(s) {
	const showsDay = Math.round(PEOPLE_DAY * s.questions * s.fill * s.holdsPerQuestion);
	const showsMonth = showsDay * MONTH_DAYS;
	const settled = settleMany(showsMonth, s.skipRate);
	const op = settled.interlude - s.opex;
	const tax = op > 0 ? op * TAX_RATE : 0;
	return {
		...s,
		showsDay,
		showsMonth,
		...settled,
		op,
		tax,
		net: op - tax
	};
}
function compactCount(n) {
	if (n >= 1e9) return `${(n / 1e9).toFixed(1)}bn`;
	if (n >= 1e6) {
		const m = n / 1e6;
		return Number.isInteger(m) ? `${m}m` : `${m.toFixed(m >= 10 ? 0 : 1)}m`;
	}
	return n.toLocaleString("en-US");
}
function ExpectedRevenue() {
	const rows = SCENARIOS.map(planScenario);
	const working = rows[1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Expected Revenue",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Plan at",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
					className: "text-foreground",
					children: [
						HOLDERS.toLocaleString("en-US"),
						" Holders × ",
						DAU_PER_HOLDER,
						" people/day"
					]
				}),
				" ",
				"= ",
				compactCount(PEOPLE_DAY),
				" people a day. Same rate card as above. Brands pay monthly for the shows we actually deliver. Interlude keeps",
				" ",
				pct(INTERLUDE_SHARE),
				" of that as ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "gross"
				}),
				" — before running the company. Not invoices. Empty wells pay nothing."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle",
				children: "Network (monthly)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-x-auto rounded-2xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[36rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-[0.6875rem] uppercase tracking-[0.14em] text-subtle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: " "
						}), rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: r.name
						}, r.name))]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Questions / person / day",
							cells: rows.map((r) => String(r.questions))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Skip / fill",
							cells: rows.map((r) => `${Math.round(r.skipRate * 100)}% skip · ${Math.round(r.fill * 100)}% fill`)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Holds shown / month",
							cells: rows.map((r) => compactCount(r.showsMonth))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Holds shown / day",
							cells: rows.map((r) => compactCount(r.showsDay))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Advertisers pay",
							cells: rows.map((r) => usd(r.advertiser, 0)),
							strong: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: `Waiter Bank ${pct(VIEWER_SHARE)}`,
							cells: rows.map((r) => usd(r.viewer, 0))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: `Holder Bank ${pct(HOLDER_SHARE)}`,
							cells: rows.map((r) => usd(r.holder, 0))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: `Interlude ${pct(INTERLUDE_SHARE)} gross`,
							cells: rows.map((r) => usd(r.interlude, 0)),
							strong: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Per Holder / month",
							cells: rows.map((r) => usd(r.holder / HOLDERS, 0))
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Working · advertisers",
						v: usd(working.advertiser, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: `Interlude ${pct(INTERLUDE_SHARE)} gross`,
						v: usd(working.interlude, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Holds shown / month",
						v: compactCount(working.showsMonth)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Holds shown / day",
						v: compactCount(working.showsDay)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4",
				children: [
					"Working month written out: advertisers pay",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: usd(working.advertiser, 0)
					}),
					". Waiters ",
					usd(working.viewer, 0),
					" (",
					pct(VIEWER_SHARE),
					"). Holders",
					" ",
					usd(working.holder, 0),
					" (",
					pct(HOLDER_SHARE),
					").",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-foreground",
						children: [
							"Interlude ",
							pct(INTERLUDE_SHARE),
							" gross ",
							usd(working.interlude, 0)
						]
					}),
					". About ",
					compactCount(working.showsMonth),
					" Holds shown. Each person sees about ",
					Math.round(working.showsMonth / PEOPLE_DAY),
					" paid Holds that month. Per Holder stays in the same band (~",
					usd(working.holder / HOLDERS, 0),
					"); Interlude’s cheque is the volume."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle",
				children: "If Holds pay monthly — how many advertisers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2",
				children: [
					"You do not need ",
					compactCount(working.showsMonth),
					" different films. You need ",
					usd(working.advertiser, 0),
					" of booked monthly spend, delivered as those shows. A live pool of about 200–500 creatives. Paying Holds at working volume:"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-x-auto rounded-2xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[28rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-[0.6875rem] uppercase tracking-[0.14em] text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "They pay / month"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-medium",
								children: "Shows that package delivers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-medium",
								children: "Advertisers to hit working"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
						5e3,
						2e4,
						5e4,
						2e5
					].map((p) => {
						const shows = Math.round(p / (working.advertiser / working.showsMonth));
						const n = Math.round(working.advertiser / p);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-foreground",
									children: usd(p, 0)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-right tabular-nums",
									children: compactCount(shows)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 text-right tabular-nums text-foreground",
									children: ["~", n.toLocaleString("en-US")]
								})
							]
						}, p);
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4",
				children: "Practical mix for working: ~40–80 always-on brands covering about half the money, then ~400–700 mid and SME Holds. Unshown inventory is unpaid."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle",
				children: [
					"Interlude P&L — the ",
					pct(INTERLUDE_SHARE),
					" only (monthly)"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "Revenue share is cost of sales. What remains is Interlude’s gross. Then people, rails, and selling. Operating costs are a plan at this footprint, not a ledger."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-x-auto rounded-2xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[36rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-[0.6875rem] uppercase tracking-[0.14em] text-subtle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: " "
						}), rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: r.name
						}, r.name))]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: `Revenue (${pct(INTERLUDE_SHARE)} of Holds sold)`,
							cells: rows.map((r) => usd(r.interlude, 0)),
							strong: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Cloud / auction / SDK",
							cells: [
								usd(4e4, 0),
								usd(12e4, 0),
								usd(28e4, 0)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Payout rails (~1.5% of 75%)",
							cells: [
								usd(41e3, 0),
								usd(141e3, 0),
								usd(373e3, 0)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Sales (to book the Holds)",
							cells: [
								usd(18e4, 0),
								usd(63e4, 0),
								usd(166e4, 0)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "People (eng, success, finance)",
							cells: [
								usd(22e4, 0),
								usd(45e4, 0),
								usd(9e5, 0)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "ARCON, legal, NDPR, audit",
							cells: [
								usd(2e4, 0),
								usd(4e4, 0),
								usd(7e4, 0)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Admin, software, office",
							cells: [
								usd(2e4, 0),
								usd(35e3, 0),
								usd(6e4, 0)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Operating cost",
							cells: rows.map((r) => usd(r.opex, 0))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Operating profit",
							cells: rows.map((r) => usd(r.op, 0)),
							strong: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Company income tax (30% plan)",
							cells: rows.map((r) => usd(r.tax, 0))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetRow, {
							k: "Net profit",
							cells: rows.map((r) => usd(r.net, 0)),
							strong: true
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: `Working · ${pct(INTERLUDE_SHARE)} gross`,
						v: usd(working.interlude, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Working · operating profit",
						v: usd(working.op, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Working · net (after tax)",
						v: usd(working.net, 0)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4",
				children: [
					"Working month for Interlude itself: gross ",
					usd(working.interlude, 0),
					". Run the company −",
					usd(working.opex, 0),
					". Operating profit",
					" ",
					usd(working.op, 0),
					". Tax ",
					usd(working.tax, 0),
					".",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-foreground",
						children: ["Interlude keeps about ", usd(working.net, 0)]
					}),
					". That is about half of the ",
					pct(INTERLUDE_SHARE),
					", and about 10% of what advertisers paid. Sales is the line that can eat the take; direct naira IOs protect it. Half the wells sold → cut the ",
					pct(INTERLUDE_SHARE),
					" ",
					"in a straight line."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle",
				children: "Working year (if every month is working)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-hidden rounded-2xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "w-full text-left text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
						["Advertisers pay", usd(working.advertiser * 12, 0)],
						[`Waiters ${pct(VIEWER_SHARE)}`, usd(working.viewer * 12, 0)],
						[`Holders ${pct(HOLDER_SHARE)}`, usd(working.holder * 12, 0)],
						[`Interlude ${pct(INTERLUDE_SHARE)} gross`, usd(working.interlude * 12, 0)],
						["Company opex", usd(working.opex * 12, 0)],
						["Operating profit", usd(working.op * 12, 0)],
						["Tax 30%", usd(working.tax * 12, 0)],
						["Interlude net", usd(working.net * 12, 0)]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border first:border-t-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-foreground",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right tabular-nums text-hold",
							children: v
						})]
					}, k)) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4",
				children: "Africa’s digital ad market is a few billion dollars a year. Working volume here is a few percent of that — possible if Interlude is the default wait on African desks and some foreign brands buy in. Nigeria digital spend alone cannot clear the hot column. Demand, not boxes, is the limit."
			})
		]
	});
}
function SheetRow({ k, cells, strong }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-t border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: "px-4 py-3 text-left font-normal text-foreground",
			children: k
		}), cells.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: `px-4 py-3 text-right tabular-nums ${strong ? "font-medium text-foreground" : ""}`,
			children: c
		}, `${k}-${i}`))]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-card px-4 py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-serif text-2xl tabular-nums text-foreground",
			children: v
		})]
	});
}
function UseOfFunds() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: "Use of funds",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-2xl border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
				className: "w-full text-left text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
					["Legal & licence (CAC, ARCON, NDPR)", "15%"],
					["Production SDK & Hold player", "30%"],
					["First Holders (WhatsApp bots, bank/school)", "20%"],
					["Lagos brand sales (direct IO)", "20%"],
					["Payout rail, vetting ops, float", "15%"]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border first:border-t-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3 text-foreground",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3 text-right tabular-nums text-hold",
						children: v
					})]
				}, k)) })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4",
			children: "No spend on injecting ads into frontier apps. No spend on claiming we were first on Earth."
		})]
	});
}
//#endregion
export { ProposalPage as component };
