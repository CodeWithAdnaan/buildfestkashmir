import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { PillBadge } from "@/components/shared/pill-badge";
import { BentoCard } from "@/components/shared/bento-card";
import { partnerDirectory, tierOrder, type Partner } from "@/lib/constants/partner-directory";

export function PartnerTierSections() {
  return (
    <>
      {tierOrder.map((tier) => {
        const partners = partnerDirectory.filter((p) => p.tier === tier);
        if (partners.length === 0) return null;
        return <TierBlock key={tier} tier={tier} partners={partners} />;
      })}
    </>
  );
}

function TierBlock({ tier, partners }: { tier: Partner["tier"]; partners: Partner[] }) {
  return (
    <section className="py-8 sm:py-10">
      <div className="container-content">
        <Reveal className="mb-6">
          <PillBadge dot={tier === "Title"} className="mb-3">
            {tier.toUpperCase()} PARTNERS
          </PillBadge>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <Reveal key={partner.name}>
              <BentoCard glow={tier === "Title" ? "saffron" : "none"} className="h-full">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold tracking-tight">{partner.name}</h3>
                  <Link href={partner.url} target="_blank" rel="noreferrer">
                    <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors hover:text-saffron" />
                  </Link>
                </div>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-muted">
                  {partner.description}
                </p>
              </BentoCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
