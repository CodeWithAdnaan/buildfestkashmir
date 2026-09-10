"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, ArrowRight, AlertCircle, CheckCircle2, Check, X, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Real-time password validations
  const hasMinLength = password.length >= 6;
  const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const isPasswordValid = hasMinLength && passwordsMatch;

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!hasMinLength) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setIsPending(true);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        setIsPending(false);
        return;
      }

      setSuccess(true);
      setIsPending(false);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred while updating password.");
      setIsPending(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen flex-col justify-center pb-24 pt-40 sm:pt-48">
        <div className="container-content max-w-md">
          <Reveal className="text-center">
            <PillBadge className="mb-4">NEW CREDENTIALS</PillBadge>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Reset Your Password.
            </h1>
            <p className="mt-3 text-[15px] text-ink-muted">
              Choose a strong password to secure your BuildFest account.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-8">
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              {success ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-8 ring-emerald-500/5">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink">Password Updated!</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    Your password has been successfully updated in real-time. You can now log in using your new credentials.
                  </p>
                  <Button asChild className="mt-6 w-full">
                    <Link href="/login">
                      <span>Sign In Now</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
                  {error && (
                    <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 font-mono">
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-mono text-xs text-ink-muted">
                      New Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="font-mono text-xs text-ink-muted">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        minLength={6}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Real-time Validation Meter & Feedback */}
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 space-y-2 font-mono text-[11.5px]">
                    <div className="flex items-center justify-between text-ink-muted mb-1 font-semibold text-xs">
                      <span>Password Requirements</span>
                      <ShieldCheck className="h-3.5 w-3.5 text-saffron" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {hasMinLength ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-ink-muted/50 shrink-0" />
                      )}
                      <span className={hasMinLength ? "text-emerald-400" : "text-ink-muted"}>
                        At least 6 characters
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasNumberOrSymbol ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-ink-muted/50 shrink-0" />
                      )}
                      <span className={hasNumberOrSymbol ? "text-emerald-400" : "text-ink-muted"}>
                        Contains number or symbol (recommended)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {passwordsMatch ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-ink-muted/50 shrink-0" />
                      )}
                      <span className={passwordsMatch ? "text-emerald-400" : "text-ink-muted"}>
                        Passwords match
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending || !isPasswordValid}
                    className="mt-2 w-full"
                  >
                    {isPending ? (
                      "Updating Password..."
                    ) : (
                      <>
                        <span>Update Password</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
