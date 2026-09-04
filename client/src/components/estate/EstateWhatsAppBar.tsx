"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

interface EstateWhatsAppBarProps {
  estateName: string;
  message: string;
}

const BAR_HEIGHT = "h-[3.75rem] sm:h-[4.75rem]";

/**
 * Conversion bar for paid-traffic landing pages — Google/Facebook ads send
 * prospects directly to a project page, so the WhatsApp CTA has to be
 * impossible to miss without any scrolling, and stay visible the whole
 * time they read. Fixed (not sticky) so it holds position regardless of
 * an overflow-hidden ancestor elsewhere on the page; pinned directly under
 * the header (itself `sticky top-0`) rather than at the bottom, so it
 * never collides with the bottom-fixed mobile bar/WhatsApp bubble already
 * on every page. A sibling spacer of the same height reserves that space
 * in the page flow so nothing renders underneath it.
 */
export function EstateWhatsAppBar({ estateName, message }: EstateWhatsAppBarProps) {
  return (
    <>
      <div
        className={`fixed inset-x-0 top-16 z-30 ${BAR_HEIGHT} overflow-hidden bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 shadow-[0_6px_24px_-4px_rgba(0,0,0,0.35)]`}
      >
        {/* Infinite diagonal shine sweep — reads as "premium", not just alert-red urgency. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ left: "-30%" }}
          animate={{ left: "130%" }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
        />

        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-3 sm:px-6">
          <WhatsAppLink
            message={message}
            className="group flex items-center gap-2 rounded-full bg-navy-950 py-2 pl-2 pr-3.5 shadow-lg shadow-navy-950/50 ring-1 ring-white/10 transition-transform duration-200 hover:scale-[1.04] sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-5"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-whatsapp sm:h-10 sm:w-10"
            >
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-75"
                aria-hidden="true"
              />
              <MessageCircle
                className="relative h-4 w-4 text-white sm:h-5 sm:w-5"
                aria-hidden="true"
                fill="currentColor"
              />
            </motion.span>

            <span className="text-xs font-bold leading-tight text-white sm:hidden">
              Invest in {estateName} — chat now
            </span>
            <span className="hidden text-sm font-bold text-white sm:inline sm:text-base">
              Chat on WhatsApp to invest in{" "}
              <span className="text-gold-500">{estateName}</span>
            </span>

            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 sm:h-7 sm:w-7"
            >
              <ArrowRight className="h-3.5 w-3.5 text-navy-950 sm:h-4 sm:w-4" aria-hidden="true" />
            </motion.span>
          </WhatsAppLink>
        </div>
      </div>
      {/* Reserves the fixed bar's height so page content doesn't render underneath it. */}
      <div className={BAR_HEIGHT} aria-hidden="true" />
    </>
  );
}
