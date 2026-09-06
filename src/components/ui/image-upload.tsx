"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Camera } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove?: () => void;
  bucket?: string;
  className?: string;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  bucket = "avatars",
  className = "",
  label = "Upload Image",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image.";
      setError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {value ? (
        <div className="group relative h-24 w-24 overflow-hidden rounded-full border-2 border-saffron/60 shadow-lg">
          <Image
            src={value}
            alt="Uploaded preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 text-white hover:text-saffron"
              title="Change Image"
            >
              <Camera className="h-5 w-5" />
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="p-1.5 text-rose-400 hover:text-rose-300"
                title="Remove Image"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-border bg-canvas-raised/50 p-2 text-ink-muted transition-colors hover:border-saffron/60 hover:text-ink disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-saffron" />
          ) : (
            <>
              <Upload className="h-6 w-6 text-saffron" />
              <span className="font-mono text-[10px]">{label}</span>
            </>
          )}
        </button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {error && (
        <p className="font-mono text-[11px] text-rose-400">{error}</p>
      )}
    </div>
  );
}
