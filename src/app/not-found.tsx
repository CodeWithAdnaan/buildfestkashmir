import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ChinarLeaf } from "@/components/shared/chinar-leaf";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
        <ChinarLeaf className="h-10 w-10 text-saffron opacity-60" />
        <p className="mt-4 font-mono text-sm text-saffron">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found.</h1>
        <p className="mt-3 max-w-sm text-ink-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or it&rsquo;s moved.
        </p>
        <Button asChild className="mt-7">
          <Link href="/">Back home</Link>
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
