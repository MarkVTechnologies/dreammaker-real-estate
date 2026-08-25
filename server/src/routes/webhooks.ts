import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { verifyWebhookSignature } from "../services/paystack.js";

export const webhooksRouter = Router();

interface PaystackChargeEvent {
  event: string;
  data: { reference: string; status: string };
}

/**
 * Paystack webhook. Mounted with an `express.raw()` body parser in index.ts
 * (signature verification requires the exact raw bytes, PRD §11.3 security).
 */
webhooksRouter.post("/paystack", async (req, res) => {
  const signature = req.headers["x-paystack-signature"] as string | undefined;
  const rawBody = req.body as Buffer;

  if (!verifyWebhookSignature(rawBody, signature)) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  const payload = JSON.parse(rawBody.toString("utf8")) as PaystackChargeEvent;

  if (payload.event === "charge.success") {
    const payment = await prisma.payment.update({
      where: { reference: payload.data.reference },
      data: { status: "SUCCESS", paidAt: new Date() },
    });

    if (payment.plotId) {
      await prisma.plot.update({ where: { id: payment.plotId }, data: { status: "SOLD" } });
    }
  }

  // Always 200 quickly — Paystack retries on non-2xx.
  res.sendStatus(200);
});
