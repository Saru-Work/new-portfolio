import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Saruhasan — Computer Science & Software Developer Portfolio",
  description:
    "Building software that solves real problems with spatial elegance and system precision. Specializing in Next.js, TypeScript, AI agents, and high-performance Web UI.",
  keywords: [
    "Saruhasan",
    "Software Developer",
    "Computer Science",
    "Bengaluru",
    "Next.js",
    "TypeScript",
    "Full Stack Developer",
    "Systems Engineer",
  ],
  openGraph: {
    title: "Saruhasan — Systems & Spatial Web Engineer",
    description:
      "Building software that solves real problems with spatial elegance and system precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
