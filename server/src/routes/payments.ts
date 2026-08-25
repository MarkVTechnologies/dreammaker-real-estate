import { Router } from "express";
import { nanoid } from "nanoid";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { validateBody } from "../middleware/validate.js";
import { initializeTransaction } from "../services/paystack.js";

export const paymentsRouter = Router();

const initializeSchema = z.object({
  email: z.string().email(),
  amountNgn: z.number().positive(),
  estateId: z.string().optional(),
  plotId: z.string().optional(),
  leadId: z.string().optional(),
  type: z.enum(["DEPOSIT", "INSTALMENT"]),
});

/** Starts a Paystack checkout for a deposit or instalment (PRD §10.2, §11.1). */
paymentsRouter.post("/initialize", validateBody(initializeSchema), async (req, res) => {
  const body = req.body as z.infer<typeof initializeSchema>;
  const reference = `dm_${nanoid(16)}`;

  await prisma.payment.create({
    data: {
      reference,
      provider: "PAYSTACK",
      amountNgn: body.amountNgn,
      type: body.type,
      estateId: body.estateId,
      plotId: body.plotId,
      status: "PENDING",
    },
  });

  const { data } = await initializeTransaction({
    email: body.email,
    amountNgn: body.amountNgn,
    reference,
    metadata: { estateId: body.estateId, plotId: body.plotId, leadId: body.leadId },
  });

  res.json({ authorizationUrl: data.authorization_url, reference: data.reference });
});
