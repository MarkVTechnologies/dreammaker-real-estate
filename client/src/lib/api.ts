import type { EstateDetail, EstateSummary } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4200";

/** Estate grid data (server/src/routes/estates.ts) — revalidates hourly. */
export async function getEstates(): Promise<EstateSummary[]> {
  const res = await fetch(`${API_URL}/estates`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  return res.json();
}

/** Single estate for the detail page — revalidates hourly. */
export async function getEstateBySlug(slug: string): Promise<EstateDetail | null> {
  const res = await fetch(`${API_URL}/estates/${slug}`, { next: { revalidate: 3600 } });
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
