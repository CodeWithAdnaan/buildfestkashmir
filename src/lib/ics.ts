interface IcsEventInput {
  title: string;
  description: string;
  location: string;
  startIso: string;
  endIso: string;
}

function toIcsDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/** Builds a downloadable .ics calendar file data URL for a given event. */
export function buildIcsDataUrl(event: IcsEventInput) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BuildFest Kashmir//Registration//EN",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@buildfestkashmir.xyz`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${toIcsDate(event.startIso)}`,
    `DTEND:${toIcsDate(event.endIso)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
