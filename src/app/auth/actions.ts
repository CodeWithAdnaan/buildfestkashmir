"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/security/rate-limit";

export type AuthActionResult = {
  success?: boolean;
  error?: string;
  message?: string;
};

/**
 * Server Action for signing in with email and password
 */
export async function signInWithEmail(
  prevState: AuthActionResult | null,
  formData: FormData,
): Promise<AuthActionResult> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  // Rate limiting: Max 5 login attempts per email per 15 minutes
  const limitResult = rateLimit(`signin:${email.toLowerCase()}`, { limit: 5, windowSeconds: 900 });
  if (!limitResult.success) {
    return {
      error: `Too many sign-in attempts. Please try again in ${limitResult.resetInSeconds} seconds.`,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

/**
 * Server Action for signing up a new user with email, password, and full name
 */
export async function signUpWithEmail(
  prevState: AuthActionResult | null,
  formData: FormData,
): Promise<AuthActionResult> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("fullName")?.toString().trim();

  if (!email || !password || !fullName) {
    return { error: "Please fill out all required fields." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  // Rate limiting: Max 3 signup attempts per email per 1 hour
  const limitResult = rateLimit(`signup:${email.toLowerCase()}`, { limit: 3, windowSeconds: 3600 });
  if (!limitResult.success) {
    return {
      error: `Too many sign-up attempts for this email. Please wait ${Math.ceil(limitResult.resetInSeconds / 60)} minutes before trying again.`,
    };
  }

  const supabase = await createClient();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? (process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
        ? process.env.NEXT_PUBLIC_SITE_URL
        : `https://${process.env.NEXT_PUBLIC_SITE_URL}`
      ).replace(/\/$/, "")
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL.replace(/\/$/, "")}`
    : null;

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
  const origin = siteUrl || (host ? `${proto}://${host}` : "http://localhost:3000");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${origin}/auth/callback?next=/auth/confirmed`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  return {
    success: true,
    message: "Registration successful! Please check your email to confirm your account.",
  };
}

/**
 * Server Action for signing out
 */
export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

/**
 * Server Action for requesting a password reset email with rate limiting
 */
export async function requestPasswordReset(email: string): Promise<AuthActionResult> {
  const cleanEmail = email.trim();
  if (!cleanEmail) {
    return { error: "Please enter your email address." };
  }

  // Rate limiting: Max 3 password reset requests per email per 15 minutes
  const limitResult = rateLimit(`forgot-password:${cleanEmail.toLowerCase()}`, {
    limit: 3,
    windowSeconds: 900,
  });

  if (!limitResult.success) {
    return {
      error: `Too many password reset requests for this email. Please try again in ${limitResult.resetInSeconds} seconds.`,
    };
  }

  const supabase = await createClient();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? (process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
        ? process.env.NEXT_PUBLIC_SITE_URL
        : `https://${process.env.NEXT_PUBLIC_SITE_URL}`
      ).replace(/\/$/, "")
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL.replace(/\/$/, "")}`
    : null;

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
  const origin = siteUrl || (host ? `${proto}://${host}` : "http://localhost:3000");

  const redirectTo = `${origin}/auth/callback?next=/reset-password`;

  const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
    redirectTo,
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: true,
    message: "Password reset link sent to your email address.",
  };
}

