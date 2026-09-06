"use client";

import { List } from "lucide-react";

interface TableOfContentsProps {
  content: string[];
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const headings = content
    .filter((block) => block.trim().startsWith("## "))
    .map((block) => {
      const text = block.trim().replace(/^##\s+/, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { text, id };
    });

  if (headings.length === 0) return null;

  return (
    <div className="my-8 rounded-xl border border-border/80 bg-canvas-raised/30 p-5 backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2 font-mono text-[12px] font-semibold text-ink-muted">
        <List className="h-4 w-4 text-saffron" />
        <span>Table of Contents</span>
      </div>
      <nav>
        <ul className="flex flex-col gap-2 font-mono text-[13px]">
          {headings.map(({ text, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="text-ink-muted transition-colors hover:text-saffron hover:underline"
              >
                # {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
