import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants/site";

export function BecomePartnerCta() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-content">
        <Reveal className="glass relative overflow-hidden rounded-2xl p-10 text-center sm:p-14">
          <div className="glow-saffron pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Want to reach 1,400+ student builders?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-ink-muted">
              We partner with companies and colleges on hackathons, workshops, and hiring
              pipelines — not just logo placement.
            </p>
            <Button asChild size="lg" className="mt-7">
              <Link href={`/contact?subject=partnership`}>
                Get in touch <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 font-mono text-[12px] text-ink-faint">{siteConfig.email}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
