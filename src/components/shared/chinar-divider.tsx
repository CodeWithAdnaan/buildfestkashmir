import { ChinarLeaf } from "@/components/shared/chinar-leaf";

/** Quiet section seam — the signature motif at rest, used sparingly. */
export function ChinarDivider() {
  return (
    <div className="flex justify-center bg-snow py-2">
      <ChinarLeaf className="h-8 w-8 text-pine opacity-30" />
    </div>
  );
}
