import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { AlbumTile } from "@/components/sections/gallery/album-tile";
import type { GalleryAlbum } from "@/types/gallery";

interface AlbumSectionProps {
  album: GalleryAlbum;
  onSelect: (itemId: string) => void;
}

export function AlbumSection({ album, onSelect }: AlbumSectionProps) {
  return (
    <section className="py-10 sm:py-12">
      <div className="container-content">
        <Reveal className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <PillBadge dot={false} className="mb-3">
              {album.date.toUpperCase()}
            </PillBadge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{album.title}</h2>
          </div>
          {album.eventSlug && (
            <Link
              href={`/events/${album.eventSlug}`}
              className="flex items-center gap-1 text-[13.5px] font-medium text-saffron transition-opacity hover:opacity-80"
            >
              View event <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </Reveal>

        <Reveal className="columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
          {album.items.map((item) => (
            <AlbumTile key={item.id} item={item} onClick={() => onSelect(item.id)} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
