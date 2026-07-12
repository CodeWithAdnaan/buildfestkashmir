"use server";

import { createClient } from "@/lib/supabase/server";
import { teamApplicationSchema, type TeamApplicationValues } from "@/lib/validations/team-application";

interface ApplyResult {
  success: boolean;
  applicationId?: string;
  error?: string;
}

/**
 * Server Action — validates server-side and inserts into the
 * `team_applications` table. RLS (supabase/migrations/0001_init.sql) allows
 * public inserts only, so this is safe to call directly from the client.
 */
export async function applyForRole(values: TeamApplicationValues): Promise<ApplyResult> {
  const parsed = teamApplicationSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Some details look invalid — please check the form." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_applications")
    .insert({
      role: parsed.data.role,
      full_name: parsed.data.fullName,
      email: parsed.data.email,
      message: parsed.data.message,
    })
    .select("id")
    .single();

  if (error) {
    return {
      success: false,
      error: "Couldn't submit your application right now — please try again in a moment.",
    };
  }

  return { success: true, applicationId: data.id };
}
