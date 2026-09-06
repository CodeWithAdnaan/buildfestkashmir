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
    slug: "promptwars-x-hackdays-srinagar-v2",
    name: "PromptWars X Hackdays Srinagar v2.0",
    tagline: "The Ultimate AI Prompting & Building Sprint in J&K.",
    status: "upcoming",
    isTentative: true,
    dateLabel: "Dates Announcing Soon",
    venueLabel: "Srinagar, J&K",
    bannerImage: "/events/promptwars-hackdays-v2-banner.png",
    description: "PromptWars X Hackdays Srinagar v2.0 is coming soon. Teams cannot register yet — official dates, tracks, and prize pools will be announced shortly.",
    overview: "PromptWars X Hackdays Srinagar v2.0 brings together prompt engineering, AI agent architectures, and rapid product development into one high-octane build sprint in Srinagar. Registration is not open yet — stay tuned!",
    venue: "Srinagar, J&K",
    city: "Srinagar",
    startDate: "2026-10-01T09:00:00+05:30",
    endDate: "2026-10-02T18:00:00+05:30",
    prizePool: "Announcing Soon",
    teamSize: "2–4 builders",
    registrationOpen: false,
    themes: ["Prompt Engineering", "AI Agents", "LLM Systems", "Rapid Building", "Open Track"],
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
