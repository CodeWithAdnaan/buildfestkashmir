import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { formatDate } from "@/lib/utils";
import { blogPosts, fetchPostBySlugFromSupabase } from "@/lib/constants/blog";
import { ReadingProgress } from "@/components/sections/blog/reading-progress";
import { TableOfContents } from "@/components/sections/blog/table-of-contents";
import { BlogContent } from "@/components/sections/blog/blog-content";
import { SocialShare } from "@/components/sections/blog/social-share";
import { AuthorBio } from "@/components/sections/blog/author-bio";
import { RelatedPosts } from "@/components/sections/blog/related-posts";
import { siteConfig } from "@/lib/constants/site";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlugFromSupabase(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const ogImageUrl = post.image
    ? `${siteConfig.url}${post.image}`
    : `${siteConfig.url}/og-image.png`;

  return {
    title: `${post.title} — ${siteConfig.name} Blog`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlugFromSupabase(slug);

  if (!post) notFound();

  // JSON-LD structured data for search engine optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <ReadingProgress />
      <SiteHeader />

      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="pb-24 pt-40 sm:pt-48">
        <div className="container-content max-w-3xl">
          <Reveal>
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-1.5 font-mono text-[13px] text-ink-muted transition-colors hover:text-saffron"
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

          {/* Table of Contents */}
          <TableOfContents content={post.content} />

          {/* Featured Header Banner */}
          <Reveal delay={0.05}>
            <div
              className={`relative my-9 flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br sm:h-80 ${post.gradient}`}
            >
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-ink-muted/80">
                  <Terminal className="h-12 w-12 text-saffron" />
                  <span className="font-mono text-xs">{post.tags[0] || "BUILD"}</span>
                </div>
              )}
            </div>
          </Reveal>

          {/* Rich Article Content */}
          <BlogContent content={post.content} />

          {/* Social Share Buttons */}
          <SocialShare title={post.title} slug={post.slug} />

          {/* Author Bio Card */}
          <AuthorBio authorName={post.author} authorRole={post.authorRole} />

          {/* Related Posts Section */}
          <RelatedPosts currentSlug={post.slug} tags={post.tags} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
