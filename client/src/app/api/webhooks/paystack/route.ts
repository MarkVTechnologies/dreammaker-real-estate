import { NextRequest, NextResponse } from "next/server";
import { markPlotSold } from "@/lib/db/estates";
import { markPaymentSuccessByReference } from "@/lib/db/payments";
import { verifyWebhookSignature } from "@/lib/paystack";

interface PaystackChargeEvent {
  event: string;
  data: { reference: string; status: string };
}

/** Paystack webhook — signature verification requires the exact raw request bytes (PRD §11.3 security). */
export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-paystack-signature") ?? undefined;
  const rawBody = Buffer.from(await request.arrayBuffer());

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody.toString("utf8")) as PaystackChargeEvent;

  if (payload.event === "charge.success") {
    const payment = await markPaymentSuccessByReference(payload.data.reference);
    if (payment?.plotId) {
      await markPlotSold(payment.plotId);
    }
  }

  // Always 200 quickly — Paystack retries on non-2xx.
  return new NextResponse(null, { status: 200 });
}
