import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ArrowUpRight, f as ArrowRight, n as VolumeX, r as Volume2 } from "../_libs/lucide-react.mjs";
import { x as formatLabel } from "./router-B0-yeu4t.mjs";
import { r as cn } from "./marks-CpZHMeh2.mjs";
import { n as openWatch, r as unlockHoldAudio } from "./watch-B_0QX3N9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hold-player-CJGIj7Dh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SkipArrow({ onSkip, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: (e) => {
			e.stopPropagation();
			onSkip();
		},
		"aria-label": "Skip this Hold",
		className: cn("inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-background/80 px-3.5 text-sm font-medium text-foreground shadow-[0_0_0_1px_rgba(244,241,234,0.18)] backdrop-blur-sm transition-[transform,opacity] duration-150 ease-out active:scale-[0.96]", className),
		children: ["Skip", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
			className: "size-3.5",
			strokeWidth: 2
		})]
	});
}
function HoldPlayer({ format, ad, elapsedMs, holdMs, canSkip, exiting, reduceMotion, compact = false, onSkip, onCta, onPick, pickedId }) {
	const remaining = Math.max(0, holdMs - elapsedMs);
	const pct = Math.min(100, elapsedMs / holdMs * 100);
	const remainingLabel = (remaining / 1e3).toFixed(1);
	const sound = useAdSound(ad, reduceMotion);
	function openFull(e) {
		e?.stopPropagation();
		onCta();
		openWatch(ad.id);
	}
	if (format === "native") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("cursor-pointer overflow-hidden rounded-xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]", exiting && "hold-exit"),
		onClick: () => openFull(),
		role: "link",
		tabIndex: 0,
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				openFull();
			}
		},
		"aria-label": `Watch ${ad.name} full on Interlude`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3 p-3 sm:gap-4 sm:p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-24 w-28 shrink-0 overflow-hidden rounded-md outline outline-1 -outline-offset-1 outline-foreground/10 sm:h-28 sm:w-36",
				children: sound.visual
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle",
							children: [
								formatLabel(format),
								" hold · ",
								ad.category
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-serif text-xl leading-tight text-foreground",
							children: ad.name
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldControls, {
							remainingLabel,
							hasSound: sound.hasSound,
							muted: sound.muted,
							onToggle: sound.toggle,
							canSkip,
							onSkip,
							compact: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 line-clamp-2 text-sm leading-snug text-muted-foreground",
						children: ad.tagline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: (e) => openFull(e),
						className: "mt-3 inline-flex h-9 items-center gap-1 rounded-md bg-accent px-3 text-sm font-medium text-accent-foreground",
						children: ["Watch full", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							className: "size-3.5",
							strokeWidth: 1.75
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldBar, { pct })]
	});
	const pick = ad.playable?.options.find((o) => o.id === pickedId) ?? ad.playable?.options[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative isolate cursor-pointer overflow-hidden rounded-xl bg-card", compact ? format === "playable" ? "min-h-[16.5rem] sm:min-h-[18.5rem]" : "h-48 sm:h-56" : format === "cinematic" ? "aspect-[16/10] sm:aspect-[16/9]" : "min-h-72 sm:min-h-80", exiting && "hold-exit"),
		onClick: () => openFull(),
		role: "link",
		tabIndex: 0,
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				openFull();
			}
		},
		"aria-label": `Watch ${ad.name} full on Interlude`,
		children: [
			sound.visual,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0",
				style: format === "playable" && pick ? { backgroundColor: pick.wash } : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-0 z-30 flex items-start justify-between p-3 sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-background/55 px-2 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-foreground backdrop-blur-sm",
						children: ["Ad · ", formatLabel(format)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6875rem] uppercase tracking-[0.14em] text-foreground/70",
						children: ad.category
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldControls, {
					remainingLabel,
					hasSound: sound.hasSound,
					muted: sound.muted,
					onToggle: sound.toggle,
					canSkip,
					onSkip,
					compact
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("pointer-events-none absolute inset-x-0 bottom-0 z-10", compact ? "p-3 pr-28 sm:p-4 sm:pr-32" : "p-4 sm:p-6"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("font-serif leading-none tracking-tight text-foreground", compact ? "text-2xl" : "text-3xl sm:text-4xl"),
						children: ad.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-2 text-foreground/80", compact ? "line-clamp-2 text-sm leading-snug" : "max-w-md text-sm leading-relaxed sm:text-base"),
						children: format === "playable" && pick ? pick.line : ad.tagline
					}),
					format === "playable" && ad.playable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("mt-3", compact && "mt-2"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.625rem] font-medium uppercase tracking-[0.14em] text-foreground/60",
							children: ad.playable.prompt
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 flex flex-wrap gap-1.5",
							children: ad.playable.options.map((option) => {
								const selected = option.id === (pickedId ?? ad.playable.options[0].id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										onPick?.(option);
									},
									className: cn("pointer-events-auto rounded-md px-2.5 font-medium", compact ? "h-8 text-xs" : "h-10 px-3 text-sm", selected ? "bg-accent text-accent-foreground" : "bg-background/50 text-foreground backdrop-blur-sm"),
									children: option.label
								}, option.id);
							})
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: (e) => openFull(e),
						className: cn("pointer-events-auto inline-flex items-center gap-1.5 rounded-md bg-accent font-medium text-accent-foreground", compact ? "mt-3 h-9 px-3 text-sm" : "mt-4 h-11 px-4 text-sm"),
						children: ["Watch full", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							className: "size-4",
							strokeWidth: 1.75
						})]
					}),
					compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-[0.625rem] uppercase tracking-[0.14em] text-foreground/55",
						children: "Tap the Hold · extra pay if you stay"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldBar, {
				pct,
				overlay: true
			})
		]
	});
}
function useAdSound(ad, reduceMotion) {
	const ref = (0, import_react.useRef)(null);
	const [useVideo, setUseVideo] = (0, import_react.useState)(Boolean(ad.video) && !reduceMotion);
	const [muted, setMuted] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setUseVideo(Boolean(ad.video) && !reduceMotion);
		setMuted(true);
	}, [
		ad.id,
		ad.video,
		reduceMotion
	]);
	(0, import_react.useEffect)(() => {
		const v = ref.current;
		if (!v || !useVideo) return;
		let cancelled = false;
		unlockHoldAudio();
		v.volume = .9;
		const start = () => {
			if (cancelled) return;
			v.muted = true;
			v.play().then(() => {
				if (cancelled) return;
				v.muted = false;
				setMuted(false);
			}).catch(() => {
				if (cancelled) return;
				v.muted = true;
				setMuted(true);
				v.play().catch(() => void 0);
			});
		};
		if (v.readyState >= 2) start();
		else v.addEventListener("canplay", start, { once: true });
		return () => {
			cancelled = true;
			v.pause();
		};
	}, [
		ad.id,
		ad.video,
		useVideo
	]);
	function toggle(e) {
		e.stopPropagation();
		unlockHoldAudio();
		const v = ref.current;
		const next = !muted;
		setMuted(next);
		if (v) {
			v.muted = next;
			if (!next) v.play();
		}
	}
	const video = useVideo && ad.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref,
		src: ad.video,
		poster: ad.still,
		autoPlay: true,
		muted,
		loop: true,
		playsInline: true,
		preload: "auto",
		onError: () => setUseVideo(false),
		className: "absolute inset-0 h-full w-full object-cover"
	}, ad.video) : null;
	const still = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: ad.still,
		alt: "",
		className: cn("absolute inset-0 h-full w-full object-cover", !reduceMotion && "kenburns")
	});
	return {
		muted,
		toggle,
		hasSound: Boolean(ad.video) && !reduceMotion,
		visual: video ?? still
	};
}
function HoldControls({ remainingLabel, hasSound, muted, onToggle, canSkip, onSkip, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-30 flex shrink-0 flex-col items-end gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("tabular-nums text-xs", compact ? "text-muted-foreground" : "text-foreground/80"),
				children: [remainingLabel, "s"]
			}), hasSound ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundToggle, {
				muted,
				onToggle
			}) : null]
		}), canSkip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipArrow, {
			onSkip,
			className: compact ? "h-9 px-3 text-xs" : void 0
		}) : null]
	});
}
function SoundToggle({ muted, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: onToggle,
		"aria-label": muted ? "Unmute ad" : "Mute ad",
		className: "grid size-11 shrink-0 place-items-center rounded-full bg-background/70 text-foreground shadow-[0_0_0_1px_rgba(244,241,234,0.18)] backdrop-blur-sm",
		children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
			className: "size-4",
			strokeWidth: 2
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
			className: "size-4",
			strokeWidth: 2
		})
	});
}
function HoldBar({ pct, overlay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-0.5 w-full overflow-hidden bg-foreground/15", overlay && "absolute inset-x-0 bottom-0 z-20"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full origin-left bg-accent",
			style: { width: `${pct}%` }
		})
	});
}
//#endregion
export { HoldPlayer as t };
