import { NextRequest } from "next/server";
import ExcelJS from "exceljs";
import { requireAdmin } from "@/lib/auth";
import { readJSON } from "@/lib/storage";
import { FILES, type WaitlistEntry } from "@/lib/storageTypes";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const all = await readJSON<WaitlistEntry[]>(FILES.WAITLIST, []);
  const rows = [...all].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Waitlist");

  ws.columns = [
    { header: "id", key: "id", width: 6 },
    { header: "email", key: "email", width: 30 },
    { header: "name", key: "name", width: 20 },
    { header: "child_age", key: "child_age", width: 10 },
    { header: "recommendation", key: "recommendation", width: 30 },
    { header: "source_button", key: "source_button", width: 18 },
    { header: "language", key: "language", width: 10 },
    { header: "created_at", key: "created_at", width: 26 }
  ];

  ws.getRow(1).font = { bold: true };

  for (const r of rows) {
    ws.addRow({
      id: r.id,
      email: r.email,
      name: r.name ?? "",
      child_age: r.child_age ?? "",
      recommendation: r.recommendation ?? "",
      source_button: r.source_button ?? "",
      language: r.language ?? "",
      created_at: r.created_at
    });
  }

  const buffer = await wb.xlsx.writeBuffer();
  const filename = `anibani-waitlist-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new Response(buffer as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
}
