import { create } from "zustand";
import { persist } from "zustand/middleware";
import { persistStorage } from "@/lib/storage";

export type ProviderId = "grok" | "gemini" | "chatgpt" | "claude";
export type TaskId = "chat" | "image" | "video" | "hold";

export const PROVIDERS: { id: ProviderId; name: string; line: string }[] = [
  { id: "grok", name: "Grok", line: "Live in this app." },
  { id: "gemini", name: "Gemini", line: "Google." },
  { id: "chatgpt", name: "ChatGPT", line: "OpenAI." },
  { id: "claude", name: "Claude", line: "Anthropic." },
];

export const TASKS: { id: TaskId; name: string; grokOnly?: boolean }[] = [
  { id: "chat", name: "Answers" },
  { id: "hold", name: "Hold copy" },
  { id: "image", name: "Pictures", grokOnly: true },
  { id: "video", name: "Clips", grokOnly: true },
];

type State = {
  routing: Record<TaskId, ProviderId>;
  setTask: (task: TaskId, provider: ProviderId) => void;
};

export const useAiRouting = create<State>()(
  persist(
    (set) => ({
      routing: { chat: "grok", image: "grok", video: "grok", hold: "grok" },
      setTask: (task, provider) =>
        set((s) => ({ routing: { ...s.routing, [task]: provider } })),
    }),
    { name: "interlude-ai-routing", storage: persistStorage },
  ),
);
