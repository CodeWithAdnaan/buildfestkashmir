import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Personal", "Academic", "Links & Team", "Review"];

export function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-10 flex items-center">
      {steps.map((step, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[12px] transition-colors",
                  isDone && "border-saffron bg-saffron text-[#1a1103]",
                  isActive && !isDone && "border-saffron text-saffron",
                  !isActive && !isDone && "border-border text-ink-faint",
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden font-mono text-[10.5px] tracking-wide sm:block",
                  isActive || isDone ? "text-ink" : "text-ink-faint",
                )}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-px flex-1 transition-colors sm:mx-3",
                  isDone ? "bg-saffron" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
