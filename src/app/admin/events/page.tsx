import Link from "next/link";
import { Plus, ExternalLink, Edit3, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { getEvents } from "@/lib/data/events";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function AdminEventsListPage() {
  const events = await getEvents();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Events Manager
          </h1>
          <p className="mt-1 text-xs font-mono text-ink-muted">
            Create, update schedule, and toggle registration availability for hackathons and sprints.
          </p>
        </div>
        <Button asChild size="sm" className="bg-saffron text-black hover:bg-saffron/90 font-medium">
          <Link href="/admin/events/new" className="flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            <span>Create New Event</span>
          </Link>
        </Button>
      </div>

      {/* Events Table / Card List */}
      <div className="overflow-hidden rounded-2xl border border-border bg-canvas-raised/30">
        <div className="divide-y divide-border/60">
          {events.map((event) => {
            const startDate = new Date(event.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={event.slug}
                className="flex flex-col gap-4 p-5 transition-colors hover:bg-canvas-raised/50 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0 space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-ink">{event.name}</h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                        event.status === "upcoming"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-white/5 text-ink-muted border border-border"
                      }`}
                    >
                      {event.status}
                    </span>
                    {event.registrationOpen ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                        <CheckCircle2 className="h-3 w-3" />
                        Registration Open
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-ink-faint bg-white/5 px-2 py-0.5 rounded-full border border-border">
                        <XCircle className="h-3 w-3" />
                        Registration Closed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-muted line-clamp-1">{event.tagline}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-faint pt-1">
                    <span>📍 {event.venue}</span>
                    <span>📅 {startDate}</span>
                    <span>👥 {event.teamSize}</span>
                    <span>🏆 {event.prizePool}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0">
                  <Button asChild size="sm" variant="ghost" className="border border-border text-xs font-mono">
                    <Link
                      href={`/events/${event.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-ink-muted hover:text-ink"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Preview</span>
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-canvas-overlay text-ink hover:bg-canvas-raised text-xs font-mono border border-border">
                    <Link href={`/admin/events/${event.slug}`} className="flex items-center gap-1.5">
                      <Edit3 className="h-3.5 w-3.5 text-saffron" />
                      <span>Edit Event</span>
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
