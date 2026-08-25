import { Router } from "express";
import { customAlphabet } from "nanoid";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";

export const realtorsRouter = Router();

const referralCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 7);

const signupSchema = z.object({
  clerkUserId: z.string(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
});

/** Public signup — PRD §8.4. Account starts PENDING until reviewed. */
realtorsRouter.post("/signup", validateBody(signupSchema), async (req, res) => {
  const realtor = await prisma.realtor.create({
    data: { ...req.body, referralCode: referralCode() },
  });
  res.status(201).json({ id: realtor.id, referralCode: realtor.referralCode });
});

/** Authenticated dashboard summary — referrals, pipeline, earnings (PRD §8.4). */
realtorsRouter.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const realtor = await prisma.realtor.findUnique({
    where: { clerkUserId: req.auth!.userId },
    include: { referrals: { orderBy: { createdAt: "desc" }, take: 50 } },
  });
  if (!realtor) return res.status(404).json({ error: "No realtor profile for this account" });

  const earningsNgn = realtor.referrals
    .filter((r) => r.stage === "ALLOCATED")
    .reduce((sum, r) => sum + (r.commissionAmountNgn ?? 0), 0);

  res.json({ ...realtor, earningsNgn });
});
