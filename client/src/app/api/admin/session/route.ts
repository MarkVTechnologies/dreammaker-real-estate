import { NextRequest, NextResponse } from "next/server";
import { hasValidAdminSession } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  if (!hasValidAdminSession(request)) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
