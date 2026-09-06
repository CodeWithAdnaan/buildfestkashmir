import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DetailHero } from "@/components/sections/events/detail/detail-hero";
import { Overview } from "@/components/sections/events/detail/overview";
import { Schedule } from "@/components/sections/events/detail/schedule";
import { People } from "@/components/sections/events/detail/people";
import { Sponsors } from "@/components/sections/events/detail/sponsors";
import { Prizes } from "@/components/sections/events/detail/prizes";
import { Gallery } from "@/components/sections/events/detail/gallery";
import { RegistrationCta } from "@/components/sections/events/detail/registration-cta";
import { events, getEventBySlug } from "@/lib/constants/events";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  return {
    title: event.name,
    description: event.description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: event.name,
      description: event.description,
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <DetailHero event={event} />
        <Overview event={event} />
        <Schedule event={event} />
        <People event={event} />
        <Prizes event={event} />
        <Sponsors event={event} />
        <Gallery event={event} />
        <RegistrationCta event={event} />
      </main>
      <SiteFooter />
    </>
  );
}
