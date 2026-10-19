"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdminOrOrganizer } from "@/lib/auth/admin";
import { events as staticEvents } from "@/lib/constants/events";

export async function toggleRegistrationAction(slug: string, currentStatus: boolean) {
  await requireAdminOrOrganizer();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .update({ registration_open: !currentStatus, updated_at: new Date().toISOString() })
    .eq("slug", slug)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // If event didn't exist in Supabase yet (loaded from static fallback), seed it now
  if (!data || data.length === 0) {
    const staticEvt = staticEvents.find((e) => e.slug === slug);
    if (staticEvt) {
      await supabase.from("events").insert([
        {
          slug: staticEvt.slug,
          name: staticEvt.name,
          tagline: staticEvt.tagline,
          status: staticEvt.status,
          description: staticEvt.description,
          overview: staticEvt.overview,
          venue: staticEvt.venue,
          city: staticEvt.city,
          start_date: staticEvt.startDate,
          end_date: staticEvt.endDate,
          prize_pool: staticEvt.prizePool,
          team_size: staticEvt.teamSize,
          registration_open: !currentStatus,
          themes: staticEvt.themes,
          banner_image: staticEvt.bannerImage || null,
          updated_at: new Date().toISOString(),
        },
      ]);
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath(`/admin/events/${slug}`);
  revalidatePath(`/events/${slug}`);
  revalidatePath(`/events/${slug}/register`);
  revalidatePath("/events");
  revalidatePath("/");
}

export async function deleteEventAction(slug: string) {
  await requireAdminOrOrganizer();
  const supabase = await createClient();

  // 1. Delete associated registrations
  await supabase.from("registrations").delete().eq("event_slug", slug);

  // 2. Delete event from database
  const { error } = await supabase.from("events").delete().eq("slug", slug);

  if (error) {
    return { error: error.message };
  }

  // 3. Delete associated gallery album if present
  try {
    const { deleteAlbumAction } = await import("@/app/admin/gallery/actions");
    await deleteAlbumAction(slug);
  } catch {}

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath(`/admin/events/${slug}`);
  revalidatePath(`/events/${slug}`);
  revalidatePath(`/events/${slug}/register`);
  revalidatePath("/events");
  revalidatePath("/gallery");
  revalidatePath("/");

  return { success: true };
}

export async function saveEventAction(prevState: any, formData: FormData) {
  await requireAdminOrOrganizer();
  const supabase = await createClient();

  const originalSlug = formData.get("originalSlug")?.toString();
  const slug = formData.get("slug")?.toString().trim().toLowerCase();
  const name = formData.get("name")?.toString().trim();
  const tagline = formData.get("tagline")?.toString().trim();
  const status = formData.get("status")?.toString() as "upcoming" | "past";
  const description = formData.get("description")?.toString().trim();
  const overview = formData.get("overview")?.toString().trim();
  const venue = formData.get("venue")?.toString().trim();
  const city = formData.get("city")?.toString().trim() || "Srinagar";
  const startDate = formData.get("startDate")?.toString().trim();
  const endDate = formData.get("endDate")?.toString().trim();
  const prizePool = formData.get("prizePool")?.toString().trim() || "";
  const teamSize = formData.get("teamSize")?.toString().trim() || "2–4 builders";
  const registrationOpen = formData.get("registrationOpen") === "true";
  const themesRaw = formData.get("themes")?.toString().trim() || "";
  const bannerImage = formData.get("bannerImage")?.toString().trim() || null;
  const registrationUrl = formData.get("registrationUrl")?.toString().trim() || null;

  if (!slug || !name || !tagline || !venue || !startDate || !endDate) {
    return { error: "Please fill out all required event fields." };
  }

  let themes = themesRaw
    .split(",")
    .map((t) => t.trim())
    .filter((t) => Boolean(t) && !t.startsWith("reg_url:"));

  if (registrationUrl) {
    themes.push(`reg_url:${registrationUrl}`);
  }

  const dateLabel = formData.get("dateLabel")?.toString().trim() || null;
  const venueLabel = formData.get("venueLabel")?.toString().trim() || null;
  const isTentative = formData.get("isTentative") === "true";
  const attendeesRaw = formData.get("attendees")?.toString().trim();
  const attendees = attendeesRaw ? parseInt(attendeesRaw, 10) : null;
  const projectsShippedRaw = formData.get("projectsShipped")?.toString().trim();
  const projectsShipped = projectsShippedRaw ? parseInt(projectsShippedRaw, 10) : null;
  const galleryTilesRaw = formData.get("galleryTiles")?.toString().trim();
  const galleryTiles = galleryTilesRaw ? parseInt(galleryTilesRaw, 10) : 0;

  let schedule = [];
  try {
    const raw = formData.get("schedule")?.toString();
    if (raw) schedule = JSON.parse(raw);
  } catch {}

  let prizes = [];
  try {
    const raw = formData.get("prizes")?.toString();
    if (raw) prizes = JSON.parse(raw);
  } catch {}

  let speakers = [];
  try {
    const raw = formData.get("speakers")?.toString();
    if (raw) speakers = JSON.parse(raw);
  } catch {}

  let mentors = [];
  try {
    const raw = formData.get("mentors")?.toString();
    if (raw) mentors = JSON.parse(raw);
  } catch {}

  let sponsors = [];
  try {
    const raw = formData.get("sponsors")?.toString();
    if (raw) sponsors = JSON.parse(raw);
  } catch {}

  let photos = [];
  try {
    const raw = formData.get("photos")?.toString();
    if (raw) photos = JSON.parse(raw);
  } catch {}

  const payload: any = {
    slug,
    name,
    tagline,
    status: status || "upcoming",
    description: description || "",
    overview: overview || "",
    venue,
    city,
    start_date: startDate,
    end_date: endDate,
    prize_pool: prizePool,
    team_size: teamSize,
    registration_open: registrationOpen,
    themes,
    banner_image: bannerImage,
    date_label: dateLabel,
    venue_label: venueLabel,
    is_tentative: isTentative,
    attendees,
    projects_shipped: projectsShipped,
    gallery_tiles: galleryTiles || (photos.length > 0 ? photos.length : 0),
    schedule,
    prizes,
    speakers,
    mentors,
    sponsors,
    photos,
    updated_at: new Date().toISOString(),
  };

  // Helper to execute update or insert with fallback if column doesn't exist
  const executeDbOp = async (withCol = true, withPhotos = true): Promise<{ error?: string }> => {
    const opPayload = { ...payload };
    if (!withPhotos) {
      delete opPayload.photos;
    }
    if (withCol && registrationUrl) {
      opPayload.registration_url = registrationUrl;
    }

    if (originalSlug) {
      const { data, error } = await supabase
        .from("events")
        .update(opPayload)
        .eq("slug", originalSlug)
        .select();

      if (error) {
        if (withPhotos && (error.code === "42703" || error.message.includes("photos"))) {
          return executeDbOp(withCol, false);
        }
        if (withCol && (error.code === "42703" || error.message.includes("registration_url"))) {
          return executeDbOp(false, withPhotos);
        }
        return { error: error.message };
      }

      if (!data || data.length === 0) {
        const { error: insertError } = await supabase.from("events").insert([opPayload]);
        if (insertError) {
          if (withPhotos && (insertError.code === "42703" || insertError.message.includes("photos"))) {
            return executeDbOp(withCol, false);
          }
          if (withCol && (insertError.code === "42703" || insertError.message.includes("registration_url"))) {
            return executeDbOp(false, withPhotos);
          }
          return { error: insertError.message };
        }
      }
    } else {
      const { error } = await supabase.from("events").insert([opPayload]);
      if (error) {
        if (withPhotos && (error.code === "42703" || error.message.includes("photos"))) {
          return executeDbOp(withCol, false);
        }
        if (withCol && (error.code === "42703" || error.message.includes("registration_url"))) {
          return executeDbOp(false, withPhotos);
        }
        return { error: error.message };
      }
    }

    return {};
  };

  const dbRes = await executeDbOp(true, true);
  if (dbRes.error) {
    return { error: dbRes.error };
  }

  // Also sync photos to the gallery albums so /gallery automatically reflects this event's photos
  try {
    const { getGalleryAlbums } = await import("@/lib/data/gallery");
    const { saveGalleryAlbumsAction } = await import("@/app/admin/gallery/actions");
    const albums = await getGalleryAlbums();
    const existingIndex = albums.findIndex((a) => a.eventSlug === slug || a.slug === slug);
    const updatedAlbum = {
      slug,
      title: name,
      eventSlug: slug,
      date: dateLabel || new Date(startDate).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      items: photos,
    };

    let updatedAlbums;
    if (existingIndex >= 0) {
      updatedAlbums = [...albums];
      updatedAlbums[existingIndex] = updatedAlbum;
    } else if (photos.length > 0) {
      updatedAlbums = [updatedAlbum, ...albums];
    } else {
      updatedAlbums = albums;
    }
    await saveGalleryAlbumsAction(updatedAlbums);
  } catch {}

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath(`/admin/events/${slug}`);
  if (originalSlug && originalSlug !== slug) {
    revalidatePath(`/admin/events/${originalSlug}`);
    revalidatePath(`/events/${originalSlug}`);
  }
  revalidatePath("/events");
  revalidatePath(`/events/${slug}`);
  revalidatePath(`/events/${slug}/register`);
  revalidatePath("/");
  redirect("/admin/events");
}
