"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface SocialShareProps {
  title: string;
  slug: string;
}

export function SocialShare({ title, slug }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const getFullUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blog/${slug}`;
    }
    return `https://buildfestkashmir.com/blog/${slug}`;
  };

  const handleCopy = async () => {
    const url = getFullUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API unavailable
      setCopied(false);
    }
  };

  const shareTwitter = () => {
    const url = encodeURIComponent(getFullUrl());
    const text = encodeURIComponent(`"${title}" by @BuildFestKashmir`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(getFullUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const shareWhatsApp = () => {
    const url = encodeURIComponent(getFullUrl());
    const text = encodeURIComponent(`Check out "${title}" on BuildFest Kashmir: ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="my-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
      <div className="flex items-center gap-2 font-mono text-[12px] text-ink-muted">
        <Share2 className="h-3.5 w-3.5 text-saffron" />
        <span>Share Article</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={shareTwitter}
          className="rounded-lg border border-border bg-canvas-raised/40 px-3 py-1.5 font-mono text-[12px] text-ink-muted transition-colors hover:border-saffron/40 hover:text-ink"
        >
          Twitter / X
        </button>

        <button
          onClick={shareLinkedIn}
          className="rounded-lg border border-border bg-canvas-raised/40 px-3 py-1.5 font-mono text-[12px] text-ink-muted transition-colors hover:border-saffron/40 hover:text-ink"
        >
          LinkedIn
        </button>

        <button
          onClick={shareWhatsApp}
          className="rounded-lg border border-border bg-canvas-raised/40 px-3 py-1.5 font-mono text-[12px] text-ink-muted transition-colors hover:border-saffron/40 hover:text-ink"
        >
          WhatsApp
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-canvas-raised/40 px-3 py-1.5 font-mono text-[12px] text-ink-muted transition-colors hover:border-saffron/40 hover:text-ink"
          aria-label="Copy post link"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
