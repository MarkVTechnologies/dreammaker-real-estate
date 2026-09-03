import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getRealtorByClerkUserId, listReferralsForRealtor } from "@/lib/db/realtors";

/** Authenticated dashboard summary — referrals, pipeline, earnings (PRD §8.4). */
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const realtor = await getRealtorByClerkUserId(userId);
  if (!realtor) return NextResponse.json({ error: "No realtor profile for this account" }, { status: 404 });

  const referrals = await listReferralsForRealtor(realtor._id.toHexString());
  const earningsNgn = referrals
    .filter((r) => r.stage === "ALLOCATED")
    .reduce((sum, r) => sum + (r.commissionAmountNgn ?? 0), 0);

  return NextResponse.json({
    ...realtor,
    id: realtor._id.toHexString(),
    _id: undefined,
    referrals,
    earningsNgn,
  });
}
