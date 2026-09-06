export type EventStatus = "upcoming" | "past";

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface Speaker {
  name: string;
  role: string;
  org: string;
  image?: string;
}

export interface Mentor {
  name: string;
  expertise: string;
  image?: string;
}

export interface Sponsor {
  name: string;
  tier: "Title" | "Gold" | "Silver" | "Community";
}

export interface Prize {
  place: string;
  amount: string;
  note?: string;
}

export interface BuildFestEvent {
  slug: string;
  name: string;
  tagline: string;
  status: EventStatus;
  description: string;
  overview: string;
  venue: string;
  city: string;
  startDate: string; // ISO
  endDate: string; // ISO
  prizePool: string;
  teamSize: string;
  registrationOpen: boolean;
  themes: string[];
  schedule: ScheduleItem[];
  speakers: Speaker[];
  mentors: Mentor[];
  sponsors: Sponsor[];
  prizes: Prize[];
  galleryTiles: number;
  attendees?: number;
  projectsShipped?: number;
  isTentative?: boolean;
  dateLabel?: string;
  venueLabel?: string;
  bannerImage?: string;
}
