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

  const { error } = await supabase.from("events").delete().eq("slug", slug);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath(`/events/${slug}`);
  revalidatePath("/events");
  revalidatePath("/");
  redirect("/admin/events");
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

  if (!slug || !name || !tagline || !venue || !startDate || !endDate) {
    return { error: "Please fill out all required event fields." };
  }

  const themes = themesRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

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
    updated_at: new Date().toISOString(),
  };

  if (originalSlug) {
    // Update existing event
    const { data, error } = await supabase
      .from("events")
      .update(payload)
      .eq("slug", originalSlug)
      .select();

    if (error) {
      return { error: error.message };
    }

    // If the event was loaded from static fallback and wasn't in DB yet,
    // update() matches 0 rows. Insert it now so updates are persistently saved!
    if (!data || data.length === 0) {
      const { error: insertError } = await supabase.from("events").insert([payload]);
      if (insertError) {
        return { error: insertError.message };
      }
    }
  } else {
    // Create new event
    const { error } = await supabase.from("events").insert([payload]);

    if (error) {
      return { error: error.message };
    }
  }

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
