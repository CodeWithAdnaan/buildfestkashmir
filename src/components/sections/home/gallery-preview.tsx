import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

const items = [
  { id: 1, caption: "HACKDAYS '26 — Opening ceremony", h: "sm:h-[280px] h-[220px]", gradient: "from-[#3a5c48] to-[#16302a]", src: "/gallery/hackdays-2025/hd-1.jpg" },
  { id: 2, caption: "Team Ladakh, midnight debugging", h: "sm:h-[200px] h-[180px]", gradient: "from-[#4a3a26] to-[#1c1710]", src: "/gallery/hackdays-2025/hd-2.jpg" },
  { id: 3, caption: "Mentor rounds, Day 2", h: "sm:h-[240px] h-[200px]", gradient: "from-[#2f5142] to-[#0f211b]", src: "/gallery/hackdays-2025/hd-3.jpg" },
  { id: 4, caption: "Final demos on stage", h: "sm:h-[320px] h-[240px]", gradient: "from-[#5c4426] to-[#241a0e]", src: "/gallery/hackdays-2025/hd-4.jpg" },
  { id: 5, caption: "Winning team, KashEdu", h: "sm:h-[180px] h-[160px]", gradient: "from-[#33574a] to-[#122320]", src: "/gallery/hackdays-2025/hd-5.jpg" },
  { id: 6, caption: "Workshop: intro to git", h: "sm:h-[260px] h-[200px]", gradient: "from-[#46381f] to-[#1d1710]" },
];

export function GalleryPreview() {
  return (
    <section className="bg-snow py-24 sm:py-28 lg:py-32">
      <div className="container-content">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-saffron">
              From the floor
            </div>
            <h2 className="max-w-[16ch] font-display text-[32px] font-medium leading-[1.08] tracking-tight sm:text-[44px]">
              Not stock photos. Actual all-nighters.
            </h2>
          </div>
          <Button asChild variant="ghost" className="w-fit text-pine-deep">
            <Link href="/gallery">View full gallery</Link>
          </Button>
        </Reveal>

        <Reveal>
          <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`group relative cursor-pointer overflow-hidden rounded-sm bg-gradient-to-br ${item.gradient} ${item.h}`}
              >
                {item.src && (
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-pine-deep/0 transition-colors duration-300 group-hover:bg-pine-deep/30" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 font-mono text-[11px] tracking-wide text-snow/0 transition-colors duration-300 group-hover:text-snow/100">
                  {item.caption}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
