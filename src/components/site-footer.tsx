import { Link } from "@tanstack/react-router";
import { PauseMark } from "@/components/marks";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-2 text-foreground">
            <PauseMark className="size-3.5 text-hold" />
            <span className="font-serif text-lg">Interlude</span>
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            A Hold is a timed brand moment in the seconds an AI spends thinking.
            Then the answer arrives.
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-subtle">
            Prototype by Telema Tekena Fubara. Built with Grok, September 2026.
            <br />
            © 2026 Telema Tekena Fubara. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link to="/hold" className="hover:text-foreground">
            Hold
          </Link>
          <Link to="/holder" className="hover:text-foreground">
            Holder
          </Link>
          <Link to="/bank" className="hover:text-foreground">
            Bank
          </Link>
          <Link to="/install" className="hover:text-foreground">
            Install
          </Link>
          <Link to="/studio" className="hover:text-foreground">
            Run a Hold
          </Link>
          <Link to="/proposal" className="hover:text-foreground">
            Proposal
          </Link>
          <span>Skip arrow after five seconds.</span>
        </div>
      </div>
    </footer>
  );
}
