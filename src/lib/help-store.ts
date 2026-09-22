import { create } from "zustand";

type HelpState = {
  open: boolean;
  show: () => void;
  hide: () => void;
};

export const useHelpStore = create<HelpState>((set) => ({
  open: false,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}));
