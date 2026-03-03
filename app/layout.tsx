import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://jorisstrakeljahn.de";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0d" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Joris Strakeljahn — Developer, Indie Hacker & Freelancer",
    template: "%s — Joris Strakeljahn",
  },
  description:
    "Personal portfolio of Joris Strakeljahn — indie hacker, freelancer, and student building products, tools, and experiences on the internet.",
  keywords: [
    "Joris Strakeljahn",
    "developer",
    "portfolio",
    "indie hacker",
    "freelancer",
    "full-stack developer",
    "web developer",
    "React",
    "TypeScript",
    "Next.js",
    "software engineer",
  ],
  authors: [{ name: "Joris Strakeljahn", url: SITE_URL }],
  creator: "Joris Strakeljahn",
  publisher: "Joris Strakeljahn",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Joris Strakeljahn — Developer, Indie Hacker & Freelancer",
    description:
      "Indie hacker, freelancer, and student turning ideas into real things on the internet.",
    url: SITE_URL,
    siteName: "Joris Strakeljahn",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/portrait.png",
        width: 600,
        height: 800,
        alt: "Joris Strakeljahn portrait illustration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jstrakeljahnx",
    title: "Joris Strakeljahn — Developer, Indie Hacker & Freelancer",
    description:
      "Indie hacker, freelancer, and student turning ideas into real things on the internet.",
    creator: "@jstrakeljahnx",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
