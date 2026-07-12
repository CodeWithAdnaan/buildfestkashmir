import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { openSourceProjects } from "@/lib/constants/community";
import { siteConfig } from "@/lib/constants/site";

export function OpenSource() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-content">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <PillBadge dot={false} className="mb-4">
              OPEN SOURCE
            </PillBadge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Everything we build is public.
            </h2>
          </div>
          <Link
            href={siteConfig.links.github}
            className="flex items-center gap-1 text-[13.5px] font-medium text-saffron transition-opacity hover:opacity-80"
          >
            View all repos <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>

        <Reveal className="glass divide-y divide-border rounded-2xl">
          {openSourceProjects.map((project) => (
            <div key={project.name} className="flex items-center justify-between gap-4 p-5 sm:p-6">
              <div>
                <div className="font-medium">{project.name}</div>
                <div className="mt-0.5 text-[13.5px] text-ink-muted">{project.description}</div>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 font-mono text-[13px] text-ink-faint">
                <Star className="h-3.5 w-3.5 text-saffron" />
                {project.stars}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
