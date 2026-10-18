import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/home/hero";
import { BentoGrid } from "@/components/sections/home/bento-grid";
import { Faq } from "@/components/sections/home/faq";
import { siteConfig } from "@/lib/constants/site";
import { getFeaturedEvent } from "@/lib/data/events";
import { getHomepageSettings } from "@/lib/data/homepage";

export const revalidate = 0;

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [featuredEvent, settings] = await Promise.all([
    getFeaturedEvent(),
    getHomepageSettings(),
  ]);

  return (
    <>
      {settings.announcement?.enabled && settings.announcement?.text && (
        <div className="relative z-50 bg-saffron/10 border-b border-saffron/20 px-4 py-2.5 text-center text-xs sm:text-sm font-medium text-saffron">
          <div className="container-content flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>{settings.announcement.text}</span>
            {settings.announcement.link && (
              <Link
                href={settings.announcement.link}
                target={settings.announcement.link.startsWith("http") ? "_blank" : undefined}
                rel={settings.announcement.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-80 ml-1 font-semibold"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}
      <SiteHeader />
      <main>
        <Hero featuredEvent={featuredEvent} settings={settings} />
        <BentoGrid featuredEvent={featuredEvent} settings={settings} />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
