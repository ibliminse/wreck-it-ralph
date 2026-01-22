import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f97316",
};

export const metadata: Metadata = {
  title: "WRECKIT & RALPH | AI Coding Agents",
  description: "RALPH started the AI coding revolution. WRECKIT is where it's heading. Live token data, tool comparison, and the evolution of autonomous coding agents.",
  keywords: ["WRECKIT", "RALPH", "AI coding", "autonomous agents", "Claude", "Solana", "meme coin"],
  authors: [{ name: "WRECKIT" }],
  metadataBase: new URL("https://wreckitlore.xyz"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WRECKIT",
  },
  openGraph: {
    title: "WRECKIT & RALPH | AI Coding Agents",
    description: "RALPH started the AI coding revolution. WRECKIT is where it's heading.",
    url: "https://wreckitlore.xyz",
    siteName: "WRECKIT vs RALPH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WRECKIT & RALPH | AI Coding Agents",
    description: "RALPH started the AI coding revolution. WRECKIT is where it's heading.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {children}
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
