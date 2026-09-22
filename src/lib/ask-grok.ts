import { createServerFn } from "@tanstack/react-start";
import { ADS } from "@/lib/ads";
import type { ProviderId } from "@/lib/ai-routing";
import { answerHelp, answerProduct } from "@/lib/help";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type AskResult =
  | {
      ok: true;
      text: string;
      ms: number;
      imageUrl?: string;
      videoUrl?: string;
    }
  | { ok: false; error: string };

type AskInput = {
  prompt: string;
  kind: "chat" | "hold";
  history: ChatTurn[];
  imageUrl?: string;
  provider: ProviderId;
};

const WINDOW_MS = 10 * 60 * 1000;
const hits = { chat: [] as number[], image: [] as number[], video: [] as number[] };
const CAP = { chat: 40, image: 8, video: 3 };

function allow(kind: keyof typeof hits): boolean {
  const now = Date.now();
  const bucket = hits[kind].filter((t) => now - t < WINDOW_MS);
  hits[kind] = bucket;
  if (bucket.length >= CAP[kind]) return false;
  bucket.push(now);
  return true;
}

const VIDEO_WORD =
  /\b(v[iey]d(?:eo|oe|io|oi)e?s?|clips?|animat\w*|\bmp4\b|cinemagraphs?|movies?|films?)\b/;

export function mediaIntent(prompt: string): "image" | "video" | null {
  const q = prompt.toLowerCase().trim();
  if (!q) return null;
  const video = VIDEO_WORD.test(q);
  const imageNoun =
    /(images?|pictures?|photos?|\bpics?\b|illustrations?|drawings?|artworks?|posters?|wallpapers?|stills?|thumbnails?)/.test(
      q,
    );
  const howTo = /\b(how (do i|to)|what is|what's|whats|who is)\b/.test(q);
  const draw =
    /\b(draw|paint|sketch|illustrate|doodle|render)\b/.test(q) && !howTo;
  const ask =
    /(generat|creat|make|show me|send me|give me|want|need|can you|could you|please|i'd like|id like|i would like|visuali[sz]e|depict|turn|convert|imagine)\b/.test(
      q,
    );
  if (video && (ask || imageNoun || /\bof\b/.test(q) || /^(a |an |the )?(short )?video\b/.test(q))) {
    return "video";
  }
  if (imageNoun && (ask || /\bof\b/.test(q) || draw || /^(a |an |the )?(picture|photo|image)\b/.test(q))) {
    return "image";
  }
  if (draw) return "image";
  if (/\bshow me\b/.test(q) && !howTo && !/\b(how|why|where|page|hold)\b/.test(q)) {
    return "image";
  }
  return null;
}

export function wantsVideo(prompt: string): boolean {
  if (mediaIntent(prompt) === "video") return true;
  const q = prompt.toLowerCase();
  if (VIDEO_WORD.test(q) && /(turn|make|convert|change|transform|animat|into|from this|this)/.test(q)) {
    return true;
  }
  return /\b(animate|bring (it|this) to life|make (it|this) move|turn .{0,60}into)\b/.test(
    q,
  );
}

export function shouldAnimateStill(prompt: string, attachedNow: boolean): boolean {
  if (wantsVideo(prompt)) return true;
  if (wantsImageEdit(prompt)) return false;
  if (!attachedNow) return false;
  const q = prompt.toLowerCase().trim();
  if (!q) return true;
  if (/\?/.test(q)) return false;
  if (
    /^(what|what's|whats|who|who's|whose|describe|explain|caption|tell me|is this|identify)\b/.test(
      q,
    )
  ) {
    return false;
  }
  return true;
}

export function wantsImageEdit(prompt: string): boolean {
  const q = prompt.toLowerCase().trim();
  if (
    /\b(regenerat\w*|redo|try again|once more|another (one|go|version|picture|image|photo)|update(d)? (the |this )?(picture|image|photo|still)?|edit (the |this )?(picture|image|photo|still)?)\b/.test(
      q,
    )
  ) {
    return true;
  }
  if (
    /\b(add|remove|delete|take out|put in|swap|change|without|make it|make the|with a |with an )\b/.test(
      q,
    ) &&
    /\b(picture|image|photo|still|this|that|it|the (hat|hair|background|sky|color|colour|jacket|car|light))\b/.test(
      q,
    )
  ) {
    return true;
  }
  if (
    /^(add|remove|delete|take out|put in|change|make it|without|with a |with an )\b/.test(
      q,
    )
  ) {
    return true;
  }
  return false;
}

const HOLDEY_SYSTEM =
  "You are Holdey, Interlude’s in-house assistant. Answer questions the way a strong, current AI should: correctly first, then clearly. Use live information when the question is about news, dates, prices, people, or anything that changes. Prefer the true answer over a short one. Short when the question is short. No preamble, no markdown tables, no emoji. Never mention Grok, xAI, Gemini, ChatGPT, Claude, or that another model is answering — you are Holdey. You do not generate pictures or videos in words. Never say you will generate, create, draw, or make a picture or video. Never describe a picture instead of making it. If the user asked for a picture, reply with exactly [[image]] on its own line and nothing else. If they asked for a video or clip, reply with exactly [[video]] on its own line and nothing else. The app then makes the file. If they ask about Interlude: it is a wait-time ad SDK. A Hold is the labeled skippable ad in the thinking well. A Holder owns the chat or app. Split of what the advertiser paid: Waiter 0.40, Holder 0.35, Interlude 0.25.";

const HOLD_SYSTEM =
  "You write Interlude Holds — 8-second skippable brand films for the wait while an AI thinks. Reply with exactly five lines and nothing else, in this shape:\nBRAND: \nCATEGORY: \nTAGLINE: \nBODY: \nCTA: \nTagline under 12 words. Body one sentence. CTA three to five words. No emoji, no quotes, no extra lines.";

function asProvider(v: unknown): ProviderId {
  if (v === "gemini" || v === "chatgpt" || v === "claude") return v;
  return "grok";
}

function grokKey() {
  return process.env.XAI_API_KEY ?? "";
}
function geminiKey() {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ""
  );
}
function openaiKey() {
  return process.env.OPENAI_API_KEY ?? "";
}
function anthropicKey() {
  return process.env.ANTHROPIC_API_KEY ?? "";
}

export const listAiKeys = createServerFn({ method: "GET" }).handler(async () => ({
  grok: Boolean(grokKey()),
  gemini: Boolean(geminiKey()),
  chatgpt: Boolean(openaiKey()),
  claude: Boolean(anthropicKey()),
}));

function missingKey(name: string): AskResult {
  return {
    ok: false,
    error: `${name} is not available. Try Grok for this.`,
  };
}

function localHold(prompt: string): string {
  const ad = ADS[prompt.trim().length % ADS.length] ?? ADS[0];
  return [
    `BRAND: ${ad.name}`,
    `CATEGORY: ${ad.category}`,
    `TAGLINE: ${ad.tagline}`,
    `BODY: ${ad.body}`,
    `CTA: ${ad.cta}`,
  ].join("\n");
}

function stripCitations(text: string) {
  return text
    .replace(/\[\[\d+\]\]\([^)]+\)/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/ {2,}/g, " ")
    .trim();
}

function promisedMedia(text: string): "image" | "video" | null {
  const t = text.toLowerCase();
  const tag = t.match(/\[\[\s*(image|picture|photo|video|clip)\s*\]\]/);
  if (tag) return /video|clip/.test(tag[1]) ? "video" : "image";
  if (
    /(i('ll| will)|let me|i can|i am going to|i'm going to|i'll create|i will create|generating|i'll generate|i will generate|i'll make|i will make).{0,100}(image|picture|photo|video|clip|drawing)/.test(
      t,
    )
  ) {
    return VIDEO_WORD.test(t) ? "video" : "image";
  }
  return null;
}

async function recoverMedia(
  prompt: string,
  imageUrl: string | undefined,
  result: AskResult,
): Promise<AskResult> {
  if (!result.ok) return result;
  if (result.imageUrl || result.videoUrl) return result;
  const kind =
    promisedMedia(result.text) ??
    (result.text.trim() === "[[image]]" || result.text.trim() === "[[video]]"
      ? result.text.includes("video")
        ? "video"
        : "image"
      : null);
  const key = grokKey();
  if (!key) return result;
  if (kind === "video") return makeVideo(key, prompt, imageUrl);
  if (kind === "image") {
    if (imageUrl && wantsImageEdit(prompt)) return editImage(key, prompt, imageUrl);
    return makeImage(key, prompt);
  }
  return result;
}

async function chatGrok(
  prompt: string,
  history: ChatTurn[],
  kind: "chat" | "hold",
): Promise<AskResult> {
  const apiKey = grokKey();
  if (!apiKey) {
    if (kind === "hold") return { ok: true, text: localHold(prompt), ms: 0 };
    const local = answerProduct(prompt) ?? answerHelp(prompt);
    if (local) return { ok: true, text: local, ms: 0 };
    return { ok: false, error: "Holdey could not start that. Skip and try again." };
  }
  if (!allow("chat")) {
    return { ok: false, error: "Holdey is taking a short pause. Try again in a few minutes." };
  }
  const started = Date.now();
  const system = kind === "hold" ? HOLD_SYSTEM : HOLDEY_SYSTEM;
  if (kind !== "hold") {
    try {
      const res = await fetch("https://api.x.ai/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          instructions: HOLDEY_SYSTEM,
          input: [...history, { role: "user", content: prompt }],
          tools: [{ type: "web_search" }],
          tool_choice: "auto",
          max_output_tokens: 1600,
          temperature: 0.4,
        }),
        signal: AbortSignal.timeout(45000),
      });
      if (res.ok) {
        const body = (await res.json()) as {
          output?: { type?: string; content?: { type?: string; text?: string }[] }[];
        };
        const parts: string[] = [];
        for (const item of body.output ?? []) {
          if (item.type !== "message") continue;
          for (const c of item.content ?? []) {
            if ((c.type === "output_text" || c.type === "text") && c.text) parts.push(c.text);
          }
        }
        const text = stripCitations(parts.join("\n\n"));
        if (text) return { ok: true, text, ms: Date.now() - started };
      }
    } catch {
      /* fall through to chat completions */
    }
  }
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: kind === "hold" ? 280 : 1600,
        temperature: kind === "hold" ? 0.7 : 0.4,
        messages: [
          { role: "system", content: system },
          ...history,
          { role: "user", content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(kind === "hold" ? 25000 : 40000),
    });
    if (!res.ok) return { ok: false, error: `Holdey could not answer (${res.status}).` };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false, error: "Holdey returned an empty answer." };
    return { ok: true, text, ms: Date.now() - started };
  } catch {
    return { ok: false, error: "Holdey did not respond in time. Skip and try again." };
  }
}

async function chatGemini(prompt: string, history: ChatTurn[], kind: "chat" | "hold"): Promise<AskResult> {
  const key = geminiKey();
  if (!key) return missingKey("Gemini");
  const started = Date.now();
  const system = kind === "hold" ? HOLD_SYSTEM : HOLDEY_SYSTEM;
  const contents = [
    ...history.map((t) => ({
      role: t.role === "assistant" ? "model" : "user",
      parts: [{ text: t.content }],
    })),
    { role: "user", parts: [{ text: prompt }] },
  ];
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents,
          generationConfig: {
            maxOutputTokens: kind === "hold" ? 280 : 1600,
            temperature: kind === "hold" ? 0.7 : 0.4,
          },
        }),
        signal: AbortSignal.timeout(40000),
      },
    );
    if (!res.ok) return { ok: false, error: `Gemini could not answer (${res.status}).` };
    const body = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = body.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("\n").trim() ?? "";
    if (!text) return { ok: false, error: "Gemini returned an empty answer." };
    return { ok: true, text, ms: Date.now() - started };
  } catch {
    return { ok: false, error: "Gemini did not respond in time. Skip and try again." };
  }
}

async function chatOpenAi(prompt: string, history: ChatTurn[], kind: "chat" | "hold"): Promise<AskResult> {
  const key = openaiKey();
  if (!key) return missingKey("ChatGPT");
  const started = Date.now();
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: kind === "hold" ? 280 : 1600,
        temperature: kind === "hold" ? 0.7 : 0.4,
        messages: [
          { role: "system", content: kind === "hold" ? HOLD_SYSTEM : HOLDEY_SYSTEM },
          ...history,
          { role: "user", content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(40000),
    });
    if (!res.ok) return { ok: false, error: `ChatGPT could not answer (${res.status}).` };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false, error: "ChatGPT returned an empty answer." };
    return { ok: true, text, ms: Date.now() - started };
  } catch {
    return { ok: false, error: "ChatGPT did not respond in time. Skip and try again." };
  }
}

async function chatClaude(prompt: string, history: ChatTurn[], kind: "chat" | "hold"): Promise<AskResult> {
  const key = anthropicKey();
  if (!key) return missingKey("Claude");
  const started = Date.now();
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: kind === "hold" ? 280 : 1600,
        temperature: kind === "hold" ? 0.7 : 0.4,
        system: kind === "hold" ? HOLD_SYSTEM : HOLDEY_SYSTEM,
        messages: [...history, { role: "user", content: prompt }].map((t) => ({
          role: t.role,
          content: t.content,
        })),
      }),
      signal: AbortSignal.timeout(40000),
    });
    if (!res.ok) return { ok: false, error: `Claude could not answer (${res.status}).` };
    const body = (await res.json()) as { content?: { type?: string; text?: string }[] };
    const text =
      body.content
        ?.filter((c) => c.type === "text")
        .map((c) => c.text ?? "")
        .join("\n")
        .trim() ?? "";
    if (!text) return { ok: false, error: "Claude returned an empty answer." };
    return { ok: true, text, ms: Date.now() - started };
  } catch {
    return { ok: false, error: "Claude did not respond in time. Skip and try again." };
  }
}

async function makeImage(apiKey: string, prompt: string): Promise<AskResult> {
  if (!allow("image")) {
    return {
      ok: false,
      error: "Picture requests are paused for a few minutes. Ask with words, or try again shortly.",
    };
  }
  const started = Date.now();
  try {
    const res = await fetch("https://api.x.ai/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-imagine-image-quality",
        prompt,
        n: 1,
        resolution: "1k",
      }),
      signal: AbortSignal.timeout(35000),
    });
    if (!res.ok) return { ok: false, error: `Holdey could not make that picture (${res.status}).` };
    const body = (await res.json()) as { data?: { url?: string }[] };
    const imageUrl = body.data?.[0]?.url;
    if (!imageUrl) return { ok: false, error: "Holdey made a blank picture. Try another prompt." };
    return { ok: true, text: "Here is the picture.", imageUrl, ms: Date.now() - started };
  } catch {
    return { ok: false, error: "The picture took too long. Skip and try again." };
  }
}

async function editImage(apiKey: string, prompt: string, imageUrl: string): Promise<AskResult> {
  if (!allow("image")) {
    return {
      ok: false,
      error: "Picture requests are paused for a few minutes. Ask with words, or try again shortly.",
    };
  }
  const started = Date.now();
  try {
    const res = await fetch("https://api.x.ai/v1/images/edits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-imagine-image-quality",
        prompt,
        n: 1,
        resolution: "1k",
        image: { url: imageUrl, type: "image_url" },
      }),
      signal: AbortSignal.timeout(40000),
    });
    if (!res.ok) return { ok: false, error: `Holdey could not update that picture (${res.status}).` };
    const body = (await res.json()) as { data?: { url?: string }[] };
    const next = body.data?.[0]?.url;
    if (!next) return { ok: false, error: "Holdey made a blank picture. Try another prompt." };
    return { ok: true, text: "Here is an updated picture.", imageUrl: next, ms: Date.now() - started };
  } catch {
    return { ok: false, error: "The picture took too long. Skip and try again." };
  }
}

async function makeVideo(apiKey: string, prompt: string, imageUrl?: string): Promise<AskResult> {
  if (!allow("video")) {
    return {
      ok: false,
      error: "Video requests are paused for a few minutes. Ask for a picture, or try again shortly.",
    };
  }
  const started = Date.now();
  const motion =
    shouldAnimateStill(prompt, Boolean(imageUrl)) && prompt.trim().length < 80
      ? "Natural motion, cinematic, keep the subject and the scene, subtle life in the face and clothes."
      : prompt.trim() || "Natural motion, cinematic camera, keep the subject and the scene.";
  try {
    const start = await fetch("https://api.x.ai/v1/videos/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-imagine-video",
        prompt: motion,
        duration: 6,
        aspect_ratio: "16:9",
        resolution: "720p",
        ...(imageUrl ? { image: { url: imageUrl } } : {}),
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!start.ok) return { ok: false, error: `Holdey could not make that video (${start.status}).` };
    const startedBody = (await start.json()) as { request_id?: string };
    const id = startedBody.request_id;
    if (!id) return { ok: false, error: "The video did not start. Try another prompt." };
    for (let i = 0; i < 14; i++) {
      await new Promise((r) => setTimeout(r, 4000));
      try {
        const poll = await fetch(`https://api.x.ai/v1/videos/${id}`, {
          headers: { Authorization: `Bearer ${apiKey}` },
          signal: AbortSignal.timeout(10000),
        });
        if (!poll.ok) continue;
        const data = (await poll.json()) as { status?: string; video?: { url?: string } };
        if (data.status === "done" && data.video?.url) {
          return {
            ok: true,
            text: imageUrl ? "Here is the clip from your still." : "Here is the clip.",
            videoUrl: data.video.url,
            ms: Date.now() - started,
          };
        }
        if (data.status === "failed" || data.status === "expired") {
          return { ok: false, error: "That video did not finish. Try a simpler prompt." };
        }
      } catch {
        continue;
      }
    }
    return { ok: false, error: "The video is still rendering. Skip and ask again in a moment." };
  } catch {
    return { ok: false, error: "The video did not start. Skip and try again." };
  }
}

async function answerWith(
  provider: ProviderId,
  prompt: string,
  history: ChatTurn[],
  kind: "chat" | "hold",
): Promise<AskResult> {
  if (provider === "gemini") return chatGemini(prompt, history, kind);
  if (provider === "chatgpt") return chatOpenAi(prompt, history, kind);
  if (provider === "claude") return chatClaude(prompt, history, kind);
  return chatGrok(prompt, history, kind);
}

export const askGrok = createServerFn({ method: "POST" })
  .validator((input: unknown): AskInput => {
    const raw = input as {
      prompt?: string;
      kind?: string;
      history?: ChatTurn[];
      imageUrl?: string;
      provider?: string;
    };
    const prompt = String(raw?.prompt ?? "").trim();
    if (!prompt) throw new Error("Ask something first.");
    if (prompt.length > 2000) throw new Error("Keep it under 2,000 characters.");
    const history = Array.isArray(raw?.history)
      ? raw.history
          .slice(-8)
          .map((t) => ({
            role: t?.role === "assistant" ? ("assistant" as const) : ("user" as const),
            content: String(t?.content ?? "").slice(0, 2000),
          }))
          .filter((t) => t.content)
      : [];
    const imageUrl = String(raw?.imageUrl ?? "").trim();
    const still =
      imageUrl &&
      imageUrl.length <= 2_000_000 &&
      (imageUrl.startsWith("http://") ||
        imageUrl.startsWith("https://") ||
        imageUrl.startsWith("data:image/"))
        ? imageUrl
        : undefined;
    return {
      prompt,
      kind: raw?.kind === "hold" ? "hold" : "chat",
      history,
      imageUrl: still,
      provider: asProvider(raw?.provider),
    };
  })
  .handler(async ({ data }): Promise<AskResult> => {
    if (data.kind !== "hold") {
      const media = mediaIntent(data.prompt);
      const key = grokKey();
      if (key) {
        if (data.imageUrl && wantsImageEdit(data.prompt)) {
          return editImage(key, data.prompt, data.imageUrl);
        }
        if (data.imageUrl && shouldAnimateStill(data.prompt, true)) {
          return makeVideo(key, data.prompt, data.imageUrl);
        }
        if (media === "image") return makeImage(key, data.prompt);
        if (media === "video" || wantsVideo(data.prompt)) {
          return makeVideo(key, data.prompt);
        }
      }
    }

    const spoken = await answerWith(data.provider, data.prompt, data.history, data.kind);
    if (data.kind !== "hold") {
      return recoverMedia(data.prompt, data.imageUrl, spoken);
    }
    return spoken;
  });
