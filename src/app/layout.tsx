import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stone Atlas — A shared atlas of ancient sites",
  description:
    "A shared atlas of ancient sites — videos, sources, and notes kept with the places they belong to.",
  openGraph: {
    title: "Stone Atlas",
    description:
      "A shared atlas of ancient sites — videos, sources, and notes kept with the places they belong to.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased dark`}>
      <body className="min-h-full bg-[#0a0a0a] text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
