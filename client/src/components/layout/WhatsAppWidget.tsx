"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, MessageCircle, Phone, X } from "lucide-react";
import { nap } from "@/lib/nav";
import { whatsappLink } from "@/lib/whatsapp";

const AUTO_OPEN_DELAY_MS = 3500;
const GREETING_MESSAGE = "Hi DreamMaker, I'd like to know more about your estates.";

/**
 * Floating WhatsApp entry point on every page. Collapsed state is a round,
 * infinitely-pulsing button (always a direct WhatsApp deep link); it expands
 * into a chat-style card once — auto-opening after a delay, or on click —
 * modelled on the reference screenshot but using a team byline instead of a
 * fabricated named employee/photo (matches the "pending" pattern used
 * elsewhere on the site rather than inventing a person who doesn't exist).
 */
export function WhatsAppWidget() {
  const [cardOpen, setCardOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setCardOpen(true), AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [dismissed]);

  function closeCard() {
    setCardOpen(false);
    setDismissed(true);
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {cardOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-80 overflow-hidden rounded-2xl bg-white shadow-2xl shadow-navy-950/25"
            role="dialog"
            aria-label="WhatsApp chat"
          >
            {/* Header */}
            <div className="relative bg-navy-950 px-5 pb-5 pt-4">
              <button
                type="button"
                onClick={closeCard}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-500/40 bg-navy-800">
                    <Building2 className="h-6 w-6 text-gold-500" aria-hidden="true" strokeWidth={1.75} />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-navy-950 bg-success" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display font-semibold text-white">DreamMaker Support</p>
                  <p className="text-sm text-navy-100">Real Estate Sales Team</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-gold-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                    Typically replies within 2 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="bg-grid-navy relative bg-navy-50 px-4 pb-4 pt-3">
              <p className="text-center text-xs font-medium uppercase tracking-wide text-ink-500">Today</p>

              <div className="mt-3 flex items-end gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy-100 bg-white">
                  <Building2 className="h-4 w-4 text-navy-700" aria-hidden="true" strokeWidth={1.75} />
                </div>
                <div className="rounded-2xl rounded-bl-sm bg-white p-3.5 shadow-sm">
                  <p className="text-sm leading-relaxed text-ink-700">
                    Hi there! 👋 Need help finding the right estate or checking a title? Send us a
                    message here, or reach us directly on WhatsApp below.
                  </p>
                  {timestamp && (
                    <p className="mt-1.5 text-right text-[11px] text-ink-500">{timestamp}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 bg-navy-50 p-4 pt-0">
              <a
                href={whatsappLink(GREETING_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                data-event="whatsapp_click"
                className="flex items-center justify-center gap-2 rounded-lg bg-whatsapp py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" fill="currentColor" />
                Start Chat on WhatsApp
              </a>
              <a
                href={`tel:${nap.phoneDisplay.replace(/\s+/g, "")}`}
                data-event="phone_click"
                className="flex items-center justify-center gap-2 rounded-lg border border-navy-200 bg-white py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {nap.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!cardOpen && (
        <a
          href={whatsappLink(GREETING_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          data-event="whatsapp_click"
          aria-label="Chat with DreamMaker on WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/40 transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-75" aria-hidden="true" />
          <span className="absolute inset-0 rounded-full bg-whatsapp" aria-hidden="true" />
          <MessageCircle className="relative h-7 w-7" aria-hidden="true" fill="currentColor" />
        </a>
      )}
    </div>
  );
}
