import { PostCard } from "@/components/sections/blog/post-card";
import { blogPosts } from "@/lib/constants/blog";

interface RelatedPostsProps {
  currentSlug: string;
  tags: string[];
}

export function RelatedPosts({ currentSlug, tags }: RelatedPostsProps) {
  // Find posts sharing at least one tag, excluding current post
  const related = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const matchCount = post.tags.filter((tag) => tags.includes(tag)).length;
      return { post, matchCount };
    })
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 3)
    .map((item) => item.post);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
