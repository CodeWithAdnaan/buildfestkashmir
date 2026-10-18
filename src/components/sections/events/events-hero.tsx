import { PillBadge } from "@/components/shared/pill-badge";
import { Reveal } from "@/components/shared/reveal";
import { getUpcomingEvents, getPastEvents } from "@/lib/constants/events";

interface EventsHeroProps {
  upcomingCount?: number;
  pastCount?: number;
}

export function EventsHero({ upcomingCount, pastCount }: EventsHeroProps) {
  const totalUpcoming = upcomingCount ?? getUpcomingEvents().length;
  const totalPast = pastCount ?? getPastEvents().length;

  return (
    <section className="pb-6 pt-40 sm:pt-48">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <PillBadge className="mb-5">EVENTS</PillBadge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Hackathons, workshops, and demo nights.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
            {totalUpcoming} event{totalUpcoming === 1 ? "" : "s"} coming up, {totalPast} already
            shipped. Every one of them free, student-run, and open to anyone in Kashmir who wants
            to build.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
