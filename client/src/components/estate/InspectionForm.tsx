"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Calendar, CheckCircle2, Clock, Globe, Loader2, MapPin, Phone, User } from "lucide-react";
import { createLead } from "@/lib/api";

interface InspectionFormProps {
  variant: "INSPECTION" | "VIRTUAL_INSPECTION";
  /** When set (e.g. opened from an estate's detail page), the estate field is locked instead of freely editable. */
  estateId?: string;
  estateName?: string;
}

const fieldClass =
  "w-full rounded-md border border-ink-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-navy-700";
const iconClass = "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600";

/**
 * Max 4 fields — everything else post-submission (PRD §10.2). Virtual
 * inspection adds a timezone selector for the diaspora audience (PRD §5 P1).
 */
export function InspectionForm({ variant, estateId, estateName }: InspectionFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    try {
      await createLead({
        name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        estateId: String(form.get("estate") ?? "") || undefined,
        preferredDate: String(form.get("preferredDate") ?? "") || undefined,
        timezone: variant === "VIRTUAL_INSPECTION" ? String(form.get("timezone") ?? "") : undefined,
        type: variant,
        source: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start gap-3 rounded-xl border border-success/20 bg-success/5 p-5"
      >
        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
        <p className="text-sm text-navy-900">
          Thanks — we respond within 2 hours, 8am–8pm WAT (PRD §10.2 response SLA).
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="relative block">
        <User className={iconClass} aria-hidden="true" />
        <input name="name" placeholder="Full name" required className={fieldClass} />
      </label>

      <label className="relative block">
        <Phone className={iconClass} aria-hidden="true" />
        <input
          name="phone"
          placeholder="Phone (+234...)"
          required
          pattern="^(\+234|0)[789][01]\d{8}$"
          title="Enter a valid Nigerian phone number"
          className={fieldClass}
        />
      </label>

      {estateId ? (
        <div className="flex items-center gap-2 rounded-md border border-navy-100 bg-navy-50 py-2.5 pl-3 pr-3 text-sm text-navy-900">
          <MapPin className="h-4 w-4 shrink-0 text-ink-600" aria-hidden="true" />
          {estateName ?? "Selected estate"}
          <input type="hidden" name="estate" value={estateId} />
        </div>
      ) : (
        <label className="relative block">
          <MapPin className={iconClass} aria-hidden="true" />
          <input name="estate" placeholder="Estate (optional)" className={fieldClass} />
        </label>
      )}

      <label className="relative block">
        <Calendar className={iconClass} aria-hidden="true" />
        <input name="preferredDate" type="date" className={fieldClass} />
      </label>

      {variant === "VIRTUAL_INSPECTION" && (
        <label className="relative block">
          <Globe className={iconClass} aria-hidden="true" />
          <select name="timezone" className={`${fieldClass} appearance-none`}>
            <option value="Africa/Lagos">WAT (Lagos)</option>
            <option value="Europe/London">GMT/BST (UK)</option>
            <option value="America/New_York">ET (US East)</option>
            <option value="America/Los_Angeles">PT (US West)</option>
            <option value="Europe/Berlin">CET (Germany)</option>
            <option value="America/Toronto">ET (Canada)</option>
          </select>
        </label>
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-sm text-danger"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-600 disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          "Book inspection"
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-ink-600">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        We respond within 2 hours, 8am–8pm WAT
      </p>
    </form>
  );
}
