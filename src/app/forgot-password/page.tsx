"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft, KeyRound } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "@/app/auth/actions";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(false);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError("Please enter your email address.");
      setIsPending(false);
      return;
    }

    try {
      const res = await requestPasswordReset(cleanEmail);

      if (res.error) {
        setError(res.error);
        setIsPending(false);
        return;
      }

      setSuccess(true);
      setIsPending(false);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
      setIsPending(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen flex-col justify-center pb-24 pt-40 sm:pt-48">
        <div className="container-content max-w-md">
          <Reveal className="text-center">
            <PillBadge className="mb-4">PASSWORD RECOVERY</PillBadge>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Forgot Password?
            </h1>
            <p className="mt-3 text-[15px] text-ink-muted">
              Enter your registered email address and we&apos;ll send you instructions to reset your password.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-8">
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              {success ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-8 ring-emerald-500/5">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink">Check Your Email</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    We have sent a password reset link to <strong className="text-ink">{email}</strong>. Please check your inbox and follow the instructions.
                  </p>
                  <div className="mt-6 flex w-full flex-col gap-3">
                    <Button asChild variant="ghost" className="w-full">
                      <Link href="/login">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        <span>Return to Sign In</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {error && (
                    <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 font-mono">
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                      <span>{error}</span>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isPending} className="mt-2 w-full">
                    {isPending ? (
                      "Sending Reset Link..."
                    ) : (
                      <>
                        <KeyRound className="mr-2 h-4 w-4" />
                        <span>Send Reset Link</span>
                      </>
                    )}
                  </Button>
                </form>
              )}

              {!success && (
                <div className="mt-6 border-t border-border pt-5 text-center font-mono text-[12.5px] text-ink-muted">
                  Remembered your password?{" "}
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
