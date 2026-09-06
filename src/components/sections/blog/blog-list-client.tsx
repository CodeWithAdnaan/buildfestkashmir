"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { FeaturedPost } from "@/components/sections/blog/featured-post";
import { PostCard } from "@/components/sections/blog/post-card";
import { Reveal } from "@/components/shared/reveal";
import type { BlogPost } from "@/types/post";

interface BlogListClientProps {
  posts: BlogPost[];
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Collect all unique tags across posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    });
  }, [posts, searchQuery, selectedTag]);

  const featured = useMemo(() => {
    if (searchQuery || selectedTag) return null;
    return filteredPosts[0] || null;
  }, [filteredPosts, searchQuery, selectedTag]);

  const gridPosts = useMemo(() => {
    if (featured) return filteredPosts.slice(1);
    return filteredPosts;
  }, [filteredPosts, featured]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, tag, or author..."
            className="w-full rounded-xl border border-border bg-canvas-raised/50 py-2.5 pl-10 pr-9 font-mono text-[13px] text-ink placeholder:text-ink-faint focus:border-saffron/50 focus:outline-none focus:ring-1 focus:ring-saffron/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
              selectedTag === null
                ? "border border-saffron bg-saffron/10 font-semibold text-saffron"
                : "border border-border bg-canvas-raised/40 text-ink-muted hover:border-border-hover hover:text-ink"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                selectedTag === tag
                  ? "border border-saffron bg-saffron/10 font-semibold text-saffron"
                  : "border border-border bg-canvas-raised/40 text-ink-muted hover:border-border-hover hover:text-ink"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post (only shown when no filter is active) */}
      {featured && (
        <div className="mb-4">
          <FeaturedPost post={featured} />
        </div>
      )}

      {/* Results Grid */}
      {gridPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => (
            <Reveal key={post.slug}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="my-16 rounded-2xl border border-dashed border-border py-16 text-center">
          <p className="font-mono text-sm text-ink-muted">
            No articles found matching &quot;{searchQuery || selectedTag}&quot;
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag(null);
            }}
            className="mt-4 text-xs font-mono text-saffron hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
