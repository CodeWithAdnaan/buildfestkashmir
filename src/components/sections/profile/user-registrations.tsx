import Link from "next/link";
import { Calendar, Ticket, CheckCircle2, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface RegistrationItem {
  id: string;
  event_slug: string;
  created_at: string;
  college: string;
  branch: string;
  experience_level: string;
  team_name?: string | null;
}

interface UserRegistrationsProps {
  registrations: RegistrationItem[];
}

export function UserRegistrations({ registrations }: UserRegistrationsProps) {
  if (registrations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-8 text-center">
        <Ticket className="mx-auto h-8 w-8 text-saffron/60" />
        <h3 className="mt-3 text-base font-semibold text-ink">No Event Registrations Yet</h3>
        <p className="mt-1 text-xs text-ink-muted">
          You haven&apos;t registered for any BuildFest events yet.
        </p>
        <Link
          href="/events"
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-saffron hover:underline"
        >
          <span>Explore Upcoming Events</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {registrations.map((reg) => (
        <div
          key={reg.id}
          className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-canvas-raised/40 p-5 sm:flex-row sm:items-center"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Confirmed Registration</span>
            </div>
            <h4 className="mt-1 font-semibold text-ink capitalize">
              {reg.event_slug.replace(/-/g, " ")}
            </h4>
            <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11.5px] text-ink-muted">
              <span>{reg.college}</span>
              <span>·</span>
              <span>{reg.branch}</span>
              <span>·</span>
              <span className="capitalize">{reg.experience_level}</span>
              {reg.team_name && (
                <>
                  <span>·</span>
                  <span className="text-saffron">Team: {reg.team_name}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-ink-faint border-t border-border pt-3 sm:border-t-0 sm:pt-0">
            <Calendar className="h-3.5 w-3.5" />
            <span>Registered {formatDate(reg.created_at)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
