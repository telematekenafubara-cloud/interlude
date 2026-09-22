import { useEffect, useState } from "react";
import {
  PROVIDERS,
  TASKS,
  useAiRouting,
  type TaskId,
} from "@/lib/ai-routing";
import { cn } from "@/lib/utils";

export function ModelPicker({
  task = "chat",
}: {
  task?: TaskId;
}) {
  const routing = useAiRouting((s) => s.routing);
  const setTask = useAiRouting((s) => s.setTask);
  const [focus, setFocus] = useState<TaskId>(task);

  useEffect(() => {
    setFocus(task);
  }, [task]);

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
            </button>
          );
        })}
      </div>
    </div>
  );
}
