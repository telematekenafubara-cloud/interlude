import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask-grok-6iPN4tOz.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var VIDEO_WORD = /\b(v[iey]d(?:eo|oe|io|oi)e?s?|clips?|animat\w*|\bmp4\b|cinemagraphs?|movies?|films?)\b/;
function mediaIntent(prompt) {
	const q = prompt.toLowerCase().trim();
	if (!q) return null;
	const video = VIDEO_WORD.test(q);
	const imageNoun = /(images?|pictures?|photos?|\bpics?\b|illustrations?|drawings?|artworks?|posters?|wallpapers?|stills?|thumbnails?)/.test(q);
	const howTo = /\b(how (do i|to)|what is|what's|whats|who is)\b/.test(q);
	const draw = /\b(draw|paint|sketch|illustrate|doodle|render)\b/.test(q) && !howTo;
	const ask = /(generat|creat|make|show me|send me|give me|want|need|can you|could you|please|i'd like|id like|i would like|visuali[sz]e|depict|turn|convert|imagine)\b/.test(q);
	if (video && (ask || imageNoun || /\bof\b/.test(q) || /^(a |an |the )?(short )?video\b/.test(q))) return "video";
	if (imageNoun && (ask || /\bof\b/.test(q) || draw || /^(a |an |the )?(picture|photo|image)\b/.test(q))) return "image";
	if (draw) return "image";
	if (/\bshow me\b/.test(q) && !howTo && !/\b(how|why|where|page|hold)\b/.test(q)) return "image";
	return null;
}
function wantsVideo(prompt) {
	if (mediaIntent(prompt) === "video") return true;
	const q = prompt.toLowerCase();
	if (VIDEO_WORD.test(q) && /(turn|make|convert|change|transform|animat|into|from this|this)/.test(q)) return true;
	return /\b(animate|bring (it|this) to life|make (it|this) move|turn .{0,60}into)\b/.test(q);
}
/** Attached still: make a clip unless they clearly asked a question about the picture. */
function shouldAnimateStill(prompt, attachedNow) {
	if (wantsVideo(prompt)) return true;
	if (wantsImageEdit(prompt)) return false;
	if (!attachedNow) return false;
	const q = prompt.toLowerCase().trim();
	if (!q) return true;
	if (/\?/.test(q)) return false;
	if (/^(what|what's|whats|who|who's|whose|describe|explain|caption|tell me|is this|identify)\b/.test(q)) return false;
	return true;
}
function wantsImageEdit(prompt) {
	const q = prompt.toLowerCase().trim();
	if (/\b(regenerat\w*|redo|try again|once more|another (one|go|version|picture|image|photo)|update(d)? (the |this )?(picture|image|photo|still)?|edit (the |this )?(picture|image|photo|still)?)\b/.test(q)) return true;
	if (/\b(add|remove|delete|take out|put in|swap|change|without|make it|make the|with a |with an )\b/.test(q) && /\b(picture|image|photo|still|this|that|it|the (hat|hair|background|sky|color|colour|jacket|car|light))\b/.test(q)) return true;
	if (/^(add|remove|delete|take out|put in|change|make it|without|with a |with an )\b/.test(q)) return true;
	return false;
}
var askGrok = createServerFn({ method: "POST" }).validator((input) => {
	const raw = input;
	const prompt = String(raw?.prompt ?? "").trim();
	if (!prompt) throw new Error("Ask something first.");
	if (prompt.length > 2e3) throw new Error("Keep it under 2,000 characters.");
	const history = Array.isArray(raw?.history) ? raw.history.slice(-8).map((t) => ({
		role: t?.role === "assistant" ? "assistant" : "user",
		content: String(t?.content ?? "").slice(0, 2e3)
	})).filter((t) => t.content) : [];
	const imageUrl = String(raw?.imageUrl ?? "").trim();
	const still = imageUrl && imageUrl.length <= 2e6 && (imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("data:image/")) ? imageUrl : void 0;
	return {
		prompt,
		kind: raw?.kind === "hold" ? "hold" : "chat",
		history,
		imageUrl: still
	};
}).handler(createSsrRpc("c934df3e526f3570e1a7f17300945b14fae992187bb6e4db2e6e1e69bcb3fd24"));
//#endregion
export { wantsVideo as a, wantsImageEdit as i, mediaIntent as n, shouldAnimateStill as r, askGrok as t };
