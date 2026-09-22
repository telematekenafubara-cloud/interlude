import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as adById, d as usd, n as Route, o as VIEWER_SHARE, p as usdFine, r as useBankStore } from "./router-B0-yeu4t.mjs";
import { n as PauseMark } from "./marks-CpZHMeh2.mjs";
import { r as unlockHoldAudio, t as FULL_HOLD_MS } from "./watch-B_0QX3N9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch._adId-btnOLQwP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WatchPage() {
	const { adId } = Route.useParams();
	const ad = adById(adId);
	const videoRef = (0, import_react.useRef)(null);
	const credited = (0, import_react.useRef)(false);
	const failed = (0, import_react.useRef)(false);
	const started = (0, import_react.useRef)(false);
	const [state, setState] = (0, import_react.useState)("playing");
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [useVideo, setUseVideo] = (0, import_react.useState)(Boolean(ad.video));
	const viewerShare = 40 / 1e3 * VIEWER_SHARE;
	function pay() {
		if (credited.current || failed.current) return;
		credited.current = true;
		useBankStore.getState().credit({
			adId: ad.id,
			skipped: false,
			full: true,
			source: "watch-full"
		});
		setState("paid");
	}
	function fail() {
		if (credited.current || failed.current) return;
		failed.current = true;
		setState("failed");
		videoRef.current?.pause();
	}
	(0, import_react.useEffect)(() => {
		credited.current = false;
		failed.current = false;
		started.current = false;
		setState("playing");
		setElapsed(0);
		setUseVideo(Boolean(ad.video));
	}, [ad.id, ad.video]);
	(0, import_react.useEffect)(() => {
		if (state !== "playing") return;
		unlockHoldAudio();
		const v = videoRef.current;
		let cancelled = false;
		if (v && useVideo) {
			v.controls = false;
			v.volume = .9;
			const start = () => {
				if (cancelled) return;
				v.muted = true;
				v.play().then(() => {
					if (cancelled) return;
					started.current = true;
					v.muted = false;
				}).catch(() => {
					if (cancelled) return;
					v.muted = true;
					v.play().then(() => {
						started.current = true;
					});
				});
			};
			if (v.readyState >= 2) start();
			else v.addEventListener("canplay", start, { once: true });
		}
		const t0 = performance.now();
		let raf = 0;
		const loop = (now) => {
			if (failed.current || credited.current) return;
			const e = now - t0;
			setElapsed(e);
			if (!useVideo && e >= 3e4) {
				pay();
				return;
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		const onHide = () => {
			if (document.hidden) fail();
		};
		document.addEventListener("visibilitychange", onHide);
		return () => {
			cancelled = true;
			cancelAnimationFrame(raf);
			document.removeEventListener("visibilitychange", onHide);
		};
	}, [
		ad.id,
		useVideo,
		state
	]);
	const duration = useVideo ? 0 : FULL_HOLD_MS;
	const pct = Math.min(100, useVideo && videoRef.current?.duration ? elapsed / (videoRef.current.duration * 1e3) * 100 : elapsed / FULL_HOLD_MS * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-14 items-center justify-between border-b border-border px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2 text-foreground",
				"aria-label": "Interlude home",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseMark, { className: "size-3.5 text-hold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-lg",
					children: "Interlude"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle",
				children: "Full Hold · unskippable"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 py-6 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative isolate overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-video bg-background",
					children: [
						useVideo && ad.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							ref: videoRef,
							src: ad.video,
							poster: ad.still,
							autoPlay: true,
							muted: true,
							playsInline: true,
							preload: "auto",
							disablePictureInPicture: true,
							controls: false,
							onEnded: pay,
							onPause: (e) => {
								if (credited.current || failed.current) return;
								if (!started.current) return;
								if (e.currentTarget.ended) return;
								fail();
							},
							onPlaying: () => {
								started.current = true;
							},
							onSeeking: (e) => {
								const v = e.currentTarget;
								if (state === "playing" && v.currentTime > .25) v.currentTime = Math.min(v.currentTime, .05);
							},
							onContextMenu: (e) => e.preventDefault(),
							onError: () => setUseVideo(false),
							className: "absolute inset-0 h-full w-full object-cover"
						}, ad.video) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: ad.still,
							alt: "",
							draggable: false,
							className: "absolute inset-0 h-full w-full object-cover kenburns"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute left-4 top-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-background/70 px-2 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-foreground",
								children: "Ad"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.6875rem] uppercase tracking-[0.14em] text-foreground/70",
								children: ad.category
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 p-5 sm:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-serif text-3xl tracking-tight sm:text-5xl",
									children: ad.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-lg text-sm text-foreground/80 sm:text-base",
									children: ad.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-lg text-sm text-muted-foreground",
									children: ad.body
								})
							]
						}),
						state === "playing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-x-0 bottom-0 h-1 bg-foreground/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-hold",
								style: { width: `${Math.min(100, pct || elapsed / (duration || 3e4) * 100)}%` }
							})
						}) : null
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 max-w-xl",
				children: [
					state === "playing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: [
							"Stay on this page. Do not pause, leave, or close the tab. Finish the film and Waiter Bank is credited ",
							usdFine(viewerShare),
							" extra (",
							usd(40, 0),
							" CPM)."
						]
					}) : null,
					state === "paid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-2xl text-foreground",
							children: "Paid."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: [
								"You stayed. ",
								usdFine(viewerShare),
								" is in Waiter Bank for this full Hold."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/bank",
							className: "mt-4 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground",
							children: "Open Bank"
						})
					] }) : null,
					state === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-2xl text-foreground",
							children: "Stopped."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: "You paused or left. Extra pay was not credited. The well Hold still paid if it ran. Watch again only if you can stay."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => window.location.reload(),
							className: "mt-4 inline-flex h-11 items-center rounded-md bg-muted px-4 text-sm text-foreground",
							children: "Watch again"
						})
					] }) : null
				]
			})]
		})]
	});
}
//#endregion
export { WatchPage as component };
