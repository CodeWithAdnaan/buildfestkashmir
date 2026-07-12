import type { Variants } from "framer-motion";

/** Standard scroll-reveal: fade + rise. Used by <Reveal>. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] },
  },
};

/** Stagger children of a container as it enters the viewport. */
export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/** Hero headline lines — masked upward reveal. */
export const lineUp: Variants = {
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] },
  },
};

/** Subtle scale-in for cards / media blocks. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] },
  },
};
