"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Terminal } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/post";

export function FeaturedPost({ post }: { post: BlogPost }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Reveal>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="glass glass-hover grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-2">
          <div
            className={`relative min-h-[260px] flex items-center justify-center overflow-hidden bg-gradient-to-br sm:min-h-[320px] ${post.gradient}`}
          >
            {post.image && !imageError ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                onError={() => setImageError(true)}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-center p-6 text-ink-muted/80">
                <Terminal className="h-10 w-10 text-saffron/80" />
                <span className="font-mono text-xs text-ink-muted">{post.tags[0] || "BUILD"}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
            <PillBadge dot={false} className="w-fit">
              FEATURED
            </PillBadge>
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              {post.title}
            </h2>
            <p className="text-[15px] leading-relaxed text-ink-muted">{post.excerpt}</p>
            <div className="flex items-center gap-3 pt-2 font-mono text-[12px] text-ink-faint">
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <ArrowUpRight className="ml-auto h-4 w-4 text-ink-muted transition-colors group-hover:text-saffron" />
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
