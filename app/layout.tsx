import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "s1ghts profile",
  description: "peripheral reviewer | multi fps aimer 愛",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black text-white flex flex-col`}>
        
        {/* MAIN CONTENT */}
        <main className="flex-grow">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="text-center text-sm text-gray-400 py-6 border-t border-gray-800">
          © 2026 s1ghtgg. All rights reserved.
        </footer>

      </body>
    </html>
  );
}