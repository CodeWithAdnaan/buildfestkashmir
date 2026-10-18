import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { EventsHero } from "@/components/sections/events/events-hero";
import { EventsTimeline } from "@/components/sections/events/events-timeline";
import { getUpcomingEvents, getPastEvents } from "@/lib/data/events";
import { siteConfig } from "@/lib/constants/site";

export const revalidate = 0;

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

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <EventsHero upcomingCount={upcoming.length} pastCount={past.length} />
        <EventsTimeline upcoming={upcoming} past={past} />
      </main>
      <SiteFooter />
    </>
  );
}
