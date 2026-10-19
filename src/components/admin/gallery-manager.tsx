"use client";

import { useState } from "react";
import {
  ImageIcon,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FolderPlus,
  Calendar,
  Layers,
} from "lucide-react";
import type { GalleryAlbum, GalleryItem } from "@/types/gallery";
import type { BuildFestEvent } from "@/types/event";
import { saveGalleryAlbumsAction } from "@/app/admin/gallery/actions";
import { EventPhotosManager } from "@/components/admin/event-photos-manager";
import { Button } from "@/components/ui/button";

interface GalleryManagerProps {
  initialAlbums: GalleryAlbum[];
  events: BuildFestEvent[];
}

export function GalleryManager({ initialAlbums, events }: GalleryManagerProps) {
  const [albums, setAlbums] = useState<GalleryAlbum[]>(initialAlbums);
  const [selectedAlbumSlug, setSelectedAlbumSlug] = useState<string>(
    initialAlbums[0]?.slug || "",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New Album state
  const [showNewAlbumModal, setShowNewAlbumModal] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumSlug, setNewAlbumSlug] = useState("");
  const [newAlbumEventSlug, setNewAlbumEventSlug] = useState("");
  const [newAlbumDate, setNewAlbumDate] = useState("");

  const selectedAlbum = albums.find((a) => a.slug === selectedAlbumSlug) || albums[0];

  const handlePhotosChange = (updatedPhotos: GalleryItem[]) => {
    if (!selectedAlbum) return;

    setAlbums((prev) =>
      prev.map((album) => {
        if (album.slug === selectedAlbum.slug) {
          return { ...album, items: updatedPhotos };
        }
        return album;
      }),
    );
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);

    try {
      const res = await saveGalleryAlbumsAction(albums);
      if (res?.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to save gallery changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateAlbum = () => {
    if (!newAlbumTitle.trim() || !newAlbumSlug.trim()) {
      alert("Please provide an album title and slug.");
      return;
    }

    const formattedSlug = newAlbumSlug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
    const newAlbum: GalleryAlbum = {
      slug: formattedSlug,
      title: newAlbumTitle.trim(),
      eventSlug: newAlbumEventSlug || undefined,
      date: newAlbumDate.trim() || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      items: [],
    };

    setAlbums([newAlbum, ...albums]);
    setSelectedAlbumSlug(newAlbum.slug);
    setShowNewAlbumModal(false);
    setNewAlbumTitle("");
    setNewAlbumSlug("");
    setNewAlbumEventSlug("");
    setNewAlbumDate("");
  };

  const handleDeleteCurrentAlbum = () => {
    if (!selectedAlbum) return;
    if (confirm(`Are you sure you want to delete the album "${selectedAlbum.title}" and all its photos?`)) {
      const remaining = albums.filter((a) => a.slug !== selectedAlbum.slug);
      setAlbums(remaining);
      setSelectedAlbumSlug(remaining[0]?.slug || "");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Save Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/60">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-saffron" /> Gallery & Photo Manager
          </h1>
          <p className="text-xs font-mono text-ink-muted mt-1">
            Manage event photo albums, upload high-res memories, video clips, and captions across the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowNewAlbumModal(true)}
            className="border border-border/80 text-ink hover:bg-canvas-raised font-mono text-xs gap-1.5"
          >
            <FolderPlus className="h-3.5 w-3.5 text-saffron" />
            <span>New Album</span>
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="bg-saffron text-black hover:bg-saffron/90 font-medium px-4"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
            ) : saveSuccess ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-800 mr-1.5" />
            ) : (
              <Save className="h-4 w-4 mr-1.5" />
            )}
            <span className="font-mono text-xs">
              {saveSuccess ? "Saved!" : isSaving ? "Saving..." : "Save Gallery Changes"}
            </span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-mono text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* New Album Modal */}
      {showNewAlbumModal && (
        <div className="p-6 rounded-2xl border border-saffron/30 bg-canvas-raised space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-saffron flex items-center gap-2">
            <FolderPlus className="h-4 w-4" /> Create New Album
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono text-ink-muted mb-1.5">
                Album Title *
              </label>
              <input
                type="text"
                value={newAlbumTitle}
                onChange={(e) => {
                  setNewAlbumTitle(e.target.value);
                  if (!newAlbumSlug) {
                    setNewAlbumSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }
                }}
                placeholder="e.g. HACKDAYS SRINAGAR 2026"
                className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-ink-muted mb-1.5">
                Slug (URL Identifier) *
              </label>
              <input
                type="text"
                value={newAlbumSlug}
                onChange={(e) => setNewAlbumSlug(e.target.value)}
                placeholder="e.g. hackdays-srinagar-2026"
                className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2 text-sm font-mono text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-ink-muted mb-1.5">
                Link to Event (Optional)
              </label>
              <select
                value={newAlbumEventSlug}
                onChange={(e) => setNewAlbumEventSlug(e.target.value)}
                className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2 text-sm text-ink focus:border-saffron focus:outline-none"
              >
                <option value="">No specific event (Standalone Album)</option>
                {events.map((evt) => (
                  <option key={evt.slug} value={evt.slug}>
                    {evt.name} ({evt.slug})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-ink-muted mb-1.5">
                Display Date
              </label>
              <input
                type="text"
                value={newAlbumDate}
                onChange={(e) => setNewAlbumDate(e.target.value)}
                placeholder="e.g. April 2026"
                className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowNewAlbumModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleCreateAlbum}
              className="bg-saffron text-black hover:bg-saffron/90 font-medium"
            >
              Create Album
            </Button>
          </div>
        </div>
      )}

      {/* Album Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/40 scrollbar-none">
        {albums.map((album) => {
          const isSelected = album.slug === selectedAlbum?.slug;
          return (
            <button
              key={album.slug}
              type="button"
              onClick={() => setSelectedAlbumSlug(album.slug)}
              className={`shrink-0 rounded-xl px-4 py-2 text-xs font-mono transition-all flex items-center gap-2 border ${
                isSelected
                  ? "border-saffron/50 bg-saffron/10 text-saffron font-bold shadow-sm"
                  : "border-border bg-canvas-raised/50 text-ink-muted hover:text-ink hover:bg-canvas-raised"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>{album.title}</span>
              <span className="rounded-full bg-canvas px-1.5 py-0.2 font-mono text-[10px] text-ink-muted">
                {album.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Album Details & Editor */}
      {selectedAlbum ? (
        <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border/60">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-ink sm:text-lg">
                  {selectedAlbum.title}
                </h2>
                {selectedAlbum.eventSlug && (
                  <span className="rounded-full bg-saffron/10 border border-saffron/30 px-2 py-0.5 text-[10.5px] font-mono text-saffron">
                    Event: {selectedAlbum.eventSlug}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-ink-muted mt-0.5">
                Display Date: {selectedAlbum.date} · Slug: <code className="text-ink">{selectedAlbum.slug}</code>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDeleteCurrentAlbum}
                className="text-rose-400 hover:bg-rose-500/10 font-mono text-xs gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete Album
              </Button>
            </div>
          </div>

          {/* Photo Manager Component */}
          <EventPhotosManager
            key={selectedAlbum.slug}
            initialPhotos={selectedAlbum.items}
            onChange={handlePhotosChange}
            albumTitle={selectedAlbum.title}
          />
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl border border-dashed border-border bg-canvas-raised/20 space-y-3">
          <ImageIcon className="h-10 w-10 text-ink-faint mx-auto" />
          <p className="text-xs font-mono text-ink-muted">
            No albums available. Click &quot;New Album&quot; above to create one.
          </p>
        </div>
      )}
    </div>
  );
}
