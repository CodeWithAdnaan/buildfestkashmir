import type { BuildFestEvent } from "@/types/event";

export const events: BuildFestEvent[] = [
  {
    slug: "hackdays-srinagar-2026",
    name: "HACKDAYS - 2026",
    tagline: "One day. One campus. Zero excuses.",
    status: "past",
    description:
      "A one-day offline build sprint. A room full of people building something real, shipping it, and demoing it.",
    overview:
      "HACKDAYS is our flagship offline event — a concentrated one-day build sprint for students across Jammu & Kashmir. Teams gathered to pick a track, build throughout the day, and present live on stage.",
    venue: "CASET College, Srinagar",
    city: "Srinagar",
    startDate: "2026-04-03T09:00:00+05:30",
    endDate: "2026-04-03T20:00:00+05:30", // One day event
    prizePool: "Hardware, Swag & Pro Tools",
    teamSize: "2–4 builders",
    registrationOpen: false,
    attendees: 184,
    projectsShipped: 42,
    themes: ["AI & Agents", "Civic Tech", "Rural Access", "Developer Tools", "Open Track"],
    schedule: [
      { time: "09:00", title: "Check-in & team formation", description: "Opening keynote and theme reveal." },
      { time: "10:00", title: "Building begins", description: "Mentors rotate through the floor." },
      { time: "16:00", title: "Submissions close", description: "Push your final commit, record your demo video." },
      { time: "17:00", title: "Live demos", description: "Every team gets 3 minutes on stage." },
      { time: "19:00", title: "Awards & closing", description: "Winners announced, group photo." },
    ],
    speakers: [
      { 
        name: "Adnan Farooq", 
        role: "Ethical Hacker, Gen AI Engineer, Founder of Webryx.in", 
        org: "BuildFest Kashmir",
        image: "/team/adnan.jpg" 
      },
    ],
    mentors: [
      { 
        name: "Adnan Farooq", 
        expertise: "Full Stack Web & App Developer",
        image: "/team/adnan.jpg" 
      },
      { 
        name: "Mehraan Amin", 
        expertise: "Ethical Hacker, Cloud Engineer, Founder websec.ai, Full Stack Dev",
        image: "/team/mehraan.png" 
      },
      { 
        name: "Mohammad Mushtaq", 
        expertise: "Ethical Hacker, Co-founder webryx.in, Backend Engineer, Full Stack Dev",
        image: "/team/mushtaq.png" 
      },
      { 
        name: "Aqib Javaid Bhat", 
        expertise: "GitHub Campus Expert, Domain Expert",
        image: "/team/aaqib.png"
      },
    ],
    sponsors: [
      { name: "Major League Hacking (MLH)", tier: "Title" },
      { name: "Google Gemini", tier: "Gold" },
      { name: "Devpost", tier: "Gold" },
      { name: "EMLY Labs Academy", tier: "Community" },
      { name: "Mastra AI", tier: "Community" },
      { name: "GitHub Education", tier: "Community" },
      { name: "CASET College", tier: "Community" },
    ],
    prizes: [
      { place: "Hardware & Books", amount: "M5 Stack, Principles & Patterns of Building AI Agents" },
      { place: "Pro Access", amount: "Gemini API, Google Studio, 1500 AI Tools" },
      { place: "Swag & Certs", amount: "Certificates, T-shirts, Stickers, Copilot pins" },
    ],
    galleryTiles: 17,
  },
  {
    slug: "upcoming-hackathon",
    name: "SOMETHING IS COMING",
    tagline: "A new hackathon. Revealing September 2026.",
    status: "upcoming",
    isTentative: true,
    dateLabel: "Revealing September 2026",
    venueLabel: "Srinagar",
    description: "We're planning our next big hackathon. Details, theme, tracks, and registrations drop in September — stay tuned.",
    overview: "Something is being built. We can't say what yet. What we can say: it's happening in Srinagar, it'll be bigger, and registrations open in September 2026. Follow us on Instagram and Discord to be the first to know.",
    venue: "Srinagar",
    city: "Srinagar",
    startDate: "2026-09-01T09:00:00+05:30",
    endDate: "2026-09-03T18:00:00+05:30",
    prizePool: "TBA",
    teamSize: "TBA",
    registrationOpen: false,
    themes: ["To Be Revealed"],
    schedule: [],
    speakers: [],
    mentors: [],
    sponsors: [],
    prizes: [],
    galleryTiles: 0
  }
];

export function getUpcomingEvents() {
  return events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export function getPastEvents() {
  return events
    .filter((e) => e.status === "past")
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

/** The event shown in the home page bento grid — soonest upcoming event. */
export const featuredEvent = getUpcomingEvents()[0];
