import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/constants/team";

export function LeadershipTeaser() {
  const leadership = teamMembers.filter((m) => m.team === "Leadership");

  return (
    <section className="py-10 sm:py-14">
      <div className="container-content">
        <Reveal className="glass flex flex-col items-center gap-6 rounded-2xl p-9 text-center sm:p-12">
          <PillBadge dot={false}>LEADERSHIP</PillBadge>
          <div className="flex -space-x-3">
            {teamMembers.slice(0, 5).map((member) => (
              <div
                key={member.id}
                className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-canvas bg-gradient-to-br font-mono text-[12px] font-medium ${member.gradient}`}
              >
                {member.image ? (
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                ) : (
                  member.initials
                )}
              </div>
            ))}
          </div>
          <h2 className="max-w-md text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Led by Adnan Farooq, Mehran Amin, Mohammad Mushtaq and others
          </h2>
          <Button asChild variant="ghost">
            <Link href="/team">
              Meet the full team <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
