"use client";

import { useState, useMemo } from "react";
import { AlbumSection } from "@/components/sections/gallery/album-section";
import { Lightbox, type FlatGalleryItem } from "@/components/sections/gallery/lightbox";
import { galleryAlbums as defaultAlbums } from "@/lib/constants/gallery";
import type { GalleryAlbum } from "@/types/gallery";

interface GalleryContentProps {
  albums?: GalleryAlbum[];
}

export function GalleryContent({ albums = defaultAlbums }: GalleryContentProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const flatItems: FlatGalleryItem[] = useMemo(() => {
    return (albums || []).flatMap((album) =>
      album.items.map((item) => ({ ...item, albumTitle: album.title })),
    );
  }, [albums]);

  return (
    <>
      {(albums || []).map((album) => (
        <AlbumSection key={album.slug} album={album} onSelect={setOpenId} />
      ))}
      <Lightbox items={flatItems} openId={openId} onOpenChange={setOpenId} />
    </>
  );
}
