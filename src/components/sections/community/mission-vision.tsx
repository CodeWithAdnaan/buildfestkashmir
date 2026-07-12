import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { ChinarLeaf } from "@/components/shared/chinar-leaf";

export function MissionVision() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-content">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Reveal className="glass rounded-2xl p-8 sm:p-9">
            <ChinarLeaf className="mb-5 h-6 w-6 text-saffron" />
            <PillBadge dot={false} className="mb-4">
              MISSION
            </PillBadge>
            <h2 className="text-2xl font-semibold tracking-tight">
              Kashmir needed a room to build in.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
              Before BuildFest, there wasn&rsquo;t really a place for a student in Srinagar to sit
              next to someone who&rsquo;d shipped a real product and just ask questions. We
              started as three people in a college lab. We&rsquo;re still, at heart, that same
              room — it&rsquo;s just bigger now.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="glass rounded-2xl p-8 sm:p-9">
            <ChinarLeaf className="mb-5 h-6 w-6 text-saffron" />
            <PillBadge dot={false} className="mb-4">
              VISION
            </PillBadge>
            <h2 className="text-2xl font-semibold tracking-tight">
              Every college here should have a dev community.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
              Not a placement cell. Not a coding club that meets once a semester. A real, active
              group of students shipping things together — and BuildFest exists to seed that in
              every campus across the valley, not just the ones that already have one.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
