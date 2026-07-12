import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { MemberCard } from "@/components/sections/team/member-card";
import { teamMembers, teamGroups } from "@/lib/constants/team";

export function TeamGrid() {
  return (
    <section className="pb-24 pt-40 sm:pt-48">
      <div className="container-content">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <PillBadge className="mb-5">THE TEAM</PillBadge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Run entirely by students.
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-muted">
            No full-time staff, no office — just {teamMembers.length} people across{" "}
            {teamGroups.length} teams who show up because they care about the ecosystem.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <Reveal key={member.id} delay={(i % 4) * 0.05}>
              <MemberCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
