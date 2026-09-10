"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { Button } from "@/components/ui/button";

export default function AccountConfirmedPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen flex-col justify-center pb-24 pt-40 sm:pt-48">
        <div className="container-content max-w-md">
          <Reveal className="text-center">
            <PillBadge className="mb-4">VERIFICATION SUCCESSFUL</PillBadge>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Account Confirmed!
            </h1>
            <p className="mt-3 text-[15px] text-ink-muted">
              Your email address has been verified. Your BuildFest account is now fully active.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-8">
            <div className="glass rounded-3xl border border-border p-6 text-center sm:p-8">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-8 ring-emerald-500/5">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-2 rounded-2xl bg-white/[0.02] border border-white/5 p-4 mb-6 text-left">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>EMAIL VERIFIED</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  You can now log in, submit project ideas, register for hackathons, and join the community.
                </p>
              </div>

              <Button asChild className="w-full">
                <Link href="/login">
                  <span>Sign In to Your Account</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
