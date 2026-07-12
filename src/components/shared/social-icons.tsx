import type { SVGProps } from "react";

/**
 * lucide-react dropped brand/logo icons in recent versions, so these are
 * small hand-drawn line-icon interpretations — simple monochrome glyphs,
 * not reproductions of the official brand marks.
 */

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1-.3-3.4 1.3a11.5 11.5 0 00-6.2 0C6.6 2.9 5.6 3.2 5.6 3.2a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004.2 9.6c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="9" width="4" height="12" />
      <circle cx="5" cy="4.5" r="2" />
      <path d="M11 21v-8m0 0a3.5 3.5 0 017-.4V21m-7-8a3.5 3.5 0 017-.4" />
    </svg>
  );
}

export function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M4 4l7.5 9.5L4.4 20H7l5.2-5.1L16.5 20H20l-8-9.9L19 4h-2.6l-4.8 4.7L8 4z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
