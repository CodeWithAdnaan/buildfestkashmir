import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { galleryAlbums } from "@/lib/constants/gallery";
import type { BuildFestEvent } from "@/types/event";

const gradients = [
  "from-[#3a5c48] to-[#16302a]",
  "from-[#4a3a26] to-[#1c1710]",
  "from-[#33574a] to-[#122320]",
  "from-[#5c4426] to-[#241a0e]",
  "from-[#2f5142] to-[#0f211b]",
  "from-[#46381f] to-[#1d1710]",
  "from-[#274b3f] to-[#0d1e19]",
  "from-[#5a3c2e] to-[#231710]",
];

export function Gallery({ event }: { event: BuildFestEvent }) {
  // Find the album for this specific event
  const album = galleryAlbums.find((a) => a.eventSlug === event.slug);
  
  // If we have an album, use its items up to the requested galleryTiles count.
  // Otherwise, fallback to the old gradient squares for events without photos yet.
  const tiles = album
    ? album.items.slice(0, event.galleryTiles)
    : Array.from({ length: event.galleryTiles }, (_, i) => ({
        id: `placeholder-${i}`,
        gradient: gradients[i % gradients.length],
        src: undefined,
        caption: "Event photo",
      }));

  if (tiles.length === 0) return null;

  return (
    <section className="py-6 sm:py-10">
      <div className="container-content">
        <Reveal className="mb-8">
          <PillBadge dot={false} className="mb-4">
            GALLERY
          </PillBadge>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">From the event</h2>
        </Reveal>
        <Reveal className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className={`group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br ${tile.gradient} transition-transform duration-500 hover:scale-[1.03]`}
            >
              {tile.src && (
                "isVideo" in tile && tile.isVideo ? (
                  <video
                    src={tile.src}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={tile.src}
                    alt={tile.caption || "Event photo"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                )
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
