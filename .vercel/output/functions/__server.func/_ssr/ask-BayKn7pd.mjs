import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AetherChat } from "./aether-chat-Kqgkzyfm.mjs";
import { n as SiteFooter, r as SiteNav } from "./site-nav-CiPk068N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask-BayKn7pd.js
var import_jsx_runtime = require_jsx_runtime();
function AskPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-3 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-0 w-full max-w-2xl flex-1 flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherChat, {
						live: true,
						compact: true,
						className: "h-[min(40rem,calc(100dvh-12rem))] min-h-[28rem] sm:h-[min(48rem,calc(100dvh-7rem))]"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { AskPage as component };
