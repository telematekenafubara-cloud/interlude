import { createFileRoute, redirect } from "@tanstack/react-router";

/** The mock proposal is retired — the real advertiser console lives at /studio. */
export const Route = createFileRoute("/proposal")({
  beforeLoad: () => {
    throw redirect({ to: "/studio" });
  },
});
