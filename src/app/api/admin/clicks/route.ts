import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { readJSON } from "@/lib/storage";
import { FILES, type ClicksByDate } from "@/lib/storageTypes";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  const all = await readJSON<ClicksByDate>(FILES.CLICKS, {});

  // Filter date keys by range
  const dates = Object.keys(all)
    .filter((d) => (from ? d >= from : true) && (to ? d <= to : true))
    .sort();

  // Flat rows: [{button_name, click_date, click_count}]
  const rows: { button_name: string; click_date: string; click_count: number }[] = [];
  for (const d of dates) {
    const buckets = all[d];
    for (const [button, count] of Object.entries(buckets)) {
      rows.push({ button_name: button, click_date: d, click_count: count });
    }
  }

  // Sort: most recent date first, then count desc within a date
  rows.sort((a, b) => {
    if (a.click_date !== b.click_date) return a.click_date < b.click_date ? 1 : -1;
    return b.click_count - a.click_count;
  });

  // Aggregate totals across the range
  const totalsMap: Record<string, number> = {};
  let grandTotal = 0;
  for (const r of rows) {
    totalsMap[r.button_name] = (totalsMap[r.button_name] || 0) + r.click_count;
    grandTotal += r.click_count;
  }
  const totals = Object.entries(totalsMap)
    .map(([button_name, total]) => ({ button_name, total }))
    .sort((a, b) => b.total - a.total);

  return NextResponse.json({ rows, totals, grandTotal });
}
