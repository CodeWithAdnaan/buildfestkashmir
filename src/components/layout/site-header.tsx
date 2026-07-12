"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useScrollHeader } from "@/hooks/use-scroll-header";
import { ChinarLeaf } from "@/components/shared/chinar-leaf";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { mainNav, siteConfig } from "@/lib/constants/site";
import { featuredEvent } from "@/lib/constants/events";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const scrolled = useScrollHeader(24);
  const registerHref = featuredEvent ? `/events/${featuredEvent.slug}/register` : "/events";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={cn(
          "container-content flex items-center justify-between rounded-2xl border px-4 py-3 !max-w-[1320px] transition-all duration-500",
          scrolled
            ? "border-border bg-canvas-raised/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="flex items-center gap-3 pl-2 font-semibold tracking-tight text-ink">
          <Image src="/logo.png" alt="BuildFest logo" width={68} height={68} className="shrink-0" />
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-7 text-[14px] font-medium text-ink-muted md:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 pr-1 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/team/join">Join Team</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={registerHref}>Register</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 text-ink md:hidden" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex items-center gap-3 font-semibold text-ink">
              <Image src="/logo.png" alt="BuildFest logo" width={68} height={68} />
              {siteConfig.name}
            </div>
            <nav className="flex flex-col gap-1 pt-4">
              {mainNav.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href} className="border-b border-border py-4 text-lg font-medium text-ink">
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <Button asChild variant="ghost">
                <Link href="/team/join">Join Team</Link>
              </Button>
              <Button asChild>
                <Link href={registerHref}>Register</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
