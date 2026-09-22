//#region node_modules/.nitro/vite/services/ssr/assets/watch-B_0QX3N9.js
/** Unlock output so a Hold can play ad sound after a tap. */
var ctx = null;
function unlockHoldAudio() {
	if (typeof window === "undefined") return;
	try {
		const Ctx = window.AudioContext || window.webkitAudioContext;
		if (!Ctx) return;
		if (!ctx) ctx = new Ctx();
		if (ctx.state === "suspended") ctx.resume();
		const buf = ctx.createBuffer(1, 1, 22050);
		const src = ctx.createBufferSource();
		src.buffer = buf;
		src.connect(ctx.destination);
		src.start(0);
	} catch {}
}
/** Full Interlude page: unskippable film, extra Waiter pay if they stay. */
var FULL_HOLD_MS = 3e4;
function watchPath(adId) {
	return `/watch/${encodeURIComponent(adId)}`;
}
function openWatch(adId) {
	if (typeof window === "undefined") return;
	window.open(watchPath(adId), "_blank", "noopener,noreferrer");
}
//#endregion
export { openWatch as n, unlockHoldAudio as r, FULL_HOLD_MS as t };
