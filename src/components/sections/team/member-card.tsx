import Link from "next/link";
import Image from "next/image";
import { BentoCard } from "@/components/shared/bento-card";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
} from "@/components/shared/social-icons";
import type { TeamMember } from "@/types/member";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
} as const;

export function MemberCard({ member }: { member: TeamMember }) {
  const socialEntries = Object.entries(member.socials) as [keyof typeof socialIcons, string][];

  return (
    <BentoCard glow="saffron">
      <div className="flex h-full flex-col items-center text-center">
        <div
          className={`relative mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br font-mono text-lg font-medium text-ink transition-transform duration-500 group-hover:scale-110 ${member.gradient}`}
        >
          {member.image ? (
            <Image src={member.image} alt={member.name} fill className="object-cover" />
          ) : (
            member.initials
          )}
        </div>
        <h3 className="font-semibold tracking-tight">{member.name}</h3>
        <p className="mt-1 font-mono text-[11.5px] tracking-wide text-saffron">{member.role}</p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">{member.bio}</p>

        {socialEntries.length > 0 && (
          <div className="mt-5 flex justify-center gap-2 border-t border-border pt-4">
            {socialEntries.map(([platform, url]) => {
              const Icon = socialIcons[platform];
              return (
                <Link
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-canvas-overlay text-ink-muted transition-colors hover:bg-saffron hover:text-[#1a1103]"
                  aria-label={`${member.name} on ${platform}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </BentoCard>
  );
}
