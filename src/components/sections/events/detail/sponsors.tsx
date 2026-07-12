import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import type { BuildFestEvent } from "@/types/event";

const tierOrder = ["Title", "Gold", "Silver", "Community"] as const;

export function Sponsors({ event }: { event: BuildFestEvent }) {
  if (event.sponsors.length === 0) return null;

  const track = (
    <>
      {tierOrder.flatMap((tier) =>
        event.sponsors
          .filter((s) => s.tier === tier)
          .map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-2 rounded-lg bg-canvas-overlay px-4 py-2.5 whitespace-nowrap"
            >
              <span className="font-medium">{s.name}</span>
              <span className="font-mono text-[10px] tracking-wide text-saffron">
                {s.tier.toUpperCase()}
              </span>
            </div>
          )),
      )}
    </>
  );

  return (
    <section className="py-6 sm:py-10">
      <div className="container-content overflow-hidden">
        <Reveal className="mb-8">
          <PillBadge dot={false} className="mb-4">
            SPONSORS
          </PillBadge>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Made possible by
          </h2>
        </Reveal>

        <Reveal>
          <div className="glass relative overflow-hidden rounded-2xl py-6 sm:py-8 [mask-image:linear-gradient(90deg,transparent_0%,black_10%,black_90%,transparent_100%)]">
            <div
              className="flex w-max"
              style={{ animation: `marquee 25s linear infinite` }}
            >
              <div className="flex gap-3 px-1.5">{track}</div>
              <div className="flex gap-3 px-1.5">{track}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
