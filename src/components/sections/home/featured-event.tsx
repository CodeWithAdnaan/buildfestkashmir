"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { MountainRidge } from "@/components/shared/mountain-ridge";
import { useCountdown } from "@/hooks/use-countdown";
import { formatDateRange } from "@/lib/utils";
import { featuredEvent } from "@/lib/constants/events";
import { siteConfig } from "@/lib/constants/site";

const countdownUnits = [
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HRS" },
  { key: "minutes", label: "MIN" },
  { key: "seconds", label: "SEC" },
] as const;

export function FeaturedEvent() {
  const countdown = useCountdown(featuredEvent.startDate);
  const isTentative = !!featuredEvent.isTentative;

  return (
    <section className="bg-pine-deep py-24 text-snow sm:py-28 lg:py-32">
      <div className="container-content">
        <div className="mb-10 font-mono text-xs uppercase tracking-[0.14em] text-saffron">
          {isTentative ? "Next event" : "Featured event"}
        </div>

        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-sm border border-snow/15 lg:grid-cols-[1fr_1.05fr]">
            <div
              className="relative min-h-[280px]"
              style={{
                background: isTentative
                  ? "linear-gradient(200deg, rgba(217,142,43,0.12), transparent 55%), linear-gradient(150deg,#1a2e24 0%,#0f1e18 65%,#0a1410 100%)"
                  : "linear-gradient(200deg, rgba(217,142,43,0.22), transparent 55%), linear-gradient(150deg,#274b3f 0%,#132923 65%,#0d1e19 100%)",
              }}
            >
              <span className="absolute left-6 top-6 rounded-sm bg-saffron px-3 py-1.5 font-mono text-[11.5px] tracking-wide text-pine-deep">
                {isTentative ? "COMING SOON" : featuredEvent.status.toUpperCase()}
              </span>
              {isTentative && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-snow/40 mb-3">Reveal</div>
                    <div className="font-display text-[32px] font-medium text-saffron tracking-tight">
                      September 2026
                    </div>
                  </div>
                </div>
              )}
              <MountainRidge className="absolute bottom-0 left-0 text-pine-deep/60" />
            </div>

            <div className="flex flex-col gap-6 p-9 sm:p-12">
              <h3 className="font-display text-[28px] font-medium tracking-tight sm:text-[36px] lg:text-[40px]">
                {featuredEvent.name}
              </h3>
              <p className="max-w-[52ch] text-[15px] leading-relaxed text-snow/70">
                {featuredEvent.description}
              </p>

              {isTentative ? (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-snow/15 pt-6">
                    <MetaItem label="LOCATION" value={featuredEvent.venueLabel ?? featuredEvent.city} />
                    <MetaItem label="DATE" value={featuredEvent.dateLabel ?? "TBA"} />
                    <MetaItem label="PRIZE POOL" value="TBA" />
                    <MetaItem label="DETAILS" value="September 2026" />
                  </div>
                  <Button asChild variant="outline" className="mt-1 w-fit border-snow/20 bg-transparent text-snow hover:bg-snow/10 hover:text-snow">
                    <Link href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
                      <Bell className="h-4 w-4 mr-2" /> Follow for updates
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex gap-4 sm:gap-5">
                    {countdownUnits.map((unit) => (
                      <div key={unit.key} className="text-center">
                        <div className="font-display text-[26px] font-medium tabular-nums sm:text-[30px]">
                          {String(countdown[unit.key]).padStart(2, "0")}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] tracking-wider text-snow/50">
                          {unit.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-snow/15 pt-6">
                    <MetaItem label="VENUE" value={featuredEvent.venue} />
                    <MetaItem
                      label="DATE"
                      value={formatDateRange(featuredEvent.startDate, featuredEvent.endDate)}
                    />
                    <MetaItem label="PRIZE POOL" value={featuredEvent.prizePool} />
                    <MetaItem label="TEAM SIZE" value={featuredEvent.teamSize} />
                  </div>

                  <Button asChild className="mt-1 w-fit">
                    <Link href={`/events/${featuredEvent.slug}/register`}>
                      Register your team
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[11px] tracking-wider text-saffron">{label}</div>
      <div className="text-[15px] font-medium">{value}</div>
    </div>
  );
}
