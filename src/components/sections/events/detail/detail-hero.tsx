"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Trophy, Users, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/shared/pill-badge";
import { useCountdown } from "@/hooks/use-countdown";
import { formatDateRange } from "@/lib/utils";
import type { BuildFestEvent } from "@/types/event";

const countdownUnits = [
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HRS" },
  { key: "minutes", label: "MIN" },
  { key: "seconds", label: "SEC" },
] as const;

export function DetailHero({ event }: { event: BuildFestEvent }) {
  const countdown = useCountdown(event.startDate);
  const isUpcoming = event.status === "upcoming";

  return (
    <section className="pb-8 pt-40 sm:pt-48">
      <div className="container-content">
        {event.bannerImage && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl border border-border sm:h-96">
            <Image src={event.bannerImage} alt={event.name} fill className="object-cover" priority />
          </div>
        )}

        <div className="mb-5 flex flex-wrap items-center gap-3">
          <PillBadge dot={isUpcoming}>{isUpcoming ? "UPCOMING" : "PAST EVENT"}</PillBadge>
          {event.themes.slice(0, 3).map((theme) => (
            <span
              key={theme}
              className="rounded-full border border-border bg-canvas-raised/60 px-3 py-1 font-mono text-[11.5px] text-ink-muted"
            >
              {theme}
            </span>
          ))}
        </div>

        <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {event.name}
        </h1>
        <p className="mt-4 max-w-xl text-[16px] text-ink-muted">{event.tagline}</p>

        <div className="glass mt-9 grid grid-cols-2 gap-6 rounded-2xl p-6 sm:grid-cols-4 sm:p-8">
          <MetaItem icon={Calendar} label="DATE" value={event.dateLabel ?? formatDateRange(event.startDate, event.endDate)} />
          <MetaItem icon={MapPin} label="VENUE" value={event.venue} />
          <MetaItem icon={Trophy} label="PRIZE POOL" value={event.prizePool} />
          <MetaItem icon={Users} label="TEAM SIZE" value={event.teamSize} />
        </div>

        {isUpcoming ? (
          <div className="mt-8 flex flex-wrap items-center gap-6">
            {event.registrationOpen ? (
              <Button asChild size="lg">
                <Link href={`/events/${event.slug}/register`}>
                  Register your team <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <Button disabled size="lg" className="opacity-80">
                  Registration Opens Soon
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/events">
                    All Events <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap gap-4 text-[14px] text-ink-muted">
            {event.attendees && <span>{event.attendees} attendees</span>}
            {event.projectsShipped && <span>{event.projectsShipped} projects shipped</span>}
          </div>
        )}
      </div>
    </section>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[10.5px] tracking-wide text-saffron">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="text-[14.5px] font-medium">{value}</div>
    </div>
  );
}
