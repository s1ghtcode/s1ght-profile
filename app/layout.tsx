import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "s1ght's loadout",
  description: "Peripheral reviewer | multi FPS aimer",
  openGraph: {
    title: "s1ght's loadout",
    description: "Peripheral reviewer | multi FPS aimer",
    url: "https://s1ght.cc",
    siteName: "s1ghtgg",
    images: [
      {
        url: "https://s1ght.cc/og-imagev2.png",
        width: 400,
        height: 400,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "s1ght's loadout",
    description: "Peripheral reviewer | multi FPS aimer",
    images: ["https://s1ght.cc/og-imagev2.png"],
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R52M7CHKSX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R52M7CHKSX');
          `}
        </Script>

        {/* Fallback meta (safe to keep) */}
        <meta name="description" content="Peripheral reviewer | multi FPS aimer" />
        <meta property="og:title" content="s1ght's loadout" />
        <meta property="og:description" content="Peripheral reviewer | multi FPS aimer" />
        <meta property="og:image" content="https://s1ght.cc/og-imagev2.png" />
        <meta property="og:url" content="https://s1ght.cc" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="s1ghtgg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="s1ght's loadout" />
        <meta name="twitter:description" content="Peripheral reviewer | multi FPS aimer" />
        <meta name="twitter:image" content="https://s1ght.cc/og-imagev2.png" />
        <meta name="twitter:creator" content="@s1ghtgg" />
      </head>

      <body className={`${inter.className} min-h-screen bg-black text-white flex flex-col`}>
        {/* MAIN CONTENT */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-6 text-center text-sm text-white/60">
          © 2026 s1ghtgg. All rights reserved.
        </footer>
      </body>
    </html>
  );
}