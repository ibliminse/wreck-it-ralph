import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "WRECKIT & RALPH | AI Coding Agents",
  description: "RALPH started the AI coding revolution. WRECKIT is where it's heading. Live token data, tool comparison, and the evolution of autonomous coding agents.",
  keywords: ["WRECKIT", "RALPH", "AI coding", "autonomous agents", "Claude", "Solana", "meme coin"],
  authors: [{ name: "WRECKIT" }],
  openGraph: {
    title: "WRECKIT & RALPH | AI Coding Agents",
    description: "RALPH started the AI coding revolution. WRECKIT is where it's heading.",
    url: "https://wreckit-ralph.vercel.app",
    siteName: "WRECKIT-RALPH",
    type: "website",
    images: [
      {
        url: "https://i.imgur.com/YqRvGZK.png",
        width: 1200,
        height: 630,
        alt: "WRECKIT & RALPH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WRECKIT & RALPH | AI Coding Agents",
    description: "RALPH started the AI coding revolution. WRECKIT is where it's heading.",
    images: ["https://i.imgur.com/YqRvGZK.png"],
  },
  icons: {
    icon: "/favicon.ico",
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
      </body>
    </html>
  );
}
