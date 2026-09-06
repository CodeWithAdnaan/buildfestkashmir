import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { BlogListClient } from "@/components/sections/blog/blog-list-client";
import { fetchPostsFromSupabase } from "@/lib/constants/blog";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories from BuildFest Kashmir — origin stories, case studies, systems engineering, and lessons from running a student developer community.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog — ${siteConfig.name}`,
    description: "Essays & Deep Tech Insights from BuildFest Kashmir.",
  },
};

export default async function BlogPage() {
  const posts = await fetchPostsFromSupabase();

  return (
    <>
      <SiteHeader />
      <main className="pb-24 pt-40 sm:pt-48">
        <div className="container-content">
          <Reveal className="mb-12 max-w-2xl">
            <PillBadge className="mb-5">BLOG</PillBadge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Essays & Deep Tech Insights.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
              Deep systems philosophy, zero-connectivity architecture, open source mindsets, and real engineering lessons by Adnan Farooq, Mehraan Amin, and Mohammad Mushtaq.
            </p>
          </Reveal>

          <BlogListClient posts={posts} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
