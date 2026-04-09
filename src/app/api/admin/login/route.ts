import { NextRequest, NextResponse } from "next/server";
import { signAdminToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const expectedUser = process.env.ADMIN_USERNAME;
    const expectedPass = process.env.ADMIN_PASSWORD;

    if (!expectedUser || !expectedPass) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      username !== expectedUser ||
      password !== expectedPass
    ) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signAdminToken();
    return NextResponse.json({ token });
  } catch (err) {
    console.error("admin login error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
