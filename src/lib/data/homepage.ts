import { createClient } from "@/lib/supabase/server";

export interface HomepageSettings {
  featuredEventSlug: string; // Specific event slug, or empty string for auto (soonest upcoming)
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    githubUrl: string;
    primaryButtonText?: string;
  };
  stats: {
    builders: number;
    projects: number;
    campuses: number;
    prizePool: string;
  };
  announcement: {
    enabled: boolean;
    text: string;
    link: string;
  };
  bento: {
    ecosystemTitle: string;
  };
}

export const defaultHomepageSettings: HomepageSettings = {
  featuredEventSlug: "",
  hero: {
    badge: "Srinagar · Est. student-led · Since 2024",
    title: "Kashmir's developer ecosystem, built in public.",
    titleHighlight: "ecosystem",
    description:
      "Hackathons, workshops, and open-source — the infrastructure for the region's next generation of builders. Not a college club. A real, shipping developer community.",
    githubUrl: "https://github.com/CodeWithAdnaan/buildfestkashmir",
    primaryButtonText: "",
  },
  stats: {
    builders: 184,
    projects: 42,
    campuses: 8,
    prizePool: "₹50K+",
  },
  announcement: {
    enabled: false,
    text: "",
    link: "",
  },
  bento: {
    ecosystemTitle: "Everything happening right now.",
  },
};

/**
 * Fetch homepage customization settings with fallback
 */
export async function getHomepageSettings(): Promise<HomepageSettings> {
  try {
    const supabase = await createClient();

    // 1. Try dedicated site_settings table first
    const { data: siteSettingsData, error: siteSettingsErr } = await (supabase as any)
      .from("site_settings")
      .select("data")
      .eq("id", "homepage")
      .maybeSingle();

    if (!siteSettingsErr && siteSettingsData && (siteSettingsData as any).data) {
      const d = (siteSettingsData as any).data;
      return {
        ...defaultHomepageSettings,
        ...d,
        hero: { ...defaultHomepageSettings.hero, ...d.hero },
        stats: { ...defaultHomepageSettings.stats, ...d.stats },
        announcement: { ...defaultHomepageSettings.announcement, ...d.announcement },
        bento: { ...defaultHomepageSettings.bento, ...d.bento },
      };
    }

    // 2. Fallback: try posts table with slug __homepage_settings__
    const { data: postData } = await supabase
      .from("posts")
      .select("excerpt")
      .eq("slug", "__homepage_settings__")
      .maybeSingle();

    if (postData?.excerpt) {
      try {
        const parsed = JSON.parse(postData.excerpt);
        return {
          ...defaultHomepageSettings,
          ...parsed,
          hero: { ...defaultHomepageSettings.hero, ...parsed.hero },
          stats: { ...defaultHomepageSettings.stats, ...parsed.stats },
          announcement: { ...defaultHomepageSettings.announcement, ...parsed.announcement },
          bento: { ...defaultHomepageSettings.bento, ...parsed.bento },
        };
      } catch {
        // Parse error fallback
      }
    }
  } catch {
    // Supabase offline fallback
  }

  return defaultHomepageSettings;
}
