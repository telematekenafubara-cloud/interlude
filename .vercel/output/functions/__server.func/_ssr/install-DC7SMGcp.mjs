import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Check, s as Copy } from "../_libs/lucide-react.mjs";
import { r as cn } from "./marks-CpZHMeh2.mjs";
import { t as askGrok } from "./ask-grok-6iPN4tOz.mjs";
import { n as SiteFooter, r as SiteNav, t as Button } from "./site-nav-CiPk068N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/install-DC7SMGcp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SNIPPETS = {
	vanilla: `<script src="/hold.js"><\/script>
<script>
  Interlude.holder("shore-bank");
  Interlude.identify(watcherId);
  const answer = await Interlude.whileWaiting(
    document.getElementById("reply"),
    () => askModel(prompt)
  );
<\/script>`,
	react: `Interlude.holder("shore-bank");
Interlude.identify(watcherId);
const answer = await Interlude.whileWaiting(
  wellRef.current,
  () => askModel(prompt)
);`,
	fetch: `Interlude.holder("your-app");
const data = await Interlude.whileWaiting(
  replyNode,
  () => askModel(prompt)
);`
};
function InstallPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background pb-16 text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
						children: "Drop-in for any AI product you ship"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl",
						children: "One wrap around the request. The Hold plays in the wait."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
						children: [
							"Interlude does not inject into ChatGPT, Claude, or Gemini — those are not your apps. Put it in the product you control: a chatbot, a support agent, a coding assistant, a search box. After five seconds, a skip arrow. Then the answer. Selling that wait to a real ad network is a separate sequence — see",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/network",
								className: "text-foreground underline-offset-4 hover:underline",
								children: "Network"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14 grid min-w-0 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnippetPanel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForeignDemo, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Steps, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function SnippetPanel() {
	const [tab, setTab] = (0, import_react.useState)("vanilla");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "The whole integration"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-serif text-3xl",
				children: "whileWaiting"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted-foreground",
				children: [
					"Load ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "text-foreground",
						children: "hold.js"
					}),
					". Point it at the node where the answer will appear. Pass the function that talks to your model. Interlude occupies that node until the model returns — skip arrow at five seconds, then the next Hold if you leave it."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex gap-1",
				children: [
					{
						id: "vanilla",
						label: "HTML"
					},
					{
						id: "react",
						label: "React"
					},
					{
						id: "fetch",
						label: "Any fetch"
					}
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(t.id),
					className: cn("h-10 rounded-md px-3 text-sm", tab === t.id ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"),
					children: t.label
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, { code: SNIPPETS[tab] })
		]
	});
}
function CodeBlock({ code }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mt-3 min-w-0 overflow-hidden rounded-xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "absolute right-2 top-2 z-10 inline-flex h-11 items-center gap-1.5 rounded-md bg-card/90 px-3 text-xs text-muted-foreground hover:text-foreground",
			onClick: async () => {
				await navigator.clipboard.writeText(code);
				setCopied(true);
				window.setTimeout(() => setCopied(false), 1600);
			},
			children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "size-3.5",
				strokeWidth: 1.75
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				className: "size-3.5",
				strokeWidth: 1.75
			}), copied ? "Copied" : "Copy"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "max-w-full overflow-x-auto p-4 pr-24 text-[0.75rem] leading-relaxed text-foreground sm:text-[0.8125rem]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className: "block w-max min-w-full",
				children: code
			})
		})]
	});
}
function useHoldScript() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mark = () => {
			window.Interlude?.holder?.("quill");
			setReady(true);
		};
		if (window.Interlude) {
			mark();
			return;
		}
		const s = document.createElement("script");
		s.src = "/hold.js";
		s.async = true;
		s.onload = mark;
		document.body.appendChild(s);
		return () => {
			s.onload = null;
		};
	}, []);
	return ready;
}
function ForeignDemo() {
	const ready = useHoldScript();
	const wellRef = (0, import_react.useRef)(null);
	const [prompt, setPrompt] = (0, import_react.useState)("Explain espresso in two sentences.");
	const [reply, setReply] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	async function send() {
		const text = prompt.trim();
		if (!text || busy || !window.Interlude) return;
		setBusy(true);
		setError("");
		setReply("");
		await new Promise((r) => requestAnimationFrame(() => r()));
		const wellNow = wellRef.current;
		if (!wellNow || !window.Interlude) {
			setBusy(false);
			return;
		}
		try {
			const result = await window.Interlude.whileWaiting(wellNow, () => askGrok({ data: { prompt: text } }));
			if (result.ok) setReply(result.text);
			else setError(result.error);
		} catch {
			setError("The Hold ran. The model did not return.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "A third-party app, with the snippet on"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-serif text-3xl",
				children: "Quill"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: [
					"This is not Interlude chrome. It is a generic writing model using",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "text-foreground",
						children: "Interlude.whileWaiting"
					}),
					". Ask it something. Wait five seconds for the skip arrow, or let the next Hold start."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-12 items-center justify-between border-b border-border px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Quill"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-subtle",
							children: "hold.js loaded"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: wellRef,
						className: "relative min-h-72 bg-muted/40 p-4 text-sm leading-relaxed",
						children: busy ? null : reply ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground",
							children: reply
						}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: error
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-subtle",
							children: "The answer will land here."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex items-end gap-2 border-t border-border p-3",
						onSubmit: (e) => {
							e.preventDefault();
							send();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: prompt,
							onChange: (e) => setPrompt(e.target.value),
							maxLength: 400,
							disabled: busy || !ready,
							placeholder: "Ask Quill…",
							className: "h-11 min-w-0 flex-1 rounded-md bg-muted px-3 text-sm text-foreground outline-none placeholder:text-subtle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy || !ready || !prompt.trim(),
							children: "Ask"
						})]
					})
				]
			})
		]
	});
}
function Steps() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-20 border-t border-border pt-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-hold",
				children: "Three steps"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-serif text-3xl sm:text-4xl",
				children: "Not a network. A wrap."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-10 md:grid-cols-3",
				children: [
					{
						n: "01",
						t: "Ship hold.js",
						d: "Ship the script with your product, or load it from Interlude. One file. No framework."
					},
					{
						n: "02",
						t: "Wrap the model call",
						d: "Interlude.holder(\"your-app\") then whileWaiting(answerNode, () => askModel(prompt)). The Holder is you — you own the wait."
					},
					{
						n: "03",
						t: "Skip, or the next Hold starts",
						d: "After five seconds a skip arrow appears. If you leave it, the playlist continues until the model is ready. Then the answer lands."
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
//#endregion
export { InstallPage as component };
