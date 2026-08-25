import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "@clerk/backend";

export interface AuthedRequest extends Request {
  auth?: { userId: string };
}

/**
 * Verifies the session token issued by the client app's Clerk instance.
 * Protects /portal-facing routes (referrals, earnings, inventory sheets).
 */
export async function requireAuth(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    return res.status(401).json({ error: "Missing bearer token" });
  }

  try {
    const result = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
    req.auth = { userId: result.sub };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
}
