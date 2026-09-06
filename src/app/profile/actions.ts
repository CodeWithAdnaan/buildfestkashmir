"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ProfileActionResult = {
  success?: boolean;
  error?: string;
  message?: string;
};

/**
 * Server Action for updating user profile details
 */
export async function updateProfile(
  prevState: ProfileActionResult | null,
  formData: FormData,
): Promise<ProfileActionResult> {
  const fullName = formData.get("fullName")?.toString().trim();
  const college = formData.get("college")?.toString().trim() || null;
  const githubUrl = formData.get("githubUrl")?.toString().trim() || null;
  const linkedinUrl = formData.get("linkedinUrl")?.toString().trim() || null;
  const avatarUrl = formData.get("avatarUrl")?.toString().trim() || null;

  if (!fullName) {
    return { error: "Full Name is required." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to update your profile." };
  }

  // Update public.profiles row
  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      full_name: fullName,
      college,
      github_url: githubUrl,
      linkedin_url: linkedinUrl,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    return { error: error.message };
  }

  // Also update user_metadata in auth.users
  await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      avatar_url: avatarUrl,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/profile");

  return {
    success: true,
    message: "Profile updated successfully!",
  };
}
