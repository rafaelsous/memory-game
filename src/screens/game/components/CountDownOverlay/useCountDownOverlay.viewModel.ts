import { useEffect, useState } from "react";

import { CountDownOverlayProps } from "@/screens/game/components/CountDownOverlay";

export function useCountDownOverlayViewModel({
  visibleCountDown: visible,
  handleCountdownComplete: handleCountDownComplete,
}: CountDownOverlayProps) {
  const [count, setCount] = useState<number>(3);

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
          handleCountDownComplete();
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [visible, setCount, handleCountDownComplete]);

  return { count, visible };
}
