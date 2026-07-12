import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Palette,
  ClipboardList,
  Megaphone,
  Camera,
  Video,
  HeartHandshake,
  Users,
} from "lucide-react";

export interface TeamRole {
  id: string;
  title: string;
  description: string;
  commitment: string;
  icon: LucideIcon;
  size: "lg" | "md";
}

export const teamRoles: TeamRole[] = [
  {
    id: "technical",
    title: "Technical",
    description:
      "Build and maintain the platforms BuildFest runs on — this website, the registration pipeline, internal tools, and event-day infrastructure.",
    commitment: "4–6 hrs/week, more during event season",
    icon: Code2,
    size: "lg",
  },
  {
    id: "design",
    title: "Design",
    description:
      "Own the visual identity — event branding, social templates, and product design for everything the community ships.",
    commitment: "3–5 hrs/week",
    icon: Palette,
    size: "md",
  },
  {
    id: "operations",
    title: "Operations",
    description:
      "Run the logistics behind every event — venue coordination, vendor management, budgets, and the checklist nobody sees but everyone relies on.",
    commitment: "4–6 hrs/week, more during event season",
    icon: ClipboardList,
    size: "md",
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Get the word out — social content, campus outreach, and partnerships with college tech clubs across the valley.",
    commitment: "3–4 hrs/week",
    icon: Megaphone,
    size: "md",
  },
  {
    id: "photography",
    title: "Photography",
    description: "Shoot every event — the real, unscripted moments, not stock-photo energy.",
    commitment: "Event-day only",
    icon: Camera,
    size: "md",
  },
  {
    id: "videography",
    title: "Videography",
    description: "Capture and edit aftermovies, speaker talks, and short-form recap content.",
    commitment: "Event-day + 1 week post-production",
    icon: Video,
    size: "md",
  },
  {
    id: "hospitality",
    title: "Hospitality",
    description:
      "Make sure every attendee is fed, comfortable, and taken care of for 36 straight hours.",
    commitment: "Event-day only",
    icon: HeartHandshake,
    size: "md",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description:
      "General event-day support — registration desk, mentor rotations, crowd flow, whatever the day needs.",
    commitment: "Event-day only, flexible",
    icon: Users,
    size: "md",
  },
];
