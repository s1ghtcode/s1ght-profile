import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "s1ght's loadout",
  description: "Peripheral reviewer | multi FPS aimer",
  openGraph: {
    title: "s1ght's loadout",
    description: "Peripheral reviewer | multi FPS aimer",
    url: "https://s1ght.cc",               // Update to your live website
    siteName: "s1ghtgg",
    images: [
      {
        url: "https://s1ght.cc/og-image.png", // Your logo/banner URL
        width: 900,
        height: 900,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "s1ght's loadout",
    description: "Peripheral reviewer | multi FPS aimer",
    images: ["https://s1ght.cc/og-image.png"], // Twitter needs absolute URLs
    creator: "@s1ghtgg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Extra fallback meta tags (optional) */}
        <meta name="description" content="Peripheral reviewer | multi FPS aimer" />
        <meta property="og:title" content="s1ghtgg Portfolio" />
        <meta property="og:description" content="Peripheral reviewer | multi FPS aimer" />
        <meta property="og:image" content="https://s1ght.cc/og-image.png" />
        <meta property="og:url" content="https://s1ght.cc" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="s1ghtgg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="s1ghtgg Portfolio" />
        <meta name="twitter:description" content="Peripheral reviewer | multi FPS aimer" />
        <meta name="twitter:image" content="https://s1ght.cc/og-image.png" />
        <meta name="twitter:creator" content="@s1ghtgg" />
      </head>

      <body className={`${inter.className} min-h-screen bg-black text-white flex flex-col`}>
        {/* MAIN CONTENT */}
        <main className="flex-1">{children}</main>

        {/* FOOTER (NO LOGO) */}
        <footer className="border-t border-white/10 py-6 text-center text-sm text-white/60">
          © 2026 s1ghtgg. All rights reserved.
        </footer>
      </body>
    </html>
  );
}