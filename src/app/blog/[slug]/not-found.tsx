import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";

export default function PostNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
        <p className="font-mono text-sm text-saffron">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          We couldn&rsquo;t find that post.
        </h1>
        <p className="mt-3 max-w-sm text-ink-muted">It may have been moved or renamed.</p>
        <Button asChild className="mt-7">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
