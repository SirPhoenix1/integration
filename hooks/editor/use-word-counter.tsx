import { create } from "zustand";

type WordCounterStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useWordCounter = create<WordCounterStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
