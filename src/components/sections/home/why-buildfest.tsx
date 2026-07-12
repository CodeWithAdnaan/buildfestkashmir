import { Reveal } from "@/components/shared/reveal";
import { ChinarLeaf } from "@/components/shared/chinar-leaf";

const rows = [
  {
    id: "01",
    label: "MISSION",
    title: "Kashmir needed a room to build in.",
    body: "Before BuildFest, there wasn't really a place for a student in Srinagar to sit next to someone who'd shipped a real product and just ask questions. We started as three people in a college lab. We're still, at heart, that same room — it's just bigger now.",
    gradient: "from-[#274b3f] to-[#0d1e19]",
  },
  {
    id: "02",
    label: "VISION",
    title: "Every college here should have a dev community.",
    body: "Not a placement cell. Not a coding club that meets once a semester. A real, active group of students shipping things together — and BuildFest exists to seed that in every campus across the valley, not just the ones that already have one.",
    gradient: "from-[#4a3a26] to-[#1c1710]",
    reverse: true,
  },
  {
    id: "03",
    label: "OPPORTUNITY",
    title: "Your first project shouldn't be your last.",
    body: "We connect hackathon winners to internships, open-source maintainers to first-time contributors, and first-year students to seniors who were exactly where they are two years ago. The goal was never just one good weekend a year.",
    gradient: "from-[#33574a] to-[#122320]",
  },
];

export function WhyBuildFest() {
  return (
    <section className="bg-snow py-24 sm:py-28 lg:py-32">
      <div className="container-content">
        <Reveal className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-saffron">
          Why BuildFest exists
        </Reveal>
        <Reveal className="mb-6 font-display text-[32px] font-medium leading-[1.08] tracking-tight sm:text-[44px]">
          Three things we believe.
        </Reveal>

        <div>
          {rows.map((row) => (
            <Reveal key={row.id}>
              <div
                className={`grid grid-cols-1 items-center gap-8 border-t border-border py-16 last:border-b lg:grid-cols-2 lg:gap-20 ${
                  row.reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="mb-4 font-mono text-xs tracking-wider text-saffron">
                    {row.id} / {row.label}
                  </div>
                  <h3 className="mb-4 font-display text-[26px] font-medium tracking-tight sm:text-[32px]">
                    {row.title}
                  </h3>
                  <p className="max-w-[48ch] text-[15.5px] leading-relaxed text-stone">
                    {row.body}
                  </p>
                </div>
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-sm bg-gradient-to-br ${row.gradient}`}
                >
                  <ChinarLeaf className="absolute inset-0 m-auto h-2/5 w-2/5 text-snow opacity-[0.18]" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
