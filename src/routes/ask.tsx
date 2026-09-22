import { createFileRoute } from "@tanstack/react-router";
import { AetherChat } from "@/components/aether-chat";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/ask")({ component: AskPage });

function AskPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-3 sm:px-6">
        <div className="flex min-h-0 w-full max-w-2xl flex-1 flex-col">
          <AetherChat
            live
            compact
            className="h-[min(40rem,calc(100dvh-12rem))] min-h-[28rem] sm:h-[min(48rem,calc(100dvh-7rem))]"
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
