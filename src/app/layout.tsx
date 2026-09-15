import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://portfolio-jtk.vercel.app";
const description = `${profile.role} building production web platforms end to end. Healthcare data pipelines, multi-tenant payments infrastructure, and cloud estates that ship several times a day.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.shortName}`,
  },
  description,
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "FastAPI",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "DevOps",
    profile.name,
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} · ${profile.role}`,
    description,
    siteName: `${profile.shortName} · Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060709",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-jade focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
