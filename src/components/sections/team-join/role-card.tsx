import { ArrowUpRight } from "lucide-react";
import { BentoCard } from "@/components/shared/bento-card";
import { cn } from "@/lib/utils";
import type { TeamRole } from "@/lib/constants/roles";

export function RoleCard({ role, onSelect }: { role: TeamRole; onSelect: () => void }) {
  const Icon = role.icon;
  return (
    <BentoCard
      glow="saffron"
      onClick={onSelect}
      className={cn(role.size === "lg" && "sm:col-span-2")}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-canvas-overlay">
          <Icon className="h-5 w-5 text-saffron" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-saffron" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{role.title}</h3>
      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-muted">{role.description}</p>
      <div className="mt-5 border-t border-border pt-4 font-mono text-[11px] tracking-wide text-ink-faint">
        {role.commitment.toUpperCase()}
      </div>
    </BentoCard>
  );
}
