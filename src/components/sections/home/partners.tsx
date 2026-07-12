import { Reveal } from "@/components/shared/reveal";
import { Marquee } from "@/components/shared/marquee";
import { partners } from "@/lib/constants/partners";

export function Partners() {
  return (
    <section id="partners" className="overflow-hidden bg-pine-deep py-20 text-snow sm:py-24">
      <div className="container-content">
        <Reveal className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-saffron">
          Backed by
        </Reveal>
        <Reveal className="max-w-[14ch] font-display text-[28px] font-medium leading-[1.1] tracking-tight sm:text-[36px]">
          Colleges and companies who showed up early.
        </Reveal>
      </div>
      <Reveal className="mt-10">
        <Marquee items={[...partners]} />
      </Reveal>
    </section>
  );
}
