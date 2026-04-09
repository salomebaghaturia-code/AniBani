"use client";

import { useEffect, useState, useCallback } from "react";
import { adminGetJSON, adminFetch, daysAgoISO, todayISO } from "@/lib/adminClient";

type Row = {
  id: number;
  email: string;
  name: string | null;
  child_age: string | null;
  recommendation: string | null;
  source_button: string | null;
  language: string | null;
  created_at: string;
};

type Resp = { rows: Row[]; total: number; page: number; pageSize: number; pages: number };

export default function WaitlistTable() {
  const [from, setFrom] = useState(daysAgoISO(30));
  const [to, setTo] = useState(todayISO());
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Resp | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      const r = await adminGetJSON<Resp>(`/api/admin/waitlist?${params}`);
      setData(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }, [from, to, page]);

  useEffect(() => {
    load();
  }, [load]);

  const downloadCsv = async () => {
    const res = await adminFetch("/api/admin/export/csv");
    if (!res.ok) {
      alert("Export failed");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anibani-waitlist-${todayISO()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-slate-900">Waitlist Registrations</h2>
        <div className="flex items-end gap-2 flex-wrap">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm text-slate-900"
            />
          </div>
          <button
            onClick={downloadCsv}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-slate-600">
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Age</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Lang</th>
                <th className="px-4 py-3 font-semibold">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                    Loading...
                  </td>
                </tr>
              )}
              {error && !loading && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && data && data.rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                    No registrations in this date range
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                data?.rows.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500 tabular-nums">{r.id}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap tabular-nums">
                      {r.created_at}
                    </td>
                    <td className="px-4 py-3 text-slate-900 font-medium">{r.email}</td>
                    <td className="px-4 py-3 text-slate-700">{r.name || "—"}</td>
                    <td className="px-4 py-3 text-slate-700">{r.child_age || "—"}</td>
                    <td className="px-4 py-3 text-slate-700 font-mono text-xs">
                      {r.source_button || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-700 uppercase">{r.language || "—"}</td>
                    <td
                      className="px-4 py-3 text-slate-700 max-w-xs truncate"
                      title={r.recommendation || ""}
                    >
                      {r.recommendation || "—"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {data && data.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
            <p className="text-sm text-slate-600">
              Page {data.page} of {data.pages} · {data.total.toLocaleString()} total
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={data.page <= 1}
                className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
                disabled={data.page >= data.pages}
                className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
