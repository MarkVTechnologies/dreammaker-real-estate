import { Resend } from "resend";
import type { Lead } from "@prisma/client";

/** Internal notification when a new lead lands — keeps the 2-hour response SLA (PRD §10.2). */
export async function sendLeadNotification(lead: Lead) {
  if (!process.env.RESEND_API_KEY) return; // no-op until configured

  // Constructed lazily: Resend's constructor throws immediately on a missing
  // key, so instantiating it at module load would crash the whole process
  // before this function's guard above ever runs.
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "DreamMaker Real Estate <no-reply@dreammaker.com.ng>",
    to: process.env.LEADS_INBOX_EMAIL ?? "leads@dreammaker.com.ng",
    subject: `New ${lead.type.toLowerCase().replace("_", " ")} lead — ${lead.name}`,
    text: [
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email ?? "—"}`,
      `Type: ${lead.type}`,
      `Estate: ${lead.estateId ?? "—"}`,
      `Source: ${lead.source ?? "—"}`,
    ].join("\n"),
  });
}
