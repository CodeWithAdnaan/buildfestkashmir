"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepIndicator } from "@/components/sections/registration/step-indicator";
import { Confirmation } from "@/components/sections/registration/confirmation";
import {
  registrationSchema,
  registrationStepFields,
  registrationDefaultValues,
  type RegistrationValues,
} from "@/lib/validations/registration";
import { registerForEvent } from "@/app/events/[slug]/register/actions";
import type { BuildFestEvent } from "@/types/event";

const TOTAL_STEPS = 4;

export function RegistrationForm({ event }: { event: BuildFestEvent }) {
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [result, setResult] = useState<{ id: string; name: string } | null>(null);

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: registrationDefaultValues,
    mode: "onBlur",
  });

  const {
    register,
    trigger,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  async function goNext() {
    const fields = registrationStepFields[step];
    const valid = fields ? await trigger(fields) : true;
    if (valid) setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function onSubmit(values: RegistrationValues) {
    setServerError(null);
    startTransition(async () => {
      const res = await registerForEvent(event.slug, values);
      if (!res.success || !res.registrationId) {
        setServerError(res.error ?? "Something went wrong. Please try again.");
        return;
      }
      setResult({ id: res.registrationId, name: values.fullName });
    });
  }

  if (result) {
    return <Confirmation event={event} registrationId={result.id} fullName={result.name} />;
  }

  // eslint-disable-next-line react-hooks/incompatible-library -- react-hook-form's watch() is safe here; this component isn't relying on compiler memoization
  const values = watch();

  return (
    <div className="glass mx-auto max-w-xl rounded-2xl p-6 sm:p-9">
      <StepIndicator current={step} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepShell key="personal">
              <Field label="Full name" error={errors.fullName?.message}>
                <Input placeholder="Adnan Wani" invalid={!!errors.fullName} {...register("fullName")} />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  invalid={!!errors.email}
                  {...register("email")}
                />
              </Field>
            </StepShell>
          )}

          {step === 1 && (
            <StepShell key="academic">
              <Field label="College" error={errors.college?.message}>
                <Input
                  placeholder="CASET College"
                  invalid={!!errors.college}
                  {...register("college")}
                />
              </Field>
              <Field label="Branch / course" error={errors.branch?.message}>
                <Input
                  placeholder="Computer Science"
                  invalid={!!errors.branch}
                  {...register("branch")}
                />
              </Field>
              <Field label="Experience level" error={errors.experienceLevel?.message}>
                <Select
                  value={values.experienceLevel}
                  onValueChange={(v) =>
                    setValue("experienceLevel", v as RegistrationValues["experienceLevel"], {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner — first hackathon</SelectItem>
                    <SelectItem value="intermediate">Intermediate — built a few projects</SelectItem>
                    <SelectItem value="advanced">Advanced — shipped production code</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell key="links">
              <Field label="Team name (optional)" error={errors.teamName?.message}>
                <Input placeholder="Leave blank if solo" {...register("teamName")} />
              </Field>
              <Field label="GitHub profile (optional)" error={errors.githubUrl?.message}>
                <Input placeholder="https://github.com/username" {...register("githubUrl")} />
              </Field>
              <Field label="LinkedIn profile (optional)" error={errors.linkedinUrl?.message}>
                <Input placeholder="https://linkedin.com/in/username" {...register("linkedinUrl")} />
              </Field>
              <Field label="Discord handle (optional)" error={errors.discordHandle?.message}>
                <Input placeholder="username" {...register("discordHandle")} />
              </Field>
            </StepShell>
          )}

          {step === 3 && (
            <StepShell key="review">
              <p className="mb-5 font-mono text-[11.5px] uppercase tracking-wide text-ink-muted">
                Review before you submit
              </p>
              <div className="space-y-3 rounded-lg bg-canvas-overlay/60 p-4 text-[14px]">
                <ReviewRow label="Name" value={values.fullName} />
                <ReviewRow label="Email" value={values.email} />
                <ReviewRow label="College" value={values.college} />
                <ReviewRow label="Branch" value={values.branch} />
                <ReviewRow label="Experience" value={values.experienceLevel} />
                {values.teamName && <ReviewRow label="Team" value={values.teamName} />}
              </div>
              {serverError && (
                <p className="mt-4 text-[13.5px] text-rust">{serverError}</p>
              )}
            </StepShell>
          )}
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={goBack} disabled={isPending}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : (
            <span />
          )}

          {step < TOTAL_STEPS - 1 ? (
            <Button type="button" onClick={goNext}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>Submit registration</>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
      className="flex flex-col gap-5"
    >
      {children}
    </motion.div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {error && <p className="mt-1.5 text-[12.5px] text-rust">{error}</p>}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
      <span className="text-ink-faint">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
