import Link from "next/link";
import {
  Calendar,
  Users,
  Inbox,
  ArrowUpRight,
  Plus,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getEvents } from "@/lib/data/events";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // Dynamic data

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  // 1. Fetch counts
  const [
    events,
    { count: registrationsCount },
    { count: applicationsCount },
    { count: contactCount },
    { data: recentRegistrations },
  ] = await Promise.all([
    getEvents(),
    supabase.from("registrations").select("*", { count: "exact", head: true }),
    supabase.from("team_applications").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const upcomingCount = events.filter((e) => e.status === "upcoming").length;
  const activeRegistrationsCount = events.filter((e) => e.registrationOpen).length;

  const statCards = [
    {
      title: "Total Registrations",
      value: registrationsCount ?? 0,
      description: `${activeRegistrationsCount} event(s) open for signups`,
      icon: Users,
      href: "/admin/registrations",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      title: "Total Events",
      value: events.length,
      description: `${upcomingCount} upcoming event(s)`,
      icon: Calendar,
      href: "/admin/events",
      color: "text-saffron",
      bg: "bg-saffron/10",
    },
    {
      title: "Team Applications",
      value: applicationsCount ?? 0,
      description: "Volunteer & core team submissions",
      icon: Inbox,
      href: "/admin/applications",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      title: "Contact Messages",
      value: contactCount ?? 0,
      description: "Community & sponsor inquiries",
      icon: Mail,
      href: "/admin/applications",
      color: "text-sky-400",
      bg: "bg-sky-400/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Organizer Dashboard
          </h1>
          <p className="mt-1 text-xs font-mono text-ink-muted">
            Manage BuildFest events, participants, and incoming applications.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button asChild size="sm" variant="ghost" className="border border-border">
            <Link href="/admin/registrations" className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>Registrations</span>
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-saffron text-black hover:bg-saffron/90 font-medium">
            <Link href="/admin/events/new" className="flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              <span>Create Event</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-canvas-raised/40 p-5 transition-all duration-300 hover:border-saffron/40 hover:bg-canvas-raised hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-2.5 ${stat.bg} ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
              </div>
              <div className="mt-4">
                <p className="font-mono text-xs text-ink-muted">{stat.title}</p>
                <p className="mt-1 text-3xl font-bold text-ink tracking-tight">{stat.value}</p>
                <p className="mt-1.5 text-[11px] font-mono text-ink-faint">{stat.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 2-Column Grid: Active Events & Recent Registrations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active Events Overview */}
        <div className="rounded-2xl border border-border bg-canvas-raised/30 p-5">
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <div>
              <h2 className="font-semibold text-ink text-sm">Events Roster</h2>
              <p className="text-[11px] font-mono text-ink-muted">Published events on BuildFest</p>
            </div>
            <Link
              href="/admin/events"
              className="text-xs font-mono text-saffron hover:underline flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {events.map((event) => (
              <div
                key={event.slug}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-canvas-raised/50 p-3.5 transition-colors hover:border-border"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-ink text-sm truncate">{event.name}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                        event.status === "upcoming"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-white/5 text-ink-muted"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-mono text-ink-muted truncate">
                    {event.venue} · {new Date(event.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {event.registrationOpen ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                      <CheckCircle2 className="h-3 w-3" />
                      Open
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-ink-faint bg-white/5 px-2 py-1 rounded-lg">
                      Closed
                    </span>
                  )}
                  <Button asChild size="sm" variant="ghost" className="h-8 px-2.5 text-xs font-mono text-ink-muted hover:text-ink">
                    <Link href={`/admin/events/${event.slug}`}>Edit</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registrations Table */}
        <div className="rounded-2xl border border-border bg-canvas-raised/30 p-5">
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <div>
              <h2 className="font-semibold text-ink text-sm">Recent Registrations</h2>
              <p className="text-[11px] font-mono text-ink-muted">Latest attendees who signed up</p>
            </div>
            <Link
              href="/admin/registrations"
              className="text-xs font-mono text-saffron hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4">
            {recentRegistrations && recentRegistrations.length > 0 ? (
              <div className="space-y-2.5">
                {recentRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="flex items-center justify-between rounded-xl border border-border/40 bg-canvas-raised/40 p-3 text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-medium text-ink truncate">{reg.full_name}</p>
                      <p className="font-mono text-[11px] text-ink-muted truncate">
                        {reg.college} · {reg.email}
                      </p>
                    </div>
                    <div className="shrink-0 text-right font-mono">
                      <span className="inline-block rounded-md bg-saffron/10 px-2 py-0.5 text-[10px] text-saffron">
                        {reg.event_slug}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
                <Users className="h-8 w-8 text-ink-faint mb-2" />
                <p className="text-xs font-mono text-ink-muted">No registrations logged yet.</p>
                <p className="text-[11px] font-mono text-ink-faint mt-1">
                  When students register for events, they will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
