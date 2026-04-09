"use client";

import { useEffect, useState, useCallback } from "react";
import { adminGetJSON, daysAgoISO, todayISO } from "@/lib/adminClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type Row = { button_name: string; click_date: string; click_count: number };
type Total = { button_name: string; total: number };
type Resp = { rows: Row[]; totals: Total[]; grandTotal: number };

export default function ClicksAnalytics() {
  const [from, setFrom] = useState(daysAgoISO(30));
  const [to, setTo] = useState(todayISO());
  const [data, setData] = useState<Resp | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    try {
      const r = await adminGetJSON<Resp>(`/api/admin/clicks?${params}`);
      setData(r);
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Button Click Analytics</h2>
          {data && (
            <p className="text-sm text-slate-500 mt-0.5">
              {data.grandTotal.toLocaleString()} total clicks in selected range
            </p>
          )}
        </div>
        <div className="flex items-end gap-2">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm text-slate-900"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 lg:col-span-3">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Clicks per button</h3>
          <div className="h-72">
            {loading && <p className="text-slate-500 text-sm">Loading...</p>}
            {!loading && data && data.totals.length === 0 && (
              <p className="text-slate-500 text-sm">No clicks recorded in this range</p>
            )}
            {!loading && data && data.totals.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.totals} margin={{ top: 5, right: 10, left: 0, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="button_name"
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    height={70}
                    tick={{ fontSize: 11, fill: "#475569" }}
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#475569" }} />
                  <Tooltip />
                  <Bar dataKey="total" fill="#0f172a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-700 px-5 pt-5 pb-2">
            Daily breakdown
          </h3>
          <div className="overflow-x-auto max-h-72 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                <tr className="text-left text-slate-600">
                  <th className="px-4 py-2 font-semibold">Button</th>
                  <th className="px-4 py-2 font-semibold">Date</th>
                  <th className="px-4 py-2 font-semibold text-right">Count</th>
                </tr>
              </thead>
              <tbody>
                {data?.rows.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                      No data
                    </td>
                  </tr>
                )}
                {data?.rows.map((r, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-2 font-mono text-xs text-slate-700">
                      {r.button_name}
                    </td>
                    <td className="px-4 py-2 text-slate-700 tabular-nums">{r.click_date}</td>
                    <td className="px-4 py-2 text-slate-900 font-semibold text-right tabular-nums">
                      {r.click_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
