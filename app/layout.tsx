import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import {
  Preloader,
  SkipLink,
  GrainOverlay,
  CustomCursor,
  ScrollProgress,
  SiteHeader,
  BookingPill,
  CTABand,
  Footer,
} from "@/components/layout";
import { OrganizationSchema } from "@/components/shared/OrganizationSchema";

// Confirmed production domain. NEXT_PUBLIC_SITE_URL still overrides it (e.g.
// a staging deploy), but the fallback is now the real launch domain rather
// than a placeholder.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adpro.co.zm";

// next/font self-hosts and inlines the @font-face at build time — no
// layout shift, no external request. Instrument Serif was retired when the
// signature-phrase accent moved to the Manrope-based SignatureAccent mark
// (components/shared/SignatureAccent.tsx) — nothing renders it anymore.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800"],
  display: "swap",
});

const title = "AdPro 360 — Media, Creative & Production Agency | Lusaka, Zambia";
const description =
  "AdPro 360 is a full-service media sales and production agency in Lusaka. Strategy, creative, film and media placement held to one standard.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | AdPro 360",
  },
  description,
  alternates: { canonical: siteUrl },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "AdPro 360",
    locale: "en_ZM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased">
        <OrganizationSchema />
        <Preloader />
        <SkipLink />
        <GrainOverlay />
        <CustomCursor />
        <ScrollProgress />
        <SiteHeader />
        <main id="main">{children}</main>
        <CTABand />
        <Footer />
        <BookingPill />
      </body>
    </html>
  );
}
