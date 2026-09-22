import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as SKIP_AFTER_MS, g as FORMATS, h as ADS, v as SPOT_MS } from "./router-B0-yeu4t.mjs";
import { r as cn } from "./marks-CpZHMeh2.mjs";
import { n as SiteFooter, r as SiteNav, t as Button } from "./site-nav-CiPk068N.mjs";
import { t as HoldStage } from "./hold-stage-i4R2iG4r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hold-DMm9dYf4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HoldPage() {
	const [format, setFormat] = (0, import_react.useState)("cinematic");
	const spec = FORMATS.find((f) => f.id === format) ?? FORMATS[0];
	const adId = ADS[FORMATS.findIndex((f) => f.id === format)]?.id ?? ADS[0].id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background pb-16 text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
							children: "The unit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl",
							children: "A Hold."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: "A labeled, skippable brand film in the seconds an AI spends thinking. It is not a feed ad. It is not under the answer. It occupies the well, then the answer arrives."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
									k: `${SKIP_AFTER_MS / 1e3}s`,
									v: "Skip arrow"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
									k: `${SPOT_MS / 1e3}s`,
									v: "Each spot"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
									k: "Ad",
									v: "Always labeled"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-8 text-sm text-muted-foreground",
							children: [
								"Lives in",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/holder",
									className: "text-foreground underline-offset-4 hover:underline",
									children: "Holder"
								}),
								". Credits",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/bank",
									className: "text-foreground underline-offset-4 hover:underline",
									children: "Bank"
								}),
								" ",
								"for the watcher and the Holder. Wrap it on",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/install",
									className: "text-foreground underline-offset-4 hover:underline",
									children: "Install"
								}),
								"."
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 flex flex-wrap gap-2",
							children: FORMATS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setFormat(f.id),
								className: cn("h-11 rounded-md px-3 text-sm", f.id === format ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
								children: f.name.replace(" Hold", "").replace(" Think", "").replace(" Pause", "")
							}, f.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldStage, {
							format,
							adId,
							autoPlay: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: spec.detail
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20 border-t border-border pt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
							children: "Hold Formats"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-serif text-3xl tracking-tight sm:text-4xl",
							children: "The Hold family."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base",
							children: "Three shapes. One rule: labeled, skippable, only in the wait. Pick a unit to play it in the well above."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-6 lg:grid-cols-3",
							children: FORMATS.map((f, i) => {
								const ad = ADS[i];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setFormat(f.id),
									className: cn("group overflow-hidden rounded-2xl text-left shadow-[0_0_0_1px_rgba(244,241,234,0.08)]", f.id === format ? "bg-muted" : "bg-card"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative aspect-[16/10] overflow-hidden",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: ad.still,
												alt: "",
												className: "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute left-4 top-4 rounded-full bg-background/55 px-2 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] backdrop-blur-sm",
												children: f.kicker
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-serif text-2xl",
											children: f.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-muted-foreground",
											children: f.summary
										})]
									})]
								}, f.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/studio",
									children: "Run a Hold — for advertisers"
								})
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Spec({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "font-serif text-3xl tracking-tight",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 text-sm text-muted-foreground",
		children: v
	})] });
}
//#endregion
export { HoldPage as component };
