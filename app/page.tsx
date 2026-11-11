"use client";

import React, { useState } from "react";
import rawData from "../data.json";

/* ================= PERIPHERAL TYPES ================= */
type Setting = { label: string; value: string };
type DevicePage = {
  name: string;
  settings: Setting[];
  subsections?: { title: string; settings: Setting[] }[];
};
type PeripheralDevice = DevicePage & {
  type: string;
  size: "large" | "small" | "wide";
  alternates?: DevicePage[];
};

const data = rawData as {
  username: string;
  bio: string;
  team: string;
  teamUrl: string;
  team2: string;
  team2Url: string;
  avatar: string;
  contact: { email: string; subtitle: string };
  gameSettings: { label: string; value: string }[];
  links: any[];
  partners: any[];
  setup: any[];
  peripheralSettings: PeripheralDevice[];
  pcSpecs: any[];
};
import { FaChair, FaMouse, FaKeyboard, FaHeadphones, FaTwitch, FaYoutube, FaDiscord, FaTwitter, FaSteam, FaSpotify, FaFileAlt, FaTiktok } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { BsSquareFill } from "react-icons/bs";
import { FaW } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight, FaEnvelope } from "react-icons/fa";

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

/* ================= PERIPHERAL CARD ================= */
const sizeClasses = {
  large: "sm:col-span-2 lg:row-span-2 min-h-[16rem]",
  small: "min-h-[10rem]",
  wide: "sm:col-span-2 min-h-[10rem]",
};

function SettingRows({ settings }: { settings: Setting[] }) {
  return (
    <div className="space-y-2">
      {settings.map((setting) => (
        <div
          key={setting.label}
          className="flex justify-between items-center gap-4 text-xs border-t border-zinc-800 pt-2"
        >
          <span className="text-gray-500">{setting.label}</span>
          <span className="font-medium text-right break-all">{setting.value}</span>
        </div>
      ))}
    </div>
  );
}

function PeripheralCard({ device }: { device: PeripheralDevice }) {
  const pages: DevicePage[] = [device, ...(device.alternates ?? [])];
  const [index, setIndex] = useState(0);
  const page = pages[index];
  const multiple = pages.length > 1;

  const go = (step: number) =>
    setIndex((i) => (i + step + pages.length) % pages.length);

  return (
    <div className={`relative ${sizeClasses[device.size]}`}>
      <div
        className="group relative h-full bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-4 rounded-xl transition duration-300 hover:border-purple-500"
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
          <div className="flex items-center justify-between gap-2 mb-4">
            {multiple ? (
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="text-gray-500 hover:text-purple-400 transition p-1"
              >
                <FaChevronLeft size={12} />
              </button>
            ) : (
              <span />
            )}

            <h3 className="font-semibold text-center flex items-center justify-center gap-2">
              <span className="text-gray-400 text-sm">{setupIconMap[device.type]}</span>
              {page.name}
            </h3>

            {multiple ? (
              <button
                onClick={() => go(1)}
                aria-label="Next"
                className="text-gray-500 hover:text-purple-400 transition p-1"
              >
                <FaChevronRight size={12} />
              </button>
            ) : (
              <span />
            )}
          </div>

          <SettingRows settings={page.settings} />

          {page.subsections?.map((sub) => (
            <div key={sub.title} className="mt-5">
              <h4 className="text-xs text-purple-400 uppercase tracking-wide mb-2">
                {sub.title}
              </h4>
              <SettingRows settings={sub.settings} />
            </div>
          ))}

          {multiple && (
            <div className="flex justify-center gap-1.5 mt-4">
              {pages.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setIndex(i)}
                  aria-label={p.name}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-4 bg-purple-500" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= CONTACT CARD ================= */
function ContactCard() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${data.contact.email}`;
    }
  };

  return (
    <div className="mt-6 w-full max-w-4xl">
      <h2 className="text-xl mb-4">Contact</h2>

      <div
        className="group relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-5 rounded-xl transition duration-300 hover:border-purple-500"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty("--x", `${x}px`);
          e.currentTarget.style.setProperty("--y", `${y}px`);
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(168,85,247,0.25),transparent_60%)]" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 shrink-0 rounded-full bg-purple-500/10 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <FaEnvelope />
            </div>
            <div>
              <h3 className="font-semibold">Contact me</h3>
              <p className="text-xs text-gray-500 mt-0.5">{data.contact.subtitle}</p>
              <p className="text-sm text-gray-300 mt-2 font-medium break-all">{data.contact.email}</p>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={copyEmail}
              className="text-xs px-3 py-2 rounded-lg border border-zinc-700 text-gray-300 hover:border-purple-500 hover:text-white transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <a
              href={`mailto:${data.contact.email}`}
              className="text-xs px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 font-medium transition"
            >
              Email me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-6">

      {/* Profile */}
<img src={data.avatar} className="w-28 h-28 rounded-full border" />

<h1 className="text-3xl font-bold mt-4">{data.username}</h1>

<p className="text-gray-400">{data.bio}</p>

<a
  href="https://twitter.com/emoAimers"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-500 text-sm mt-1 hover:text-purple-400 transition"
>
  {data.team}
</a>

<a
  href="https://twitter.com/aimcore_hq"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-500 text-sm mt-1 hover:text-red-400 transition"
>
  {data.team2}
</a>

      {/* ================= CONTACT ================= */}
      <ContactCard />

      {/* ================= GAME SETTINGS ================= */}
      <div className="mt-6 w-full max-w-4xl">
        <h2 className="text-xl mb-4">In-Game Settings</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {data.gameSettings.map((setting) => (
            <div
              key={setting.label}
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
                <span className="text-xs text-gray-400 uppercase">
                  {setting.label}
                </span>
                <h3 className="font-semibold text-lg mt-1">{setting.value}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= LINKS ================= */}
      <div className="mt-6 w-full max-w-4xl">
        <h2 className="text-xl mb-4">Links</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
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

      {/* ================= PERIPHERAL SETTINGS ================= */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-xl mb-4">Peripheral Settings</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.peripheralSettings.map((device) => (
            <PeripheralCard key={device.name} device={device} />
          ))}
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