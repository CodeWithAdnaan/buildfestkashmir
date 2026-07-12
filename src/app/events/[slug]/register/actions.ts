"use server";

import { createClient } from "@/lib/supabase/server";
import { registrationSchema, type RegistrationValues } from "@/lib/validations/registration";

interface RegisterResult {
  success: boolean;
  registrationId?: string;
  error?: string;
}

/**
 * Server Action — validates the submission again server-side (never trust
 * client validation alone) and inserts it into the `registrations` table.
 * Row Level Security (see supabase/migrations/0001_init.sql) allows public
 * inserts but no public reads, so this is safe to call from the client form.
 */
export async function registerForEvent(
  eventSlug: string,
  values: RegistrationValues,
): Promise<RegisterResult> {
  const parsed = registrationSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Some details look invalid — please check the form." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("registrations")
    .insert({
      event_slug: eventSlug,
      full_name: parsed.data.fullName,
      email: parsed.data.email,
      college: parsed.data.college,
      branch: parsed.data.branch,
      experience_level: parsed.data.experienceLevel,
      github_url: parsed.data.githubUrl || null,
      linkedin_url: parsed.data.linkedinUrl || null,
      discord_handle: parsed.data.discordHandle || null,
      team_name: parsed.data.teamName || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Supabase error during registration:", error);
    return {
      success: false,
      error: "Couldn't submit your registration right now — please try again in a moment.",
    };
  }

  return { success: true, registrationId: data.id };
}
