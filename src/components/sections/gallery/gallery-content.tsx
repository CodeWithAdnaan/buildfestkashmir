"use client";

import { useState } from "react";
import { AlbumSection } from "@/components/sections/gallery/album-section";
import { Lightbox, type FlatGalleryItem } from "@/components/sections/gallery/lightbox";
import { galleryAlbums } from "@/lib/constants/gallery";

const flatItems: FlatGalleryItem[] = galleryAlbums.flatMap((album) =>
  album.items.map((item) => ({ ...item, albumTitle: album.title })),
);

export function GalleryContent() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      {galleryAlbums.map((album) => (
        <AlbumSection key={album.slug} album={album} onSelect={setOpenId} />
      ))}
      <Lightbox items={flatItems} openId={openId} onOpenChange={setOpenId} />
    </>
  );
}
