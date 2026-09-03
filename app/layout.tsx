import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Free Browser Watermark Studio`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free browser-based watermark studio from Jozi Nites. Upload PNG, SVG, JPEG, GIF or TIF, remove backgrounds, tag your content, download. Files never leave your device.",
  keywords: [
    "watermark",
    "logo watermark",
    "free watermark tool",
    "South Africa",
    "Jozi Nites",
    "Tag-it",
    "background removal",
    "batch watermark",
  ],
  authors: [{ name: "Jozi Nites (Pty) Ltd" }],
  creator: "Jozi Nites",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Free Browser Watermark Studio`,
    description: SITE_TAGLINE,
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Tag-it" }],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} | Free Browser Watermark Studio`,
    description: SITE_TAGLINE,
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description: SITE_TAGLINE,
  publisher: { "@type": "Organization", name: "Jozi Nites (Pty) Ltd" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
