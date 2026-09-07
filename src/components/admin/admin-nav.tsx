"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Inbox,
  FileText,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminNavProps {
  user: {
    fullName: string;
    email: string;
    role: "admin" | "organizer";
  };
}

const navItems = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Events",
    href: "/admin/events",
    icon: Calendar,
    exact: false,
  },
  {
    label: "Registrations",
    href: "/admin/registrations",
    icon: Users,
    exact: false,
  },
  {
    label: "Applications & Inquiries",
    href: "/admin/applications",
    icon: Inbox,
    exact: false,
  },
  {
    label: "Blog Posts",
    href: "/admin/blog",
    icon: FileText,
    exact: false,
  },
];

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-border/60 bg-canvas-subtle/50 lg:w-64 lg:min-h-screen lg:border-r lg:border-b-0">
      <div className="flex flex-col h-full p-4 sm:p-5">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-5 border-b border-border/60">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="BuildFest"
              width={36}
              height={36}
              className="rounded-xl border border-border"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-ink">BuildFest</span>
                <span className="rounded-md bg-saffron/15 px-1.5 py-0.5 text-[10px] font-mono font-medium text-saffron uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-[11px] font-mono text-ink-muted">Organizer Console</p>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="my-4 rounded-xl border border-border/60 bg-canvas-raised/50 p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-saffron/10 text-saffron">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-ink">{user.fullName}</p>
              <p className="truncate text-[11px] font-mono text-ink-muted">{user.email}</p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between border-t border-border/40 pt-2 text-[10px] font-mono">
            <span className="text-ink-faint">Role</span>
            <span className="text-saffron font-medium capitalize">{user.role}</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1 py-2">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-mono transition-colors",
                  isActive
                    ? "bg-saffron/15 text-saffron font-semibold border border-saffron/30"
                    : "text-ink-muted hover:bg-canvas-raised hover:text-ink border border-transparent",
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-saffron" : "text-ink-muted")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Back Link */}
        <div className="pt-4 border-t border-border/60">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-mono text-ink-muted transition-colors hover:bg-canvas-raised hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Exit to Main Site</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
