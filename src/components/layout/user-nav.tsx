"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User as UserIcon, LogOut, ChevronDown, ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

export function UserNav() {
  const { user, isLoading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="h-8 w-20 animate-pulse rounded-lg bg-canvas-raised/60" />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }

  const displayName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  const avatarUrl = user.user_metadata?.avatar_url;
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-border/80 bg-canvas-raised/50 p-1.5 pl-3 transition-colors hover:border-saffron/40 hover:bg-canvas-raised"
        aria-label="User navigation menu"
      >
        <div className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-saffron/15 font-mono text-[11px] font-semibold text-saffron">
          {avatarUrl ? (
            <Image src={avatarUrl} alt={displayName} fill className="object-cover" />
          ) : (
            initials
          )}
        </div>
        <span className="hidden font-mono text-[13px] text-ink sm:inline-block max-w-[100px] truncate">
          {displayName}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-ink-muted" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to dismiss on outside click */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-border bg-canvas-raised p-2 shadow-2xl backdrop-blur-xl">
            <div className="border-b border-border px-3 py-2.5">
              <p className="font-semibold text-ink text-sm truncate">{displayName}</p>
              <p className="font-mono text-[11px] text-ink-muted truncate">{user.email}</p>
            </div>

            <div className="py-1 space-y-0.5">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-mono text-ink-muted transition-colors hover:bg-canvas-overlay hover:text-ink"
              >
                <UserIcon className="h-4 w-4 text-saffron" />
                <span>My Profile</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-mono text-ink-muted transition-colors hover:bg-canvas-overlay hover:text-ink"
              >
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>Organizer Panel</span>
              </Link>
            </div>

            <div className="border-t border-border pt-1">
              <button
                onClick={async () => {
                  setIsOpen(false);
                  await signOut();
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-mono text-rose-400 transition-colors hover:bg-rose-500/10"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
