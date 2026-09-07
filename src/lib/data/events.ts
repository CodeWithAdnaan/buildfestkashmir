import { createClient } from "@/lib/supabase/server";
import { events as staticEvents } from "@/lib/constants/events";
import type { BuildFestEvent } from "@/types/event";
import type { Database } from "@/lib/supabase/types";

type EventRow = Database["public"]["Tables"]["events"]["Row"];

export function mapRowToEvent(row: EventRow): BuildFestEvent {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    status: row.status,
    description: row.description,
    overview: row.overview,
    venue: row.venue,
    city: row.city,
    startDate: row.start_date,
    endDate: row.end_date,
    prizePool: row.prize_pool,
    teamSize: row.team_size,
    registrationOpen: row.registration_open,
    themes: row.themes || [],
    schedule: Array.isArray(row.schedule) ? row.schedule : [],
    speakers: Array.isArray(row.speakers) ? row.speakers : [],
    mentors: Array.isArray(row.mentors) ? row.mentors : [],
    sponsors: Array.isArray(row.sponsors) ? row.sponsors : [],
    prizes: Array.isArray(row.prizes) ? row.prizes : [],
    galleryTiles: row.gallery_tiles || 0,
    attendees: row.attendees ?? undefined,
    projectsShipped: row.projects_shipped ?? undefined,
    isTentative: row.is_tentative ?? false,
    dateLabel: row.date_label ?? undefined,
    venueLabel: row.venue_label ?? undefined,
    bannerImage: row.banner_image ?? undefined,
  };
}

/**
 * Fetch all events, prioritizing Supabase table and falling back to static constants
 */
export async function getEvents(): Promise<BuildFestEvent[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_date", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map(mapRowToEvent);
    }
  } catch {
    // Fallback if Supabase is offline or not configured
  }

  return staticEvents;
}

/**
 * Fetch single event by slug
 */
export async function getEvent(slug: string): Promise<BuildFestEvent | undefined> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      return mapRowToEvent(data);
    }
  } catch {
    // Fallback
  }

  return staticEvents.find((e) => e.slug === slug);
}
