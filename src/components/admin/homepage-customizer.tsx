"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import {
  Save,
  Loader2,
  CheckCircle2,
  Sparkles,
  Calendar,
  LayoutTemplate,
  BarChart3,
  Megaphone,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveHomepageSettingsAction } from "@/app/admin/homepage/actions";
import type { HomepageSettings } from "@/lib/data/homepage";
import type { BuildFestEvent } from "@/types/event";

interface HomepageCustomizerProps {
  initialSettings: HomepageSettings;
  events: BuildFestEvent[];
}

export function HomepageCustomizer({
  initialSettings,
  events,
}: HomepageCustomizerProps) {
  const [state, formAction, isPending] = useActionState(
    saveHomepageSettingsAction,
    null,
  );
  const [selectedEventSlug, setSelectedEventSlug] = useState<string>(
    initialSettings.featuredEventSlug || "",
  );
  const [announcementEnabled, setAnnouncementEnabled] = useState<boolean>(
    initialSettings.announcement?.enabled || false,
  );

  const selectedEvent = events.find((e) => e.slug === selectedEventSlug);

  return (
    <form action={formAction} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-saffron/10 text-saffron">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-saffron font-semibold">
              Live Customizer
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Homepage & Theme Manager
          </h1>
          <p className="mt-1 text-xs font-mono text-ink-muted">
            Customize which event appears on the homepage, hero copy, live statistics, and site-wide announcements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="ghost" className="border border-border text-xs font-mono">
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Preview Live Site</span>
            </a>
          </Button>

          <Button
            type="submit"
            size="sm"
            disabled={isPending}
            className="bg-saffron text-black hover:bg-saffron/90 font-medium"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span className="ml-1.5 font-mono text-xs">Save Changes</span>
          </Button>
        </div>
      </div>

      {/* Success Notification */}
      {state?.success && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-mono text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Homepage customizations saved and published to live website!</span>
        </div>
      )}

      {/* 1. Featured Event Selector */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-border/40 pb-4">
          <Calendar className="h-4 w-4 text-saffron" />
          <h2 className="text-sm font-semibold uppercase tracking-wider font-mono text-saffron">
            1. Featured Event on Homepage
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Select which event to highlight on the homepage (Hero & Bento Grid) *
            </label>
            <select
              name="featuredEventSlug"
              value={selectedEventSlug}
              onChange={(e) => setSelectedEventSlug(e.target.value)}
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-saffron focus:outline-none"
            >
              <option value="">[Auto] Next Upcoming Event by Date</option>
              {events.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.name} ({e.status === "upcoming" ? "Upcoming" : "Past"})
                </option>
              ))}
            </select>
          </div>

          {/* Event Preview Card */}
          {selectedEvent && (
            <div className="rounded-xl border border-saffron/30 bg-saffron/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-block rounded-md bg-saffron/20 text-saffron px-2 py-0.5 font-mono text-[10px] font-semibold">
                  Currently Selected for Home Display
                </span>
                <h3 className="text-sm font-bold text-ink">{selectedEvent.name}</h3>
                <p className="text-xs text-ink-muted">{selectedEvent.tagline}</p>
                <div className="flex flex-wrap gap-3 font-mono text-[11px] text-ink-faint pt-1">
                  <span>📍 {selectedEvent.venue}</span>
                  <span>🏆 {selectedEvent.prizePool}</span>
                  {selectedEvent.registrationUrl && (
                    <span className="text-emerald-400">🔗 Custom Link: {selectedEvent.registrationUrl}</span>
                  )}
                </div>
              </div>

              {selectedEvent.bannerImage && (
                <div className="relative h-16 w-32 shrink-0 overflow-hidden rounded-lg border border-border/60">
                  <Image
                    src={selectedEvent.bannerImage}
                    alt={selectedEvent.name}
                    fill
                    className="object-cover"
                    unoptimized={selectedEvent.bannerImage.startsWith("data:")}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. Hero Section Settings */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-border/40 pb-4">
          <LayoutTemplate className="h-4 w-4 text-saffron" />
          <h2 className="text-sm font-semibold uppercase tracking-wider font-mono text-saffron">
            2. Hero Banner Content
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Top Pill Badge Text
            </label>
            <input
              type="text"
              name="heroBadge"
              defaultValue={initialSettings.hero.badge}
              placeholder="e.g. Srinagar · Est. student-led · Since 2024"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Headline Highlight Word (Shimmer Glow)
            </label>
            <input
              type="text"
              name="heroTitleHighlight"
              defaultValue={initialSettings.hero.titleHighlight}
              placeholder="e.g. ecosystem"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink focus:border-saffron focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Main Headline Title
            </label>
            <input
              type="text"
              name="heroTitle"
              defaultValue={initialSettings.hero.title}
              placeholder="e.g. Kashmir's developer ecosystem, built in public."
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-saffron focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Hero Subtitle / Description Paragraph
            </label>
            <textarea
              name="heroDescription"
              rows={3}
              defaultValue={initialSettings.hero.description}
              placeholder="Description beneath the main hero headline..."
              className="w-full rounded-xl border border-border bg-canvas p-3 text-sm text-ink focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Secondary Button URL (GitHub)
            </label>
            <input
              type="text"
              name="heroGithubUrl"
              defaultValue={initialSettings.hero.githubUrl}
              placeholder="https://github.com/..."
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Custom Primary Button Text (Optional Override)
            </label>
            <input
              type="text"
              name="heroPrimaryButtonText"
              defaultValue={initialSettings.hero.primaryButtonText || ""}
              placeholder="Leave empty for dynamic: Register for {Event}"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-saffron focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Live Statistics Counter */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-border/40 pb-4">
          <BarChart3 className="h-4 w-4 text-saffron" />
          <h2 className="text-sm font-semibold uppercase tracking-wider font-mono text-saffron">
            3. Live Community Stats Counter
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Builders Count
            </label>
            <input
              type="number"
              name="statBuilders"
              defaultValue={initialSettings.stats.builders}
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Projects Shipped
            </label>
            <input
              type="number"
              name="statProjects"
              defaultValue={initialSettings.stats.projects}
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Campuses / Colleges
            </label>
            <input
              type="number"
              name="statCampuses"
              defaultValue={initialSettings.stats.campuses}
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Prize Pool (Display Text)
            </label>
            <input
              type="text"
              name="statPrizePool"
              defaultValue={initialSettings.stats.prizePool}
              placeholder="₹50K+"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink focus:border-saffron focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Announcement Bar */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-saffron" />
            <h2 className="text-sm font-semibold uppercase tracking-wider font-mono text-saffron">
              4. Top Announcement Alert Banner
            </h2>
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-ink">
            <input
              type="checkbox"
              name="announcementEnabled"
              value="true"
              checked={announcementEnabled}
              onChange={(e) => setAnnouncementEnabled(e.target.checked)}
              className="h-4 w-4 rounded accent-saffron"
            />
            <span>Enable Announcement Banner</span>
          </label>
        </div>

        {announcementEnabled && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block text-xs font-mono text-ink-muted mb-1.5">
                Announcement Message Text
              </label>
              <input
                type="text"
                name="announcementText"
                defaultValue={initialSettings.announcement?.text || ""}
                placeholder="e.g. ⚡ Registrations are now live for Hacktoberfest Srinagar!"
                className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-saffron focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-ink-muted mb-1.5">
                Target Link / URL (Optional)
              </label>
              <input
                type="text"
                name="announcementLink"
                defaultValue={initialSettings.announcement?.link || ""}
                placeholder="e.g. /events or https://..."
                className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink focus:border-saffron focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Bento Grid Section */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-border/40 pb-4">
          <Layers className="h-4 w-4 text-saffron" />
          <h2 className="text-sm font-semibold uppercase tracking-wider font-mono text-saffron">
            5. Bento Grid Ecosystem Section
          </h2>
        </div>

        <div>
          <label className="block text-xs font-mono text-ink-muted mb-1.5">
            Ecosystem Section Title
          </label>
          <input
            type="text"
            name="bentoEcosystemTitle"
            defaultValue={initialSettings.bento?.ecosystemTitle || "Everything happening right now."}
            placeholder="Everything happening right now."
            className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-saffron focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
}
