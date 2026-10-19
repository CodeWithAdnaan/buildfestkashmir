import { requireAdminOrOrganizer } from "@/lib/auth/admin";
import { getGalleryAlbums } from "@/lib/data/gallery";
import { getEvents } from "@/lib/data/events";
import { GalleryManager } from "@/components/admin/gallery-manager";

export const revalidate = 0;

export default async function AdminGalleryPage() {
  await requireAdminOrOrganizer();

  const [albums, events] = await Promise.all([
    getGalleryAlbums(),
    getEvents(),
  ]);

  return <GalleryManager initialAlbums={albums} events={events} />;
}
