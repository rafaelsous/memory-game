import { create } from "zustand";

import { CardEntryAnimationType } from "../config/animation.config";

interface AnimationStore {
  entryAnimationType: CardEntryAnimationType;
  isAnimating: boolean;
  shouldAnimate: boolean;
  setEntryAnimationType: (type: CardEntryAnimationType) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setShouldAnimate: (shouldAnimate: boolean) => void;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  entryAnimationType: "throw",
  isAnimating: false,
  shouldAnimate: true,
  setEntryAnimationType: (entryAnimationType) => set({ entryAnimationType }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  setShouldAnimate: (shouldAnimate) => set({ shouldAnimate }),
}));
