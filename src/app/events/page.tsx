import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { EventsHero } from "@/components/sections/events/events-hero";
import { EventsTimeline } from "@/components/sections/events/events-timeline";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Hackathons, workshops, and demo nights from BuildFest Kashmir — upcoming and past.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: `Events — ${siteConfig.name}`,
    description:
      "Hackathons, workshops, and demo nights from BuildFest Kashmir — upcoming and past.",
  },
};

export default function EventsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <EventsHero />
        <EventsTimeline />
      </main>
      <SiteFooter />
    </>
  );
}
