import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { PartnerTierSections } from "@/components/sections/partners/partner-tier-section";
import { BecomePartnerCta } from "@/components/sections/partners/become-partner-cta";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Partners",
  description: "Companies and colleges backing BuildFest Kashmir — Title, Gold, Silver, and Community partners.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: `Partners — ${siteConfig.name}`,
    description: "Companies and colleges backing BuildFest Kashmir.",
  },
};

export default function PartnersPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-8 pt-40 sm:pt-48">
        <div className="container-content pb-4">
          <Reveal className="max-w-2xl">
            <PillBadge className="mb-5">PARTNERS</PillBadge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Backed by colleges and companies who showed up early.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
              None of this runs without the venues, tools, and funding our partners bring —
              here&rsquo;s everyone who makes it possible.
            </p>
          </Reveal>
        </div>
        <PartnerTierSections />
        <BecomePartnerCta />
      </main>
      <SiteFooter />
    </>
  );
}
