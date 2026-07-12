import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { BentoCard } from "@/components/shared/bento-card";
import type { BuildFestEvent } from "@/types/event";

export function People({ event }: { event: BuildFestEvent }) {
  if (event.speakers.length === 0 && event.mentors.length === 0) return null;

  return (
    <section className="py-6 sm:py-10">
      <div className="container-content">
        <Reveal className="mb-8">
          <PillBadge dot={false} className="mb-4">
            SPEAKERS &amp; MENTORS
          </PillBadge>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Who&rsquo;s in the room
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {event.speakers.map((s) => (
            <BentoCard key={s.name} glow="saffron">
              {s.image ? (
                <div className="mb-3 relative h-11 w-11 overflow-hidden rounded-full border border-white/10">
                  <Image src={s.image} alt={s.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="mb-3 h-11 w-11 rounded-full bg-gradient-to-br from-saffron/40 to-pine-glow/40" />
              )}
              <div className="font-medium">{s.name}</div>
              <div className="mt-0.5 text-[13.5px] text-ink-muted">
                {s.role} · {s.org}
              </div>
              <span className="mt-3 w-fit rounded-full bg-canvas-overlay px-2.5 py-1 font-mono text-[10.5px] text-saffron">
                SPEAKER
              </span>
            </BentoCard>
          ))}
          {event.mentors.map((m) => (
            <BentoCard key={m.name} glow="pine">
              {m.image ? (
                <div className="mb-3 relative h-11 w-11 overflow-hidden rounded-full border border-white/10">
                  <Image src={m.image} alt={m.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="mb-3 h-11 w-11 rounded-full bg-gradient-to-br from-pine-glow/40 to-saffron/30" />
              )}
              <div className="font-medium">{m.name}</div>
              <div className="mt-0.5 text-[13.5px] text-ink-muted">{m.expertise}</div>
              <span className="mt-3 w-fit rounded-full bg-canvas-overlay px-2.5 py-1 font-mono text-[10.5px] text-ink-muted">
                MENTOR
              </span>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
