import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { BentoCard } from "@/components/shared/bento-card";
import { values } from "@/lib/constants/community";

export function Values() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-content">
        <Reveal className="mb-8">
          <PillBadge dot={false} className="mb-4">
            VALUES
          </PillBadge>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What we won&rsquo;t compromise on.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.05}>
              <BentoCard glow={i % 2 === 0 ? "saffron" : "pine"}>
                <span className="mb-3 font-mono text-2xl text-saffron/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-semibold tracking-tight">{value.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{value.body}</p>
              </BentoCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
