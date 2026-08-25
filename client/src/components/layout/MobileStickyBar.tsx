"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { nap } from "@/lib/nav";
import { WhatsAppLink } from "./WhatsAppLink";

/**
 * Sticky bottom bar on every page (PRD §7, §10.2): Call · WhatsApp · Book
 * Inspection. Called out as the single element most likely to move mobile
 * conversion in this funnel — keep it on every route, never conditionally hide it.
 */
export function MobileStickyBar() {
  return (
    <motion.div
      initial={{ y: 64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-navy-100 bg-white shadow-[0_-4px_16px_rgba(5,16,42,0.08)] md:hidden"
    >
      <a
        href={`tel:${nap.phoneDisplay.replace(/\s+/g, "")}`}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium text-navy-900 active:bg-navy-50"
        data-event="phone_click"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call
      </a>
      <WhatsAppLink
        message="Hi DreamMaker, I'd like to know more about your estates."
        className="flex flex-col items-center justify-center gap-0.5 border-x border-navy-100 py-2.5 text-xs font-medium text-whatsapp active:bg-navy-50"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </WhatsAppLink>
      <Link
        href="/book-inspection"
        className="flex flex-col items-center justify-center gap-0.5 bg-gold-500 py-2.5 text-xs font-semibold text-navy-950 active:bg-gold-600"
      >
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        Book Inspection
      </Link>
    </motion.div>
  );
}
