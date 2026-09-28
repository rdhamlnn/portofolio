import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: `${profile.name} | ${profile.role}`,
  description: profile.intro,
  keywords: [
    "Muhammad Ridha Maulana",
    "rdhamlnn",
    "Web Developer",
    "Database Engineer",
    "Laravel",
    "Next.js",
    "Banjarmasin",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `${profile.name} | ${profile.role}`,
    description: profile.headline,
    locale: "id_ID",
    siteName: profile.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} | ${profile.headline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.headline,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05060b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
