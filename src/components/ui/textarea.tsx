import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid}
      className={cn(
        "flex min-h-[110px] w-full rounded-lg border bg-canvas-overlay/60 px-3.5 py-2.5 text-[14.5px] text-ink placeholder:text-ink-faint transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-saffron disabled:cursor-not-allowed disabled:opacity-50",
        invalid ? "border-rust/70" : "border-border",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
