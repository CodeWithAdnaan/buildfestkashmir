"use client";

import { useState, useActionState } from "react";
import { User, GraduationCap, CheckCircle2, AlertCircle, Save } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/social-icons";
import { ImageUpload } from "@/components/ui/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile, type ProfileActionResult } from "@/app/profile/actions";

interface ProfileFormProps {
  initialData: {
    fullName: string;
    email: string;
    college?: string | null;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
    avatarUrl?: string | null;
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>(initialData.avatarUrl || "");
  const [state, formAction, isPending] = useActionState<ProfileActionResult | null, FormData>(
    updateProfile,
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state?.success && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300 font-mono">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{state.message}</span>
        </div>
      )}

      {state?.error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300 font-mono">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Avatar Upload */}
      <div className="flex flex-col items-center justify-center border-b border-border pb-6 text-center">
        <ImageUpload
          value={avatarUrl}
          onChange={(url) => setAvatarUrl(url)}
          onRemove={() => setAvatarUrl("")}
          bucket="avatars"
          label="Change Avatar"
        />
        <input type="hidden" name="avatarUrl" value={avatarUrl} />
        <p className="mt-2 font-mono text-xs text-ink-muted">Click or drop to update profile picture</p>
      </div>

      {/* Full Name */}
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
            defaultValue={initialData.fullName}
            placeholder="Adnan Farooq"
            className="pl-10"
          />
        </div>
      </div>

      {/* Email (Read Only) */}
      <div className="space-y-2">
        <Label htmlFor="email" className="font-mono text-xs text-ink-muted">
          Email Address (Primary Account)
        </Label>
        <Input
          id="email"
          type="email"
          disabled
          value={initialData.email}
          className="cursor-not-allowed opacity-60"
        />
      </div>

      {/* College / Institution */}
      <div className="space-y-2">
        <Label htmlFor="college" className="font-mono text-xs text-ink-muted">
          College / University / Institution
        </Label>
        <div className="relative">
          <GraduationCap className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <Input
            id="college"
            name="college"
            type="text"
            defaultValue={initialData.college || ""}
            placeholder="NIT Srinagar / SSM College"
            className="pl-10"
          />
        </div>
      </div>

      {/* GitHub URL */}
      <div className="space-y-2">
        <Label htmlFor="githubUrl" className="font-mono text-xs text-ink-muted">
          GitHub Profile URL
        </Label>
        <div className="relative">
          <GithubIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <Input
            id="githubUrl"
            name="githubUrl"
            type="url"
            defaultValue={initialData.githubUrl || ""}
            placeholder="https://github.com/yourusername"
            className="pl-10"
          />
        </div>
      </div>

      {/* LinkedIn URL */}
      <div className="space-y-2">
        <Label htmlFor="linkedinUrl" className="font-mono text-xs text-ink-muted">
          LinkedIn Profile URL
        </Label>
        <div className="relative">
          <LinkedinIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <Input
            id="linkedinUrl"
            name="linkedinUrl"
            type="url"
            defaultValue={initialData.linkedinUrl || ""}
            placeholder="https://linkedin.com/in/yourusername"
            className="pl-10"
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="mt-4 w-full">
        {isPending ? (
          "Saving changes..."
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            <span>Save Profile</span>
          </>
        )}
      </Button>
    </form>
  );
}
