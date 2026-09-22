import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { useHelpStore } from "@/lib/help-store";

type ChatProps = {
  live?: boolean;
  compact?: boolean;
  kind?: "chat" | "hold" | "help";
  className?: string;
  onClose?: () => void;
};

export function AetherHelp() {
  const open = useHelpStore((s) => s.open);
  const hide = useHelpStore((s) => s.hide);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [Chat, setChat] = useState<ComponentType<ChatProps> | null>(null);

  useEffect(() => {
    hide();
  }, [pathname, hide]);

  useEffect(() => {
    if (!open || Chat) return;
    void import("@/components/aether-chat")
      .then((m) => setChat(() => m.AetherChat))
      .catch(() => setChat(null));
  }, [open, Chat]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, hide]);

  if (!open) return null;

  return (
    <div className="print:hidden">
      <button
        type="button"
        aria-label="Close help"
        className="fixed inset-0 z-50 bg-background/70"
        onClick={hide}
      />
      <div
        role="dialog"
        aria-label="Ask Holdey"
        className="fixed inset-x-0 bottom-0 z-50 h-[min(40rem,92dvh)] w-full sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(40rem,86dvh)] sm:w-[24rem]"
      >
        {Chat ? (
          <Chat
            live
            compact
            kind="chat"
            className="h-full rounded-t-2xl sm:h-full sm:rounded-2xl"
            onClose={hide}
          />
        ) : (
          <div className="grid h-full place-items-center rounded-t-2xl bg-card text-sm text-muted-foreground shadow-[0_0_0_1px_rgba(244,241,234,0.08)] sm:rounded-2xl">
            Opening Holdey…
          </div>
        )}
      </div>
    </div>
  );
}
