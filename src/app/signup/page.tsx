"use client";

import { useActionState } from "react";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpWithEmail, type AuthActionResult } from "@/app/auth/actions";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState<AuthActionResult | null, FormData>(
    signUpWithEmail,
    null,
  );

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen flex-col justify-center pb-24 pt-40 sm:pt-48">
        <div className="container-content max-w-md">
          <Reveal className="text-center">
            <PillBadge className="mb-4">CREATE ACCOUNT</PillBadge>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Join BuildFest.
            </h1>
            <p className="mt-3 text-[15px] text-ink-muted">
              Create an account to participate in hackathons, register for events, and connect with Kashmir&apos;s developer ecosystem.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-8">
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              {state?.success ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink">Account Created!</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    {state.message || "Please check your email inbox to confirm your account before signing in."}
                  </p>
                  <Button asChild className="mt-6 w-full">
                    <Link href="/login">Go to Sign In</Link>
                  </Button>
                </div>
              ) : (
                <form action={formAction} className="flex flex-col gap-5">
                  {state?.error && (
                    <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 font-mono">
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                      <span>{state.error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="font-mono text-xs text-ink-muted">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        placeholder="Adnan Farooq"
                        className="pl-10"
                      />
                    </div>
                  </div>

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
                    <Label htmlFor="password" className="font-mono text-xs text-ink-muted">
                      Password (min 6 characters)
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isPending} className="mt-2 w-full">
                    {isPending ? (
                      "Creating Account..."
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}

              {!state?.success && (
                <div className="mt-6 border-t border-border pt-5 text-center font-mono text-[12.5px] text-ink-muted">
                  Already have an account?{" "}
                  <Link href="/login" className="text-saffron transition-colors hover:underline">
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
