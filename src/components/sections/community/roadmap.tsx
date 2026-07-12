import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { roadmap } from "@/lib/constants/community";

export function Roadmap() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-content">
        <Reveal className="mb-8">
          <PillBadge dot={false} className="mb-4">
            ROADMAP
          </PillBadge>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Where this is going.</h2>
        </Reveal>

        <div className="glass rounded-2xl p-2 sm:p-3">
          {roadmap.map((item, i) => (
            <Reveal key={item.quarter} delay={i * 0.05}>
              <div className="flex flex-col gap-1.5 border-b border-border p-5 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-8 sm:p-6">
                <div className="w-full shrink-0 font-mono text-[12.5px] text-saffron sm:w-24">
                  {item.quarter}
                </div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                    {item.description}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
