import { Link } from "@tanstack/react-router";
import { PauseMark } from "@/components/marks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const item =
  "inline-flex min-h-11 shrink-0 items-center px-3 text-sm hover:text-foreground";

const PAGES = [
  { to: "/hold", label: "Hold" },
  { to: "/holder", label: "Holder" },
  { to: "/bank", label: "Bank" },
  { to: "/network", label: "Network" },
  { to: "/studio", label: "Studio" },
  { to: "/proposal", label: "Proposal" },
  { to: "/ask", label: "Ask" },
] as const;

export function SiteNav({ solid = false }: { solid?: boolean }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40",
        solid
          ? "border-b border-border bg-background"
          : "bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex w-fit items-center gap-2.5 text-foreground"
          aria-label="Interlude home"
        >
          <PauseMark className="size-4 text-hold" />
          <span className="font-serif text-xl leading-none tracking-tight">
            Interlude
          </span>
        </Link>
        <nav
          className="mt-2 flex min-w-0 flex-wrap items-center gap-0.5"
          aria-label="Pages"
        >
          {PAGES.map((page) => (
            <Link
              key={page.to}
              to={page.to}
              className={item}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
            >
              {page.label}
            </Link>
          ))}
          <Button asChild size="sm" variant="primary">
            <Link to="/install">Install</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
