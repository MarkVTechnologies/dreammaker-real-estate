import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { validateBody } from "../middleware/validate.js";

export const bookingsRouter = Router();

const calculatorInputSchema = z.object({
  estateId: z.string(),
  plotSizeSqm: z.number().positive(),
  durationMonths: z.number().int().positive(),
});

/**
 * Payment plan calculator (PRD §8.2 module 3). Stateless computation — the
 * "calculator_used" GA4 event (PRD §12) fires client-side; this endpoint
 * just returns the authoritative numbers from the estate's stored pricing.
 */
bookingsRouter.post("/calculate", validateBody(calculatorInputSchema), async (req, res) => {
  const { estateId, plotSizeSqm, durationMonths } = req.body as z.infer<typeof calculatorInputSchema>;

  const estate = await prisma.estate.findUnique({ where: { id: estateId } });
  if (!estate) return res.status(404).json({ error: "Estate not found" });

  const pricePerPlot = estate.startingPriceNgn * (plotSizeSqm / (estate.plotSizesSqm[0] ?? plotSizeSqm));
  const depositNgn = Math.round(pricePerPlot * (estate.depositPercent / 100));
  const balanceNgn = Math.round(pricePerPlot - depositNgn);
  const monthlyInstalmentNgn = Math.round(balanceNgn / durationMonths);

  res.json({
    totalNgn: Math.round(pricePerPlot),
    depositNgn,
    balanceNgn,
    monthlyInstalmentNgn,
    durationMonths,
  });
});
