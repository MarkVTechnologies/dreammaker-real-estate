import type { EstateDetail, EstateSummary } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4200";

/**
 * Estate grid data (server/src/routes/estates.ts). Never cached: estates are edited live via
 * /admin, and Vercel's fetch cache isn't reliably invalidated by a redeploy, so a time-based
 * revalidate window left edits appearing stale for up to an hour.
 */
export async function getEstates(): Promise<EstateSummary[]> {
  const res = await fetch(`${API_URL}/estates`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

/** Single estate for the detail page — never cached, see getEstates(). */
export async function getEstateBySlug(slug: string): Promise<EstateDetail | null> {
  const res = await fetch(`${API_URL}/estates/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export interface CreateLeadInput {
  name: string;
  phone: string;
  email?: string;
  estateId?: string;
  type: "INSPECTION" | "VIRTUAL_INSPECTION" | "BROCHURE_DOWNLOAD" | "ROI_CALCULATOR" | "GENERAL";
  preferredDate?: string;
  timezone?: string;
  source?: string;
  referralCode?: string;
}

/** Posts to the server API's /leads route (server/src/routes/leads.ts). */
export async function createLead(input: CreateLeadInput): Promise<{ id: string }> {
  const res = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to submit — please try again.");
  }

  return res.json();
}
