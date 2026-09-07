import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: `Terms & Conditions — ${siteConfig.name}`,
  description: `Official terms, hackathon rules, code of conduct, and participation guidelines for ${siteConfig.name} events and community members.`,
};

export default function TermsAndConditionsPage() {
  const lastUpdated = "September 2026";

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pb-24 pt-36 sm:pt-44">
        <div className="container-content max-w-3xl">
          {/* Header */}
          <Reveal className="text-center">
            <PillBadge className="mb-4">COMMUNITY GUIDELINES</PillBadge>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Terms & Conditions
            </h1>
            <p className="mt-3 text-xs font-mono text-ink-muted">
              Last updated: {lastUpdated} · {siteConfig.name}, {siteConfig.location}
            </p>
          </Reveal>

          {/* Terms Content Card */}
          <Reveal delay={0.05} className="mt-12">
            <div className="glass rounded-3xl border border-border p-6 sm:p-10 space-y-10 text-ink-muted leading-relaxed text-[15px]">
              {/* Introduction */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">Acceptance of Terms</h2>
                <p>
                  Welcome to <strong className="text-ink">{siteConfig.name}</strong>. By accessing our website, creating an account, registering for hackathons, workshops, or developer summits, or attending our physical venues, you agree to comply with and be bound by these Terms & Conditions.
                </p>
                <p>
                  If you disagree with any part of these terms, you may not register for or participate in BuildFest Kashmir events.
                </p>
              </section>

              {/* 1. Eligibility */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">1. Eligibility & Registration</h2>
                <p>
                  BuildFest hackathons and sprints are primarily designed for college and university students, recent graduates, and early-career builders. To participate:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You must provide accurate, current, and complete information during registration.</li>
                  <li>You must possess valid student or government identification for campus entry and verification.</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                </ul>
              </section>

              {/* 2. Hackathon Rules & Original Work */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">2. Hackathon Rules & Originality</h2>
                <p>
                  BuildFest is rooted in an authentic builder culture. All hackathon participants must adhere to strict integrity guidelines:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-ink">Build Period:</strong> All code and project deliverables must be initiated and built during the designated hackathon sprint timeframe.
                  </li>
                  <li>
                    <strong className="text-ink">Existing Projects:</strong> Submitting pre-existing, pre-built applications or projects previously submitted to other competitions without significant new architecture or extensions is strictly prohibited.
                  </li>
                  <li>
                    <strong className="text-ink">Open Source & Libraries:</strong> Teams are encouraged to leverage open-source libraries, APIs, SDKs, and foundational AI models, provided they are properly credited and publicly accessible.
                  </li>
                  <li>
                    <strong className="text-ink">Team Size:</strong> Teams must strictly adhere to the designated team size guidelines for each event (typically 2–4 members, unless an open or solo track is specified).
                  </li>
                </ul>
              </section>

              {/* 3. Intellectual Property */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">3. Intellectual Property (You Own Your Code)</h2>
                <p>
                  <strong className="text-ink">You and your team retain 100% full ownership of all intellectual property, source code, and design assets created during BuildFest events.</strong>
                </p>
                <p>
                  By presenting your project on stage or submitting your code repository for judging, you grant BuildFest Kashmir a non-exclusive, royalty-free license to display your project name, summary, demo video, and screenshots on our website, social media, and recap reels for non-commercial community promotion.
                </p>
              </section>

              {/* 4. Code of Conduct */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">4. Community Code of Conduct</h2>
                <p>
                  BuildFest is dedicated to providing a safe, welcoming, and harassment-free environment for everyone, regardless of gender, sexual orientation, disability, physical appearance, race, ethnicity, or technical experience level.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Be respectful, collaborative, and inclusive in all physical spaces and digital channels (Discord, GitHub).</li>
                  <li>Harassment, intimidation, hate speech, offensive commentary, or inappropriate behavior will not be tolerated.</li>
                  <li>Respect venue property, campus infrastructure, hardware kits, and electrical safety standards at offline venues.</li>
                </ul>
                <p>
                  Organizers reserve the right to immediately expel and bar any individual or team violating this Code of Conduct from the event and future community activities.
                </p>
              </section>

              {/* 5. Judging & Prizes */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">5. Judging & Prizes</h2>
                <p>
                  Prizes, trophies, and cloud grants are awarded based on criteria determined by an independent panel of industry mentors and judges (e.g., technical execution, innovation, design, and live demo). The decisions of the judging panel and organizers are final. Prizes are non-transferable.
                </p>
              </section>

              {/* 6. Limitation of Liability */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">6. Limitation of Liability</h2>
                <p>
                  BuildFest Kashmir, its organizers, college campus partners, and sponsor affiliates are not responsible for any personal loss, theft of hardware or laptops, physical injury, or travel delays sustained while attending an event. Participants are solely responsible for the safety of their own equipment and belongings.
                </p>
              </section>

              {/* 7. Governing Law */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">7. Governing Law</h2>
                <p>
                  These Terms & Conditions are governed by and construed in accordance with the laws of India, within the jurisdiction of Jammu & Kashmir.
                </p>
              </section>

              {/* 8. Contact & Updates */}
              <section className="space-y-3 border-t border-border pt-6">
                <h2 className="text-lg font-semibold text-ink">8. Questions & Contact</h2>
                <p>
                  If you have any questions regarding these Terms or our community guidelines, please connect with our lead organizers:
                </p>
                <div className="rounded-2xl border border-border/80 bg-canvas-raised/50 p-4 font-mono text-xs space-y-1 text-ink">
                  <p className="font-semibold text-saffron">{siteConfig.name}</p>
                  <p className="text-ink-muted">Email: {siteConfig.email}</p>
                  <p className="text-ink-muted">Website: {siteConfig.url}</p>
                </div>
              </section>
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
