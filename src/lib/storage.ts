import { createJSONStorage } from "zustand/middleware";

const memory: Record<string, string> = {};

const memoryStorage = {
  getItem: (k: string) => memory[k] ?? null,
  setItem: (k: string, v: string) => {
    memory[k] = v;
  },
  removeItem: (k: string) => {
    delete memory[k];
  },
};

/** localStorage in the browser; in-memory on the server so persist cannot crash SSR. */
export const persistStorage = createJSONStorage(() =>
  typeof window === "undefined" ? memoryStorage : window.localStorage,
);
