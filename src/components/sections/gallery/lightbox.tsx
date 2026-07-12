"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/gallery";

export interface FlatGalleryItem extends GalleryItem {
  albumTitle: string;
}

interface LightboxProps {
  items: FlatGalleryItem[];
  openId: string | null;
  onOpenChange: (id: string | null) => void;
}

export function Lightbox({ items, openId, onOpenChange }: LightboxProps) {
  const currentIndex = useMemo(
    () => items.findIndex((item) => item.id === openId),
    [items, openId],
  );
  const current = currentIndex >= 0 ? items[currentIndex] : null;

  function goTo(delta: number) {
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + delta + items.length) % items.length;
    onOpenChange(items[nextIndex].id);
  }

  useEffect(() => {
    if (!current) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, currentIndex]);

  return (
    <DialogPrimitive.Root open={!!current} onOpenChange={(open) => !open && onOpenChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-canvas/92 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 outline-none sm:p-10">
          <DialogPrimitive.Title className="sr-only">
            {current?.caption ?? "Gallery image"}
          </DialogPrimitive.Title>

          {current && (
            <>
              <div
                className={cn(
                  "relative flex w-full max-w-3xl flex-1 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br",
                  current.gradient,
                )}
              >
                {current.isVideo ? (
                  current.src ? (
                    <video src={current.src} controls autoPlay className="h-full w-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-ink/80">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-canvas/50">
                        <Play className="ml-1 h-6 w-6 fill-current" />
                      </div>
                      <span className="font-mono text-[12px]">Video playback coming soon</span>
                    </div>
                  )
                ) : (
                  current.src && (
                    <Image src={current.src} alt={current.caption || "Gallery image"} fill className="object-contain" />
                  )
                )}
              </div>

              <div className="mt-5 flex w-full max-w-3xl items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-ink">{current.caption}</p>
                  <p className="mt-0.5 font-mono text-[11.5px] text-ink-faint">
                    {current.albumTitle} · {currentIndex + 1} / {items.length}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => goTo(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas-overlay text-ink transition-colors hover:bg-saffron hover:text-[#1a1103]"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => goTo(1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas-overlay text-ink transition-colors hover:bg-saffron hover:text-[#1a1103]"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}

          <DialogPrimitive.Close className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-canvas-overlay text-ink transition-colors hover:text-saffron">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
