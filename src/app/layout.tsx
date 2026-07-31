import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  IBM_Plex_Sans_Condensed,
  IBM_Plex_Mono,
} from "next/font/google";
import { brand } from "@/content/brand";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-plex-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.blurb,
  keywords: [
    ...brand.seoRegions.flatMap((r) => [
      `collision estimate software ${r}`,
      `auto body shop software ${r}`,
    ]),
    "collision repair PDF import",
    "estimate data entry automation",
    "body shop estimate import",
    "collision claim intake automation",
  ],
  authors: [{ name: brand.founder.name }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: brand.url,
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.blurb,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.blurb,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-CA"
      className={`${plexSans.variable} ${plexCondensed.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:bg-oxide-600 focus:px-4 focus:py-2 focus:text-sm focus:text-vellum-50"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
