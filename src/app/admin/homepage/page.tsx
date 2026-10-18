import { requireAdminOrOrganizer } from "@/lib/auth/admin";
import { getHomepageSettings } from "@/lib/data/homepage";
import { getEvents } from "@/lib/data/events";
import { HomepageCustomizer } from "@/components/admin/homepage-customizer";

export const revalidate = 0;

export default async function AdminHomepageCustomizerPage() {
  await requireAdminOrOrganizer();

  const [settings, events] = await Promise.all([
    getHomepageSettings(),
    getEvents(),
  ]);

  return <HomepageCustomizer initialSettings={settings} events={events} />;
}
