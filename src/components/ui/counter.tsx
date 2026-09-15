"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [tally, setTally] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setTally(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  // Reduced motion skips the animation entirely and renders the final figure.
  const display = reduced ? value : tally;

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
