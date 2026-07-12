import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, InstagramIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/constants/site";

// Srinagar bounding box — OpenStreetMap's embed doesn't require an API key,
// unlike Google Maps, so this works without any credentials configured.
const OSM_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=74.7373%2C34.0437%2C74.8573%2C34.1237&layer=mapnik&marker=34.0837%2C74.7973";

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="glass rounded-2xl p-7 sm:p-8">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-saffron" />
          <div>
            <div className="font-medium">{siteConfig.location}</div>
            <div className="mt-1 text-[13.5px] text-ink-muted">
              We don&rsquo;t have a permanent office — most meetings happen on partner campuses.
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-start gap-3 border-t border-border pt-5">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-saffron" />
          <Link
            href={`mailto:${siteConfig.email}`}
            className="font-medium transition-colors hover:text-saffron"
          >
            {siteConfig.email}
          </Link>
        </div>
        <div className="mt-5 flex items-center gap-2 border-t border-border pt-5">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas-overlay text-ink-muted transition-colors hover:bg-saffron hover:text-[#1a1103]"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </Link>
          <Link
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas-overlay text-ink-muted transition-colors hover:bg-saffron hover:text-[#1a1103]"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        <iframe
          title="BuildFest Kashmir — Srinagar"
          src={OSM_EMBED_SRC}
          className="h-64 w-full grayscale invert-[0.92] contrast-[1.05] sm:h-72"
          loading="lazy"
        />
      </div>
    </div>
  );
}
