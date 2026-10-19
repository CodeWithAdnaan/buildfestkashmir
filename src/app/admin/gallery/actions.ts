"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdminOrOrganizer } from "@/lib/auth/admin";
import { getGalleryAlbums } from "@/lib/data/gallery";
import type { GalleryAlbum, GalleryItem } from "@/types/gallery";

/**
 * Persist all gallery albums to Supabase
 */
export async function saveGalleryAlbumsAction(albums: GalleryAlbum[]) {
  await requireAdminOrOrganizer();
  const supabase = await createClient();

  // 1. Try dedicated site_settings table
  const { error: siteSettingsErr } = await (supabase as any)
    .from("site_settings")
    .upsert({
      id: "gallery_albums",
      data: albums,
      updated_at: new Date().toISOString(),
    });

  // 2. Backup to posts table if site_settings table isn't present
  if (siteSettingsErr) {
    await supabase.from("posts").upsert({
      slug: "__gallery_albums__",
      title: "Gallery Albums Settings",
      excerpt: JSON.stringify(albums),
      date: new Date().toISOString(),
      author: "Admin",
      author_role: "System",
      read_time: "1 min",
      gradient: "from-amber-500 to-orange-600",
      published: true,
    });
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");

  return { success: true };
}

/**
 * Delete a specific photo from an album
 */
export async function deleteGalleryPhotoAction(albumSlug: string, photoId: string) {
  await requireAdminOrOrganizer();
  const albums = await getGalleryAlbums();

  const updatedAlbums = albums.map((album) => {
    if (album.slug === albumSlug || album.eventSlug === albumSlug) {
      return {
        ...album,
        items: album.items.filter((item) => item.id !== photoId),
      };
    }
    return album;
  });

  return await saveGalleryAlbumsAction(updatedAlbums);
}

/**
 * Add a new photo to an album
 */
export async function addGalleryPhotoAction(albumSlug: string, photo: GalleryItem) {
  await requireAdminOrOrganizer();
  const albums = await getGalleryAlbums();

  const albumIndex = albums.findIndex(
    (a) => a.slug === albumSlug || a.eventSlug === albumSlug,
  );

  let updatedAlbums: GalleryAlbum[];

  if (albumIndex >= 0) {
    updatedAlbums = [...albums];
    updatedAlbums[albumIndex] = {
      ...updatedAlbums[albumIndex],
      items: [photo, ...updatedAlbums[albumIndex].items],
    };
  } else {
    // Create new album if not exists
    const newAlbum: GalleryAlbum = {
      slug: albumSlug,
      title: albumSlug.replace(/-/g, " ").toUpperCase(),
      eventSlug: albumSlug,
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      items: [photo],
    };
    updatedAlbums = [newAlbum, ...albums];
  }

  return await saveGalleryAlbumsAction(updatedAlbums);
}

/**
 * Delete an entire album
 */
export async function deleteAlbumAction(albumSlug: string) {
  await requireAdminOrOrganizer();
  const albums = await getGalleryAlbums();
  const updatedAlbums = albums.filter((a) => a.slug !== albumSlug && a.eventSlug !== albumSlug);
  return await saveGalleryAlbumsAction(updatedAlbums);
}
