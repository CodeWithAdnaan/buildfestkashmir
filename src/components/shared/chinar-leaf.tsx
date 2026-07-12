import { cn } from "@/lib/utils";

/**
 * The brand's signature motif — a single continuous-stroke chinar leaf,
 * Kashmir's iconic tree. Reused as a section divider, a hero watermark,
 * and the wordmark icon. Deliberately the one bold visual idea on the
 * page; kept quiet everywhere it appears.
 */
export function ChinarLeaf({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("stroke-current", className)}
      strokeWidth={1.3}
      aria-hidden="true"
    >
      <path d="M12 2C7 6 4 10 4 14a8 8 0 0 0 16 0c0-4-3-8-8-12z" />
      <path d="M12 5v15" strokeWidth={1} />
    </svg>
  );
}
