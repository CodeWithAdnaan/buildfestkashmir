export interface GalleryItem {
  id: string;
  caption: string;
  gradient: string; // tailwind from/to classes — used as fallback if no src
  src?: string;     // real photo path, e.g. "/gallery/hackdays-2025/hd-1.jpg"
  alt?: string;     // accessible alt text
  span: "sm" | "md" | "lg"; // controls tile height in the masonry
  isVideo?: boolean;
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  eventSlug?: string; // links back to /events/[slug] when relevant
  date: string; // display string, e.g. "December 2025"
  items: GalleryItem[];
}
