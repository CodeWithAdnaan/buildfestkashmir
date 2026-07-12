import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/home/hero";
import { BentoGrid } from "@/components/sections/home/bento-grid";
import { Faq } from "@/components/sections/home/faq";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <BentoGrid />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
