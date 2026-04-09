import { NextRequest, NextResponse } from "next/server";
import { updateJSON } from "@/lib/storage";
import { FILES, todayISODate, type SessionsByDate } from "@/lib/storageTypes";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId = (body.sessionId || "").toString().trim();
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    const today = todayISODate();
    let isUnique = false;

    await updateJSON<SessionsByDate>(FILES.SESSIONS, {}, (current) => {
      const next = { ...current };
      const day = next[today]
        ? { ...next[today], session_ids: [...next[today].session_ids] }
        : { total: 0, unique: 0, session_ids: [] };

      day.total += 1;
      if (!day.session_ids.includes(sessionId)) {
        day.session_ids.push(sessionId);
        day.unique += 1;
        isUnique = true;
      }
      next[today] = day;
      return next;
    });

    return NextResponse.json({ ok: true, isUnique });
  } catch (err) {
    console.error("session error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
