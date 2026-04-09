"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAdminToken, getAdminToken } from "@/lib/adminClient";
import SummaryCards from "@/components/admin/SummaryCards";
import WaitlistTable from "@/components/admin/WaitlistTable";
import ClicksAnalytics from "@/components/admin/ClicksAnalytics";
import SessionsAnalytics from "@/components/admin/SessionsAnalytics";
import DailySummary from "@/components/admin/DailySummary";

type Section = "overview" | "registrations" | "clicks" | "sessions" | "daily";

const NAV: { id: Section; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "▦" },
  { id: "registrations", label: "Registrations", icon: "✉" },
  { id: "clicks", label: "Clicks", icon: "↗" },
  { id: "sessions", label: "Sessions", icon: "◐" },
  { id: "daily", label: "Daily Summary", icon: "☰" }
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [section, setSection] = useState<Section>("overview");

  useEffect(() => {
    const t = getAdminToken();
    if (!t) {
      router.replace("/admin");
      return;
    }
    setAuthed(true);
  }, [router]);

  const logout = () => {
    clearAdminToken();
    router.replace("/admin");
  };

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Checking session...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-slate-900 font-bold flex items-center justify-center">
              AB
            </div>
            <div>
              <p className="font-bold text-sm">Ani Bani</p>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          {NAV.map((item) => {
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${
                  active
                    ? "bg-white text-slate-900"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="w-5 text-center text-base opacity-80">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="w-5 text-center text-base opacity-80">⏻</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-x-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-slate-900 capitalize">
            {NAV.find((n) => n.id === section)?.label}
          </h1>
        </header>

        <div className="p-8 space-y-8">
          {section === "overview" && (
            <>
              <SummaryCards />
              <SessionsAnalytics />
              <ClicksAnalytics />
            </>
          )}
          {section === "registrations" && <WaitlistTable />}
          {section === "clicks" && <ClicksAnalytics />}
          {section === "sessions" && <SessionsAnalytics />}
          {section === "daily" && <DailySummary />}
        </div>
      </main>
    </div>
  );
}
