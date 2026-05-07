import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "s1ghtgg Portfolio",
  description: "Peripheral reviewer | multi FPS aimer",
  openGraph: {
    title: "s1ghtgg Portfolio",
    description: "Peripheral reviewer | multi FPS aimer",
    url: "https://yourdomain.com",        // Your website URL
    siteName: "s1ghtgg",
    images: [
      {
        url: "/og-image.png",             // Put your logo or banner here
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "s1ghtgg Portfolio",
    description: "Peripheral reviewer | multi FPS aimer",
    images: ["/og-image.png"],
    creator: "@s1ghtgg",                   // Your Twitter handle
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-black text-white flex flex-col`}
      >
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