"use client";

import { useEffect, useState, useCallback } from "react";
import { adminGetJSON, todayISO } from "@/lib/adminClient";

type Reg = {
  id: number;
  email: string;
  name: string | null;
  child_age: string | null;
  source_button: string | null;
  language: string | null;
  created_at: string;
};

type Daily = {
  date: string;
  waitlist: Reg[];
  clicks: { button_name: string; click_count: number }[];
  sessions: { total: number; unique: number };
};

type Resp = { summary: unknown; daily: Daily };

export default function DailySummary() {
  const [date, setDate] = useState(todayISO());
  const [daily, setDaily] = useState<Daily | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await adminGetJSON<Resp>(`/api/admin/summary?date=${date}`);
      setDaily(r.daily);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-slate-900">Daily Summary</h2>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm text-slate-900"
          />
        </div>
      </div>

      {loading && <p className="text-slate-500 text-sm">Loading...</p>}

      {!loading && daily && (
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Sessions card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Sessions</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-xs text-purple-700 uppercase font-semibold">Total</p>
                <p className="text-2xl font-bold text-purple-900 tabular-nums">
                  {daily.sessions.total}
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-700 uppercase font-semibold">Unique</p>
                <p className="text-2xl font-bold text-amber-900 tabular-nums">
                  {daily.sessions.unique}
                </p>
              </div>
            </div>
          </div>

          {/* Clicks card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Button Clicks ({daily.clicks.reduce((a, b) => a + b.click_count, 0)})
            </h3>
            {daily.clicks.length === 0 ? (
              <p className="text-slate-500 text-sm">No clicks</p>
            ) : (
              <ul className="space-y-1.5 text-sm max-h-48 overflow-y-auto">
                {daily.clicks.map((c) => (
                  <li key={c.button_name} className="flex justify-between">
                    <span className="font-mono text-xs text-slate-700">{c.button_name}</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {c.click_count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Registrations card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Registrations ({daily.waitlist.length})
            </h3>
            {daily.waitlist.length === 0 ? (
              <p className="text-slate-500 text-sm">No registrations</p>
            ) : (
              <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
                {daily.waitlist.map((r) => (
                  <li key={r.id} className="border-b border-slate-100 pb-1.5 last:border-0">
                    <p className="font-medium text-slate-900 truncate">{r.email}</p>
                    <p className="text-xs text-slate-500 font-mono">
                      {r.source_button || "—"} · {r.language || "—"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
