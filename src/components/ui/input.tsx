import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      aria-invalid={invalid}
      className={cn(
        "flex h-11 w-full rounded-lg border bg-canvas-overlay/60 px-3.5 text-[14.5px] text-ink placeholder:text-ink-faint transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-saffron disabled:cursor-not-allowed disabled:opacity-50",
        invalid ? "border-rust/70" : "border-border",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
