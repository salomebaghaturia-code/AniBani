import { NextRequest, NextResponse } from "next/server";
import { updateJSON } from "@/lib/storage";
import { FILES, todayISODate, type ClicksByDate } from "@/lib/storageTypes";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const buttonName = (body.buttonName || "").toString().trim();
    if (!buttonName) {
      return NextResponse.json({ error: "buttonName required" }, { status: 400 });
    }

    const today = todayISODate();

    await updateJSON<ClicksByDate>(FILES.CLICKS, {}, (current) => {
      const next = { ...current };
      const day = { ...(next[today] || {}) };
      day[buttonName] = (day[buttonName] || 0) + 1;
      next[today] = day;
      return next;
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("click error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
