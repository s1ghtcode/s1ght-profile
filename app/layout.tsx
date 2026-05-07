import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "s1ght profile",
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

        {/* FOOTER */}
        <footer className="relative border-t border-white/10 py-6 text-center text-sm text-white/60">
          
          {/* Bottom-left logo (IMAGE) */}
          <div className="absolute left-4 bottom-4">
            <img
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </div>

          © 2026 s1ghtgg. All rights reserved.
        </footer>
      </body>
    </html>
  );
}