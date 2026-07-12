import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/gallery";

const spanHeights = {
  sm: "h-40 sm:h-48",
  md: "h-56 sm:h-64",
  lg: "h-72 sm:h-80",
};

export function AlbumTile({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl text-left transition-transform duration-500 hover:scale-[1.015]",
        !item.src && `bg-gradient-to-br ${item.gradient}`,
        spanHeights[item.span],
      )}
    >
      {/* Real photo or video */}
      {item.src && (
        item.isVideo ? (
          <video
            src={item.src}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt ?? item.caption}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )
      )}

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-canvas/0 transition-colors duration-300 group-hover:bg-canvas/30" />

      {/* Video play button */}
      {item.isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-canvas/50 backdrop-blur transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-4 w-4 fill-current text-ink" />
          </div>
        </div>
      )}

      {/* Caption — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/60 to-transparent p-4 font-mono text-[11px] tracking-wide text-snow opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {item.caption}
      </div>
    </button>
  );
}
