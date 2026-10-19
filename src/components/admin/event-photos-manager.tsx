"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Plus,
  Trash2,
  Video,
  ImageIcon,
  Loader2,
  AlertCircle,
  ExternalLink,
  Check,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { GalleryItem } from "@/types/gallery";
import { getRandomGradient } from "@/lib/constants/gallery";
import { Button } from "@/components/ui/button";

interface EventPhotosManagerProps {
  initialPhotos?: GalleryItem[];
  onChange?: (photos: GalleryItem[]) => void;
  albumTitle?: string;
}

export function EventPhotosManager({
  initialPhotos = [],
  onChange,
  albumTitle = "Event",
}: EventPhotosManagerProps) {
  const [photos, setPhotos] = useState<GalleryItem[]>(initialPhotos);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [captionInput, setCaptionInput] = useState("");
  const [spanInput, setSpanInput] = useState<"sm" | "md" | "lg">("md");
  const [isVideoInput, setIsVideoInput] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updatePhotos = (newPhotos: GalleryItem[]) => {
    setPhotos(newPhotos);
    onChange?.(newPhotos);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    const uploadedItems: GalleryItem[] = [];

    try {
      const supabase = createClient();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");

        if (!isVideo && !isImage) continue;

        const fileExt = file.name.split(".").pop();
        const sanitizedName = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[^a-zA-Z0-9_-]/g, "_");
        const filePath = `gallery/${Date.now()}-${sanitizedName}.${fileExt}`;

        let fileUrl: string | null = null;

        // Try Supabase Storage upload
        const { error: uploadErr } = await supabase.storage
          .from("event-attachments")
          .upload(filePath, file, { cacheControl: "3600", upsert: true });

        if (!uploadErr) {
          const { data: urlData } = supabase.storage
            .from("event-attachments")
            .getPublicUrl(filePath);
          fileUrl = urlData.publicUrl;
        } else {
          // If storage bucket fails or offline, use base64 for images under 5MB
          if (isImage && file.size <= 5 * 1024 * 1024) {
            fileUrl = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            });
          } else {
            console.warn("Storage upload failed, fallback skipped:", uploadErr.message);
          }
        }

        if (fileUrl) {
          uploadedItems.push({
            id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            caption: sanitizedName.replace(/_/g, " "),
            gradient: getRandomGradient(),
            src: fileUrl,
            span: isVideo ? "lg" : i % 3 === 0 ? "lg" : i % 2 === 0 ? "md" : "sm",
            isVideo,
          });
        }
      }

      if (uploadedItems.length > 0) {
        updatePhotos([...uploadedItems, ...photos]);
      } else {
        setUploadError("Could not upload files. Please check file format or use URL input.");
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload photo.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;

    const newItem: GalleryItem = {
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      caption: captionInput.trim() || `${albumTitle} Photo`,
      gradient: getRandomGradient(),
      src: urlInput.trim(),
      span: spanInput,
      isVideo: isVideoInput,
    };

    updatePhotos([newItem, ...photos]);
    setUrlInput("");
    setCaptionInput("");
    setIsVideoInput(false);
    setShowAddForm(false);
  };

  const handleUpdateItem = (id: string, updates: Partial<GalleryItem>) => {
    const updated = photos.map((item) => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    });
    updatePhotos(updated);
  };

  const handleDeleteItem = (id: string) => {
    const updated = photos.filter((item) => item.id !== id);
    updatePhotos(updated);
  };

  return (
    <div className="space-y-5">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div>
          <span className="text-xs font-mono text-ink-muted">
            Total Photos: <strong className="text-saffron">{photos.length}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            accept="image/*,video/*"
            className="hidden"
          />

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="border border-border/80 text-ink hover:bg-canvas-raised text-xs font-mono gap-1.5"
          >
            {isUploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5 text-saffron" />
            )}
            <span>Upload File(s)</span>
          </Button>

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowAddForm(!showAddForm)}
            className="border border-border/80 text-ink hover:bg-canvas-raised text-xs font-mono gap-1.5"
          >
            <Plus className="h-3.5 w-3.5 text-saffron" />
            <span>Add by URL</span>
          </Button>
        </div>
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-mono text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Add by URL Popout Form */}
      {showAddForm && (
        <div className="p-4 rounded-xl border border-saffron/30 bg-canvas-raised/80 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-saffron font-semibold">
            Add Photo or Video by URL
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6">
              <label className="block text-[10px] font-mono text-ink-muted mb-1">
                Image / Video URL *
              </label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://... (JPG, PNG, WebP or MP4)"
                className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-[10px] font-mono text-ink-muted mb-1">
                Caption
              </label>
              <input
                type="text"
                value={captionInput}
                onChange={(e) => setCaptionInput(e.target.value)}
                placeholder="e.g. Final Demos"
                className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-[10px] font-mono text-ink-muted mb-1">
                Tile Size
              </label>
              <select
                value={spanInput}
                onChange={(e) => setSpanInput(e.target.value as any)}
                className="w-full rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs text-ink focus:border-saffron focus:outline-none"
              >
                <option value="sm">Small (Compact)</option>
                <option value="md">Medium</option>
                <option value="lg">Large (Featured)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-ink-muted">
              <input
                type="checkbox"
                checked={isVideoInput}
                onChange={(e) => setIsVideoInput(e.target.checked)}
                className="accent-saffron h-3.5 w-3.5 rounded"
              />
              <span>Is Video Clip (.mp4)</span>
            </label>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setShowAddForm(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleAddUrl}
                disabled={!urlInput.trim()}
                className="bg-saffron text-black hover:bg-saffron/90 text-xs font-medium"
              >
                <Check className="h-3.5 w-3.5 mr-1" /> Add to Gallery
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Photos Grid */}
      {photos.length === 0 ? (
        <div className="py-12 text-center rounded-2xl border border-dashed border-border/80 bg-canvas/40 space-y-3">
          <ImageIcon className="h-10 w-10 text-ink-faint mx-auto" />
          <p className="text-xs font-mono text-ink-muted">
            No photos added yet. Upload real hackathon photos or paste links above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((item, index) => (
            <div
              key={item.id}
              className="group relative rounded-xl border border-border/70 bg-canvas/80 overflow-hidden flex flex-col shadow-sm transition-all hover:border-saffron/50 hover:shadow-md"
            >
              {/* Media Preview Box */}
              <div
                className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br ${item.gradient || "from-stone-800 to-stone-900"}`}
              >
                {item.src ? (
                  item.isVideo ? (
                    <video
                      src={item.src}
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.caption || "Event photo"}
                      fill
                      className="object-cover"
                      unoptimized={item.src.startsWith("data:") || item.src.startsWith("blob:")}
                    />
                  )
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-mono text-ink-faint">
                    Gradient Tile
                  </div>
                )}

                {/* Badges Overlay */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                  <span className="rounded-md bg-black/60 backdrop-blur-sm px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-saffron">
                    {item.span}
                  </span>
                  {item.isVideo && (
                    <span className="rounded-md bg-rose-500/80 backdrop-blur-sm px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-white flex items-center gap-0.5">
                      <Video className="h-2.5 w-2.5" /> Video
                    </span>
                  )}
                </div>

                {/* Delete Button Overlay */}
                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="absolute top-2 right-2 rounded-lg bg-black/70 p-1.5 text-ink-muted transition-colors hover:bg-rose-500 hover:text-white z-10"
                  title="Delete this photo"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Edit Controls */}
              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <label className="block text-[9.5px] font-mono text-ink-muted mb-0.5">
                    Caption
                  </label>
                  <input
                    type="text"
                    value={item.caption}
                    onChange={(e) => handleUpdateItem(item.id, { caption: e.target.value })}
                    placeholder="Enter caption..."
                    className="w-full rounded-md border border-border bg-canvas px-2.5 py-1 text-xs text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/40">
                  <div>
                    <label className="block text-[9px] font-mono text-ink-muted mb-0.5">
                      Span
                    </label>
                    <select
                      value={item.span}
                      onChange={(e) =>
                        handleUpdateItem(item.id, { span: e.target.value as any })
                      }
                      className="w-full rounded-md border border-border bg-canvas px-2 py-1 text-[11px] text-ink focus:border-saffron focus:outline-none"
                    >
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-mono text-ink-muted pb-1">
                      <input
                        type="checkbox"
                        checked={!!item.isVideo}
                        onChange={(e) =>
                          handleUpdateItem(item.id, { isVideo: e.target.checked })
                        }
                        className="accent-saffron h-3 w-3 rounded"
                      />
                      <span>Clip</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
