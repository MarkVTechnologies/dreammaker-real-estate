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

/** Posts to this app's own /api/leads route (client-side call, browser fetch). */
export async function createLead(input: CreateLeadInput): Promise<{ id: string }> {
  const res = await fetch("/api/leads", {
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
