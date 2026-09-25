import { createServerFn } from "@tanstack/react-start";

/** Server-fn wrappers for Bank / Eng UI. Prefer HTTP /api/impressions for hold.js. */
export const getHolderImpressionStats = createServerFn({ method: "GET" })
  .validator((input: unknown): { holder: string } => {
    const raw = (input ?? {}) as { holder?: string };
    const holder = String(raw.holder ?? "holdey").trim() || "holdey";
    return { holder };
  })
  .handler(async ({ data }) => {
    const { holderCounts, seedHolders } = await import("./impressions.server");
    await seedHolders();
    return holderCounts(data.holder);
  });
