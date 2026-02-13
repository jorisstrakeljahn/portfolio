import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joris Strakeljahn — Builder, Hacker, Freelancer",
  description:
    "Personal portfolio of Joris Strakeljahn — indie hacker, freelancer, and student turning ideas into real things on the internet.",
  keywords: ["developer", "portfolio", "indie hacker", "freelancer", "react", "typescript", "next.js"],
  authors: [{ name: "Joris Strakeljahn" }],
  openGraph: {
    title: "Joris Strakeljahn — Builder, Hacker, Freelancer",
    description: "Indie hacker, freelancer, and student turning ideas into real things on the internet.",
    type: "website",
    locale: "en_US",
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
