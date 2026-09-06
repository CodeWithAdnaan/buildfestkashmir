import Image from "next/image";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/shared/social-icons";
import { teamMembers } from "@/lib/constants/team";

interface AuthorBioProps {
  authorName: string;
  authorRole: string;
}

export function AuthorBio({ authorName, authorRole }: AuthorBioProps) {
  // Try to match author in team data
  const member = teamMembers.find(
    (m) => m.name.toLowerCase() === authorName.toLowerCase(),
  );

  const initials =
    member?.initials ||
    authorName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

  const bio =
    member?.bio ||
    `Core contributor & engineer at BuildFest Kashmir. Passionate about local-first systems and empowering developer communities.`;

  return (
    <div className="my-12 rounded-2xl border border-border bg-canvas-raised/40 p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Avatar */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border/80 bg-canvas-raised">
          {member?.image ? (
            <Image
              src={member.image}
              alt={authorName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-lg font-semibold text-saffron">
              {initials}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-ink">{authorName}</h3>
              <p className="font-mono text-[12px] text-ink-muted">{authorRole}</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {member?.socials.github && (
                <Link
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border bg-canvas/60 p-2 text-ink-muted transition-colors hover:border-saffron/40 hover:text-ink"
                  aria-label={`${authorName}'s GitHub`}
                >
                  <GithubIcon className="h-4 w-4" />
                </Link>
              )}
              {member?.socials.linkedin && (
                <Link
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border bg-canvas/60 p-2 text-ink-muted transition-colors hover:border-saffron/40 hover:text-ink"
                  aria-label={`${authorName}'s LinkedIn`}
                >
                  <LinkedinIcon className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{bio}</p>
        </div>
      </div>
    </div>
  );
}
