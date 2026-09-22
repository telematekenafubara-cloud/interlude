import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/waits")({
  beforeLoad: () => {
    throw redirect({ to: "/holder" });
  },
});
