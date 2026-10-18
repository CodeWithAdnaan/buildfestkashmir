import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/home/hero";
import { BentoGrid } from "@/components/sections/home/bento-grid";
import { Faq } from "@/components/sections/home/faq";
import { siteConfig } from "@/lib/constants/site";
import { getFeaturedEvent } from "@/lib/data/events";

export const revalidate = 0;

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const featuredEvent = await getFeaturedEvent();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero featuredEvent={featuredEvent} />
        <BentoGrid featuredEvent={featuredEvent} />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
