import Link from "next/link";
import { Plus, ExternalLink, FileText, CheckCircle2, XCircle } from "lucide-react";
import { fetchPostsFromSupabase } from "@/lib/constants/blog";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function AdminBlogPage() {
  const posts = await fetchPostsFromSupabase();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Blog & Announcements
          </h1>
          <p className="mt-1 text-xs font-mono text-ink-muted">
            Publish community stories, recaps, and announcements to the main blog.
          </p>
        </div>

        <Button asChild size="sm" className="bg-saffron text-black hover:bg-saffron/90 font-medium">
          <Link href="/admin/blog/new" className="flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            <span>New Blog Post</span>
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-canvas-raised/30">
        <div className="divide-y divide-border/60">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="flex flex-col gap-3 p-5 transition-colors hover:bg-canvas-raised/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold text-ink">{post.title}</h2>
                  <span className="rounded-full bg-saffron/10 px-2 py-0.5 text-[10px] font-mono text-saffron">
                    {post.readTime}
                  </span>
                </div>
                <p className="text-xs text-ink-muted line-clamp-1">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs font-mono text-ink-faint pt-1">
                  <span>✍️ {post.author}</span>
                  <span>📅 {post.date}</span>
                  <span>🏷️ {post.tags.join(", ")}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button asChild size="sm" variant="ghost" className="border border-border text-xs font-mono">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-ink-muted hover:text-ink"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>View Live</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
