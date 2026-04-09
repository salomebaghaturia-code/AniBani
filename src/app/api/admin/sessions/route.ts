import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { readJSON } from "@/lib/storage";
import { FILES, type SessionsByDate } from "@/lib/storageTypes";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  const all = await readJSON<SessionsByDate>(FILES.SESSIONS, {});

  const dates = Object.keys(all)
    .filter((d) => (from ? d >= from : true) && (to ? d <= to : true))
    .sort();

  const rows = dates.map((d) => ({
    date: d,
    total_sessions: all[d].total,
    unique_sessions: all[d].unique
  }));

  const totals = rows.reduce(
    (acc, r) => {
      acc.totalSessions += r.total_sessions;
      acc.uniqueSessions += r.unique_sessions;
      return acc;
    },
    { totalSessions: 0, uniqueSessions: 0 }
  );

  return NextResponse.json({ rows, totals });
}
