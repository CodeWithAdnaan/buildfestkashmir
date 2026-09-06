import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/sections/profile/profile-form";
import { UserRegistrations } from "@/components/sections/profile/user-registrations";

export const metadata: Metadata = {
  title: "Profile & Account Settings",
  description: "Manage your BuildFest Kashmir profile, social links, avatar, and event registrations.",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile record
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch user event registrations
  const { data: registrations } = await supabase
    .from("registrations")
    .select("*")
    .eq("email", user.email || "")
    .order("created_at", { ascending: false });

  const initialData = {
    fullName: profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "",
    email: user.email || "",
    college: profile?.college || null,
    githubUrl: profile?.github_url || null,
    linkedinUrl: profile?.linkedin_url || null,
    avatarUrl: profile?.avatar_url || user.user_metadata?.avatar_url || null,
  };

  return (
    <>
      <SiteHeader />
      <main className="pb-24 pt-40 sm:pt-48">
        <div className="container-content max-w-4xl">
          <Reveal className="mb-10">
            <PillBadge className="mb-4">USER ACCOUNT</PillBadge>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Profile & Account Settings
            </h1>
            <p className="mt-2 text-[15px] text-ink-muted">
              Update your public profile, connected links, avatar picture, and view event registrations.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column: Edit Profile Form */}
            <div className="lg:col-span-7">
              <Reveal delay={0.05}>
                <div className="glass rounded-3xl border border-border p-6 sm:p-8">
                  <h2 className="mb-6 text-xl font-semibold text-ink">Personal Details</h2>
                  <ProfileForm initialData={initialData} />
                </div>
              </Reveal>
            </div>

            {/* Right Column: Registrations & Account Summary */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="glass rounded-3xl border border-border p-6 sm:p-8">
                  <h2 className="mb-6 text-xl font-semibold text-ink">Event Registrations</h2>
                  <UserRegistrations registrations={registrations || []} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
