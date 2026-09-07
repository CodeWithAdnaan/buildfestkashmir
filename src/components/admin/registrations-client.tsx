"use client";

import { useState, useMemo } from "react";
import {
  Download,
  Search,
  Users,
  Filter,
  ExternalLink,
} from "lucide-react";
import type { Database } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";

type Registration = Database["public"]["Tables"]["registrations"]["Row"];

interface RegistrationsClientProps {
  initialRegistrations: Registration[];
  eventsList: { slug: string; name: string }[];
}

export function RegistrationsClient({
  initialRegistrations,
  eventsList,
}: RegistrationsClientProps) {
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter registrations
  const filtered = useMemo(() => {
    return initialRegistrations.filter((item) => {
      const matchesEvent =
        selectedEvent === "all" || item.event_slug === selectedEvent;
      const matchesLevel =
        selectedLevel === "all" || item.experience_level === selectedLevel;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.full_name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.college.toLowerCase().includes(q) ||
        item.branch.toLowerCase().includes(q) ||
        (item.team_name && item.team_name.toLowerCase().includes(q));

      return matchesEvent && matchesLevel && matchesQuery;
    });
  }, [initialRegistrations, selectedEvent, selectedLevel, searchQuery]);

  // Export CSV
  const handleExportCSV = () => {
    if (filtered.length === 0) return;

    const headers = [
      "Event Slug",
      "Full Name",
      "Email",
      "College",
      "Branch",
      "Experience Level",
      "Team Name",
      "GitHub",
      "LinkedIn",
      "Discord",
      "Registered At",
    ];

    const rows = filtered.map((r) => [
      `"${r.event_slug}"`,
      `"${r.full_name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.college.replace(/"/g, '""')}"`,
      `"${r.branch.replace(/"/g, '""')}"`,
      `"${r.experience_level}"`,
      `"${(r.team_name || "").replace(/"/g, '""')}"`,
      `"${r.github_url || ""}"`,
      `"${r.linkedin_url || ""}"`,
      `"${r.discord_handle || ""}"`,
      `"${new Date(r.created_at).toLocaleString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    const filename = `buildfest-registrations-${selectedEvent}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {/* Search input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search attendee, college, team..."
              className="w-full rounded-xl border border-border bg-canvas-raised/50 pl-9 pr-3.5 py-2 text-xs text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          {/* Event Filter */}
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="rounded-xl border border-border bg-canvas-raised/50 px-3 py-2 text-xs font-mono text-ink focus:border-saffron focus:outline-none"
          >
            <option value="all">All Events ({initialRegistrations.length})</option>
            {eventsList.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.name}
              </option>
            ))}
          </select>

          {/* Experience level */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="rounded-xl border border-border bg-canvas-raised/50 px-3 py-2 text-xs font-mono text-ink focus:border-saffron focus:outline-none"
          >
            <option value="all">All Experience Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Export Button */}
        <Button
          onClick={handleExportCSV}
          disabled={filtered.length === 0}
          size="sm"
          className="bg-saffron text-black hover:bg-saffron/90 font-mono text-xs shrink-0"
        >
          <Download className="h-3.5 w-3.5 mr-1.5" />
          <span>Export CSV ({filtered.length})</span>
        </Button>
      </div>

      {/* Registrations Data Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-canvas-raised/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-canvas-subtle/80 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              <tr>
                <th className="px-4 py-3.5">Participant</th>
                <th className="px-4 py-3.5">Event</th>
                <th className="px-4 py-3.5">College & Branch</th>
                <th className="px-4 py-3.5">Level</th>
                <th className="px-4 py-3.5">Team</th>
                <th className="px-4 py-3.5">Links</th>
                <th className="px-4 py-3.5">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-canvas-raised/50">
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-ink text-sm">{item.full_name}</p>
                      <p className="font-mono text-[11px] text-ink-muted">{item.email}</p>
                    </td>

                    <td className="px-4 py-3.5 font-mono">
                      <span className="rounded-md bg-saffron/10 px-2 py-0.5 text-[10px] text-saffron">
                        {item.event_slug}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <p className="text-ink truncate max-w-[180px]">{item.college}</p>
                      <p className="text-[11px] font-mono text-ink-muted">{item.branch}</p>
                    </td>

                    <td className="px-4 py-3.5 font-mono">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] capitalize ${
                          item.experience_level === "advanced"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : item.experience_level === "intermediate"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {item.experience_level}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 font-mono">
                      {item.team_name ? (
                        <span className="font-medium text-ink bg-white/5 px-2 py-0.5 rounded-md border border-border">
                          {item.team_name}
                        </span>
                      ) : (
                        <span className="text-ink-faint">Solo</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 text-ink-muted">
                        {item.github_url && (
                          <a
                            href={item.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-ink-muted hover:text-ink hover:bg-white/10 transition-colors"
                            title="GitHub"
                          >
                            <span>GH</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        )}
                        {item.linkedin_url && (
                          <a
                            href={item.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-ink-muted hover:text-ink hover:bg-white/10 transition-colors"
                            title="LinkedIn"
                          >
                            <span>LI</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-mono text-[11px] text-ink-faint whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <Users className="h-8 w-8 text-ink-faint mx-auto mb-2" />
                    <p className="font-mono text-xs text-ink-muted">No attendees match your filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
