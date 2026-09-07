import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import {
  ENTITY_LEGAL_NAME,
  ENTITY_ADDRESS,
  ENTITY_EMAIL,
  SITE_URL,
  TFN_DISPLAY,
  PARTNER,
  WORDMARK,
  AGREEMENT_NOUN,
} from "@/lib/site";

/* ============================================================
   §3 — SmoothScroll (Lenis) and CursorSpotlight were removed here.

   Lenis is a third animation layer on top of Framer Motion, and §3
   permits exactly one approach outside the exempted hero scene.
   CursorSpotlight is a cursor-follow effect, banned outright.

   Native CSS `scroll-behavior: smooth` in globals.css covers anchor
   navigation without hijacking the scroll.
   ============================================================ */

const display = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#483092",
  width: "device-width",
  initialScale: 1,
};

const description = `${ENTITY_LEGAL_NAME} is an independent authorized ${AGREEMENT_NOUN.toLowerCase()} of ${PARTNER}. Compare Astound internet, TV via DIRECTV, mobile and home phone plans, then order by phone. Not the official ${PARTNER} website.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /* Leads with the disclosure, never with the bare Astound mark, so a
     search result cannot be mistaken for the official Astound site. */
  title: {
    default: `${WORDMARK} — Internet, TV, Mobile & Home Phone`,
    template: `%s | ${WORDMARK}`,
  },
  description,
  keywords: [
    "Astound Broadband reseller",
    "Astound internet plans",
    "Astound Price for Life",
    "Astound Mobile",
    "DIRECTV via Astound",
    "fiber-powered internet",
  ],
  authors: [{ name: ENTITY_LEGAL_NAME }],
  applicationName: ENTITY_LEGAL_NAME,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: ENTITY_LEGAL_NAME,
    title: `${WORDMARK} — Internet, TV, Mobile & Home Phone`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${WORDMARK} — Internet, TV, Mobile & Home Phone`,
    description,
  },
  category: "Telecommunications",
};

/* Organization schema describes the RESELLER, never Astound. */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: ENTITY_LEGAL_NAME,
  url: SITE_URL,
  telephone: TFN_DISPLAY,
  email: ENTITY_EMAIL,
  description: `Independent authorized ${AGREEMENT_NOUN.toLowerCase()} of ${PARTNER} internet, mobile, TV and home phone services.`,
  address: { "@type": "PostalAddress", streetAddress: ENTITY_ADDRESS, addressCountry: "US" },
  knowsAbout: [
    "Fiber-powered internet",
    "Astound Price for Life",
    "Astound Mobile",
    "DIRECTV via Astound",
    "Home phone",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
