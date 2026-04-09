"use client";

import { useEffect, useState } from "react";
import { adminGetJSON } from "@/lib/adminClient";

type Summary = {
  today: string;
  waitlistToday: number;
  waitlistTotal: number;
  sessionsTodayTotal: number;
  sessionsTodayUnique: number;
  clicksTodayTotal: number;
};

export default function SummaryCards() {
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminGetJSON<{ summary: Summary }>("/api/admin/summary")
      .then((r) => setData(r.summary))
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="text-red-600 text-sm">Failed to load summary: {error}</div>;
  if (!data) return <div className="text-slate-500 text-sm">Loading summary...</div>;

  const cards = [
    {
      label: "Registrations Today",
      value: data.waitlistToday,
      sub: `${data.waitlistTotal} all-time`,
      color: "bg-emerald-50 border-emerald-200 text-emerald-900"
    },
    {
      label: "Total Registrations",
      value: data.waitlistTotal,
      sub: `+${data.waitlistToday} today`,
      color: "bg-blue-50 border-blue-200 text-blue-900"
    },
    {
      label: "Sessions Today",
      value: data.sessionsTodayTotal,
      sub: `${data.sessionsTodayUnique} unique`,
      color: "bg-purple-50 border-purple-200 text-purple-900"
    },
    {
      label: "Unique Sessions Today",
      value: data.sessionsTodayUnique,
      sub: `${data.sessionsTodayTotal} total`,
      color: "bg-amber-50 border-amber-200 text-amber-900"
    },
    {
      label: "Button Clicks Today",
      value: data.clicksTodayTotal,
      sub: `as of ${data.today}`,
      color: "bg-rose-50 border-rose-200 text-rose-900"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`border rounded-xl p-5 ${c.color}`}
        >
          <p className="text-xs uppercase tracking-wider font-semibold opacity-70">{c.label}</p>
          <p className="mt-2 text-3xl font-bold tabular-nums">{c.value.toLocaleString()}</p>
          <p className="mt-1 text-xs opacity-70">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
