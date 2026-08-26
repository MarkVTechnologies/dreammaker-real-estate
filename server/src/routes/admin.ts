import { Router } from "express";
import { z } from "zod";
import { rateLimit } from "express-rate-limit";
import { prisma } from "../lib/prisma.js";
import { validateBody } from "../middleware/validate.js";
import { clearAdminSession, issueAdminSession, requireAdmin } from "../middleware/adminAuth.js";

export const adminRouter = Router();

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 });

const loginSchema = z.object({ password: z.string().min(1) });

adminRouter.post("/login", loginLimiter, validateBody(loginSchema), (req, res) => {
  const { password } = req.body as z.infer<typeof loginSchema>;
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Incorrect password" });
  }
  issueAdminSession(res);
  res.json({ ok: true });
});

adminRouter.post("/logout", (_req, res) => {
  clearAdminSession(res);
  res.json({ ok: true });
});

adminRouter.get("/session", requireAdmin, (_req, res) => {
  res.json({ ok: true });
});

// Everything below requires a valid admin session.
adminRouter.use(requireAdmin);

const paymentPlanSchema = z.object({
  name: z.string().min(1),
  sizeSqm: z.number().positive(),
  priceNgn: z.number().positive(),
  treesCount: z.number().positive().optional(),
});

const faqSchema = z.object({ q: z.string().min(1), a: z.string().min(1) });

const estateSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  name: z.string().min(1),
  state: z.string().min(1),
  lga: z.string().min(1),
  locality: z.string().min(1),
  status: z.enum(["PLANNING", "ONGOING", "DELIVERED"]),
  titleType: z.enum([
    "C_OF_O",
    "GAZETTE",
    "EXCISION",
    "REGISTERED_SURVEY",
    "GOVERNORS_CONSENT",
    "DEED_OF_ASSIGNMENT",
  ]),
  startingPriceNgn: z.number().int().positive(),
  depositPercent: z.number().int().min(0).max(100),
  plotSizesSqm: z.array(z.number().int().positive()),
  paymentPlans: z.array(paymentPlanSchema).nullable().optional(),
  features: z.array(z.string()).nullable().optional(),
  documents: z.array(z.string()).nullable().optional(),
  gallery: z.array(z.string()).nullable().optional(),
  videoUrl: z.string().nullable().optional(),
  landmarks: z.array(z.string()).nullable().optional(),
  faqs: z.array(faqSchema).nullable().optional(),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
});

/** Admin estate list — full records (not the public summary shape), used to populate the dashboard table. */
adminRouter.get("/estates", async (_req, res) => {
  const estates = await prisma.estate.findMany({
    orderBy: { createdAt: "desc" },
    include: { plots: true },
  });
  res.json(estates);
});

adminRouter.post("/estates", validateBody(estateSchema), async (req, res) => {
  try {
    const estate = await prisma.estate.create({ data: req.body });
    res.status(201).json(estate);
  } catch (err) {
    if (err instanceof Error && err.message.includes("Unique constraint")) {
      return res.status(409).json({ error: "An estate with that slug already exists" });
    }
    throw err;
  }
});

adminRouter.patch("/estates/:id", validateBody(estateSchema.partial()), async (req, res) => {
  const estate = await prisma.estate.update({ where: { id: String(req.params.id) }, data: req.body }).catch(() => null);
  if (!estate) return res.status(404).json({ error: "Estate not found" });
  res.json(estate);
});

adminRouter.delete("/estates/:id", async (req, res) => {
  await prisma.estate.delete({ where: { id: String(req.params.id) } }).catch(() => null);
  res.status(204).end();
});

const plotSchema = z.object({
  plotNumber: z.string().min(1),
  sizeSqm: z.number().int().positive(),
  priceNgn: z.number().int().positive(),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD"]),
  orientation: z.string().nullable().optional(),
});

adminRouter.post("/estates/:id/plots", validateBody(plotSchema), async (req, res) => {
  try {
    const plot = await prisma.plot.create({ data: { ...req.body, estateId: String(req.params.id) } });
    res.status(201).json(plot);
  } catch (err) {
    if (err instanceof Error && err.message.includes("Unique constraint")) {
      return res.status(409).json({ error: "A plot with that number already exists on this estate" });
    }
    throw err;
  }
});

adminRouter.patch("/plots/:id", validateBody(plotSchema.partial()), async (req, res) => {
  const plot = await prisma.plot.update({ where: { id: String(req.params.id) }, data: req.body }).catch(() => null);
  if (!plot) return res.status(404).json({ error: "Plot not found" });
  res.json(plot);
});

adminRouter.delete("/plots/:id", async (req, res) => {
  await prisma.plot.delete({ where: { id: String(req.params.id) } }).catch(() => null);
  res.status(204).end();
});
