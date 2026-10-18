"use client";

import Link from "next/link";
import { ArrowRight, GitFork } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/shared/pill-badge";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";
import { siteConfig } from "@/lib/constants/site";
import { featuredEvent as staticFeaturedEvent } from "@/lib/constants/events";
import type { BuildFestEvent } from "@/types/event";
import type { HomepageSettings } from "@/lib/data/homepage";

interface HeroProps {
  featuredEvent?: BuildFestEvent;
  settings?: HomepageSettings;
}

export function Hero({ featuredEvent, settings }: HeroProps = {}) {
  const activeFeatured = featuredEvent ?? staticFeaturedEvent;

  const badgeText = settings?.hero?.badge || `Srinagar · Est. student-led · Since ${siteConfig.founded}`;
  const titleText = settings?.hero?.title || "Kashmir's developer ecosystem, built in public.";
  const titleHighlight = settings?.hero?.titleHighlight || "ecosystem";
  const descText =
    settings?.hero?.description ||
    "Hackathons, workshops, and open-source — the infrastructure for the region's next generation of builders. Not a college club. A real, shipping developer community.";
  const githubLink = settings?.hero?.githubUrl || siteConfig.links.github;

  const buildersCount = settings?.stats?.builders ?? 184;
  const projectsCount = settings?.stats?.projects ?? 42;
  const campusesCount = settings?.stats?.campuses ?? 8;
  const prizePoolText = settings?.stats?.prizePool ?? "₹50K+";

  const customStats = [
    { id: "builders", value: buildersCount, suffix: "+", label: "COMMUNITY BUILDERS" },
    { id: "projects", value: projectsCount, suffix: "", label: "PROJECTS SHIPPED" },
    { id: "campuses", value: campusesCount, suffix: "+", label: "COLLEGES REACHED" },
    { id: "prizes", value: prizePoolText, suffix: "", isText: true, label: "PRIZES & GRANTS" },
  ];

  // Helper to render headline with highlighted shimmer word
  const renderHeadline = () => {
    if (!titleHighlight || !titleText.includes(titleHighlight)) {
      return <span className="text-gradient">{titleText}</span>;
    }
    const parts = titleText.split(titleHighlight);
    return (
      <>
        <span className="text-gradient">{parts[0]}</span>
        <span className="shimmer-text">{titleHighlight}</span>
        <span className="text-gradient">{parts.slice(1).join(titleHighlight)}</span>
      </>
    );
  };

  const primaryBtnText =
    settings?.hero?.primaryButtonText ||
    (activeFeatured ? `Register for ${activeFeatured.name.replace(" 2026", "")}` : "Explore Events");

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
            <PillBadge>{badgeText}</PillBadge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-[42px] font-semibold leading-[1.08] tracking-tight sm:text-[58px] lg:text-[68px]"
          >
            {renderHeadline()}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-balance text-[16.5px] leading-relaxed text-ink-muted"
          >
            {descText}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {activeFeatured && !activeFeatured.isTentative ? (
              <Button asChild size="lg">
                <Link
                  href={activeFeatured.registrationUrl || `/events/${activeFeatured.slug}/register`}
                  target={activeFeatured.registrationUrl?.startsWith("http") ? "_blank" : undefined}
                  rel={activeFeatured.registrationUrl?.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {primaryBtnText} <ArrowRight className="h-4 w-4" />
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
              <Link href={githubLink} target="_blank" rel="noopener noreferrer">
                <GitFork className="h-4 w-4" /> View on GitHub
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Live-stat strip customized by admin */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.08, 0.4)}
          className="glass mx-auto mt-16 grid max-w-4xl grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl sm:grid-cols-4 sm:divide-y-0"
        >
          {customStats.map((stat) => (
            <motion.div key={stat.id} variants={fadeUp} className="px-6 py-7 text-center">
              <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {stat.isText ? (
                  <span>{stat.value}</span>
                ) : (
                  <AnimatedCounter value={Number(stat.value)} suffix={stat.suffix} />
                )}
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
