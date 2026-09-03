import "server-only";
import { z } from "zod";

const paymentPlanSchema = z.object({
  name: z.string().min(1),
  sizeSqm: z.number().positive(),
  priceNgn: z.number().positive(),
  treesCount: z.number().positive().optional(),
});

const faqSchema = z.object({ q: z.string().min(1), a: z.string().min(1) });

export const estateSchema = z.object({
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

export const plotSchema = z.object({
  plotNumber: z.string().min(1),
  sizeSqm: z.number().int().positive(),
  priceNgn: z.number().int().positive(),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD"]),
  orientation: z.string().nullable().optional(),
});
