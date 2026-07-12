import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { FeaturedPost } from "@/components/sections/blog/featured-post";
import { PostCard } from "@/components/sections/blog/post-card";
import { getSortedPosts } from "@/lib/constants/blog";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories from BuildFest Kashmir — origin stories, case studies, and lessons from running a student developer community.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog — ${siteConfig.name}`,
    description: "Stories from BuildFest Kashmir.",
  },
};

export default function BlogPage() {
  const posts = getSortedPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <SiteHeader />
      <main className="pb-24 pt-40 sm:pt-48">
        <div className="container-content">
          <Reveal className="mb-12 max-w-2xl">
            <PillBadge className="mb-5">BLOG</PillBadge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Stories from the ecosystem.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
              Origin stories, case studies, and honest lessons from running a student developer
              community — written by the people actually doing it.
            </p>
          </Reveal>

          {featured && (
            <div className="mb-10">
              <FeaturedPost post={featured} />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Reveal key={post.slug}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
