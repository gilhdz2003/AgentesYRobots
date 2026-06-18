import type { Variants } from "motion/react";

/**
 * Centralized animation variants for the Agentes&Robots portal.
 *
 * Instead of every component using the same fade-up pattern,
 * each section gets a distinct entrance animation to create visual rhythm.
 */

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

/**
 * Container variant that staggers its children.
 * Apply to the parent wrapper; children must have their own variants
 * and use `variants` prop (not `initial`/`whileInView`).
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Transition preset used with whileInView on stagger containers.
 */
export const sectionTransition = {
  duration: 0.6,
  ease: "easeOut" as const,
};
