import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { validateBody } from "../middleware/validate.js";
import { sendLeadNotification } from "../services/email.js";

export const leadsRouter = Router();

// Nigerian phone: optional +234 / 0 prefix, 10 subscriber digits
const phoneSchema = z
  .string()
  .regex(/^(\+234|0)[789][01]\d{8}$/, "Enter a valid Nigerian phone number");

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
leadsRouter.post("/", validateBody(createLeadSchema), async (req, res) => {
  const { referralCode, ...data } = req.body as z.infer<typeof createLeadSchema>;

  const lead = await prisma.lead.create({ data });

  if (referralCode) {
    const realtor = await prisma.realtor.findUnique({ where: { referralCode } });
    if (realtor) {
      await prisma.referral.create({
        data: {
          realtorId: realtor.id,
          leadId: lead.id,
          estateId: lead.estateId ?? undefined,
          stage: "LEAD",
        },
      });
    }
  }

  await sendLeadNotification(lead).catch((err) => {
    // Notification failure must never block lead capture.
    console.error("Lead notification email failed", err);
  });

  res.status(201).json({ id: lead.id });
});

leadsRouter.get("/:id", async (req, res) => {
  const lead = await prisma.lead.findUnique({ where: { id: req.params.id } });
  if (!lead) return res.status(404).json({ error: "Not found" });
  res.json(lead);
});
