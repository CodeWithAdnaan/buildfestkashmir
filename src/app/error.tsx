"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, wire this up to an error-tracking service (Sentry, etc).
    console.error(error);
  }, [error]);

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
        <AlertTriangle className="h-10 w-10 text-saffron" />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Something broke.</h1>
        <p className="mt-3 max-w-sm text-ink-muted">
          That&rsquo;s on us, not you. Try again, or head back to the homepage.
        </p>
        <div className="mt-7 flex gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="ghost">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
