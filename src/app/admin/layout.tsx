import type { Metadata } from "next";
import { requireAdminOrOrganizer } from "@/lib/auth/admin";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  title: "Organizer Console — BuildFest Kashmir",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdminOrOrganizer();

  return (
    <div className="min-h-screen bg-canvas text-ink lg:flex">
      <AdminNav user={admin} />
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
