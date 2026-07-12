import { PillBadge } from "@/components/shared/pill-badge";
import { Reveal } from "@/components/shared/reveal";

export function CommunityHero() {
  return (
    <section className="pb-6 pt-40 sm:pt-48">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <PillBadge className="mb-5">COMMUNITY</PillBadge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Not a college club. An ecosystem.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
            BuildFest started as three people in a college lab in 2023. Here&rsquo;s what we
            believe, what we&rsquo;ve built, and where it&rsquo;s going next.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
