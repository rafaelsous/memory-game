import { useEffect, useState } from "react";

import { useGameStore } from "@/shared/stores/game.store";

export function useCountDownOverlayViewModel() {
  const [count, setCount] = useState<number>(3);
  const { status } = useGameStore();
  const visible = status === "countdown";

  useEffect(() => {
    if (visible) {
      setCount(3);

      let currentCount = 3;

      const countdown = setInterval(() => {
        if (currentCount > 1) {
          currentCount--;
          setCount(currentCount);
        } else {
          clearInterval(countdown);
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [visible, setCount]);

  return { count, setCount };
}
