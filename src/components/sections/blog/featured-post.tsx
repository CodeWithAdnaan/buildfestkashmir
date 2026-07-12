import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/post";

export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Reveal>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="glass glass-hover grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-2">
          <div className={`min-h-[220px] bg-gradient-to-br sm:min-h-[280px] ${post.gradient}`} />
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
