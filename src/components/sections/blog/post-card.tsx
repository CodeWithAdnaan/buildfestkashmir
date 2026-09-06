"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Terminal } from "lucide-react";
import { BentoCard } from "@/components/shared/bento-card";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/post";

export function PostCard({ post }: { post: BlogPost }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <BentoCard glow="saffron" className="flex h-full flex-col">
        <div
          className={`relative mb-5 flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${post.gradient}`}
        >
          {post.image && !imageError ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              onError={() => setImageError(true)}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-ink-muted">
              <Terminal className="h-8 w-8 text-saffron/70" />
              <span className="font-mono text-[11px]">{post.tags[0] || "BUILD"}</span>
            </div>
          )}
        </div>
        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] text-ink-faint">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-saffron">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-muted">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-[13px] text-ink-muted">{post.author}</span>
          <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-saffron" />
        </div>
      </BentoCard>
    </Link>
  );
}
