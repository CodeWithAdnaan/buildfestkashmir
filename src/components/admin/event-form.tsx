"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Trash2,
  Loader2,
  AlertCircle,
  Plus,
  Trophy,
  Calendar,
  Users,
  Award,
  Handshake,
  BarChart3,
  Sparkles,
  ImageIcon,
} from "lucide-react";
import type {
  BuildFestEvent,
  ScheduleItem,
  Prize,
  Speaker,
  Mentor,
  Sponsor,
} from "@/types/event";
import type { GalleryItem } from "@/types/gallery";
import { saveEventAction, deleteEventAction } from "@/app/admin/events/actions";
import { Button } from "@/components/ui/button";
import { EventBannerPicker } from "@/components/admin/event-banner-picker";
import { DateTimePicker } from "@/components/admin/date-time-picker";
import { EventPhotosManager } from "@/components/admin/event-photos-manager";

interface EventFormProps {
  initialEvent?: BuildFestEvent;
}

export function EventForm({ initialEvent }: EventFormProps) {
  const isEditing = Boolean(initialEvent);
  const [state, formAction, isPending] = useActionState(saveEventAction, null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Dynamic state for sub-entities
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => initialEvent?.schedule || []);
  const [prizes, setPrizes] = useState<Prize[]>(() => initialEvent?.prizes || []);
  const [speakers, setSpeakers] = useState<Speaker[]>(() => initialEvent?.speakers || []);
  const [mentors, setMentors] = useState<Mentor[]>(() => initialEvent?.mentors || []);
  const [sponsors, setSponsors] = useState<Sponsor[]>(() => initialEvent?.sponsors || []);
  const [photos, setPhotos] = useState<GalleryItem[]>(() => initialEvent?.photos || []);
  const [isTentative, setIsTentative] = useState(() => initialEvent?.isTentative ?? false);

  const router = useRouter();
  const handleDelete = async () => {
    if (!initialEvent) return;
    if (confirm(`Are you sure you want to delete "${initialEvent.name}"? This action cannot be undone.`)) {
      setIsDeleting(true);
      const res = await deleteEventAction(initialEvent.slug);
      if (res?.error) {
        alert("Failed to delete event: " + res.error);
        setIsDeleting(false);
      } else {
        router.push("/admin/events");
        router.refresh();
      }
    }
  };

  // Schedule Helpers
  const addScheduleItem = () => {
    setSchedule((prev) => [
      ...prev,
      { time: "10:00 AM", title: "New Session / Milestone", description: "" },
    ]);
  };
  const updateScheduleItem = (index: number, field: keyof ScheduleItem, val: string) => {
    setSchedule((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };
  const removeScheduleItem = (index: number) => {
    setSchedule((prev) => prev.filter((_, i) => i !== index));
  };

  // Prize Helpers
  const addPrize = () => {
    const places = ["1st Place", "2nd Place", "3rd Place", "Best Track Hack", "Special Category"];
    const place = places[prizes.length] || `Prize ${prizes.length + 1}`;
    setPrizes((prev) => [...prev, { place, amount: "₹25,000", note: "" }]);
  };
  const updatePrize = (index: number, field: keyof Prize, val: string) => {
    setPrizes((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };
  const removePrize = (index: number) => {
    setPrizes((prev) => prev.filter((_, i) => i !== index));
  };

  // Speaker Helpers
  const addSpeaker = () => {
    setSpeakers((prev) => [
      ...prev,
      { name: "", role: "Speaker / Keynote", org: "Organization", image: "" },
    ]);
  };
  const updateSpeaker = (index: number, field: keyof Speaker, val: string) => {
    setSpeakers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };
  const removeSpeaker = (index: number) => {
    setSpeakers((prev) => prev.filter((_, i) => i !== index));
  };

  // Mentor Helpers
  const addMentor = () => {
    setMentors((prev) => [
      ...prev,
      { name: "", expertise: "Full-Stack / AI / Cloud", image: "" },
    ]);
  };
  const updateMentor = (index: number, field: keyof Mentor, val: string) => {
    setMentors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };
  const removeMentor = (index: number) => {
    setMentors((prev) => prev.filter((_, i) => i !== index));
  };

  // Sponsor Helpers
  const addSponsor = () => {
    setSponsors((prev) => [...prev, { name: "", tier: "Community" }]);
  };
  const updateSponsor = (index: number, field: keyof Sponsor, val: any) => {
    setSponsors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };
  const removeSponsor = (index: number) => {
    setSponsors((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form action={formAction} className="space-y-8 pb-20">
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
                ? "Update every single detail: metadata, schedule, prizes, speakers, mentors & sponsors."
                : "Fill in the details below to publish a new event with full customization."}
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
              <span className="ml-1.5 font-mono text-xs">Delete Event</span>
            </Button>
          )}

          <Button
            type="submit"
            size="sm"
            disabled={isPending}
            className="bg-saffron text-black hover:bg-saffron/90 font-medium px-4"
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

      {/* Hidden Serialized Fields */}
      <input type="hidden" name="schedule" value={JSON.stringify(schedule)} />
      <input type="hidden" name="prizes" value={JSON.stringify(prizes)} />
      <input type="hidden" name="speakers" value={JSON.stringify(speakers)} />
      <input type="hidden" name="mentors" value={JSON.stringify(mentors)} />
      <input type="hidden" name="sponsors" value={JSON.stringify(sponsors)} />
      <input type="hidden" name="photos" value={JSON.stringify(photos)} />
      <input type="hidden" name="isTentative" value={isTentative ? "true" : "false"} />

      {/* 1. Basic Details Section */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> 1. Basic Details
          </h2>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-ink-muted bg-canvas px-3 py-1.5 rounded-xl border border-border">
            <input
              type="checkbox"
              checked={isTentative}
              onChange={(e) => setIsTentative(e.target.checked)}
              className="accent-saffron h-3.5 w-3.5 rounded"
            />
            <span>Mark as Tentative / Coming Soon</span>
          </label>
        </div>

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

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Custom Registration Link / URL (Optional)
            </label>
            <input
              type="text"
              name="registrationUrl"
              defaultValue={initialEvent?.registrationUrl || ""}
              placeholder="e.g. https://mlh.io/... or https://devpost.com/... (Empty chhodne par website ka internal form use hoga)"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Venue & Date Times */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron flex items-center gap-2">
          <Calendar className="h-4 w-4" /> 2. Venue & Dates
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
              Venue Display Override (Optional)
            </label>
            <input
              type="text"
              name="venueLabel"
              defaultValue={initialEvent?.venueLabel || ""}
              placeholder="e.g. TBA or Main Auditorium"
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
              Date Display Override (Optional)
            </label>
            <input
              type="text"
              name="dateLabel"
              defaultValue={initialEvent?.dateLabel || ""}
              placeholder="e.g. September 2026 or Spring 2026"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <DateTimePicker
            name="startDate"
            label="Start Date & Time"
            defaultValue={initialEvent?.startDate}
            required
          />

          <DateTimePicker
            name="endDate"
            label="End Date & Time"
            defaultValue={initialEvent?.endDate}
            required
          />
        </div>
      </div>

      {/* 3. Prize, Team Size & Banner */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron flex items-center gap-2">
          <Trophy className="h-4 w-4" /> 3. Hackathon Configuration & Banner
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Total Prize Pool Headline
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
            <EventBannerPicker initialValue={initialEvent?.bannerImage || ""} />
          </div>
        </div>
      </div>

      {/* 4. Descriptions */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron">
          4. Content & Descriptions
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Short Description (Card summary)
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
              Detailed Overview (Event story & expectations)
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

      {/* 5. Prizes List Editor */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron flex items-center gap-2">
              <Award className="h-4 w-4" /> 5. Prizes Breakdown ({prizes.length})
            </h2>
            <p className="text-xs font-mono text-ink-muted mt-1">
              Add individual prize tiers (1st Place, 2nd Place, Track Winners, etc.).
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addPrize}
            className="border border-border/80 text-ink hover:bg-canvas-raised text-xs font-mono gap-1"
          >
            <Plus className="h-3.5 w-3.5 text-saffron" /> Add Prize
          </Button>
        </div>

        {prizes.length === 0 ? (
          <p className="text-xs font-mono text-ink-faint py-3 text-center border border-dashed border-border/60 rounded-xl">
            No prizes defined yet. Click &quot;Add Prize&quot; to configure prize cards.
          </p>
        ) : (
          <div className="space-y-3">
            {prizes.map((p, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-xl border border-border/60 bg-canvas/80 items-center"
              >
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-mono text-ink-muted mb-1">Place / Title</label>
                  <input
                    type="text"
                    value={p.place}
                    onChange={(e) => updatePrize(index, "place", e.target.value)}
                    placeholder="e.g. 1st Place"
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-mono text-ink-muted mb-1">Amount</label>
                  <input
                    type="text"
                    value={p.amount}
                    onChange={(e) => updatePrize(index, "amount", e.target.value)}
                    placeholder="e.g. ₹25,000"
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink font-semibold focus:border-saffron focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-mono text-ink-muted mb-1">Note (Optional)</label>
                  <input
                    type="text"
                    value={p.note || ""}
                    onChange={(e) => updatePrize(index, "note", e.target.value)}
                    placeholder="e.g. + Cloud Credits & Swag"
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-1 flex justify-end pt-3 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => removePrize(index)}
                    className="p-1.5 text-ink-muted hover:text-rose-400 rounded-lg transition-colors"
                    title="Remove prize"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Schedule / Run of Show Editor */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron flex items-center gap-2">
              <Calendar className="h-4 w-4" /> 6. Schedule / Run of Show ({schedule.length})
            </h2>
            <p className="text-xs font-mono text-ink-muted mt-1">
              Add timeline agenda items (Keynotes, Hacking Start, Mentorship, Demos).
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addScheduleItem}
            className="border border-border/80 text-ink hover:bg-canvas-raised text-xs font-mono gap-1"
          >
            <Plus className="h-3.5 w-3.5 text-saffron" /> Add Session
          </Button>
        </div>

        {schedule.length === 0 ? (
          <p className="text-xs font-mono text-ink-faint py-3 text-center border border-dashed border-border/60 rounded-xl">
            No schedule items configured. Click &quot;Add Session&quot; to build the run of show.
          </p>
        ) : (
          <div className="space-y-3">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-xl border border-border/60 bg-canvas/80 items-center"
              >
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-mono text-ink-muted mb-1">Time</label>
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => updateScheduleItem(index, "time", e.target.value)}
                    placeholder="e.g. 09:30 AM"
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs font-mono text-saffron focus:border-saffron focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-mono text-ink-muted mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateScheduleItem(index, "title", e.target.value)}
                    placeholder="e.g. Opening Keynote"
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-mono text-ink-muted mb-1">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateScheduleItem(index, "description", e.target.value)}
                    placeholder="e.g. Welcome builders & prompt release"
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-1 flex justify-end pt-3 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => removeScheduleItem(index)}
                    className="p-1.5 text-ink-muted hover:text-rose-400 rounded-lg transition-colors"
                    title="Remove session"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 7. Speakers & Mentors */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        {/* Speakers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron flex items-center gap-2">
                <Users className="h-4 w-4" /> 7A. Speakers ({speakers.length})
              </h2>
              <p className="text-xs font-mono text-ink-muted mt-1">
                People presenting or conducting workshops.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addSpeaker}
              className="border border-border/80 text-ink hover:bg-canvas-raised text-xs font-mono gap-1"
            >
              <Plus className="h-3.5 w-3.5 text-saffron" /> Add Speaker
            </Button>
          </div>

          {speakers.length === 0 ? (
            <p className="text-xs font-mono text-ink-faint py-3 text-center border border-dashed border-border/60 rounded-xl">
              No speakers added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {speakers.map((s, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-xl border border-border/60 bg-canvas/80 items-center"
                >
                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-mono text-ink-muted mb-1">Speaker Name</label>
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) => updateSpeaker(index, "name", e.target.value)}
                      placeholder="e.g. Sarah Khan"
                      className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-mono text-ink-muted mb-1">Role</label>
                    <input
                      type="text"
                      value={s.role}
                      onChange={(e) => updateSpeaker(index, "role", e.target.value)}
                      placeholder="e.g. Lead AI Engineer"
                      className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-mono text-ink-muted mb-1">Organization</label>
                    <input
                      type="text"
                      value={s.org}
                      onChange={(e) => updateSpeaker(index, "org", e.target.value)}
                      placeholder="e.g. Google / Microsoft"
                      className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-mono text-ink-muted mb-1">Avatar / Image URL</label>
                    <input
                      type="text"
                      value={s.image || ""}
                      onChange={(e) => updateSpeaker(index, "image", e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs font-mono text-ink focus:border-saffron focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-end pt-3 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => removeSpeaker(index)}
                      className="p-1.5 text-ink-muted hover:text-rose-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mentors */}
        <div className="space-y-4 pt-6 border-t border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron flex items-center gap-2">
                <Users className="h-4 w-4" /> 7B. Mentors ({mentors.length})
              </h2>
              <p className="text-xs font-mono text-ink-muted mt-1">
                Mentors available during the hackathon to guide builders.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addMentor}
              className="border border-border/80 text-ink hover:bg-canvas-raised text-xs font-mono gap-1"
            >
              <Plus className="h-3.5 w-3.5 text-saffron" /> Add Mentor
            </Button>
          </div>

          {mentors.length === 0 ? (
            <p className="text-xs font-mono text-ink-faint py-3 text-center border border-dashed border-border/60 rounded-xl">
              No mentors added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {mentors.map((m, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-xl border border-border/60 bg-canvas/80 items-center"
                >
                  <div className="sm:col-span-4">
                    <label className="block text-[10px] font-mono text-ink-muted mb-1">Mentor Name</label>
                    <input
                      type="text"
                      value={m.name}
                      onChange={(e) => updateMentor(index, "name", e.target.value)}
                      placeholder="e.g. Tariq Ahmad"
                      className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label className="block text-[10px] font-mono text-ink-muted mb-1">Expertise</label>
                    <input
                      type="text"
                      value={m.expertise}
                      onChange={(e) => updateMentor(index, "expertise", e.target.value)}
                      placeholder="e.g. Distributed Systems & Rust"
                      className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-mono text-ink-muted mb-1">Avatar / Image URL</label>
                    <input
                      type="text"
                      value={m.image || ""}
                      onChange={(e) => updateMentor(index, "image", e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs font-mono text-ink focus:border-saffron focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-end pt-3 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => removeMentor(index)}
                      className="p-1.5 text-ink-muted hover:text-rose-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 8. Sponsors Editor */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron flex items-center gap-2">
              <Handshake className="h-4 w-4" /> 8. Sponsors & Partners ({sponsors.length})
            </h2>
            <p className="text-xs font-mono text-ink-muted mt-1">
              Add brands and community partners supporting this event.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addSponsor}
            className="border border-border/80 text-ink hover:bg-canvas-raised text-xs font-mono gap-1"
          >
            <Plus className="h-3.5 w-3.5 text-saffron" /> Add Sponsor
          </Button>
        </div>

        {sponsors.length === 0 ? (
          <p className="text-xs font-mono text-ink-faint py-3 text-center border border-dashed border-border/60 rounded-xl">
            No sponsors configured yet. Click &quot;Add Sponsor&quot; to highlight partners.
          </p>
        ) : (
          <div className="space-y-3">
            {sponsors.map((s, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-xl border border-border/60 bg-canvas/80 items-center"
              >
                <div className="sm:col-span-6">
                  <label className="block text-[10px] font-mono text-ink-muted mb-1">Partner / Sponsor Name</label>
                  <input
                    type="text"
                    value={s.name}
                    onChange={(e) => updateSponsor(index, "name", e.target.value)}
                    placeholder="e.g. GitHub / Supabase / Vercel"
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-5">
                  <label className="block text-[10px] font-mono text-ink-muted mb-1">Tier</label>
                  <select
                    value={s.tier}
                    onChange={(e) => updateSponsor(index, "tier", e.target.value as any)}
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
                  >
                    <option value="Title">Title Sponsor</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Community">Community Partner</option>
                  </select>
                </div>
                <div className="sm:col-span-1 flex justify-end pt-3 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => removeSponsor(index)}
                    className="p-1.5 text-ink-muted hover:text-rose-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 9. Metrics & Past Event Stats */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron flex items-center gap-2">
          <BarChart3 className="h-4 w-4" /> 9. Metrics & Past Event Stats
        </h2>
        <p className="text-xs font-mono text-ink-muted -mt-2">
          Displayed on past event badges or highlight cards.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Builders Checked-In / Attendees
            </label>
            <input
              type="number"
              name="attendees"
              defaultValue={initialEvent?.attendees ?? ""}
              placeholder="e.g. 150"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Projects Shipped
            </label>
            <input
              type="number"
              name="projectsShipped"
              defaultValue={initialEvent?.projectsShipped ?? ""}
              placeholder="e.g. 35"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Gallery Tiles Count
            </label>
            <input
              type="number"
              name="galleryTiles"
              defaultValue={initialEvent?.galleryTiles ?? 0}
              placeholder="e.g. 4"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 10. Event Photos & Gallery Section */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-ink uppercase tracking-wider font-mono text-saffron flex items-center gap-2">
            <ImageIcon className="h-4 w-4" /> 10. Event Photos & Gallery ({photos.length})
          </h2>
          <p className="text-xs font-mono text-ink-muted mt-1">
            Upload and manage photos & video clips for this hackathon. These appear on the event page and the main website gallery.
          </p>
        </div>

        <EventPhotosManager
          initialPhotos={photos}
          onChange={setPhotos}
          albumTitle={initialEvent?.name || "Event"}
        />
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-6 z-30 flex items-center justify-between rounded-2xl border border-border/80 bg-canvas/90 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/events">Cancel</Link>
          </Button>
          {isEditing && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting || isPending}
              className="text-rose-400 hover:bg-rose-500/10"
            >
              {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              <span className="ml-1.5 font-mono text-xs">Delete</span>
            </Button>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="bg-saffron text-black hover:bg-saffron/90 font-medium px-6"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span className="ml-2 font-mono text-xs">Save Event Changes</span>
        </Button>
      </div>
    </form>
  );
}
