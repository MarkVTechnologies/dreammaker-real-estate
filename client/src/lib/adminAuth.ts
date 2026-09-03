import "server-only";
import crypto from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
export const ADMIN_SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;

function sessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET (or ADMIN_PASSWORD) is not set");
  return secret;
}

function sign(expiresAt: number): string {
  const hmac = crypto.createHmac("sha256", sessionSecret()).update(String(expiresAt)).digest("hex");
  return `${expiresAt}.${hmac}`;
}

function verify(token: string | undefined): boolean {
  if (!token) return false;
  const [expiresAtRaw, hmac] = token.split(".");
  const expiresAt = Number(expiresAtRaw);
  if (!expiresAt || !hmac || Date.now() > expiresAt) return false;
  const expected = crypto.createHmac("sha256", sessionSecret()).update(String(expiresAt)).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected));
  } catch {
    return false;
  }
}

/** Issues a fresh, signed admin session token to be set as a cookie. */
export function signAdminSessionToken(): string {
  return sign(Date.now() + SESSION_TTL_MS);
}

/** Same-origin now that the API lives in the Next.js app, so plain Lax cookies work. */
export function hasValidAdminSession(request: NextRequest): boolean {
  return verify(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

/** Guard for admin-only route handlers — returns a 401 response to short-circuit with, or null when authorized. */
export function requireAdmin(request: NextRequest): NextResponse | null {
  if (!hasValidAdminSession(request)) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return null;
}
