export interface Partner {
  name: string;
  tier: "Title" | "Gold" | "Silver" | "Community";
  description: string;
  url: string;
}

export const partnerDirectory: Partner[] = [
  {
    name: "Devfolio",
    tier: "Title",
    description: "Title sponsor for HACKDAYS since 2026 — hosts our registration and judging platform.",
    url: "https://devfolio.co",
  },
  {
    name: "GitHub Education",
    tier: "Gold",
    description: "Provides GitHub Pro accounts and Copilot access to every registered student.",
    url: "https://education.github.com",
  },
  {
    name: "Vercel",
    tier: "Gold",
    description: "Hosting partner — every team's hackathon project gets a free Vercel deployment.",
    url: "https://vercel.com",
  },
  {
    name: "Supabase",
    tier: "Silver",
    description: "Backend partner, and where two of our own mentors work as product engineers.",
    url: "https://supabase.com",
  },
  {
    name: "CASET College",
    tier: "Community",
    description: "Hosts HACKDAYS Srinagar on campus every year, including overnight space.",
    url: "https://buildfestkashmir.org",
  },
  {
    name: "NIT Srinagar",
    tier: "Community",
    description: "Hosts our Innovation Lab for the quarterly Open Source Sprint.",
    url: "https://buildfestkashmir.org",
  },
  {
    name: "Kashmir University",
    tier: "Community",
    description: "Hosted BuildFest Demo Day 2026 in their Convocation Hall.",
    url: "https://buildfestkashmir.org",
  },
  {
    name: "IUST",
    tier: "Community",
    description: "Hosted the Winter Workshop Series across six evening sessions.",
    url: "https://buildfestkashmir.org",
  },
];

export const tierOrder: Partner["tier"][] = ["Title", "Gold", "Silver", "Community"];
