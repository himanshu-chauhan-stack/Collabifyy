import { useEffect, useState } from "react";

type UseTypewriterOptions = {
  text: string;
  /**
   * Milliseconds to wait before starting the animation.
   */
  startDelayMs?: number;
  /**
   * Milliseconds between each character.
   * Lower = faster typing.
   */
  charSpeedMs?: number;
  /**
   * Whether the animation should loop.
   */
  loop?: boolean;
};

export function useTypewriter({
  text,
  startDelayMs = 200,
  charSpeedMs = 45,
  loop = false,
}: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState(text);
  const [isDone, setIsDone] = useState(true);

  useEffect(() => {
    // Respect users who prefer reduced motion – just show the full text.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) {
      setDisplayed(text);
      setIsDone(true);
      return;
    }

    setDisplayed("");
    setIsDone(false);

    let index = 0;
    let timerId: number | undefined;
    let startTimerId: number | undefined;

    const step = () => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index < text.length) {
        timerId = window.setTimeout(step, charSpeedMs);
      } else if (loop) {
        // Small pause at the end, then restart.
        timerId = window.setTimeout(() => {
          index = 0;
          setDisplayed("");
          step();
        }, 1200);
      } else {
        setIsDone(true);
      }
    };

    startTimerId = window.setTimeout(step, startDelayMs);

    return () => {
      if (timerId !== undefined) {
        window.clearTimeout(timerId);
      }
      if (startTimerId !== undefined) {
        window.clearTimeout(startTimerId);
      }
    };
  }, [text, startDelayMs, charSpeedMs, loop]);

  return { displayed, isDone };
}


