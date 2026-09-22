import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SkipArrow({
  onSkip,
  className,
}: {
  onSkip: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onSkip();
      }}
      aria-label="Skip this Hold"
      className={cn(
        "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-background/80 px-3.5 text-sm font-medium text-foreground shadow-[0_0_0_1px_rgba(244,241,234,0.18)] backdrop-blur-sm transition-[transform,opacity] duration-150 ease-out active:scale-[0.96]",
        className,
      )}
    >
      Skip
      <ArrowRight className="size-3.5" strokeWidth={2} />
    </button>
  );
}
