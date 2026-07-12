import { Reveal } from "@/components/shared/reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { communityStats } from "@/lib/constants/stats";

export function CommunityImpact() {
  return (
    <section className="bg-snow pb-24 pt-10 sm:pt-6">
      <div className="container-content">
        <Reveal className="mb-16 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-saffron">
              Community, in numbers
            </div>
            <h2 className="max-w-[16ch] font-display text-[32px] font-medium leading-[1.08] tracking-tight sm:text-[44px] lg:text-[52px]">
              Three years of building in public.
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-stone">
            Every number here is a person who showed up to a workshop, shipped
            a first project, or mentored someone doing the same.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 divide-x divide-y divide-border border-t border-border lg:grid-cols-4 lg:divide-y-0">
            {communityStats.map((stat) => (
              <div key={stat.id} className="pt-8">
                <div className="font-display text-[38px] font-medium tracking-tight sm:text-[52px]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mb-8 mt-2 font-mono text-xs tracking-wide text-stone">
                  {stat.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
