import "server-only";
import { NextResponse } from "next/server";
import type { ZodSchema } from "zod";

/** Parses and validates a Route Handler's JSON body against a Zod schema. */
export async function parseJsonBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<{ data: T; error?: undefined } | { data?: undefined; error: NextResponse }> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return { error: NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }) };
  }
  const result = schema.safeParse(json);
  if (!result.success) {
    return { error: NextResponse.json({ error: "Validation failed", issues: result.error.issues }, { status: 422 }) };
  }
  return { data: result.data };
}
