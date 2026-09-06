"use client";

import { Reveal } from "@/components/shared/reveal";

interface BlogContentProps {
  content: string[];
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="flex flex-col gap-6">
      {content.map((block, index) => {
        const text = block.trim();

        // Level 2 Heading
        if (text.startsWith("## ")) {
          const heading = text.replace(/^##\s+/, "");
          const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <Reveal key={index} delay={index * 0.02}>
              <h2
                id={id}
                className="mt-6 scroll-mt-28 text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
              >
                {heading}
              </h2>
            </Reveal>
          );
        }

        // Level 3 Heading
        if (text.startsWith("### ")) {
          const heading = text.replace(/^###\s+/, "");
          const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <Reveal key={index} delay={index * 0.02}>
              <h3
                id={id}
                className="mt-4 scroll-mt-28 text-xl font-semibold tracking-tight text-ink"
              >
                {heading}
              </h3>
            </Reveal>
          );
        }

        // Blockquote
        if (text.startsWith("> ")) {
          const quote = text.replace(/^>\s+/, "");
          return (
            <Reveal key={index} delay={index * 0.02}>
              <blockquote className="my-2 rounded-r-xl border-l-2 border-saffron bg-saffron/5 px-5 py-4 font-serif text-[16.5px] italic leading-relaxed text-ink">
                “{quote}”
              </blockquote>
            </Reveal>
          );
        }

        // Code block (fenced with ```)
        if (text.startsWith("```")) {
          const lines = text.split("\n");
          const lang = lines[0].replace(/^```/, "").trim();
          const code = lines.slice(1, -1).join("\n");

          return (
            <Reveal key={index} delay={index * 0.02}>
              <div className="my-3 overflow-hidden rounded-xl border border-border bg-[#0d1117] font-mono text-[13px]">
                {lang && (
                  <div className="border-b border-border/50 bg-canvas-raised/40 px-4 py-2 text-[11px] font-medium text-ink-muted">
                    {lang.toUpperCase()}
                  </div>
                )}
                <pre className="overflow-x-auto p-4 leading-relaxed text-ink-muted">
                  <code>{code || text.replace(/```[a-z]*/g, "").trim()}</code>
                </pre>
              </div>
            </Reveal>
          );
        }

        // Bulleted list item
        if (text.startsWith("- ")) {
          const items = text.split("\n").map((item) => item.replace(/^-\s+/, ""));
          return (
            <Reveal key={index} delay={index * 0.02}>
              <ul className="my-2 flex flex-col gap-2.5 pl-2">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[16px] text-ink-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        }

        // Standard paragraph
        return (
          <Reveal key={index} delay={index * 0.02}>
            <p className="text-[16.5px] leading-relaxed text-ink-muted">{text}</p>
          </Reveal>
        );
      })}
    </div>
  );
}
