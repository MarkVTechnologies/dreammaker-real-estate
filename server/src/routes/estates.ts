import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const estatesRouter = Router();

/** Estate grid (PRD §8.1 module 3/4) — summary fields only, never fabricated availability. */
estatesRouter.get("/", async (_req, res) => {
  const estates = await prisma.estate.findMany({
    orderBy: { createdAt: "desc" },
    include: { plots: true },
  });

  res.json(
    estates.map((estate) => {
      const gallery = Array.isArray(estate.gallery) ? (estate.gallery as string[]) : [];
      return {
        slug: estate.slug,
        name: estate.name,
        locality: estate.locality,
        lga: estate.lga,
        titleType: estate.titleType,
        startingPriceNgn: estate.startingPriceNgn,
        depositPercent: estate.depositPercent,
        plotSizesSqm: estate.plotSizesSqm,
        coverImageUrl: gallery[0] ?? "",
        plotsAvailable: estate.plots.filter((p) => p.status === "AVAILABLE").length,
        plotsTotal: estate.plots.length,
      };
    })
  );
});

/** Estate detail (PRD §8.2 "money page") — full content for the inner page. */
estatesRouter.get("/:slug", async (req, res) => {
  const estate = await prisma.estate.findUnique({
    where: { slug: req.params.slug },
    include: { plots: true, progressUpdates: { orderBy: { postedAt: "desc" } } },
  });
  if (!estate) return res.status(404).json({ error: "Estate not found" });

  res.json({
    ...estate,
    plotsAvailable: estate.plots.filter((p) => p.status === "AVAILABLE").length,
    plotsTotal: estate.plots.length,
  });
});
