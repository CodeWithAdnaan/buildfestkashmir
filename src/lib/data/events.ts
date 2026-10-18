import { createClient } from "@/lib/supabase/server";
import { events as staticEvents } from "@/lib/constants/events";
import { getHomepageSettings } from "@/lib/data/homepage";
import type { BuildFestEvent } from "@/types/event";
import type { Database } from "@/lib/supabase/types";

type EventRow = Database["public"]["Tables"]["events"]["Row"];

export function mapRowToEvent(row: any): BuildFestEvent {
  // Check direct column or embedded theme fallback
  let registrationUrl = row.registration_url;
  const rawThemes: string[] = Array.isArray(row.themes) ? row.themes : [];
  if (!registrationUrl) {
    const regTheme = rawThemes.find((t) => typeof t === "string" && t.startsWith("reg_url:"));
    if (regTheme) {
      registrationUrl = regTheme.replace("reg_url:", "");
    }
  }

  const cleanThemes = rawThemes.filter((t) => typeof t === "string" && !t.startsWith("reg_url:"));

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
    themes: cleanThemes,
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
    registrationUrl: registrationUrl || undefined,
  };
}

/**
 * Fetch all events from Supabase.
 * If Supabase is operational, it is the sole source of truth (deleted events stay deleted).
 * Only if Supabase query fails completely (e.g. offline/no connection), fallback to static constants.
 */
export async function getEvents(): Promise<BuildFestEvent[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_date", { ascending: false });

    if (!error && Array.isArray(data)) {
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

    if (!error) {
      if (data) {
        return mapRowToEvent(data);
      }
      // If query succeeded and returned no row, the event is deleted / does not exist.
      return undefined;
    }
  } catch {
    // Fallback if Supabase is offline
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
 * Fetch featured event for Homepage.
 * Respects admin's choice from Homepage Settings if specified, otherwise picks next upcoming event.
 */
export async function getFeaturedEvent(): Promise<BuildFestEvent | undefined> {
  const all = await getEvents();
  if (all.length === 0) return undefined;

  try {
    const settings = await getHomepageSettings();
    if (settings.featuredEventSlug) {
      const selected = all.find((e) => e.slug === settings.featuredEventSlug);
      if (selected) return selected;
    }
  } catch {
    // Fallback to automatic selection
  }

  const upcoming = all
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  if (upcoming.length > 0) return upcoming[0];
  return all[0];
}
