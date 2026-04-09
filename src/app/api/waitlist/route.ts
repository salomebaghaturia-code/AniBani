import { NextRequest, NextResponse } from "next/server";
import { updateJSON } from "@/lib/storage";
import { FILES, type WaitlistEntry } from "@/lib/storageTypes";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").toString().trim();
    const name = (body.name || "").toString().trim() || null;
    const childAge = (body.childAge || "").toString().trim() || null;
    const recommendation = (body.recommendation || "").toString().trim() || null;
    const sourceButton = (body.sourceButton || "unknown").toString().trim();
    const language = (body.language || "ka").toString().trim();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    let newEntry: WaitlistEntry | null = null;

    await updateJSON<WaitlistEntry[]>(FILES.WAITLIST, [], (current) => {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((e) => e.id)) + 1;
      newEntry = {
        id: nextId,
        email,
        name,
        child_age: childAge,
        recommendation,
        source_button: sourceButton,
        language,
        created_at: new Date().toISOString()
      };
      return [...current, newEntry];
    });

    return NextResponse.json({ ok: true, id: newEntry?.id });
  } catch (err) {
    console.error("waitlist error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
