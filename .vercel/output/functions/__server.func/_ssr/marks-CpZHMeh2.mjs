import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marks-CpZHMeh2.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** The thinking well — Interlude’s unit. Not a pause, not 11. */
function PauseMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		className: cn("size-4", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			d: "M4.2 1.6h7.6A2.6 2.6 0 0 1 14.4 4.2v7.6a2.6 2.6 0 0 1-2.6 2.6H4.2a2.6 2.6 0 0 1-2.6-2.6V4.2A2.6 2.6 0 0 1 4.2 1.6Zm0 1.9a.7.7 0 0 0-.7.7v7.6a.7.7 0 0 0 .7.7h7.6a.7.7 0 0 0 .7-.7V4.2a.7.7 0 0 0-.7-.7H4.2Z"
		})
	});
}
function AetherMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldeyMark, { className });
}
/** A filled well — Holdey answers inside Interlude’s wait. */
function HoldeyMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		className: cn("size-4", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "2.2",
			y: "2.2",
			width: "11.6",
			height: "11.6",
			rx: "2.6"
		})
	});
}
//#endregion
export { PauseMark as n, cn as r, AetherMark as t };
