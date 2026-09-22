import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as persist, r as create } from "../_libs/zustand.mjs";
import { S as nextAdId, _ as SKIP_AFTER_MS, b as adById, m as persistStorage, r as useBankStore, v as SPOT_MS } from "./router-B0-yeu4t.mjs";
import { r as cn } from "./marks-CpZHMeh2.mjs";
import { r as unlockHoldAudio } from "./watch-B_0QX3N9.mjs";
import { t as HoldPlayer } from "./hold-player-CJGIj7Dh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hold-stage-i4R2iG4r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var usePlacedStore = create()(persist((set, get) => ({
	holds: [],
	place: (ad) => set({ holds: [ad, ...get().holds.filter((h) => h.id !== ad.id)].slice(0, 12) })
}), {
	name: "interlude-placed",
	storage: persistStorage
}));
function HoldStage({ format, adId, source = "hold", autoPlay = false }) {
	const extra = usePlacedStore((s) => s.holds);
	const [currentId, setCurrentId] = (0, import_react.useState)(adId);
	const currentRef = (0, import_react.useRef)(currentId);
	const ad = extra.find((a) => a.id === currentId) ?? adById(currentId);
	const [playing, setPlaying] = (0, import_react.useState)(autoPlay);
	const [exiting, setExiting] = (0, import_react.useState)(false);
	const [elapsedMs, setElapsedMs] = (0, import_react.useState)(0);
	const [pickedId, setPickedId] = (0, import_react.useState)(null);
	const [tick, setTick] = (0, import_react.useState)(0);
	const gen = (0, import_react.useRef)(0);
	currentRef.current = currentId;
	(0, import_react.useEffect)(() => {
		gen.current += 1;
		setCurrentId(adId);
		setExiting(false);
		setElapsedMs(0);
		setPickedId(null);
		setPlaying(autoPlay);
		if (autoPlay) {
			unlockHoldAudio();
			setTick((n) => n + 1);
		}
	}, [
		adId,
		format,
		autoPlay
	]);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const mine = gen.current;
		const t0 = performance.now();
		let raf = 0;
		const loop = (now) => {
			if (mine !== gen.current) return;
			const e = now - t0;
			setElapsedMs(e);
			if (e >= 8e3) {
				useBankStore.getState().credit({
					adId: currentRef.current,
					skipped: false,
					source
				});
				const id = currentRef.current;
				const next = extra.find((a) => a.id === id) ? extra[(extra.findIndex((a) => a.id === id) + 1) % extra.length]?.id ?? nextAdId(id) : nextAdId(id);
				setCurrentId(next);
				setPickedId(null);
				setElapsedMs(0);
				setTick((n) => n + 1);
				return;
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [
		playing,
		tick,
		source,
		extra
	]);
	function start() {
		gen.current += 1;
		setCurrentId(adId);
		setPickedId(null);
		setElapsedMs(0);
		setExiting(false);
		setTick((n) => n + 1);
		setPlaying(true);
	}
	function skip() {
		gen.current += 1;
		useBankStore.getState().credit({
			adId: currentRef.current,
			skipped: true,
			source
		});
		setExiting(true);
		window.setTimeout(() => {
			setPlaying(false);
			setExiting(false);
			setElapsedMs(0);
		}, 280);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-2xl bg-card p-3 shadow-[0_0_0_1px_rgba(244,241,234,0.08)] sm:p-4",
		children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldPlayer, {
			format,
			ad,
			elapsedMs,
			holdMs: SPOT_MS,
			canSkip: elapsedMs >= SKIP_AFTER_MS,
			exiting,
			reduceMotion: false,
			onSkip: skip,
			onCta: () => void 0,
			onPick: (o) => setPickedId(o.id),
			pickedId
		}, tick) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: start,
			className: "group relative block w-full overflow-hidden rounded-xl text-left",
			children: [
				ad.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: ad.video,
					poster: ad.still,
					autoPlay: true,
					muted: true,
					loop: true,
					playsInline: true,
					className: cn("h-64 w-full object-cover sm:h-80", format === "native" && "h-48 sm:h-56")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: ad.still,
					alt: "",
					className: cn("h-64 w-full object-cover sm:h-80", format === "native" && "h-48 sm:h-56")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 to-background/10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-2xl",
						children: ad.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-foreground/80",
						children: "Play this Hold"
					})]
				})
			]
		})
	});
}
//#endregion
export { usePlacedStore as n, HoldStage as t };
