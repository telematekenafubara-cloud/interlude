import { cn } from "@/lib/utils";

/** The thinking well — Interlude’s unit. Not a pause, not 11. */
export function PauseMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <path
        fillRule="evenodd"
        d="M4.2 1.6h7.6A2.6 2.6 0 0 1 14.4 4.2v7.6a2.6 2.6 0 0 1-2.6 2.6H4.2a2.6 2.6 0 0 1-2.6-2.6V4.2A2.6 2.6 0 0 1 4.2 1.6Zm0 1.9a.7.7 0 0 0-.7.7v7.6a.7.7 0 0 0 .7.7h7.6a.7.7 0 0 0 .7-.7V4.2a.7.7 0 0 0-.7-.7H4.2Z"
      />
    </svg>
  );
}

export function AetherMark({ className }: { className?: string }) {
  return <HoldeyMark className={className} />;
}

/** A filled well — Holdey answers inside Interlude’s wait. */
export function HoldeyMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <rect x="2.2" y="2.2" width="11.6" height="11.6" rx="2.6" />
    </svg>
  );
}
