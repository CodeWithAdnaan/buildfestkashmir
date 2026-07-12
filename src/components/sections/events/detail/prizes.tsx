import { Trophy } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { BentoCard } from "@/components/shared/bento-card";
import type { BuildFestEvent } from "@/types/event";

export function Prizes({ event }: { event: BuildFestEvent }) {
  if (event.prizes.length === 0) return null;

  return (
    <section className="py-6 sm:py-10">
      <div className="container-content">
        <Reveal className="mb-8">
          <PillBadge dot={false} className="mb-4">
            PRIZES
          </PillBadge>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {event.prizePool} up for grabs
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {event.prizes.map((prize, i) => (
            <Reveal key={prize.place} delay={i * 0.05}>
              <BentoCard glow={i === 0 ? "saffron" : "none"} className="h-full">
                <Trophy className={`mb-3 h-5 w-5 ${i === 0 ? "text-saffron" : "text-ink-faint"}`} />
                <div className="font-mono text-[12px] tracking-wide text-ink-muted">
                  {prize.place.toUpperCase()}
                </div>
                <div className="mt-1 text-2xl font-semibold tracking-tight">{prize.amount}</div>
                {prize.note && (
                  <div className="mt-2 text-[13px] leading-snug text-ink-faint">{prize.note}</div>
                )}
              </BentoCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
