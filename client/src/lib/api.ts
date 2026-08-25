const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4200";

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
