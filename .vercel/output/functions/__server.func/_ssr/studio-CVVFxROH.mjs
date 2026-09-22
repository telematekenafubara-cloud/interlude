import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as ADS } from "./router-B0-yeu4t.mjs";
import { r as cn } from "./marks-CpZHMeh2.mjs";
import { n as draftToAd, r as stills, t as AetherChat } from "./aether-chat-Kqgkzyfm.mjs";
import { n as SiteFooter, r as SiteNav, t as Button } from "./site-nav-CiPk068N.mjs";
import { n as usePlacedStore, t as HoldStage } from "./hold-stage-i4R2iG4r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-CVVFxROH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Studio() {
	const [tab, setTab] = (0, import_react.useState)("sample");
	const [draft, setDraft] = (0, import_react.useState)({
		name: "",
		category: "",
		tagline: "",
		body: "",
		cta: "",
		still: ADS[0]?.still ?? "/ads/northline.jpg"
	});
	const placed = usePlacedStore((s) => s.holds);
	const place = usePlacedStore((s) => s.place);
	function commit(d, via) {
		if (!d.name.trim() || !d.tagline.trim() || !d.cta.trim()) {
			toast("Need brand, tagline, and CTA.");
			return;
		}
		const id = `pl_${Date.now().toString(36)}`;
		const ad = draftToAd({
			...d,
			still: d.still || ADS[0]?.still
		}, id);
		place(ad);
		toast(`${ad.name} is on Interlude`, { description: `Placed via ${via}. Demo IO — not live billing.` });
		setTab("sample");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background pb-16 text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
						children: "For advertisers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl",
						children: "Run a Hold."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
						children: "Place a finished film, or let Holdey write one. Samples play here. This is a demo insertion — not a live buy."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap gap-2",
						children: [
							["sample", "Samples"],
							["place", "Place a Hold"],
							["aether", "Generate with Holdey"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTab(id),
							className: cn("h-11 rounded-md px-3 text-sm", tab === id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
							children: label
						}, id))
					}),
					tab === "sample" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleGrid, { extra: placed }) : null,
					tab === "place" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceForm, {
						draft,
						setDraft,
						onPlace: () => commit(draft, "upload")
					}) : null,
					tab === "aether" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[28rem] sm:h-[32rem]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherChat, {
								live: true,
								compact: true,
								kind: "hold",
								onHoldSpec: (spec) => setDraft((d) => ({
									...d,
									...spec
								}))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceForm, {
							draft,
							setDraft,
							onPlace: () => commit(draft, "Holdey"),
							fromAether: true
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-12 text-sm text-muted-foreground",
						children: [
							"Watchers see Holds on",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/hold",
								className: "text-foreground underline-offset-4 hover:underline",
								children: "Hold"
							}),
							". Holders install on",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/install",
								className: "text-foreground underline-offset-4 hover:underline",
								children: "Install"
							}),
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function SampleGrid({ extra }) {
	const list = [...extra, ...ADS];
	const [playId, setPlayId] = (0, import_react.useState)(list[0]?.id ?? ADS[0].id);
	const current = list.find((a) => a.id === playId) ?? ADS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldStage, {
			format: "cinematic",
			adId: current.id,
			autoPlay: true,
			source: "studio"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid max-h-[min(36rem,70dvh)] gap-2 overflow-y-auto sm:grid-cols-2 lg:grid-cols-1",
			children: list.map((ad) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setPlayId(ad.id),
				className: cn("flex w-full items-center gap-3 rounded-xl p-3 text-left shadow-[0_0_0_1px_rgba(244,241,234,0.08)]", playId === ad.id ? "bg-muted" : "bg-card"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: ad.still,
					alt: "",
					className: "h-14 w-20 shrink-0 rounded-md object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate font-medium",
						children: ad.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-xs text-subtle",
						children: ad.tagline
					})]
				})]
			}) }, ad.id))
		})]
	});
}
function PlaceForm({ draft, setDraft, onPlace, fromAether }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-10 space-y-4 rounded-2xl bg-card p-5 shadow-[0_0_0_1px_rgba(244,241,234,0.08)]",
		onSubmit: (e) => {
			e.preventDefault();
			onPlace();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle",
				children: fromAether ? "Holdey draft" : "Already made"
			}),
			[
				{
					key: "name",
					label: "Brand"
				},
				{
					key: "category",
					label: "Category"
				},
				{
					key: "tagline",
					label: "Tagline"
				},
				{
					key: "body",
					label: "Body"
				},
				{
					key: "cta",
					label: "CTA"
				}
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-subtle",
					children: f.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: draft[f.key],
					onChange: (e) => setDraft((d) => ({
						...d,
						[f.key]: e.target.value
					})),
					className: "mt-1 h-11 w-full rounded-md bg-muted px-3 text-sm outline-none"
				})]
			}, f.key)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: "Still — pick a house frame"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: stills().map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setDraft((d) => ({
						...d,
						still: s.src
					})),
					className: cn("overflow-hidden rounded-md", draft.still === s.src && "ring-2 ring-hold"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: s.src,
						alt: s.name,
						className: "h-14 w-20 object-cover"
					})
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				children: "Place this Hold"
			})
		]
	});
}
//#endregion
export { Studio as component };
