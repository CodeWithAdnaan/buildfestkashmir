import type { GalleryAlbum } from "@/types/gallery";

const g = [
  "from-[#3a5c48] to-[#16302a]",
  "from-[#4a3a26] to-[#1c1710]",
  "from-[#33574a] to-[#122320]",
  "from-[#5c4426] to-[#241a0e]",
  "from-[#2f5142] to-[#0f211b]",
  "from-[#46381f] to-[#1d1710]",
  "from-[#274b3f] to-[#0d1e19]",
  "from-[#5a3c2e] to-[#231710]",
];

export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: "hackdays-srinagar-2026",
    title: "HACKDAYS - 2026",
    eventSlug: "hackdays-srinagar-2026",
    date: "April 2026",
    items: [
      { id: "hd26-1", caption: "Opening ceremony", gradient: g[3], span: "lg", src: "/gallery/hackdays-2025/hd-1.jpg" },
      { id: "hd26-2", caption: "Team Ladakh, midnight debugging", gradient: g[4], span: "sm", src: "/gallery/hackdays-2025/hd-2.jpg" },
      { id: "hd26-3", caption: "Mentor rounds, Day 2", gradient: g[5], span: "md", src: "/gallery/hackdays-2025/hd-3.jpg" },
      { id: "hd26-4", caption: "Final demos on stage", gradient: g[6], span: "lg", isVideo: true, src: "/gallery/hackdays-2025/hd-4.jpg" },
      { id: "hd26-5", caption: "Winning team, KashEdu", gradient: g[7], span: "sm", src: "/gallery/hackdays-2025/hd-5.jpg" },
      { id: "hd26-6", caption: "Community meetup", gradient: g[0], span: "md", src: "/gallery/hackdays-2025/hd-6.jpg" },
      { id: "hd26-7", caption: "Late night coding", gradient: g[1], span: "sm", src: "/gallery/hackdays-2025/hd-7.jpg" },
      { id: "hd26-8", caption: "Group photo", gradient: g[2], span: "lg", src: "/gallery/hackdays-2025/hd-8.jpg" },
      { id: "hd26-9", caption: "Brainstorming session", gradient: g[3], span: "md", src: "/gallery/hackdays-2025/hd-9.jpg" },
      { id: "hd26-10", caption: "Presenting the idea", gradient: g[4], span: "sm", src: "/gallery/hackdays-2025/hd-10.jpg" },
      { id: "hd26-11", caption: "Focus mode", gradient: g[5], span: "lg", src: "/gallery/hackdays-2025/hd-11.jpg" },
      { id: "hd26-12", caption: "Pizza break", gradient: g[6], span: "sm", src: "/gallery/hackdays-2025/hd-12.jpg" },
      { id: "hd26-13", caption: "Sponsor booth", gradient: g[7], span: "md", src: "/gallery/hackdays-2025/hd-13.jpg" },
      { id: "hd26-14", caption: "Winner announcement", gradient: g[0], span: "lg", src: "/gallery/hackdays-2025/hd-14.jpg" },
      { id: "hd26-15", caption: "Debugging together", gradient: g[1], span: "sm", src: "/gallery/hackdays-2025/hd-15.jpg" },
      { id: "hd26-16", caption: "Morning coffee", gradient: g[2], span: "md", src: "/gallery/hackdays-2025/hd-16.jpg" },
      { id: "hd26-17", caption: "Event highlights reel", gradient: g[3], span: "lg", isVideo: true, src: "/gallery/hackdays-2025/hackdays-sgr-2026.mp4" },
    ],
  }
];
