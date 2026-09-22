import { useEffect, useState } from "react";
import {
  PROVIDERS,
  TASKS,
  useAiRouting,
  type ProviderId,
  type TaskId,
} from "@/lib/ai-routing";
import { listAiKeys } from "@/lib/ask-grok";
import { cn } from "@/lib/utils";

type Keys = Record<ProviderId, boolean>;

export function ModelPicker({
  task = "chat",
}: {
  task?: TaskId;
}) {
  const routing = useAiRouting((s) => s.routing);
  const setTask = useAiRouting((s) => s.setTask);
  const [focus, setFocus] = useState<TaskId>(task);
  const [keys, setKeys] = useState<Keys>({
    grok: true,
    gemini: false,
    chatgpt: false,
    claude: false,
  });

  useEffect(() => {
    setFocus(task);
  }, [task]);

  useEffect(() => {
    let live = true;
    listAiKeys()
      .then((next) => {
        if (live) setKeys(next);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const current = TASKS.find((t) => t.id === focus) ?? TASKS[0];
  const grokOnly = Boolean(current.grokOnly);

  return (
    <div className="shrink-0 border-t border-border px-3 pt-2.5">
      <p className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle">
        Work with
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {TASKS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setFocus(t.id)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[0.6875rem]",
              focus === t.id
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1 pb-1">
        {PROVIDERS.map((p) => {
          const locked = grokOnly && p.id !== "grok";
          const on = routing[focus] === p.id;
          const ready = keys[p.id];
          return (
            <button
              key={p.id}
              type="button"
              disabled={locked}
              onClick={() => setTask(focus, p.id)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[0.6875rem]",
                on
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
                locked && "cursor-not-allowed opacity-40",
              )}
            >
              {p.name}
              {!ready && p.id !== "grok" ? " · key" : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
