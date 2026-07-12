import Link from "next/link";
import Image from "next/image";
import { siteConfig, mainNav } from "@/lib/constants/site";
import { featuredEvent } from "@/lib/constants/events";

const exploreLinks = mainNav.slice(0, 4);

const connectLinks = [
  { label: "Instagram", href: siteConfig.links.instagram },
  { label: "GitHub", href: siteConfig.links.github },
  { label: "Discord", href: siteConfig.links.discord },
  { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
];

export function SiteFooter() {
  const registerHref = featuredEvent ? `/events/${featuredEvent.slug}/register` : "/events";
  const involvedLinks = [
    { label: "Register", href: registerHref },
    { label: "Join the team", href: "/team/join" },
    { label: "Partner with us", href: "/partners" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <footer className="relative border-t border-border bg-canvas-raised/40 py-20 pb-8">
      <div className="container-content">
        <div className="grid grid-cols-1 gap-10 border-b border-border pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <div className="mb-4 flex items-center gap-2.5 font-semibold text-ink">
              <Image src="/logo.png" alt="BuildFest logo" width={28} height={28} className="rounded-full shrink-0" />
              {siteConfig.name}
            </div>
            <p className="max-w-[32ch] text-[14.5px] leading-relaxed text-ink-muted">
              A student-run developer community based in {siteConfig.location.split(",")[0]},
              building the valley&rsquo;s first real tech ecosystem — one hackathon at a time.
            </p>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Get involved" links={involvedLinks} />
          <FooterColumn title="Connect" links={connectLinks} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 font-mono text-xs text-ink-faint">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Built by students, for students.
          </span>
          <span>{siteConfig.location}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-5 font-mono text-[11.5px] uppercase tracking-wider text-saffron">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[14.5px] text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
