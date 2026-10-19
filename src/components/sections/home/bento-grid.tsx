"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, GitCommitHorizontal, GitPullRequest, Star, Users } from "lucide-react";
import { BentoCard } from "@/components/shared/bento-card";
import { PillBadge } from "@/components/shared/pill-badge";
import { Marquee } from "@/components/shared/marquee";
import { ChinarLeaf } from "@/components/shared/chinar-leaf";
import { Button } from "@/components/ui/button";
import { useCountdown } from "@/hooks/use-countdown";
import { formatDateRange } from "@/lib/utils";
import { featuredEvent as staticFeaturedEvent } from "@/lib/constants/events";
import { partners } from "@/lib/constants/partners";
import type { BuildFestEvent } from "@/types/event";
import type { HomepageSettings } from "@/lib/data/homepage";
import type { GalleryItem } from "@/types/gallery";

const countdownUnits = [
  { key: "days", label: "D" },
  { key: "hours", label: "H" },
  { key: "minutes", label: "M" },
  { key: "seconds", label: "S" },
] as const;

interface BentoGridProps {
  featuredEvent?: BuildFestEvent;
  settings?: HomepageSettings;
  galleryPhotos?: GalleryItem[];
}

export function BentoGrid({ featuredEvent, settings, galleryPhotos }: BentoGridProps = {}) {
  return (
    <section className="relative py-10 sm:py-16">
      <div className="container-content">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <PillBadge dot={false} className="mb-4">
              THE ECOSYSTEM
            </PillBadge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {settings?.bento?.ecosystemTitle || "Everything happening right now."}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(200px,auto)]">
          <FeaturedEventCard event={featuredEvent} />
          <WhyBuildFestCard />
          <GalleryCard photos={galleryPhotos || featuredEvent?.photos} />
          <OpenSourceCard />
          <TestimonialCard />
          <PartnersCard />
        </div>
      </div>
    </section>
  );
}

function FeaturedEventCard({ event }: { event?: BuildFestEvent }) {
  const activeEvent = event ?? staticFeaturedEvent;
  const countdown = useCountdown(activeEvent.startDate);
  const isTentative = !!activeEvent.isTentative;

  return (
    <BentoCard glow="saffron" className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
      <div className="mb-5 flex items-center justify-between">
        <PillBadge>{isTentative ? "COMING SOON" : activeEvent.registrationOpen ? "REGISTRATION OPEN" : "UPCOMING"}</PillBadge>
        {isTentative ? (
          <span className="font-mono text-xs text-saffron tracking-widest">SEP 2026</span>
        ) : (
          <div className="flex gap-2 font-mono text-xs text-ink-muted">
            {countdownUnits.map((unit) => (
              <span key={unit.key} className="rounded-md bg-canvas-overlay px-2 py-1 tabular-nums">
                {String(countdown[unit.key]).padStart(2, "0")}
                {unit.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Event Banner Image */}
      {activeEvent.bannerImage && (
        <div className="relative mb-5 aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden rounded-xl border border-border/80 shadow-md">
          <Image
            src={activeEvent.bannerImage}
            alt={activeEvent.name}
            fill
            className="object-cover"
            unoptimized={activeEvent.bannerImage.startsWith("data:") || activeEvent.bannerImage.startsWith("blob:")}
          />
        </div>
      )}

      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{activeEvent.name}</h3>
      <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink-muted">
        {activeEvent.description}
      </p>

      <div className="mt-auto grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-4">
        <Meta label="VENUE" value={activeEvent.venueLabel ?? activeEvent.venue} />
        <Meta label="DATE" value={activeEvent.dateLabel ?? formatDateRange(activeEvent.startDate, activeEvent.endDate)} />
        <Meta label="PRIZE POOL" value={activeEvent.prizePool} />
        <Meta label="TEAM SIZE" value={activeEvent.teamSize} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {isTentative ? (
          <Button asChild variant="ghost" className="border-border hover:bg-canvas-raised">
            <Link href={`/events/${activeEvent.slug}`}>
              Know More <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <>
            {activeEvent.registrationOpen && (
              <Button asChild className="bg-saffron text-black hover:bg-saffron/90 font-medium">
                <Link
                  href={activeEvent.registrationUrl || `/events/${activeEvent.slug}/register`}
                  target={activeEvent.registrationUrl?.startsWith("http") ? "_blank" : undefined}
                  rel={activeEvent.registrationUrl?.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  Register Now <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            )}

            <Button asChild variant="ghost" className="border border-border/80 text-ink hover:bg-canvas-raised">
              <Link href={`/events/${activeEvent.slug}`}>
                Know More <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </>
        )}
      </div>
    </BentoCard>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 font-mono text-[10.5px] tracking-wide text-saffron">{label}</div>
      <div className="text-[14px] font-medium">{value}</div>
    </div>
  );
}

function WhyBuildFestCard() {
  return (
    <BentoCard glow="pine" className="lg:col-span-1">
      <ChinarLeaf className="mb-4 h-6 w-6 text-saffron" />
      <h3 className="text-lg font-semibold tracking-tight">Not a college club.</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
        A real developer community — hackathon winners land internships,
        first-timers get mentors, and every campus in the valley gets a
        room to build in.
      </p>
      <Link
        href="/community"
        className="mt-auto flex items-center gap-1 pt-6 text-[13.5px] font-medium text-saffron transition-opacity hover:opacity-80"
      >
        Read our story <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </BentoCard>
  );
}

function GalleryCard({ photos }: { photos?: GalleryItem[] }) {
  const fallbackTiles = [
    { src: "/gallery/hackdays-2025/hd-1.jpg", gradient: "from-[#3a5c48] to-[#16302a]" },
    { src: "/gallery/hackdays-2025/hd-2.jpg", gradient: "from-[#4a3a26] to-[#1c1710]" },
    { src: "/gallery/hackdays-2025/hd-3.jpg", gradient: "from-[#33574a] to-[#122320]" },
    { src: "/gallery/hackdays-2025/hd-4.jpg", gradient: "from-[#5c4426] to-[#241a0e]" },
  ];

  const tiles = photos && photos.length >= 4
    ? photos.slice(0, 4).map((p) => ({ src: p.src, gradient: p.gradient || "from-stone-800 to-stone-900" }))
    : fallbackTiles;

  return (
    <BentoCard className="lg:col-span-1">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">From the floor</h3>
        <Link href="/gallery" className="text-ink-muted transition-colors hover:text-ink">
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {tiles.map((tile, i) => (
          <div
            key={i}
            className={`relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br ${tile.gradient} transition-transform duration-500 hover:scale-[1.04]`}
          >
            {tile.src && (
              <Image
                src={tile.src}
                alt="Event photo"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                unoptimized={tile.src.startsWith("data:") || tile.src.startsWith("blob:")}
              />
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-ink-faint">Real photos & memories from Kashmir builders.</p>
    </BentoCard>
  );
}

function OpenSourceCard() {
  const activity = [
    { icon: GitCommitHorizontal, label: "260+ commits this month across member repos" },
    { icon: GitPullRequest, label: "38 first-time contributors merged their first PR" },
    { icon: Star, label: "KashEdu — top community project, 140 stars" },
  ];
  return (
    <BentoCard glow="pine" className="lg:col-span-1">
      <h3 className="text-lg font-semibold tracking-tight">Open-source, always on</h3>
      <div className="mt-4 flex flex-1 flex-col gap-3.5">
        {activity.map((item) => (
          <div key={item.label} className="flex items-start gap-2.5">
            <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
            <span className="text-[13.5px] leading-snug text-ink-muted">{item.label}</span>
          </div>
        ))}
      </div>
      <Link
        href={"https://github.com/buildfestkashmir" as string}
        className="mt-auto flex items-center gap-1 pt-6 text-[13.5px] font-medium text-saffron transition-opacity hover:opacity-80"
      >
        Explore our repos <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </BentoCard>
  );
}

function TestimonialCard() {
  return (
    <BentoCard className="lg:col-span-1">
      <Users className="mb-4 h-6 w-6 text-saffron" />
      <p className="text-[15px] leading-relaxed text-ink">
        &ldquo;My first PR ever was reviewed by a BuildFest mentor at 2am
        during HACKDAYS. Six months later I was mentoring someone else&rsquo;s
        first PR.&rdquo;
      </p>
      <div className="mt-auto pt-6 text-[13px] text-ink-faint">
        Team lead, KashEdu — HACKDAYS &rsquo;25 winning project
      </div>
    </BentoCard>
  );
}

function PartnersCard() {
  return (
    <BentoCard id="partners" className="sm:col-span-2 lg:col-span-3 overflow-hidden !p-0">
      <div className="px-7 pt-7 pb-5">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-saffron mb-1">Partners &amp; Institutions</p>
        <h3 className="text-lg font-semibold tracking-tight">Backed by colleges and companies who showed up early</h3>
      </div>
      <div className="border-t border-border/60 py-5">
        <Marquee items={[...partners]} speed={22} />
      </div>
    </BentoCard>
  );
}

