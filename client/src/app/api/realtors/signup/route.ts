import { customAlphabet } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createRealtorDoc } from "@/lib/db/realtors";
import { isRateLimited } from "@/lib/rateLimit";
import { parseJsonBody } from "@/lib/validate";

const generateReferralCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 7);

const signupSchema = z.object({
  clerkUserId: z.string(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
});

/** Public signup — PRD §8.4. Account starts PENDING until reviewed. */
export async function POST(request: NextRequest) {
  if (isRateLimited(request, "realtors_signup", 15 * 60 * 1000, 30)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = await parseJsonBody(request, signupSchema);
  if (parsed.error) return parsed.error;

  const realtor = await createRealtorDoc({ ...parsed.data, referralCode: generateReferralCode() });
  return NextResponse.json({ id: realtor._id.toHexString(), referralCode: realtor.referralCode }, { status: 201 });
}
