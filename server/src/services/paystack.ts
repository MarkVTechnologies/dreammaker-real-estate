import crypto from "node:crypto";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

interface InitializeParams {
  email: string;
  amountNgn: number;
  reference: string;
  metadata?: Record<string, unknown>;
}

/** Initializes a Paystack transaction for a deposit or instalment (PRD §10.2, §11.1). */
export async function initializeTransaction({ email, amountNgn, reference, metadata }: InitializeParams) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountNgn * 100, // kobo
      reference,
      metadata,
    }),
  });

  if (!response.ok) {
    throw new Error(`Paystack initialize failed: ${response.status}`);
  }

  return (await response.json()) as {
    data: { authorization_url: string; access_code: string; reference: string };
  };
}

/** Verifies the `x-paystack-signature` header on incoming webhooks. */
export function verifyWebhookSignature(rawBody: Buffer, signature: string | undefined): boolean {
  if (!signature || !process.env.PAYSTACK_SECRET_KEY) return false;
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest("hex");
  return hash === signature;
}
