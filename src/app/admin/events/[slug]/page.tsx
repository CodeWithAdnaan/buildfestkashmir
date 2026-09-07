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

  return <EventForm initialEvent={event} />;
}
