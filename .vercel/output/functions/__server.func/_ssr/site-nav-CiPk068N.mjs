import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as PauseMark, r as cn } from "./marks-CpZHMeh2.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-nav-CiPk068N.js
var import_jsx_runtime = require_jsx_runtime();
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseMark, { className: "size-3.5 text-hold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-lg",
						children: "Interlude"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-sm text-sm text-muted-foreground",
					children: "A Hold is a timed brand moment in the seconds an AI spends thinking. Then the answer arrives."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 max-w-sm text-xs leading-relaxed text-subtle",
					children: [
						"Prototype by Telema Tekena Fubara. Built with Grok, September 2026.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"© 2026 Telema Tekena Fubara. All rights reserved."
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hold",
						className: "hover:text-foreground",
						children: "Hold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/holder",
						className: "hover:text-foreground",
						children: "Holder"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/bank",
						className: "hover:text-foreground",
						children: "Bank"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/install",
						className: "hover:text-foreground",
						children: "Install"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						className: "hover:text-foreground",
						children: "Run a Hold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/network",
						className: "hover:text-foreground",
						children: "Network"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/proposal",
						className: "hover:text-foreground",
						children: "Proposal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Skip arrow after five seconds." })
				]
			})]
		})
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-foreground shadow-[0_0_0_1px_rgba(244,241,234,0.08)] hover:opacity-90",
			ghost: "bg-transparent text-foreground hover:bg-muted",
			outline: "bg-transparent text-foreground shadow-[0_0_0_1px_rgba(244,241,234,0.14)] hover:bg-muted",
			paper: "bg-foreground text-background hover:opacity-90"
		},
		size: {
			sm: "h-9 rounded-md px-3 text-sm",
			md: "h-11 rounded-md px-4 text-sm",
			lg: "h-12 rounded-lg px-5 text-[0.9375rem]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var item = "inline-flex min-h-11 shrink-0 items-center px-3 text-sm hover:text-foreground";
var PAGES = [
	{
		to: "/hold",
		label: "Hold"
	},
	{
		to: "/holder",
		label: "Holder"
	},
	{
		to: "/bank",
		label: "Bank"
	},
	{
		to: "/network",
		label: "Network"
	},
	{
		to: "/studio",
		label: "Studio"
	},
	{
		to: "/proposal",
		label: "Proposal"
	},
	{
		to: "/ask",
		label: "Ask"
	}
];
function SiteNav({ solid = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: cn("sticky top-0 z-40", solid ? "border-b border-border bg-background" : "bg-background/80 backdrop-blur-md"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-3 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex w-fit items-center gap-2.5 text-foreground",
				"aria-label": "Interlude home",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseMark, { className: "size-4 text-hold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-xl leading-none tracking-tight",
					children: "Interlude"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-2 flex min-w-0 flex-wrap items-center gap-0.5",
				"aria-label": "Pages",
				children: [PAGES.map((page) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: page.to,
					className: item,
					activeProps: { className: "text-foreground" },
					inactiveProps: { className: "text-muted-foreground" },
					children: page.label
				}, page.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: "primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/install",
						children: "Install"
					})
				})]
			})]
		})
	});
}
//#endregion
export { SiteFooter as n, SiteNav as r, Button as t };
