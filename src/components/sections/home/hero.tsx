"use client";

import Link from "next/link";
import { ArrowRight, GitFork } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/shared/pill-badge";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";
import { communityStats } from "@/lib/constants/stats";
import { siteConfig } from "@/lib/constants/site";
import { featuredEvent } from "@/lib/constants/events";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-40 sm:pt-48">
      <div className="container-content">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <PillBadge>Srinagar · Est. student-led · Since {siteConfig.founded}</PillBadge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-[42px] font-semibold leading-[1.08] tracking-tight sm:text-[58px] lg:text-[68px]"
          >
            <span className="text-gradient">Kashmir&rsquo;s developer</span>{" "}
            <span className="shimmer-text">ecosystem</span>
            <span className="text-gradient">, built in public.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-balance text-[16.5px] leading-relaxed text-ink-muted"
          >
            Hackathons, workshops, and open-source — the infrastructure for
            the region&rsquo;s next generation of builders. Not a college club.
            A real, shipping developer community.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {featuredEvent && !featuredEvent.isTentative ? (
              <Button asChild size="lg">
                <Link href={`/events/${featuredEvent.slug}/register`}>
                  Register for {featuredEvent.name.replace(" 2026", "")} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link href="/events">
                  Explore Events <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button asChild variant="ghost" size="lg">
              <Link href={siteConfig.links.github}>
                <GitFork className="h-4 w-4" /> View on GitHub
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Immediate live-stat strip — no empty fold beneath the hero copy */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.08, 0.4)}
          className="glass mx-auto mt-16 grid max-w-4xl grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl sm:grid-cols-4 sm:divide-y-0"
        >
          {communityStats.map((stat) => (
            <motion.div key={stat.id} variants={fadeUp} className="px-6 py-7 text-center">
              <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
