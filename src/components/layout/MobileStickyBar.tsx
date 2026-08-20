import Link from "next/link";
import { nap } from "@/lib/nav";
import { WhatsAppLink } from "./WhatsAppLink";

/**
 * Sticky bottom bar on every page (PRD §7, §10.2): Call · WhatsApp · Book
 * Inspection. Called out as the single element most likely to move mobile
 * conversion in this funnel — keep it on every route, never conditionally hide it.
 */
export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-navy-100 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:hidden">
      <a
        href={`tel:${nap.phoneDisplay.replace(/\s+/g, "")}`}
        className="flex flex-col items-center justify-center gap-0.5 py-2 text-xs font-medium text-navy-900"
        data-event="phone_click"
      >
        Call
      </a>
      <WhatsAppLink
        message="Hi DreamMaker, I'd like to know more about your estates."
        className="flex flex-col items-center justify-center gap-0.5 border-x border-navy-100 py-2 text-xs font-medium text-whatsapp"
      >
        WhatsApp
      </WhatsAppLink>
      <Link
        href="/book-inspection"
        className="flex flex-col items-center justify-center gap-0.5 bg-gold-500 py-2 text-xs font-semibold text-navy-950"
      >
        Book Inspection
      </Link>
    </div>
  );
}
