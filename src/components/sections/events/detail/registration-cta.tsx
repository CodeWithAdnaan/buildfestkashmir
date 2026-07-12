import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import type { BuildFestEvent } from "@/types/event";

export function RegistrationCta({ event }: { event: BuildFestEvent }) {
  if (!event.registrationOpen) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="container-content">
        <Reveal className="glass relative overflow-hidden rounded-2xl p-10 text-center sm:p-14">
          <div className="glow-saffron pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to build at {event.name.split(" ").slice(0, 2).join(" ")}?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-ink-muted">
              Registration takes under five minutes. Solo or with a team — both are welcome.
            </p>
            <Button asChild size="lg" className="mt-7">
              <Link href={`/events/${event.slug}/register`}>
                Register now <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
