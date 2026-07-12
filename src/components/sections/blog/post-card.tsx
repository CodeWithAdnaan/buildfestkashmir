import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BentoCard } from "@/components/shared/bento-card";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/post";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <BentoCard glow="saffron" className="h-full">
        <div
          className={`mb-5 h-32 w-full rounded-lg bg-gradient-to-br ${post.gradient}`}
        />
        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] text-ink-faint">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{post.title}</h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-muted">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-[13px] text-ink-muted">{post.author}</span>
          <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-saffron" />
        </div>
      </BentoCard>
    </Link>
  );
}
