import type { TeamMember } from "@/types/member";

export const teamMembers: TeamMember[] = [
  {
    id: "adnan-farooq",
    name: "Adnan Farooq",
    role: "Founder & Lead",
    team: "Leadership",
    bio: "Founded BuildFest Kashmir with his two friends despite not being in college. Leads the community's vision and execution.",
    initials: "AF",
    gradient: "from-saffron/50 to-pine-glow/40",
    image: "/team/adnan.jpg",
    socials: { github: "https://github.com/CodeWithAdnaan", linkedin: "https://www.linkedin.com/in/adnan-farooq-codewithadnaan" },
  },
  {
    id: "mohammad-mushtaq",
    name: "Mohammad Mushtaq",
    role: "Founder & Operations",
    team: "Operations",
    bio: "Co-founded BuildFest Kashmir and handles all the crucial ground operations, all while balancing his college studies.",
    initials: "MM",
    gradient: "from-pine-glow/45 to-saffron/35",
    image: "/team/mushtaq.png",
    socials: { github: "https://github.com/sofimushtaq445-a11y", linkedin: "https://linkedin.com/in/mohammadmushtaq" },
  },
  {
    id: "mehraan-amin",
    name: "Mehraan Amin",
    role: "Founder",
    team: "Leadership",
    bio: "Co-founded BuildFest Kashmir with Adnan and Mushtaq. Balances his college coursework with driving the community forward.",
    initials: "MA",
    gradient: "from-saffron/40 to-pine-glow/50",
    image: "/team/mehraan.png",
    socials: { github: "https://github.com/CodeWithMehru", linkedin: "https://www.linkedin.com/in/code-with-mehru-8267a4330/" },
  },
];

export const teamGroups = ["Leadership", "Technical", "Design", "Operations", "Marketing", "Community"] as const;
