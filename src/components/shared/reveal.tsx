"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations/variants";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span";
}

/**
 * Scroll-triggered fade + rise wrapper. Wraps any block that should
 * animate in once, the first time it enters the viewport.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const MotionTag = as === "span" ? motion.span : motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
