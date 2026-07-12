import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Trophy, Users } from "lucide-react";
import { BentoCard } from "@/components/shared/bento-card";
import { PillBadge } from "@/components/shared/pill-badge";
import { formatDateRange, cn } from "@/lib/utils";
import type { BuildFestEvent } from "@/types/event";

export function EventCard({ event }: { event: BuildFestEvent }) {
  const isUpcoming = event.status === "upcoming";
  const isTentative = !!event.isTentative;

  const cardContent = (
    <BentoCard
      glow={isUpcoming ? "saffron" : "pine"}
      className={cn("h-full", !isTentative && "transition-transform group")}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <PillBadge dot={isUpcoming} className={!isUpcoming ? "opacity-70" : undefined}>
          {isTentative ? "COMING SOON" : isUpcoming ? "UPCOMING" : "PAST EVENT"}
        </PillBadge>
        {!isTentative && (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-saffron" />
        )}
      </div>

      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{event.name}</h3>
      <p className="mt-1.5 text-[14.5px] text-ink-muted">{event.tagline}</p>

      <div className="mt-6 flex flex-1 flex-col gap-2.5 text-[13.5px] text-ink-muted">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-saffron" />
          {event.dateLabel || formatDateRange(event.startDate, event.endDate)}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-saffron" />
          {event.venueLabel || event.venue}
        </div>
        {isUpcoming ? (
          <div className="flex items-center gap-2">
            <Trophy className="h-3.5 w-3.5 shrink-0 text-saffron" />
            {event.prizePool}
          </div>
        ) : (
          event.attendees && (
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 shrink-0 text-saffron" />
              {event.attendees} attendees
              {event.projectsShipped ? ` · ${event.projectsShipped} projects shipped` : ""}
            </div>
          )
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border pt-5">
        {event.themes.slice(0, 3).map((theme) => (
          <span
            key={theme}
            className="rounded-md bg-canvas-overlay px-2.5 py-1 font-mono text-[11px] text-ink-muted"
          >
            {theme}
          </span>
        ))}
      </div>
    </BentoCard>
  );

  if (isTentative) {
    return <div className="block h-full">{cardContent}</div>;
  }

  return (
    <Link href={`/events/${event.slug}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
