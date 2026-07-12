"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  teamApplicationSchema,
  teamApplicationDefaultValues,
  type TeamApplicationValues,
} from "@/lib/validations/team-application";
import { applyForRole } from "@/app/team/join/actions";
import type { TeamRole } from "@/lib/constants/roles";

interface ApplicationDialogProps {
  role: TeamRole | null;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationDialog({ role, onOpenChange }: ApplicationDialogProps) {
  return (
    <Dialog open={!!role} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* Keyed by role id so switching roles remounts the form with fresh
            state, instead of reset()-ing existing state inside an effect. */}
        {role && (
          <RoleApplicationForm key={role.id} role={role} onDone={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function RoleApplicationForm({ role, onDone }: { role: TeamRole; onDone: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<TeamApplicationValues, "role">>({
    resolver: zodResolver(teamApplicationSchema.omit({ role: true })),
    defaultValues: teamApplicationDefaultValues,
  });

  function onSubmit(values: Omit<TeamApplicationValues, "role">) {
    setServerError(null);
    startTransition(async () => {
      const res = await applyForRole({ ...values, role: role.id });
      if (!res.success) {
        setServerError(res.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    });
  }

  if (submitted) {
    return (
      <div className="py-6 text-center">
        <CheckCircle2 className="mx-auto h-11 w-11 text-saffron" />
        <h3 className="mt-4 text-xl font-semibold tracking-tight">Application sent</h3>
        <p className="mt-2 text-[14.5px] text-ink-muted">
          Thanks for applying to the {role.title.toLowerCase()} team — we&rsquo;ll be in touch
          over email within a week.
        </p>
        <Button className="mt-6" onClick={onDone}>
          Done
        </Button>
      </div>
    );
  }

  return (
    <>
      <DialogTitle>Apply — {role.title}</DialogTitle>
      <DialogDescription>{role.commitment}</DialogDescription>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
        <div>
          <Label>Full name</Label>
          <Input placeholder="Your name" invalid={!!errors.fullName} {...register("fullName")} />
          {errors.fullName && <p className="mt-1.5 text-[12.5px] text-rust">{errors.fullName.message}</p>}
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <p className="mt-1.5 text-[12.5px] text-rust">{errors.email.message}</p>}
        </div>
        <div>
          <Label>Why this role?</Label>
          <Textarea
            placeholder={`Tell us why you'd be a good fit for the ${role.title.toLowerCase()} team...`}
            invalid={!!errors.message}
            {...register("message")}
          />
          {errors.message && <p className="mt-1.5 text-[12.5px] text-rust">{errors.message.message}</p>}
        </div>

        {serverError && <p className="text-[13.5px] text-rust">{serverError}</p>}

        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            "Submit application"
          )}
        </Button>
      </form>
    </>
  );
}
