import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { readJSON } from "@/lib/storage";
import {
  FILES,
  todayISODate,
  type ClicksByDate,
  type SessionsByDate,
  type WaitlistEntry
} from "@/lib/storageTypes";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = todayISODate();
  const url = new URL(req.url);
  const date = url.searchParams.get("date");

  const [waitlist, clicks, sessions] = await Promise.all([
    readJSON<WaitlistEntry[]>(FILES.WAITLIST, []),
    readJSON<ClicksByDate>(FILES.CLICKS, {}),
    readJSON<SessionsByDate>(FILES.SESSIONS, {})
  ]);

  const waitlistTotal = waitlist.length;
  const waitlistToday = waitlist.filter((e) => (e.created_at || "").slice(0, 10) === today).length;

  const sessionsTodayBucket = sessions[today];
  const sessionsTodayTotal = sessionsTodayBucket?.total ?? 0;
  const sessionsTodayUnique = sessionsTodayBucket?.unique ?? 0;

  const clicksTodayBucket = clicks[today] || {};
  const clicksTodayTotal = Object.values(clicksTodayBucket).reduce((a, b) => a + b, 0);

  const summary = {
    today,
    waitlistToday,
    waitlistTotal,
    sessionsTodayTotal,
    sessionsTodayUnique,
    clicksTodayTotal
  };

  if (date) {
    const dailyWaitlist = waitlist
      .filter((e) => (e.created_at || "").slice(0, 10) === date)
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

    const dailyClicksObj = clicks[date] || {};
    const dailyClicks = Object.entries(dailyClicksObj)
      .map(([button_name, click_count]) => ({ button_name, click_count }))
      .sort((a, b) => b.click_count - a.click_count);

    const dailySessionBucket = sessions[date];

    return NextResponse.json({
      summary,
      daily: {
        date,
        waitlist: dailyWaitlist,
        clicks: dailyClicks,
        sessions: {
          total: dailySessionBucket?.total ?? 0,
          unique: dailySessionBucket?.unique ?? 0
        }
      }
    });
  }

  return NextResponse.json({ summary });
}
