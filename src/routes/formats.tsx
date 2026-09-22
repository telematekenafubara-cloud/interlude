import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/formats")({
  beforeLoad: () => {
    throw redirect({ to: "/hold" });
  },
});
