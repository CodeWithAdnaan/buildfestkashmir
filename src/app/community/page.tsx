import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CommunityHero } from "@/components/sections/community/community-hero";
import { MissionVision } from "@/components/sections/community/mission-vision";
import { Values } from "@/components/sections/community/values";
import { OpenSource } from "@/components/sections/community/open-source";
import { LeadershipTeaser } from "@/components/sections/community/leadership-teaser";
import { Roadmap } from "@/components/sections/community/roadmap";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Community",
  description: "Mission, vision, values, open source, leadership, and roadmap for BuildFest Kashmir.",
  alternates: { canonical: "/community" },
  openGraph: {
    title: `Community — ${siteConfig.name}`,
    description: "Mission, vision, values, and roadmap for BuildFest Kashmir.",
  },
};

export default function CommunityPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <CommunityHero />
        <MissionVision />
        <Values />
        <OpenSource />
        <LeadershipTeaser />
        <Roadmap />
      </main>
      <SiteFooter />
    </>
  );
}
