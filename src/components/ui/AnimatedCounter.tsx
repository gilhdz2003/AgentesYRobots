import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string; // "+", "%", "K", etc.
  prefix?: string; // "$", etc.
  duration?: number; // seconds, default 2
  delay?: number; // seconds, default 0
  /** Called with the numeric value, should return the display string.
   *  e.g. (v) => v >= 1000 ? `${Math.round(v / 1000)}K` : String(v)
   */
  formatValue?: (v: number) => string;
}

/**
 * Animates a number from 0 to `value` when it enters the viewport.
 * Uses Motion's useMotionValue for GPU-driven interpolation.
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  delay = 0,
  formatValue,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const display = useTransform(motionValue, (v) => {
    const formatted = formatValue ? formatValue(v) : String(Math.round(v));
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, motionValue, value, duration, delay]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
