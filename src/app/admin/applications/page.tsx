import { Inbox, Mail, UserCheck, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function AdminApplicationsPage() {
  const supabase = await createClient();

  const [{ data: teamApplications }, { data: contactMessages }] =
    await Promise.all([
      supabase
        .from("team_applications")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

  return (
    <div className="space-y-10">
      <div className="pb-6 border-b border-border/60">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Applications & Inquiries
        </h1>
        <p className="mt-1 text-xs font-mono text-ink-muted">
          Review core team/volunteer applications and community messages submitted via contact forms.
        </p>
      </div>

      {/* Team Applications Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-saffron" />
          <h2 className="text-lg font-semibold text-ink">Core Team Applications</h2>
          <span className="rounded-full bg-saffron/10 px-2.5 py-0.5 text-xs font-mono text-saffron">
            {teamApplications?.length || 0}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {teamApplications && teamApplications.length > 0 ? (
            teamApplications.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl border border-border bg-canvas-raised/40 p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-mono text-emerald-400">
                      {app.role}
                    </span>
                    <h3 className="mt-1.5 text-sm font-semibold text-ink">{app.full_name}</h3>
                    <a
                      href={`mailto:${app.email}`}
                      className="text-xs font-mono text-saffron hover:underline"
                    >
                      {app.email}
                    </a>
                  </div>
                  <span className="text-[10px] font-mono text-ink-faint">
                    {new Date(app.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <p className="text-xs text-ink-muted bg-canvas-subtle p-3 rounded-xl border border-border/40 whitespace-pre-wrap">
                  {app.message}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-border py-12 text-center">
              <Inbox className="h-8 w-8 text-ink-faint mx-auto mb-2" />
              <p className="text-xs font-mono text-ink-muted">No team applications received yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Messages Section */}
      <div className="space-y-4 pt-6 border-t border-border/60">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-sky-400" />
          <h2 className="text-lg font-semibold text-ink">Contact Inquiries</h2>
          <span className="rounded-full bg-sky-400/10 px-2.5 py-0.5 text-xs font-mono text-sky-400">
            {contactMessages?.length || 0}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {contactMessages && contactMessages.length > 0 ? (
            contactMessages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-2xl border border-border bg-canvas-raised/40 p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-md bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[11px] font-mono text-sky-400">
                      {msg.subject}
                    </span>
                    <h3 className="mt-1.5 text-sm font-semibold text-ink">{msg.full_name}</h3>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs font-mono text-saffron hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                  <span className="text-[10px] font-mono text-ink-faint">
                    {new Date(msg.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <p className="text-xs text-ink-muted bg-canvas-subtle p-3 rounded-xl border border-border/40 whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-border py-12 text-center">
              <Mail className="h-8 w-8 text-ink-faint mx-auto mb-2" />
              <p className="text-xs font-mono text-ink-muted">No contact messages received yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
