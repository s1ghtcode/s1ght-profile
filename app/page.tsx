"use client";

console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

import React from "react";
import data from "../data.json";
import { FaChair, FaMouse, FaKeyboard, FaHeadphones, FaTwitch, FaYoutube, FaDiscord, FaTwitter, FaSteam, FaSpotify, FaFileAlt, FaTiktok } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { BsSquareFill } from "react-icons/bs";

/* ================= TRACKING ================= */
function trackClick(name: string, url: string, type: string) {
  fetch("/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      url,
      type,
      time: new Date().toISOString(),
    }),
  });
}

/* ================= HELPERS ================= */
function getFaviconFromUrl(url: string) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
}

const getIconFromUrl = (url: string): React.ReactNode => {
  if (url.includes("twitch.tv")) return <FaTwitch />;
  if (url.includes("youtube.com")) return <FaYoutube />;
  if (url.includes("discord.gg")) return <FaDiscord />;
  if (url.includes("twitter.com")) return <FaTwitter />;
  if (url.includes("steamcommunity.com")) return <FaSteam />;
  if (url.includes("spotify.com")) return <FaSpotify />;
  if (url.includes("docs.google.com")) return <FaFileAlt />;
  if (url.includes("tiktok.com")) return <FaTiktok />;
  return "🔗";
};

const setupIconMap: Record<string, React.ReactNode> = {
  mouse: <FaMouse />,
  keyboard: <FaKeyboard />,
  mousepad: <BsSquareFill />,
  headset: <FaHeadphones />,
  monitor: <MdMonitor />,
  "monitor arm": <MdMonitor />,
  chair: <FaChair />,
};

/* ================= PAGE ================= */
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-6">

      {/* Profile */}
      <img src={data.avatar} className="w-28 h-28 rounded-full border" />
      <h1 className="text-3xl font-bold mt-4">{data.username}</h1>
      <p className="text-gray-400">{data.bio}</p>

      {/* ================= LINKS ================= */}
      <div className="mt-6 w-full max-w-4xl">
        <h2 className="text-xl mb-4">Links</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              onClick={() => trackClick(link.title, link.url, "link")}
              className="group relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-4 rounded-xl transition duration-300"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--x", `${x}px`);
                e.currentTarget.style.setProperty("--y", `${y}px`);
              }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(168,85,247,0.25),transparent_60%)]" />

              <div className="relative z-10 flex items-center gap-3">
                <span className="text-lg text-gray-400 group-hover:text-purple-400 transition">
                  {getIconFromUrl(link.url)}
                </span>
                <span className="font-medium">{link.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

{/* ================= PARTNERS ================= */}
<div className="mt-6 w-full max-w-4xl">
  <h2 className="text-xl mb-4">Partners</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {data.partners.map((partner) => (
      <a
        key={partner.url}
        href={partner.url}
        target="_blank"
        onClick={() => trackClick(partner.name, partner.url, "partner")}
        className="group relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-4 rounded-xl transition duration-300 hover:border-purple-500"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty("--x", `${x}px`);
          e.currentTarget.style.setProperty("--y", `${y}px`);
        }}
      >
        {/* Glow effect */}
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(168,85,247,0.25),transparent_60%)]" />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          
          {/* FIXED SIZE LOGO CONTAINER */}
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src={partner.logo ? partner.logo : getFaviconFromUrl(partner.url)}
              className="max-w-full max-h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition"
              alt={partner.name}
            />
          </div>

          <span className="font-medium">{partner.name}</span>
        </div>
      </a>
    ))}
  </div>
</div>

      {/* ================= SETUP ================= */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-xl mb-4">Setup</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.setup.map((item, i) => {
            const CardWrapper = item.url ? "a" : "div";

            return (
              <CardWrapper
                key={i}
                {...(item.url && {
                  href: item.url,
                  target: "_blank",
                  onClick: () => trackClick(item.name, item.url, "setup"),
                })}
                className="group relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-4 rounded-xl transition duration-300 hover:border-purple-500"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty("--x", `${x}px`);
                  e.currentTarget.style.setProperty("--y", `${y}px`);
                }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(168,85,247,0.25),transparent_60%)]" />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400 capitalize flex items-center gap-2">
                      {setupIconMap[item.type]}
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.details}</p>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>

      {/* ================= PC SPECS ================= */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-xl mb-4">PC Specs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.pcSpecs.map((spec) => (
            <div
              key={spec.part}
              className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-4 rounded-xl hover:border-purple-500 transition"
            >
              <span className="text-xs text-gray-400 uppercase">
                {spec.part}
              </span>

              <h3 className="font-semibold text-sm mt-2">
                {spec.value}
              </h3>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}