import type React from "react";
import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import {
  Orbitron,
  Manrope as V0_Font_Manrope,
  Geist_Mono as V0_Font_Geist_Mono,
  Source_Serif_4 as V0_Font_Source_Serif_4,
} from "next/font/google";

// Initialize fonts
const _manrope = V0_Font_Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
const _geistMono = V0_Font_Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const _sourceSerif_4 = V0_Font_Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// })

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TecNoBand - AI-Powered IoT Management Platform",
  description:
    "Manage your IoT devices with intelligent automation and real-time analytics",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={`font-sans ${orbitron.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const t = localStorage.getItem('theme'); const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; const enableDark = t ? t === 'dark' : prefersDark || true; if (enableDark) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); } catch(e){} })();`,
          }}
        />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        {/* Global toaster for site-wide notifications */}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
