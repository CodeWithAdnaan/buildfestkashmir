import { createClient } from "@/lib/supabase/server";
import { galleryAlbums as staticAlbums, getRandomGradient } from "@/lib/constants/gallery";
import type { GalleryAlbum, GalleryItem } from "@/types/gallery";

export { getRandomGradient };

/**
 * Fetch dynamic gallery albums from Supabase site_settings / posts,
 * merging with any event-specific photos, or falling back to static constants.
 */
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  try {
    const supabase = await createClient();

    // 1. Try dedicated site_settings table first
    const { data: siteSettingsData, error: siteSettingsErr } = await (supabase as any)
      .from("site_settings")
      .select("data")
      .eq("id", "gallery_albums")
      .maybeSingle();

    if (!siteSettingsErr && siteSettingsData && Array.isArray((siteSettingsData as any).data)) {
      return (siteSettingsData as any).data as GalleryAlbum[];
    }

    // 2. Try posts backup table
    const { data: postData } = await supabase
      .from("posts")
      .select("excerpt")
      .eq("slug", "__gallery_albums__")
      .maybeSingle();

    if (postData?.excerpt) {
      try {
        const parsed = JSON.parse(postData.excerpt);
        if (Array.isArray(parsed)) {
          return parsed as GalleryAlbum[];
        }
      } catch {}
    }
  } catch {
    // Supabase offline fallback
  }

  return staticAlbums;
}

/**
 * Fetch photos for a specific event
 */
export async function getEventPhotos(eventSlug: string): Promise<GalleryItem[]> {
  const albums = await getGalleryAlbums();
  const match = albums.find((a) => a.eventSlug === eventSlug || a.slug === eventSlug);
  return match?.items || [];
}
