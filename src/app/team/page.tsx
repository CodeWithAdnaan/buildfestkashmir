import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { TeamGrid } from "@/components/sections/team/team-grid";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the students who run BuildFest Kashmir — leadership, technical, design, operations, marketing, and community.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: `Team — ${siteConfig.name}`,
    description: "Meet the students who run BuildFest Kashmir.",
  },
};

export default function TeamPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <TeamGrid />
      </main>
      <SiteFooter />
    </>
  );
}
