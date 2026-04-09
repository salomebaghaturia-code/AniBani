import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { readJSON } from "@/lib/storage";
import { FILES, type WaitlistEntry } from "@/lib/storageTypes";

export const runtime = "nodejs";

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const all = await readJSON<WaitlistEntry[]>(FILES.WAITLIST, []);
  // Newest first
  const rows = [...all].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

  const headers = [
    "id",
    "email",
    "name",
    "child_age",
    "recommendation",
    "source_button",
    "language",
    "created_at"
  ] as const;

  const lines: string[] = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(","));
  }
  // BOM so Excel reads UTF-8 (Georgian) correctly
  const csv = "\ufeff" + lines.join("\n");

  const filename = `anibani-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
}
