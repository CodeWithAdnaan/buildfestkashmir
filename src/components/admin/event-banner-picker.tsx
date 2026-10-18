"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Link as LinkIcon,
  X,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface EventBannerPickerProps {
  initialValue?: string | null;
}

export function EventBannerPicker({ initialValue = "" }: EventBannerPickerProps) {
  const [value, setValue] = useState<string>(initialValue || "");
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [urlInput, setUrlInput] = useState<string>(initialValue || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WebP, SVG).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size is too large. Maximum size is 10MB.");
      return;
    }

    setUploadError(null);
    setUploadSuccess(false);
    setIsUploading(true);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const sanitizedName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9_-]/g, "_");
      const filePath = `events/${Date.now()}-${sanitizedName}.${fileExt}`;

      let publicUrl: string | null = null;

      // Try uploading to 'event-attachments' bucket first
      const { error: uploadError1 } = await supabase.storage
        .from("event-attachments")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (!uploadError1) {
        publicUrl = supabase.storage
          .from("event-attachments")
          .getPublicUrl(filePath).data.publicUrl;
      } else {
        // Fallback to 'blog-images' or 'avatars' if event-attachments bucket isn't configured
        const { error: uploadError2 } = await supabase.storage
          .from("blog-images")
          .upload(filePath, file, { cacheControl: "3600", upsert: true });

        if (!uploadError2) {
          publicUrl = supabase.storage
            .from("blog-images")
            .getPublicUrl(filePath).data.publicUrl;
        } else {
          // If Supabase Storage bucket policy fails, read as Data URL fallback
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          publicUrl = dataUrl;
        }
      }

      if (publicUrl) {
        setValue(publicUrl);
        setUrlInput(publicUrl);
        setUploadSuccess(true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image.";
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlApply = () => {
    const trimmed = urlInput.trim();
    setValue(trimmed);
    setUploadError(null);
  };

  const handleClear = () => {
    setValue("");
    setUrlInput("");
    setUploadError(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden input submitted with the form */}
      <input type="hidden" name="bannerImage" value={value} />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="block text-xs font-mono text-ink-muted">
          Banner Image (File Upload or URL Link)
        </label>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 rounded-xl border border-border bg-canvas p-1">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
              mode === "upload"
                ? "bg-saffron text-black font-semibold shadow-sm"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <Upload className="h-3 w-3" />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
              mode === "url"
                ? "bg-saffron text-black font-semibold shadow-sm"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <LinkIcon className="h-3 w-3" />
            Image Link / URL
          </button>
        </div>
      </div>

      {/* Upload File Mode */}
      {mode === "upload" && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/80 bg-canvas/60 p-6 text-center transition-all hover:border-saffron/80 hover:bg-canvas-raised/40"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            className="hidden"
          />

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-canvas-overlay text-saffron transition-transform group-hover:scale-105">
              {isUploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Upload className="h-5 w-5" />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-ink">
                {isUploading ? "Uploading image to storage..." : "Click or drag & drop to upload banner"}
              </p>
              <p className="text-[11px] font-mono text-ink-muted">
                PNG, JPG, WebP, SVG or GIF (Max 10MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* URL Link Mode */}
      {mode === "url" && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleUrlApply();
                  }
                }}
                placeholder="https://... or /events/promptwars-hackdays-v2-banner.png"
                className="w-full rounded-xl border border-border bg-canvas pl-9 pr-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleUrlApply}
              className="rounded-xl border border-border bg-canvas-raised px-4 py-2 text-xs font-mono text-ink transition-colors hover:border-saffron hover:text-saffron"
            >
              Apply
            </button>
          </div>
          <p className="text-[11px] font-mono text-ink-faint">
            Enter a full web URL or a local path located in the <code className="text-ink-muted">/public/events/</code> folder.
          </p>
        </div>
      )}

      {/* Feedback Messages */}
      {uploadError && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-mono text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {uploadSuccess && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-mono text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Image uploaded and attached successfully!</span>
        </div>
      )}

      {/* Live Preview Card */}
      {value ? (
        <div className="relative overflow-hidden rounded-2xl border border-border bg-canvas-raised/50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-3.5 w-3.5 text-saffron" />
              <span className="font-mono text-xs font-medium text-ink">Banner Preview</span>
              <span className="rounded-md bg-canvas-overlay px-2 py-0.5 font-mono text-[10px] text-ink-muted">
                {value.startsWith("http")
                  ? "Cloud URL"
                  : value.startsWith("data:")
                  ? "Uploaded File"
                  : "Local Asset"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 rounded-lg border border-border/80 bg-canvas px-2.5 py-1 text-[11px] font-mono text-ink-muted transition-colors hover:border-saffron hover:text-ink"
              >
                <RefreshCw className="h-3 w-3" />
                Change
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-[11px] font-mono text-rose-400 transition-colors hover:bg-rose-500/20"
              >
                <X className="h-3 w-3" />
                Remove
              </button>
            </div>
          </div>

          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-border/60 bg-black/40">
            {/* If relative path or valid URL */}
            <Image
              src={value}
              alt="Banner preview"
              fill
              className="object-cover"
              unoptimized={value.startsWith("data:") || value.startsWith("blob:")}
            />
          </div>

          <div className="mt-2.5 truncate font-mono text-[11px] text-ink-muted">
            <span className="text-ink-faint">Source: </span>
            {value.length > 80 ? `${value.slice(0, 80)}...` : value}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border/60 bg-canvas/30 p-3 text-center">
          <p className="font-mono text-xs text-ink-muted">
            No banner image set. A placeholder gradient will be shown on the website.
          </p>
        </div>
      )}
    </div>
  );
}
