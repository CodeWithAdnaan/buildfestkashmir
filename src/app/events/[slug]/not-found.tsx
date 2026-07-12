import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";

export default function EventNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
        <p className="font-mono text-sm text-saffron">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          We couldn&rsquo;t find that event.
        </h1>
        <p className="mt-3 max-w-sm text-ink-muted">
          It may have been renamed, or hasn&rsquo;t been announced yet.
        </p>
        <Button asChild className="mt-7">
          <Link href="/events">Back to Events</Link>
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
