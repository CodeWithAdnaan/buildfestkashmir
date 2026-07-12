"use client";

import { useState } from "react";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { RoleCard } from "@/components/sections/team-join/role-card";
import { ApplicationDialog } from "@/components/sections/team-join/application-dialog";
import { teamRoles, type TeamRole } from "@/lib/constants/roles";

export function RolesGrid() {
  const [selectedRole, setSelectedRole] = useState<TeamRole | null>(null);

  return (
    <section className="pb-24 pt-40 sm:pt-48">
      <div className="container-content">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <PillBadge className="mb-5">JOIN THE TEAM</PillBadge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Help run the ecosystem.
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-muted">
            BuildFest is run entirely by students. Pick a role below — every
            application gets a real reply, not a form-letter rejection.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teamRoles.map((role) => (
            <Reveal key={role.id}>
              <RoleCard role={role} onSelect={() => setSelectedRole(role)} />
            </Reveal>
          ))}
        </div>
      </div>

      <ApplicationDialog
        role={selectedRole}
        onOpenChange={(open) => !open && setSelectedRole(null)}
      />
    </section>
  );
}
