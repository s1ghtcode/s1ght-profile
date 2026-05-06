"use client";

import { useEffect, useState } from "react";

type Click = {
  name: string;
  url: string;
  type: string;
  created_at: string;
};

export default function Analytics() {
  const [data, setData] = useState<Click[]>([]);

  useEffect(() => {
    fetch("/api/track")
      .then((res) => res.json())
      .then(setData);
  }, []);

  // totals
  const total = data.length;

  const byType = data.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byName = data.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topLinks = Object.entries(byName)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl mb-8">Analytics Dashboard</h1>

      {/* TOTAL */}
      <div className="mb-6 p-4 bg-zinc-900 rounded-xl">
        Total Clicks: {total}
      </div>

      {/* BY TYPE */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {Object.entries(byType).map(([type, count]) => (
          <div key={type} className="p-4 bg-zinc-900 rounded-xl">
            <div className="text-sm text-gray-400">{type}</div>
            <div className="text-xl font-bold">{count}</div>
          </div>
        ))}
      </div>

      {/* TOP LINKS */}
      <div className="mb-6">
        <h2 className="text-xl mb-3">Top Clicked</h2>
        {topLinks.map(([name, count]) => (
          <div
            key={name}
            className="p-3 mb-2 bg-zinc-900 rounded-xl flex justify-between"
          >
            <span>{name}</span>
            <span>{count}</span>
          </div>
        ))}
      </div>

      {/* RECENT */}
      <div>
        <h2 className="text-xl mb-3">Recent Clicks</h2>
        {data.slice(0, 10).map((click, i) => (
          <div
            key={i}
            className="p-3 mb-2 bg-zinc-900 rounded-xl flex justify-between"
          >
            <span>{click.name}</span>
            <span className="text-gray-400 text-sm">
              {new Date(click.created_at).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}