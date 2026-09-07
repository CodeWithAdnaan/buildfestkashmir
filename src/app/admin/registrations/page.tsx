import { createClient } from "@/lib/supabase/server";
import { getEvents } from "@/lib/data/events";
import { RegistrationsClient } from "@/components/admin/registrations-client";

export const revalidate = 0;

export default async function AdminRegistrationsPage() {
  const supabase = await createClient();

  const [{ data: registrations }, events] = await Promise.all([
    supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false }),
    getEvents(),
  ]);

  const eventsList = events.map((e) => ({
    slug: e.slug,
    name: e.name,
  }));

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-border/60">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Participant Registrations
        </h1>
        <p className="mt-1 text-xs font-mono text-ink-muted">
          Search, filter by hackathon or experience, and export attendee lists for event-day check-in.
        </p>
      </div>

      <RegistrationsClient
        initialRegistrations={registrations || []}
        eventsList={eventsList}
      />
    </div>
  );
}
