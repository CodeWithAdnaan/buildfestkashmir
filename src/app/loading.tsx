import { ChinarLeaf } from "@/components/shared/chinar-leaf";

/**
 * Root-level loading fallback — shown while a route segment without its
 * own loading.tsx is fetching/rendering. Kept minimal and brand-consistent
 * rather than a generic spinner.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas">
      <ChinarLeaf className="h-8 w-8 animate-pulse text-saffron" />
    </div>
  );
}
