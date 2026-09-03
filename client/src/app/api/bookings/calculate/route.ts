import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getEstateDocById } from "@/lib/db/estates";
import { parseJsonBody } from "@/lib/validate";

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
export async function POST(request: NextRequest) {
  const parsed = await parseJsonBody(request, calculatorInputSchema);
  if (parsed.error) return parsed.error;
  const { estateId, plotSizeSqm, durationMonths } = parsed.data;

  const estate = await getEstateDocById(estateId);
  if (!estate) return NextResponse.json({ error: "Estate not found" }, { status: 404 });

  const pricePerPlot = estate.startingPriceNgn * (plotSizeSqm / (estate.plotSizesSqm[0] ?? plotSizeSqm));
  const depositNgn = Math.round(pricePerPlot * (estate.depositPercent / 100));
  const balanceNgn = Math.round(pricePerPlot - depositNgn);
  const monthlyInstalmentNgn = Math.round(balanceNgn / durationMonths);

  return NextResponse.json({
    totalNgn: Math.round(pricePerPlot),
    depositNgn,
    balanceNgn,
    monthlyInstalmentNgn,
    durationMonths,
  });
}
