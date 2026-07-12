"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactValues } from "@/lib/validations/contact";
import { sendContactMessage } from "@/app/contact/actions";

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: defaultSubject,
      message: "",
    },
  });

  function onSubmit(values: ContactValues) {
    setServerError(null);
    startTransition(async () => {
      const res = await sendContactMessage(values);
      if (!res.success) {
        setServerError(res.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    });
  }

  if (submitted) {
    return (
      <div className="glass flex h-full flex-col items-center justify-center rounded-2xl p-9 text-center">
        <CheckCircle2 className="h-11 w-11 text-saffron" />
        <h3 className="mt-4 text-xl font-semibold tracking-tight">Message sent</h3>
        <p className="mt-2 max-w-xs text-[14.5px] text-ink-muted">
          Thanks for reaching out — we typically reply within 2-3 days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass flex flex-col gap-4 rounded-2xl p-7 sm:p-9">
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
        <Label>Subject</Label>
        <Input placeholder="What's this about?" invalid={!!errors.subject} {...register("subject")} />
        {errors.subject && <p className="mt-1.5 text-[12.5px] text-rust">{errors.subject.message}</p>}
      </div>
      <div>
        <Label>Message</Label>
        <Textarea
          placeholder="Tell us a bit more..."
          invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && <p className="mt-1.5 text-[12.5px] text-rust">{errors.message.message}</p>}
      </div>

      {serverError && <p className="text-[13.5px] text-rust">{serverError}</p>}

      <Button type="submit" disabled={isPending} className="mt-2 w-fit">
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send message
          </>
        )}
      </Button>
    </form>
  );
}
