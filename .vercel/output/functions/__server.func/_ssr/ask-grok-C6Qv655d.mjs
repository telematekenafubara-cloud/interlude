import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask-grok-C6Qv655d.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var WINDOW_MS = 6e5;
var hits = {
	chat: [],
	image: [],
	video: []
};
var CAP = {
	chat: 40,
	image: 8,
	video: 3
};
function allow(kind) {
	const now = Date.now();
	const bucket = hits[kind].filter((t) => now - t < WINDOW_MS);
	hits[kind] = bucket;
	if (bucket.length >= CAP[kind]) return false;
	bucket.push(now);
	return true;
}
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
function promisedMedia(text) {
	const t = text.toLowerCase();
	const tag = t.match(/\[\[\s*(image|picture|photo|video|clip)\s*\]\]/);
	if (tag) return /video|clip/.test(tag[1]) ? "video" : "image";
	if (/(i('ll| will)|let me|i can|i am going to|i'm going to|here is going to|i'll create|i will create|generating|i'll generate|i will generate|i'll make|i will make|i'll draw|i will draw|i can generate|i can create|i can make|i can draw).{0,100}(image|picture|photo|video|clip|drawing)/.test(t)) return VIDEO_WORD.test(t) ? "video" : "image";
	if (/here('s| is) (a |the )?(image|picture|photo|video|clip)\b/.test(t) && !/https?:\/\//.test(t)) return VIDEO_WORD.test(t) ? "video" : "image";
	return null;
}
async function recoverMedia(apiKey, prompt, imageUrl, result) {
	if (!result.ok) return result;
	if (result.imageUrl || result.videoUrl) return result;
	const kind = promisedMedia(result.text) ?? (result.text.trim() === "[[image]]" || result.text.trim() === "[[video]]" ? result.text.includes("video") ? "video" : "image" : null);
	if (kind === "video") return makeVideo(apiKey, prompt, imageUrl);
	if (kind === "image") {
		if (imageUrl && wantsImageEdit(prompt)) return editImage(apiKey, prompt, imageUrl);
		return makeImage(apiKey, prompt);
	}
	return result;
}
var HOLDEY_SYSTEM = "You are Holdey, Interlude’s in-house assistant. Answer questions the way a strong, current AI should: correctly first, then clearly. Use live information when the question is about news, dates, prices, people, or anything that changes. Prefer the true answer over a short one. Short when the question is short. No preamble, no markdown tables, no emoji. Never mention Grok, xAI, or that another model is answering — you are Holdey. You do not generate pictures or videos in words. Never say you will generate, create, draw, or make a picture or video. Never describe a picture instead of making it. If the user asked for a picture, reply with exactly [[image]] on its own line and nothing else. If they asked for a video or clip, reply with exactly [[video]] on its own line and nothing else. The app then makes the file. If they ask about Interlude: it is a wait-time ad SDK. A Hold is the labeled skippable ad in the thinking well. A Holder owns the chat or app. Split of what the advertiser paid: Waiter 0.40, Holder 0.35, Interlude 0.25.";
function stripCitations(text) {
	return text.replace(/\[\[\d+\]\]\([^)]+\)/g, "").replace(/[ \t]+\n/g, "\n").replace(/ {2,}/g, " ").trim();
}
function textFromResponse(body) {
	const parts = [];
	for (const item of body.output ?? []) {
		if (item.type !== "message") continue;
		for (const c of item.content ?? []) if ((c.type === "output_text" || c.type === "text") && c.text) parts.push(c.text);
	}
	return stripCitations(parts.join("\n\n"));
}
async function answerWithSearch(apiKey, prompt, history, started) {
	try {
		const res = await fetch("https://api.x.ai/v1/responses", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				instructions: HOLDEY_SYSTEM,
				input: [...history, {
					role: "user",
					content: prompt
				}],
				tools: [{ type: "web_search" }],
				tool_choice: "auto",
				max_output_tokens: 1600,
				temperature: .4
			}),
			signal: AbortSignal.timeout(45e3)
		});
		if (!res.ok) return null;
		const text = textFromResponse(await res.json());
		if (!text) return null;
		return {
			ok: true,
			text,
			ms: Date.now() - started
		};
	} catch {
		return null;
	}
}
var askGrok_createServerFn_handler = createServerRpc({
	id: "c934df3e526f3570e1a7f17300945b14fae992187bb6e4db2e6e1e69bcb3fd24",
	name: "askGrok",
	filename: "src/lib/ask-grok.ts"
}, (opts) => askGrok.__executeServer(opts));
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
}).handler(askGrok_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Holdey is not available in this environment."
	};
	if (data.kind !== "hold") {
		const media = mediaIntent(data.prompt);
		if (data.imageUrl && wantsImageEdit(data.prompt)) return editImage(apiKey, data.prompt, data.imageUrl);
		if (data.imageUrl && shouldAnimateStill(data.prompt, true)) return makeVideo(apiKey, data.prompt, data.imageUrl);
		if (media === "image") return makeImage(apiKey, data.prompt);
		if (media === "video" || wantsVideo(data.prompt)) return makeVideo(apiKey, data.prompt);
	}
	if (!allow("chat")) return {
		ok: false,
		error: "Holdey is taking a short pause. Try again in a few minutes."
	};
	const started = Date.now();
	const system = data.kind === "hold" ? "You write Interlude Holds — 8-second skippable brand films for the wait while an AI thinks. Reply with exactly five lines and nothing else, in this shape:\nBRAND: \nCATEGORY: \nTAGLINE: \nBODY: \nCTA: \nTagline under 12 words. Body one sentence. CTA three to five words. No emoji, no quotes, no extra lines." : HOLDEY_SYSTEM;
	if (data.kind !== "hold") {
		const live = await answerWithSearch(apiKey, data.prompt, data.history, started);
		if (live) return recoverMedia(apiKey, data.prompt, data.imageUrl, live);
	}
	let res;
	try {
		res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: data.kind === "hold" ? 280 : 1600,
				temperature: data.kind === "hold" ? .7 : .4,
				messages: [
					{
						role: "system",
						content: system
					},
					...data.history,
					{
						role: "user",
						content: data.prompt
					}
				]
			}),
			signal: AbortSignal.timeout(data.kind === "hold" ? 25e3 : 4e4)
		});
	} catch {
		return {
			ok: false,
			error: "Holdey did not respond in time. Skip and try again."
		};
	}
	if (!res.ok) return {
		ok: false,
		error: `Holdey could not answer (${res.status}).`
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "Holdey returned an empty answer."
	};
	const spoken = {
		ok: true,
		text,
		ms: Date.now() - started
	};
	if (data.kind !== "hold") return recoverMedia(apiKey, data.prompt, data.imageUrl, spoken);
	return spoken;
});
async function makeImage(apiKey, prompt) {
	if (!allow("image")) return {
		ok: false,
		error: "Picture requests are paused for a few minutes. Ask with words, or try again shortly."
	};
	const started = Date.now();
	let res;
	try {
		res = await fetch("https://api.x.ai/v1/images/generations", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-imagine-image-2.0",
				prompt,
				n: 1,
				resolution: "1k"
			}),
			signal: AbortSignal.timeout(35e3)
		});
	} catch {
		return {
			ok: false,
			error: "The picture took too long. Skip and try again."
		};
	}
	if (!res.ok) return {
		ok: false,
		error: `Holdey could not make that picture (${res.status}).`
	};
	const imageUrl = (await res.json()).data?.[0]?.url;
	if (!imageUrl) return {
		ok: false,
		error: "Holdey made a blank picture. Try another prompt."
	};
	return {
		ok: true,
		text: "Here is the picture.",
		imageUrl,
		ms: Date.now() - started
	};
}
async function editImage(apiKey, prompt, imageUrl) {
	if (!allow("image")) return {
		ok: false,
		error: "Picture requests are paused for a few minutes. Ask with words, or try again shortly."
	};
	const started = Date.now();
	let res;
	try {
		res = await fetch("https://api.x.ai/v1/images/edits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-imagine-image-2.0",
				prompt,
				n: 1,
				resolution: "1k",
				image: {
					url: imageUrl,
					type: "image_url"
				}
			}),
			signal: AbortSignal.timeout(4e4)
		});
	} catch {
		return {
			ok: false,
			error: "The picture took too long. Skip and try again."
		};
	}
	if (!res.ok) return {
		ok: false,
		error: `Holdey could not update that picture (${res.status}).`
	};
	const next = (await res.json()).data?.[0]?.url;
	if (!next) return {
		ok: false,
		error: "Holdey made a blank picture. Try another prompt."
	};
	return {
		ok: true,
		text: "Here is an updated picture.",
		imageUrl: next,
		ms: Date.now() - started
	};
}
async function makeVideo(apiKey, prompt, imageUrl) {
	if (!allow("video")) return {
		ok: false,
		error: "Video requests are paused for a few minutes. Ask for a picture, or try again shortly."
	};
	const started = Date.now();
	const motion = shouldAnimateStill(prompt, Boolean(imageUrl)) && prompt.trim().length < 80 ? "Natural motion, cinematic, keep the subject and the scene, subtle life in the face and clothes." : prompt.trim() || "Natural motion, cinematic camera, keep the subject and the scene.";
	let start;
	try {
		start = await fetch("https://api.x.ai/v1/videos/generations", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-imagine-video-1.5",
				prompt: motion,
				duration: 6,
				aspect_ratio: "16:9",
				resolution: "720p",
				...imageUrl ? { image: { url: imageUrl } } : {}
			}),
			signal: AbortSignal.timeout(2e4)
		});
	} catch {
		return {
			ok: false,
			error: "The video did not start. Skip and try again."
		};
	}
	if (!start.ok) return {
		ok: false,
		error: `Holdey could not make that video (${start.status}).`
	};
	const id = (await start.json()).request_id;
	if (!id) return {
		ok: false,
		error: "The video did not start. Try another prompt."
	};
	for (let i = 0; i < 14; i++) {
		await new Promise((r) => setTimeout(r, 4e3));
		let poll;
		try {
			poll = await fetch(`https://api.x.ai/v1/videos/${id}`, {
				headers: { Authorization: `Bearer ${apiKey}` },
				signal: AbortSignal.timeout(1e4)
			});
		} catch {
			continue;
		}
		if (!poll.ok) continue;
		const data = await poll.json();
		if (data.status === "done" && data.video?.url) return {
			ok: true,
			text: imageUrl ? "Here is the clip from your still." : "Here is the clip.",
			videoUrl: data.video.url,
			ms: Date.now() - started
		};
		if (data.status === "failed" || data.status === "expired") return {
			ok: false,
			error: "That video did not finish. Try a simpler prompt."
		};
	}
	return {
		ok: false,
		error: "The video is still rendering. Skip and ask again in a moment."
	};
}
//#endregion
export { askGrok_createServerFn_handler };
