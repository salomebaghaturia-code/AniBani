import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { readJSON } from "@/lib/storage";
import { FILES, type WaitlistEntry } from "@/lib/storageTypes";

export const runtime = "nodejs";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const from = url.searchParams.get("from"); // "YYYY-MM-DD"
  const to = url.searchParams.get("to");

  const all = await readJSON<WaitlistEntry[]>(FILES.WAITLIST, []);

  // Filter by date range (compare ISO date prefix only)
  const filtered = all.filter((e) => {
    const day = (e.created_at || "").slice(0, 10);
    if (from && day < from) return false;
    if (to && day > to) return false;
    return true;
  });

  // Sort by created_at desc
  filtered.sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0));

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const offset = (page - 1) * PAGE_SIZE;
  const rows = filtered.slice(offset, offset + PAGE_SIZE);

  return NextResponse.json({
    rows,
    total,
    page,
    pageSize: PAGE_SIZE,
    pages
  });
}
