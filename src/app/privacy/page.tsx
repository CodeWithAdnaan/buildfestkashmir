import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${siteConfig.name}`,
  description: `Learn how ${siteConfig.name} collects, protects, and manages attendee and participant information across our hackathons and community initiatives.`,
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 2026";

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pb-24 pt-36 sm:pt-44">
        <div className="container-content max-w-3xl">
          {/* Header */}
          <Reveal className="text-center">
            <PillBadge className="mb-4">LEGAL & TRANSPARENCY</PillBadge>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-xs font-mono text-ink-muted">
              Last updated: {lastUpdated} · {siteConfig.name}, {siteConfig.location}
            </p>
          </Reveal>

          {/* Policy Content Card */}
          <Reveal delay={0.05} className="mt-12">
            <div className="glass rounded-3xl border border-border p-6 sm:p-10 space-y-10 text-ink-muted leading-relaxed text-[15px]">
              {/* Introduction */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">Introduction</h2>
                <p>
                  At <strong className="text-ink">{siteConfig.name}</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we are committed to safeguarding the privacy of our student developers, mentors, partners, and community members. This Privacy Policy outlines what information we collect when you register for hackathons, attend workshops, browse our website, or interact with our community channels, and how we handle that data.
                </p>
                <p>
                  By using our website (<span className="font-mono text-xs text-saffron">{siteConfig.url}</span>) or participating in BuildFest events, you consent to the practices described in this policy.
                </p>
              </section>

              {/* 1. Information We Collect */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">1. Information We Collect</h2>
                <p>We collect information you provide directly to us when interacting with the platform:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-ink">Account & Profile Information:</strong> Full name, email address, password, profile avatar, college/university, and professional links (such as GitHub and LinkedIn profiles).
                  </li>
                  <li>
                    <strong className="text-ink">Event & Hackathon Registrations:</strong> Information required for event logistics, team pairing, and badge printing, including college name, degree/branch, experience level (beginner, intermediate, advanced), team name, and Discord handle.
                  </li>
                  <li>
                    <strong className="text-ink">Team & Volunteer Applications:</strong> Information submitted when applying for core team or volunteer roles, including your background, technical interests, and application statement.
                  </li>
                  <li>
                    <strong className="text-ink">Contact Inquiries:</strong> Name, email address, message subject, and notes sent through our contact forms or partnership inquiries.
                  </li>
                </ul>
              </section>

              {/* 2. How We Use Your Data */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">2. How We Use Your Information</h2>
                <p>We use the data we collect solely to support our community and host safe, efficient events:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To verify student credentials and coordinate entry, check-in, and badges at physical hackathons and meetups.</li>
                  <li>To facilitate hackathon team formation, project tracking, and prize distributions.</li>
                  <li>To communicate vital event updates, schedules, guidelines, and venue directions.</li>
                  <li>To issue digital certificates of participation and achievement.</li>
                  <li>To review community feedback and continuously improve future iterations of BuildFest Kashmir.</li>
                </ul>
              </section>

              {/* 3. Sharing of Information */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">3. Data Sharing & Disclosure</h2>
                <p>
                  <strong className="text-ink">We do not sell, rent, or trade your personal data to third parties.</strong> Data is shared only under specific, transparent circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-ink">Hackathon Mentors & Judges:</strong> Evaluators will review team submissions, project descriptions, and GitHub repositories during project judging.
                  </li>
                  <li>
                    <strong className="text-ink">Hiring Sponsors (With Consent):</strong> If a partner company offers hiring bounties, your resume or portfolio is shared only if you opt in during registration or submission.
                  </li>
                  <li>
                    <strong className="text-ink">Infrastructure Providers:</strong> We use trusted cloud infrastructure (Supabase for authentication and database management, Cloudflare/Vercel for hosting) operating under strict security protocols.
                  </li>
                </ul>
              </section>

              {/* 4. Event Photography & Media */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">4. Photography & Media at Events</h2>
                <p>
                  As an active student community, we document our hackathons, stage presentations, workshops, and ceremonies through photography and video recordings. By attending an offline BuildFest event, you acknowledge that photos or footage featuring participants may be published on our website, social media, or event recap galleries.
                </p>
                <p>
                  If you wish to have a specific photo featuring you removed from our online media galleries, please reach out to our team at{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-saffron underline font-mono text-xs">
                    {siteConfig.email}
                  </a>{" "}
                  and we will promptly address your request.
                </p>
              </section>

              {/* 5. Security */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">5. Data Security</h2>
                <p>
                  We implement industry-standard security safeguards. Passwords are cryptographically hashed, and user data is protected via PostgreSQL Row Level Security (RLS). Access to participant databases is strictly restricted to verified organizers and administrators with multi-factor authentication.
                </p>
              </section>

              {/* 6. Your Rights */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-ink">6. Your Rights & Data Retention</h2>
                <p>
                  You have the right to access, update, or request deletion of your account and personal information at any time. You can edit your profile details directly from your profile settings or request permanent removal of your data by emailing{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-saffron underline font-mono text-xs">
                    {siteConfig.email}
                  </a>.
                </p>
              </section>

              {/* 7. Contact Us */}
              <section className="space-y-3 border-t border-border pt-6">
                <h2 className="text-lg font-semibold text-ink">7. Contact Information</h2>
                <p>
                  For any privacy questions, data requests, or community inquiries, please contact our organizers:
                </p>
                <div className="rounded-2xl border border-border/80 bg-canvas-raised/50 p-4 font-mono text-xs space-y-1 text-ink">
                  <p className="font-semibold text-saffron">{siteConfig.name}</p>
                  <p className="text-ink-muted">Email: {siteConfig.email}</p>
                  <p className="text-ink-muted">Location: {siteConfig.location}</p>
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
