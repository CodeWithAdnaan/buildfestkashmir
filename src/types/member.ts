export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: "Leadership" | "Technical" | "Design" | "Operations" | "Marketing" | "Community";
  bio: string;
  initials: string;
  gradient: string; // tailwind gradient classes for the avatar
  image?: string; // path to the member's photo
  socials: SocialLinks;
}
