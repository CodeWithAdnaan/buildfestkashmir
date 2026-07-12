import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/**
 * Geist Sans / Geist Mono — Vercel's font family, bundled locally (no
 * Google Fonts network fetch, zero layout shift). Matches the reference
 * aesthetic directly: Vercel, Linear, Raycast, Clerk all ship on this or
 * something visually identical to it.
 */
export const geistSans = GeistSans;
export const geistMono = GeistMono;

export const fontVariables = [GeistSans.variable, GeistMono.variable].join(" ");
