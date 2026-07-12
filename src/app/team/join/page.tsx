import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RolesGrid } from "@/components/sections/team-join/roles-grid";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Join the Team",
  description:
    "BuildFest Kashmir is run entirely by students — join as Technical, Design, Operations, Marketing, Photography, Videography, Hospitality, or Volunteer.",
  alternates: { canonical: "/team/join" },
  openGraph: {
    title: `Join the Team — ${siteConfig.name}`,
    description: "BuildFest Kashmir is run entirely by students. Pick a role and apply.",
  },
};

export default function JoinTeamPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <RolesGrid />
      </main>
      <SiteFooter />
    </>
  );
}
