"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmail, type AuthActionResult } from "@/app/auth/actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<AuthActionResult | null, FormData>(
    signInWithEmail,
    null,
  );

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen flex-col justify-center pb-24 pt-40 sm:pt-48">
        <div className="container-content max-w-md">
          <Reveal className="text-center">
            <PillBadge className="mb-4">AUTHENTICATION</PillBadge>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Welcome Back.
            </h1>
            <p className="mt-3 text-[15px] text-ink-muted">
              Sign in to your BuildFest account to manage event registrations and project submissions.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-8">
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              <form action={formAction} className="flex flex-col gap-5">
                {state?.error && (
                  <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 font-mono">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                    <span>{state.error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono text-xs text-ink-muted">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-mono text-xs text-ink-muted">
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isPending} className="mt-2 w-full">
                  {isPending ? (
                    "Signing in..."
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 border-t border-border pt-5 text-center font-mono text-[12.5px] text-ink-muted">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-saffron transition-colors hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
