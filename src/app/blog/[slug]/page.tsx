import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { formatDate } from "@/lib/utils";
import { blogPosts, getPostBySlug } from "@/lib/constants/blog";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <SiteHeader />
      <main className="pb-24 pt-40 sm:pt-48">
        <div className="container-content max-w-3xl">
          <Reveal>
            <Link
              href="/blog"
              className="mb-8 flex items-center gap-1.5 text-[13.5px] text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
            </Link>

            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-canvas-raised/60 px-3 py-1 font-mono text-[11px] text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="mt-5 flex items-center gap-3 font-mono text-[12.5px] text-ink-faint">
              <span className="text-ink-muted">
                {post.author} · {post.authorRole}
              </span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div
              className={`my-9 h-56 w-full rounded-2xl bg-gradient-to-br sm:h-72 ${post.gradient}`}
            />
          </Reveal>

          <div className="flex flex-col gap-5">
            {post.content.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <p className="text-[16px] leading-relaxed text-ink-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
