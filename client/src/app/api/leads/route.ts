import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createLeadDoc } from "@/lib/db/leads";
import { createReferralDoc, findRealtorByReferralCode } from "@/lib/db/realtors";
import { sendLeadNotification } from "@/lib/email";
import { isRateLimited } from "@/lib/rateLimit";
import { parseJsonBody } from "@/lib/validate";

// Nigerian phone: optional +234 / 0 prefix, 10 subscriber digits
const phoneSchema = z.string().regex(/^(\+234|0)[789][01]\d{8}$/, "Enter a valid Nigerian phone number");

const createLeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: phoneSchema,
  email: z.string().email().optional(),
  source: z.string().max(200).optional(),
  estateId: z.string().optional(),
  type: z.enum(["INSPECTION", "VIRTUAL_INSPECTION", "BROCHURE_DOWNLOAD", "ROI_CALCULATOR", "GENERAL"]),
  preferredDate: z.coerce.date().optional(),
  timezone: z.string().max(64).optional(),
  referralCode: z.string().optional(),
});

/**
 * Backs the "Book Inspection" (4-field) and virtual inspection forms (PRD §10.2).
 * Also stamps a Referral row when a realtor referral code is present, so the
 * commission dashboard has a full attribution trail (PRD §12).
 */
export async function POST(request: NextRequest) {
  if (isRateLimited(request, "leads", 15 * 60 * 1000, 30)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = await parseJsonBody(request, createLeadSchema);
  if (parsed.error) return parsed.error;
  const { referralCode, ...data } = parsed.data;

  const lead = await createLeadDoc(data);

  if (referralCode) {
    const realtor = await findRealtorByReferralCode(referralCode);
    if (realtor) {
      await createReferralDoc({
        realtorId: realtor._id.toHexString(),
        leadId: lead._id.toHexString(),
        estateId: lead.estateId ?? undefined,
        stage: "LEAD",
      });
    }
  }

  await sendLeadNotification(lead).catch((err) => {
    // Notification failure must never block lead capture.
    console.error("Lead notification email failed", err);
  });

  return NextResponse.json({ id: lead._id.toHexString() }, { status: 201 });
}
