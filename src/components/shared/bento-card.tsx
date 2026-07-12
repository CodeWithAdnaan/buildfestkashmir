"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations/variants";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: "saffron" | "pine" | "none";
  as?: "div" | "article";
  delay?: number;
  id?: string;
  onClick?: () => void;
}

/**
 * Standard bento tile: glass surface, 1px border that lights up saffron on
 * hover, subtle lift + shadow. Used for every card in the home bento grid —
 * span sizes are controlled entirely via `className` (col-span-*, row-span-*)
 * from the parent grid.
 */
export function BentoCard({
  children,
  className,
  glow = "none",
  delay = 0,
  id,
  onClick,
}: BentoCardProps) {
  return (
    <motion.div
      id={id}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className={cn(
        "group glass glass-hover relative overflow-hidden rounded-xl p-7 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]",
        "sm:p-8",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {glow !== "none" && (
        <div
          className={cn(
            "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
            glow === "saffron" ? "bg-saffron/30" : "bg-pine-glow/40",
          )}
        />
      )}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}
