import type { Metadata } from "next";
import { fontVariables } from "@/config/fonts";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { AmbientBackground } from "@/components/shared/ambient-background";
import { siteConfig } from "@/lib/constants/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "BuildFest Kashmir",
    "Srinagar hackathon",
    "Kashmir developer community",
    "student hackathon India",
    "HACKDAYS SRINAGAR",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export const viewport = {
  themeColor: "#0a0d0c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-canvas font-sans text-ink antialiased">
        <AmbientBackground />
        <AuthProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
