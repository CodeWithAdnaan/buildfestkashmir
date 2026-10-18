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
 * Fetch all events, prioritizing Supabase table and merging with static fallback
 */
export async function getEvents(): Promise<BuildFestEvent[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_date", { ascending: false });

    if (!error && data) {
      const dbEvents = data.map(mapRowToEvent);
      const dbSlugs = new Set(dbEvents.map((e) => e.slug));
      const remainingStatic = staticEvents.filter((e) => !dbSlugs.has(e.slug));
      return [...dbEvents, ...remainingStatic];
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

/**
 * Fetch upcoming events sorted chronologically
 */
export async function getUpcomingEvents(): Promise<BuildFestEvent[]> {
  const all = await getEvents();
  return all
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

/**
 * Fetch past events sorted newest first
 */
export async function getPastEvents(): Promise<BuildFestEvent[]> {
  const all = await getEvents();
  return all
    .filter((e) => e.status === "past")
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

/**
 * Fetch featured upcoming event
 */
export async function getFeaturedEvent(): Promise<BuildFestEvent | undefined> {
  const upcoming = await getUpcomingEvents();
  if (upcoming.length > 0) return upcoming[0];
  const all = await getEvents();
  return all[0];
}
