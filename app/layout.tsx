import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "s1ght's loadout",
  description: "peripheral reviewer | multi fps aimer",
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