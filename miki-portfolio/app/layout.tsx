import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miki | Backend & Web3 Developer",
  description:
    "Final year Computer Science student specializing in backend systems, Web3, blockchain development, and modern full-stack applications using Next.js, Solidity, and Supabase.",
    icons: {
    icon: '/favicon.svg', 
  },
  keywords: [
    "Miki",
    "Web3 Developer",
    "Blockchain Developer",
    "Next.js Developer",
    "Backend Engineer",
    "Solidity Developer",
    "Supabase",
    "Portfolio",
  ],
  authors: [{ name: "Miki" }],
  creator: "Miki",
  openGraph: {
    title: "Miki | Backend & Web3 Developer",
    description:
      "Modern backend and blockchain developer portfolio built with Next.js and Supabase.",
    url: "https://mike1-portfolio.vercel.app",
    siteName: "Miki Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miki | Backend & Web3 Developer",
    description:
      "Backend systems, blockchain development, and modern Web3 applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}