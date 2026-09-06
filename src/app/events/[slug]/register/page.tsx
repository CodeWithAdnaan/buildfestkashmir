import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PillBadge } from "@/components/shared/pill-badge";
import { Reveal } from "@/components/shared/reveal";
import { RegistrationForm } from "@/components/sections/registration/registration-form";
import { events, getEventBySlug } from "@/lib/constants/events";

interface RegisterPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: RegisterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: `Register — ${event.name}`,
    description: `Register your team for ${event.name}.`,
    alternates: { canonical: `/events/${event.slug}/register` },
  };
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event || !event.registrationOpen) {
    redirect("/events");
  }

  return (
    <>
      <SiteHeader />
      <main className="pb-24 pt-40 sm:pt-48">
        <div className="container-content">
          <Reveal className="mx-auto mb-10 max-w-lg text-center">
            <PillBadge className="mb-4">REGISTRATION</PillBadge>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Register for {event.name}
            </h1>
            <p className="mt-3 text-[15px] text-ink-muted">
              Takes under five minutes. Solo or with a team.
            </p>
          </Reveal>

          <RegistrationForm event={event} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
