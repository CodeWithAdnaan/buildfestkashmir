"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { CalendarPlus, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildIcsDataUrl } from "@/lib/ics";
import type { BuildFestEvent } from "@/types/event";

interface ConfirmationProps {
  event: BuildFestEvent;
  registrationId: string;
  fullName: string;
}

export function Confirmation({ event, registrationId, fullName }: ConfirmationProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const ticketPayload = JSON.stringify({
      reg: registrationId,
      event: event.slug,
      name: fullName,
    });
    QRCode.toDataURL(ticketPayload, {
      margin: 1,
      width: 200,
      color: { dark: "#0a0d0c", light: "#f0a53d" },
    }).then(setQrDataUrl);
  }, [registrationId, event.slug, fullName]);

  const icsHref = buildIcsDataUrl({
    title: event.name,
    description: event.description,
    location: event.venue,
    startIso: event.startDate,
    endIso: event.endDate,
  });

  return (
    <div className="glass mx-auto max-w-lg rounded-2xl p-8 text-center sm:p-10">
      <CheckCircle2 className="mx-auto h-12 w-12 text-saffron" />
      <h2 className="mt-5 text-2xl font-semibold tracking-tight">You&rsquo;re registered!</h2>
      <p className="mt-2 text-[14.5px] text-ink-muted">
        {fullName}, we&rsquo;ve saved your spot for {event.name}. A confirmation email is on its
        way.
      </p>

      <div className="my-8 flex flex-col items-center gap-3">
        <div className="rounded-xl bg-canvas-overlay p-4">
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrDataUrl} alt="Registration QR ticket" className="h-40 w-40" />
          ) : (
            <div className="h-40 w-40 animate-pulse rounded-lg bg-canvas-overlay" />
          )}
        </div>
        <span className="font-mono text-[11px] tracking-wide text-ink-faint">
          TICKET ID · {registrationId.slice(0, 8).toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild variant="ghost">
          <a href={icsHref} download={`${event.slug}.ics`}>
            <CalendarPlus className="h-4 w-4" /> Add to calendar
          </a>
        </Button>
        <Button asChild>
          <Link href="/events">
            <ArrowLeft className="h-4 w-4" /> Back to Events
          </Link>
        </Button>
      </div>
    </div>
  );
}
