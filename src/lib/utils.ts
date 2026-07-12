import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicts (last one wins).
 * Standard shadcn/ui utility — used by every ui/ component.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an ISO date string as "18 Sep 2026". */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Format an ISO date range as "18–20 September 2026". */
export function formatDateRange(startIso: string, endIso: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const month = end.toLocaleDateString("en-IN", { month: "long" });
  const year = end.getFullYear();
  return `${start.getDate()}–${end.getDate()} ${month} ${year}`;
}
