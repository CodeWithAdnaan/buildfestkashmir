import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import type { BuildFestEvent } from "@/types/event";

export function Overview({ event }: { event: BuildFestEvent }) {
  return (
    <section className="py-14 sm:py-16">
      <div className="container-content">
        <Reveal className="glass grid grid-cols-1 gap-8 rounded-2xl p-8 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <PillBadge dot={false} className="mb-4">
              OVERVIEW
            </PillBadge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What to expect
            </h2>
          </div>
          <p className="text-[15.5px] leading-relaxed text-ink-muted">{event.overview}</p>
        </Reveal>
      </div>
    </section>
  );
}
