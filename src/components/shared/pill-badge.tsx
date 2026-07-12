import { cn } from "@/lib/utils";

/** Small glass eyebrow pill — status indicators, section labels. */
export function PillBadge({
  children,
  dot = true,
  className,
}: {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-canvas-raised/60 px-3.5 py-1.5 font-mono text-[12px] tracking-wide text-ink-muted backdrop-blur",
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 animate-[pulse-dot] rounded-full bg-saffron" />}
      {children}
    </div>
  );
}
