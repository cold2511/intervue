
import { useEffect, useState } from "react";

export function usePollTimer(
  startTime: number,
  duration: number
) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!startTime || !duration) {
      setRemaining(0);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - startTime) / 1000
      );
      const left = duration - elapsed;
      setRemaining(left > 0 ? left : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  return remaining;
}
