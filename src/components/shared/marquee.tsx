"use client";

interface MarqueeProps {
  items: string[];
  className?: string;
  /** seconds for one full loop — default 28 */
  speed?: number;
}

/**
 * Infinite right-to-left scrolling ticker.
 * Two identical tracks sit side-by-side so the seam is invisible.
 * Pure CSS animation — no JS timers, no layout thrash.
 */
export function Marquee({ items, className, speed = 28 }: MarqueeProps) {
  return (
    <div
      className={
        "relative overflow-hidden " +
        "[mask-image:linear-gradient(90deg,transparent_0%,black_12%,black_88%,transparent_100%)] " +
        (className ?? "")
      }
    >
      <div
        className="flex w-max"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {/* Track A */}
        {items.map((item, i) => (
          <span key={`a-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-8 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-ink-muted/80 transition-colors hover:text-saffron">
              {item}
            </span>
            <span className="text-saffron/30 select-none">·</span>
          </span>
        ))}
        {/* Track B — exact duplicate so the loop is seamless */}
        {items.map((item, i) => (
          <span key={`b-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-8 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-ink-muted/80 transition-colors hover:text-saffron">
              {item}
            </span>
            <span className="text-saffron/30 select-none">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
