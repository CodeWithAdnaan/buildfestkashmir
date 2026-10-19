import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GalleryHero } from "@/components/sections/gallery/gallery-hero";
import { GalleryContent } from "@/components/sections/gallery/gallery-content";
import { siteConfig } from "@/lib/constants/site";
import { getGalleryAlbums } from "@/lib/data/gallery";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Real photos and clips from BuildFest Kashmir hackathons, workshops, and demo nights — not stock photography.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Gallery — ${siteConfig.name}`,
    description: "Real photos and clips from BuildFest Kashmir events.",
  },
};

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <>
      <SiteHeader />
      <main>
        <GalleryHero />
        <GalleryContent albums={albums} />
      </main>
      <SiteFooter />
    </>
  );
}
