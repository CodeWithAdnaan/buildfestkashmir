import { notFound } from "next/navigation";
import { getEvent } from "@/lib/data/events";
import { EventForm } from "@/components/admin/event-form";

export const revalidate = 0;

export default async function AdminEditEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  // Pre-populate existing photos if not stored on the event record
  if (!event.photos || event.photos.length === 0) {
    const { getEventPhotos } = await import("@/lib/data/gallery");
    const photos = await getEventPhotos(slug);
    if (photos && photos.length > 0) {
      event.photos = photos;
    }
  }

  return <EventForm initialEvent={event} />;
}
