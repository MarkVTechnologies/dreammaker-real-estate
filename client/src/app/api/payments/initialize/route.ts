import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createPaymentDoc } from "@/lib/db/payments";
import { initializeTransaction } from "@/lib/paystack";
import { parseJsonBody } from "@/lib/validate";

const initializeSchema = z.object({
  email: z.string().email(),
  amountNgn: z.number().positive(),
  estateId: z.string().optional(),
  plotId: z.string().optional(),
  leadId: z.string().optional(),
  type: z.enum(["DEPOSIT", "INSTALMENT"]),
});

/** Starts a Paystack checkout for a deposit or instalment (PRD §10.2, §11.1). */
export async function POST(request: NextRequest) {
  const parsed = await parseJsonBody(request, initializeSchema);
  if (parsed.error) return parsed.error;
  const body = parsed.data;
  const reference = `dm_${nanoid(16)}`;

  await createPaymentDoc({
    reference,
    provider: "PAYSTACK",
    amountNgn: body.amountNgn,
    type: body.type,
    estateId: body.estateId,
    plotId: body.plotId,
    leadId: body.leadId,
  });

  const { data } = await initializeTransaction({
    email: body.email,
    amountNgn: body.amountNgn,
    reference,
    metadata: { estateId: body.estateId, plotId: body.plotId, leadId: body.leadId },
  });

  return NextResponse.json({ authorizationUrl: data.authorization_url, reference: data.reference });
}
