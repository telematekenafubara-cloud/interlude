import { AetherChat } from "@/components/aether-chat";

export function LandingDemo() {
  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-[1.75rem] bg-muted/40 sm:-inset-4" />
      <div className="relative">
        <AetherChat
          live
          demo
          compact
          className="h-[min(32rem,calc(100dvh-8rem))] sm:h-[36rem]"
        />
      </div>
    </div>
  );
}
