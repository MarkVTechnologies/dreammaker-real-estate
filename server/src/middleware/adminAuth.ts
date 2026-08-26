import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

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
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected));
}

/** Issues the signed admin session cookie — cross-site (Vercel front end -> Railway API), so SameSite=None. */
export function issueAdminSession(res: Response) {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  res.cookie(COOKIE_NAME, sign(expiresAt), {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: SESSION_TTL_MS,
    path: "/",
  });
}

export function clearAdminSession(res: Response) {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, secure: true, sameSite: "none", path: "/" });
}

export function hasValidAdminSession(req: Request): boolean {
  return verify(req.cookies?.[COOKIE_NAME]);
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!hasValidAdminSession(req)) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}
