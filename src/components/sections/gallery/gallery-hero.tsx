import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { galleryAlbums } from "@/lib/constants/gallery";

export function GalleryHero() {
  const totalPhotos = galleryAlbums.reduce((sum, album) => sum + album.items.length, 0);

  return (
    <section className="pb-4 pt-40 sm:pt-48">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <PillBadge className="mb-5">GALLERY</PillBadge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Real moments, not stock photos.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
            {totalPhotos} photos and clips across {galleryAlbums.length} events — every one from
            an actual BuildFest hackathon, workshop, or demo night.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
