import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AdminSession {
  userId: string;
  email: string;
  fullName: string;
  role: "admin" | "organizer";
  avatarUrl?: string | null;
}

/**
 * List of fallback superadmin emails if database role hasn't been migrated yet.
 */
const SUPERADMIN_EMAILS = [
  "khandayadnan59@gmail.com",
  "contact@buildfestkashmir.org",
];

export async function getCurrentAdmin(): Promise<AdminSession | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    const userEmail = (user.email || "").toLowerCase().trim();
    const isSuperAdmin =
      SUPERADMIN_EMAILS.includes(userEmail) ||
      Boolean(
        process.env.ADMIN_EMAILS &&
          process.env.ADMIN_EMAILS.toLowerCase()
            .split(",")
            .map((e) => e.trim())
            .includes(userEmail),
      );

    const role = profile?.role;
    const isAuthorized = role === "admin" || role === "organizer" || isSuperAdmin;

    if (!isAuthorized) {
      return null;
    }

    return {
      userId: user.id,
      email: user.email || "",
      fullName: profile?.full_name || user.user_metadata?.full_name || "Organizer",
      role: (role === "admin" || isSuperAdmin ? "admin" : "organizer") as "admin" | "organizer",
      avatarUrl: profile?.avatar_url,
    };
  } catch {
    return null;
  }
}

/**
 * Ensures user is authenticated and is an admin/organizer.
 * Redirects to /login if unauthenticated, or to / if unauthorized.
 */
export async function requireAdminOrOrganizer(): Promise<AdminSession> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login?next=/admin");
    }

    // Authenticated, but not an admin/organizer
    redirect("/?error=unauthorized_admin");
  }

  return admin;
}
