export interface Partner {
  name: string;
  tier: "Title" | "Gold" | "Silver" | "Community";
  description: string;
  url: string;
}

export const partnerDirectory: Partner[] = [
  {
    name: "MAJOR LEAGUE HACKING",
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
    name: "GOOGLE GEMINI",
    tier: "Gold",
    description: "Technology and AI partner, providing free ai and api to students of every possible  google platform.",
    url: "https://gemini.google.com",
  },
  {
    name: "Hack2Skill",
    tier: "Silver",
    description: "providing winning kits and prize money for young developers.",
    url: "https://hack2skill.com",
  },
  {
    name: "CASET College",
    tier: "Community",
    description: "Hosts HACKDAYS Srinagar on campus every year, including overnight space.",
    url: "https://buildfestkashmir.xyz",
  },
  {
    name: "MASTRA AI",
    tier: "Community",
    description: "Provides educations materials and even hard copy of books and other goddiees for every single participant",
    url: "https://mastra.ai",
  },
  {
    name: "Kashmir University",
    tier: "Community",
    description: "Hosted BuildFest Demo Day 2026 in their Convocation Hall.",
    url: "https://buildfestkashmir.xyz",
  },
  {
    name: "WEBRYX.IN",
    tier: "Community",
    description: "Core company behind buildfest-kashmir ",
    url: "https://webryx.in",
  },
];

export const tierOrder: Partner["tier"][] = ["Title", "Gold", "Silver", "Community"];
