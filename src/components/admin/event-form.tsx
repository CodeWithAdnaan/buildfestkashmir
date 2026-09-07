"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Loader2, AlertCircle } from "lucide-react";
import type { BuildFestEvent } from "@/types/event";
import { saveEventAction, deleteEventAction } from "@/app/admin/events/actions";
import { Button } from "@/components/ui/button";

interface EventFormProps {
  initialEvent?: BuildFestEvent;
}

export function EventForm({ initialEvent }: EventFormProps) {
  const isEditing = Boolean(initialEvent);
  const [state, formAction, isPending] = useActionState(saveEventAction, null);
  const [isDeleting, setIsDeleting] = useState(false);

  const defaultStartDate = initialEvent?.startDate
    ? new Date(initialEvent.startDate).toISOString().slice(0, 16)
    : new Date().toISOString().slice(0, 16);

  const defaultEndDate = initialEvent?.endDate
    ? new Date(initialEvent.endDate).toISOString().slice(0, 16)
    : new Date(Date.now() + 86400000).toISOString().slice(0, 16);

  const handleDelete = async () => {
    if (!initialEvent) return;
    if (confirm(`Are you sure you want to delete "${initialEvent.name}"? This action cannot be undone.`)) {
      setIsDeleting(true);
      await deleteEventAction(initialEvent.slug);
    }
  };

  return (
    <form action={formAction} className="space-y-8">
      {/* Header with Back Button and Action Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/60">
        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="ghost" className="h-9 w-9 p-0 rounded-xl">
            <Link href="/admin/events">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
              {isEditing ? `Edit: ${initialEvent?.name}` : "Create New Event"}
            </h1>
            <p className="text-xs font-mono text-ink-muted">
              {isEditing
                ? "Update event metadata, timeline, and registration availability."
                : "Fill in the details below to publish a new event to the website."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting || isPending}
              className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
            >
              {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              <span className="ml-1.5 font-mono text-xs">Delete</span>
            </Button>
          )}

          <Button
            type="submit"
            size="sm"
            disabled={isPending}
            className="bg-saffron text-black hover:bg-saffron/90 font-medium"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="ml-1.5 font-mono text-xs">Save Event</span>
          </Button>
        </div>
      </div>

      {state?.error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-mono text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {isEditing && (
        <input type="hidden" name="originalSlug" value={initialEvent?.slug} />
      )}

      {/* Basic Details Section */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron">
          1. Basic Details
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Event Name *
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={initialEvent?.name || ""}
              placeholder="e.g. HACKDAYS SRINAGAR 2026"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Slug (URL Identifier) *
            </label>
            <input
              type="text"
              name="slug"
              required
              defaultValue={initialEvent?.slug || ""}
              placeholder="e.g. hackdays-srinagar-2026"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Tagline *
            </label>
            <input
              type="text"
              name="tagline"
              required
              defaultValue={initialEvent?.tagline || ""}
              placeholder="e.g. One day. One campus. Zero excuses."
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Status *
            </label>
            <select
              name="status"
              defaultValue={initialEvent?.status || "upcoming"}
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-saffron focus:outline-none"
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Registration Status *
            </label>
            <select
              name="registrationOpen"
              defaultValue={initialEvent?.registrationOpen ? "true" : "false"}
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink focus:border-saffron focus:outline-none"
            >
              <option value="true">Open (Accepting Registrations)</option>
              <option value="false">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Venue & Schedule Dates */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron">
          2. Venue & Date Times
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Venue Name & Location *
            </label>
            <input
              type="text"
              name="venue"
              required
              defaultValue={initialEvent?.venue || ""}
              placeholder="e.g. CASET College, Srinagar"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              City
            </label>
            <input
              type="text"
              name="city"
              defaultValue={initialEvent?.city || "Srinagar"}
              placeholder="Srinagar"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Start Date & Time *
            </label>
            <input
              type="datetime-local"
              name="startDate"
              required
              defaultValue={defaultStartDate}
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              End Date & Time *
            </label>
            <input
              type="datetime-local"
              name="endDate"
              required
              defaultValue={defaultEndDate}
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink focus:border-saffron focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Prize, Team Size & Themes */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron">
          3. Hackathon Configuration
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Prize Pool
            </label>
            <input
              type="text"
              name="prizePool"
              defaultValue={initialEvent?.prizePool || ""}
              placeholder="e.g. ₹50,000 + Cloud Grants"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Team Size
            </label>
            <input
              type="text"
              name="teamSize"
              defaultValue={initialEvent?.teamSize || "2–4 builders"}
              placeholder="e.g. 2–4 builders or Solo"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Themes / Tracks (comma-separated)
            </label>
            <input
              type="text"
              name="themes"
              defaultValue={initialEvent?.themes?.join(", ") || ""}
              placeholder="AI & Agents, Civic Tech, Developer Tools, Open Track"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Banner Image URL
            </label>
            <input
              type="text"
              name="bannerImage"
              defaultValue={initialEvent?.bannerImage || ""}
              placeholder="/events/promptwars-hackdays-v2-banner.png or https://..."
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Descriptions */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron">
          4. Content & Descriptions
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Short Description
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={initialEvent?.description || ""}
              placeholder="Brief summary displayed on cards..."
              className="w-full rounded-xl border border-border bg-canvas p-3 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Detailed Overview
            </label>
            <textarea
              name="overview"
              rows={5}
              defaultValue={initialEvent?.overview || ""}
              placeholder="Full event story, expectations, rules..."
              className="w-full rounded-xl border border-border bg-canvas p-3 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
