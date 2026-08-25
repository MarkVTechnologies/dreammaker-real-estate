"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * Counts a text node up to `value` once it scrolls into view. Returns null
 * (no animation, caller renders a pending state) when value is unconfirmed —
 * PRD §10.2/§15 forbid fabricated figures, so there is never a fake count.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  value: number | null,
  suffix = "",
) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });

  useEffect(() => {
    if (inView && value !== null) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest).toLocaleString("en-NG")}${suffix}`;
        }
      }),
    [spring, suffix],
  );

  return ref;
}
