import { PillBadge } from "@/components/shared/pill-badge";
import { Reveal } from "@/components/shared/reveal";
import { EventCard } from "@/components/sections/events/event-card";
import { getUpcomingEvents, getPastEvents } from "@/lib/constants/events";
import type { BuildFestEvent } from "@/types/event";

interface EventsTimelineProps {
  upcoming?: BuildFestEvent[];
  past?: BuildFestEvent[];
}

export function EventsTimeline({ upcoming, past }: EventsTimelineProps) {
  const upcomingList = upcoming ?? getUpcomingEvents();
  const pastList = past ?? getPastEvents();

  return (
    <section className="py-10 sm:py-16">
      <div className="container-content">
        <Reveal className="mb-8">
          <PillBadge dot className="mb-4">
            UPCOMING
          </PillBadge>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            What&rsquo;s next.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingList.map((event) => (
            <Reveal key={event.slug}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mb-8 mt-20">
          <PillBadge dot={false} className="mb-4">
            PAST EVENTS
          </PillBadge>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            What we&rsquo;ve already shipped.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pastList.map((event) => (
            <Reveal key={event.slug}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
