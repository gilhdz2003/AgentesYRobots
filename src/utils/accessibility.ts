/**
 * Detects if the user prefers reduced motion.
 * Used by GSAP animations and Motion variants to disable all animations.
 */
export const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Whether we're on a mobile viewport.
 * GSAP parallax and heavy scroll effects are disabled on mobile.
 */
export function isMobileWidth(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
}
