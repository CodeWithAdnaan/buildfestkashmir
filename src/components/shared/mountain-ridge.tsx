import { cn } from "@/lib/utils";

/**
 * A silhouette of the valley skyline — used to seam the hero into the
 * next section instead of a generic wave/blob divider.
 */
export function MountainRidge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      className={cn("h-auto w-full fill-current", className)}
      aria-hidden="true"
    >
      <path d="M0,90 L120,55 L230,80 L340,30 L460,70 L580,20 L700,65 L830,40 L960,85 L1080,45 L1200,75 L1320,35 L1440,60 L1440,140 L0,140 Z" />
    </svg>
  );
}
