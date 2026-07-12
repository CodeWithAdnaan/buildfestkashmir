"use server";

import { createClient } from "@/lib/supabase/server";
import { contactSchema, type ContactValues } from "@/lib/validations/contact";

interface ContactResult {
  success: boolean;
  error?: string;
}

/**
 * Server Action — validates and inserts into the `contact_messages` table.
 * RLS (supabase/migrations/0001_init.sql) allows public inserts only.
 */
export async function sendContactMessage(values: ContactValues): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Some details look invalid — please check the form." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  if (error) {
    return {
      success: false,
      error: "Couldn't send your message right now — please try again in a moment.",
    };
  }

  return { success: true };
}
