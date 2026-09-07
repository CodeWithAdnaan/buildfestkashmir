"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react";
import { savePostAction } from "@/app/admin/blog/actions";
import { Button } from "@/components/ui/button";

export default function AdminNewBlogPostPage() {
  const [state, formAction, isPending] = useActionState(savePostAction, null);

  return (
    <form action={formAction} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/60">
        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="ghost" className="h-9 w-9 p-0 rounded-xl">
            <Link href="/admin/blog">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Write New Blog Post
            </h1>
            <p className="text-xs font-mono text-ink-muted">
              Publish announcements, workshop recaps, or student guides.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          className="bg-saffron text-black hover:bg-saffron/90 font-medium"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span className="ml-1.5 font-mono text-xs">Publish Post</span>
        </Button>
      </div>

      {state?.error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-mono text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Post Metadata */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. CASET Hackdays 2026 Recap: 42 Projects Shipped in 10 Hours"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Slug (URL Identifier) *
            </label>
            <input
              type="text"
              name="slug"
              required
              placeholder="e.g. caset-hackdays-2026-recap"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Read Time
            </label>
            <input
              type="text"
              name="readTime"
              defaultValue="4 min read"
              placeholder="4 min read"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              placeholder="e.g. Adnan Farooq"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Author Role
            </label>
            <input
              type="text"
              name="authorRole"
              defaultValue="Organizer, BuildFest Kashmir"
              placeholder="e.g. Lead Organizer"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              defaultValue="Community, Hackathons, Open Source"
              placeholder="Community, Hackathons, Open Source"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm font-mono text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-ink-muted mb-1.5">
              Short Excerpt *
            </label>
            <textarea
              name="excerpt"
              required
              rows={2}
              placeholder="Short summary for the article preview card..."
              className="w-full rounded-xl border border-border bg-canvas p-3 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="rounded-2xl border border-border bg-canvas-raised/30 p-6 space-y-4">
        <label className="block text-xs font-mono text-ink-muted">
          Article Paragraphs (separate paragraphs with an empty line) *
        </label>
        <textarea
          name="content"
          required
          rows={12}
          placeholder="First paragraph of the article...&#10;&#10;Second paragraph goes here...&#10;&#10;Final wrap-up thoughts..."
          className="w-full rounded-xl border border-border bg-canvas p-3.5 text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none font-sans leading-relaxed"
        />
        <input type="hidden" name="published" value="true" />
      </div>
    </form>
  );
}
