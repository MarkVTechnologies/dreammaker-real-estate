import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE_NAME, ADMIN_SESSION_MAX_AGE_SECONDS, signAdminSessionToken } from "@/lib/adminAuth";
import { isRateLimited } from "@/lib/rateLimit";
import { parseJsonBody } from "@/lib/validate";

const loginSchema = z.object({ password: z.string().min(1) });

export async function POST(request: NextRequest) {
  if (isRateLimited(request, "admin_login", 15 * 60 * 1000, 10)) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }

  const parsed = await parseJsonBody(request, loginSchema);
  if (parsed.error) return parsed.error;

  if (!process.env.ADMIN_PASSWORD || parsed.data.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, signAdminSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
  return response;
}
