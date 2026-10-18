"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdminOrOrganizer } from "@/lib/auth/admin";
import type { HomepageSettings } from "@/lib/data/homepage";

export async function saveHomepageSettingsAction(prevState: any, formData: FormData) {
  await requireAdminOrOrganizer();
  const supabase = await createClient();

  const featuredEventSlug = formData.get("featuredEventSlug")?.toString().trim() || "";
  const heroBadge = formData.get("heroBadge")?.toString().trim() || "Srinagar · Est. student-led · Since 2024";
  const heroTitle = formData.get("heroTitle")?.toString().trim() || "Kashmir's developer ecosystem, built in public.";
  const heroTitleHighlight = formData.get("heroTitleHighlight")?.toString().trim() || "ecosystem";
  const heroDescription = formData.get("heroDescription")?.toString().trim() || "";
  const heroGithubUrl = formData.get("heroGithubUrl")?.toString().trim() || "https://github.com/CodeWithAdnaan/buildfestkashmir";
  const heroPrimaryButtonText = formData.get("heroPrimaryButtonText")?.toString().trim() || "";

  const statBuilders = parseInt(formData.get("statBuilders")?.toString() || "184", 10) || 184;
  const statProjects = parseInt(formData.get("statProjects")?.toString() || "42", 10) || 42;
  const statCampuses = parseInt(formData.get("statCampuses")?.toString() || "8", 10) || 8;
  const statPrizePool = formData.get("statPrizePool")?.toString().trim() || "₹50K+";

  const announcementEnabled = formData.get("announcementEnabled") === "true";
  const announcementText = formData.get("announcementText")?.toString().trim() || "";
  const announcementLink = formData.get("announcementLink")?.toString().trim() || "";

  const bentoEcosystemTitle = formData.get("bentoEcosystemTitle")?.toString().trim() || "Everything happening right now.";

  const settings: HomepageSettings = {
    featuredEventSlug,
    hero: {
      badge: heroBadge,
      title: heroTitle,
      titleHighlight: heroTitleHighlight,
      description: heroDescription,
      githubUrl: heroGithubUrl,
      primaryButtonText: heroPrimaryButtonText,
    },
    stats: {
      builders: statBuilders,
      projects: statProjects,
      campuses: statCampuses,
      prizePool: statPrizePool,
    },
    announcement: {
      enabled: announcementEnabled,
      text: announcementText,
      link: announcementLink,
    },
    bento: {
      ecosystemTitle: bentoEcosystemTitle,
    },
  };

  // 1. Try dedicated site_settings table
  const { error: siteSettingsErr } = await (supabase as any)
    .from("site_settings")
    .upsert({
      id: "homepage",
      data: settings,
      updated_at: new Date().toISOString(),
    });

  // 2. If table doesn't exist, store in posts table as __homepage_settings__ backup
  if (siteSettingsErr) {
    await supabase.from("posts").upsert({
      slug: "__homepage_settings__",
      title: "Homepage Settings",
      excerpt: JSON.stringify(settings),
      date: new Date().toISOString(),
      author: "Admin",
      author_role: "System",
      read_time: "1 min",
      gradient: "from-amber-500 to-orange-600",
      published: true,
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/homepage");
  revalidatePath("/admin/events");

  return { success: true };
}
