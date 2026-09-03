import "server-only";
import type { NextRequest } from "next/server";

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/**
 * Best-effort per-instance rate limit (no shared store) — fine for the login
 * and public-form limits this guards, which are a secondary defense behind
 * the actual password/validation checks, not the only one.
 */
export function isRateLimited(request: NextRequest, key: string, windowMs: number, limit: number): boolean {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const bucketKey = `${key}:${ip}`;
  const now = Date.now();
  const bucket = buckets.get(bucketKey);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}
