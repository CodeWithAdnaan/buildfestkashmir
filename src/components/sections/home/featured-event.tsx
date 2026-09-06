import Image from "next/image";
import Link from "next/link";
import { Bell, ArrowRight } from "lucide-react";
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
          {isTentative ? "NEXT EVENT — COMING SOON" : "FEATURED EVENT"}
        </div>

        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-sm border border-snow/15 lg:grid-cols-[1fr_1.05fr]">
            <div
              className="relative min-h-[300px] sm:min-h-[360px]"
              style={{
                background:
                  "linear-gradient(200deg, rgba(217,142,43,0.12), transparent 55%), linear-gradient(150deg,#1a2e24 0%,#0f1e18 65%,#0a1410 100%)",
              }}
            >
              {featuredEvent.bannerImage ? (
                <Image
                  src={featuredEvent.bannerImage}
                  alt={featuredEvent.name}
                  fill
                  className="object-cover opacity-90"
                />
              ) : (
                <MountainRidge className="absolute bottom-0 left-0 text-pine-deep/60" />
              )}
              <span className="absolute left-6 top-6 rounded-sm bg-saffron px-3 py-1.5 font-mono text-[11.5px] tracking-wide text-pine-deep shadow-md">
                COMING SOON
              </span>
            </div>

            <div className="flex flex-col justify-center gap-6 p-9 sm:p-12">
              <h3 className="font-display text-[28px] font-medium tracking-tight sm:text-[36px] lg:text-[40px]">
                {featuredEvent.name}
              </h3>
              <p className="max-w-[52ch] text-[15px] leading-relaxed text-snow/70">
                {featuredEvent.description}
              </p>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-snow/15 pt-6">
                  <MetaItem label="LOCATION" value={featuredEvent.venueLabel ?? featuredEvent.city} />
                  <MetaItem label="DATES" value={featuredEvent.dateLabel ?? "Announcing Soon"} />
                  <MetaItem label="TEAM REGISTRATION" value="Opening Soon" />
                  <MetaItem label="FORMAT" value="AI Prompt & Build Sprint" />
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button asChild className="w-fit">
                    <Link href={`/events/${featuredEvent.slug}`}>
                      View Event Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-fit border-snow/20 bg-transparent text-snow hover:bg-snow/10 hover:text-snow">
                    <Link href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
                      <Bell className="mr-2 h-4 w-4" /> Follow for Updates
                    </Link>
                  </Button>
                </div>
              </div>
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
