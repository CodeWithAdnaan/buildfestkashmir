import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { ContactInfo } from "@/components/sections/contact/contact-info";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with BuildFest Kashmir — partnerships, questions, or just to say hi.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${siteConfig.name}`,
    description: "Get in touch with BuildFest Kashmir.",
  },
};

interface ContactPageProps {
  searchParams: Promise<{ subject?: string }>;
}

const subjectPresets: Record<string, string> = {
  partnership: "Partnership inquiry",
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { subject } = await searchParams;
  const defaultSubject = subject ? (subjectPresets[subject] ?? subject) : "";

  return (
    <>
      <SiteHeader />
      <main className="pb-24 pt-40 sm:pt-48">
        <div className="container-content">
          <Reveal className="mb-12 max-w-2xl">
            <PillBadge className="mb-5">CONTACT</PillBadge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Get in touch.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
              Questions, partnership ideas, or just want to say hi — this reaches the actual
              organizers, not a support inbox.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <ContactForm defaultSubject={defaultSubject} />
            </Reveal>
            <Reveal delay={0.05}>
              <ContactInfo />
            </Reveal>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
