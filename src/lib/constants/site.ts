export const siteConfig = {
  name: "BuildFest Kashmir",
  shortName: "BuildFest",
  tagline: "Build. Innovate. Inspire.",
  description:
    "Kashmir's student developer community — hackathons, workshops, open-source, and startups, built by students, for students.",
  url: "https://buildfestkashmir.xyz",
  location: "Srinagar, Jammu & Kashmir",
  email: "contact@buildfestkashmir.xyz",
  founded: 2023,
  links: {
    instagram: "https://instagram.com/buildfestkashmir",
    github: "https://github.com/CodeWithAdnaan/buildfestkashmir",
    discord: "https://discord.gg/buildfestkashmir",
    twitter: "https://twitter.com/buildfestkmr",
  },
} as const;

export const mainNav = [
  { label: "Community", href: "/community" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Partners", href: "/partners" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
