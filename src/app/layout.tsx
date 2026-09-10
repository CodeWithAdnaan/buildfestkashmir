import type { Metadata } from "next";
import { fontVariables } from "@/config/fonts";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { AmbientBackground } from "@/components/shared/ambient-background";
import { siteConfig } from "@/lib/constants/site";
import { createClient } from "@/lib/supabase/server";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/shared/json-ld";
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
    "Kashmir tech community",
    "Open source Kashmir",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#0a0d0c",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let user = null;
  try {
    const supabase = await createClient();
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    user = currentUser;
  } catch {
    // Graceful fallback during build / without credentials
  }

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="bg-canvas font-sans text-ink antialiased">
        <AmbientBackground />
        <AuthProvider initialUser={user}>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
