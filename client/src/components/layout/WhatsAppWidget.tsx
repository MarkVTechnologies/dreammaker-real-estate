"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

const AUTO_OPEN_DELAY_MS = 3500;
const GREETING_MESSAGE = "Hi DreamMaker, I'd like to know more about your estates.";

/**
 * Floating WhatsApp entry point on every page. The round button is always a
 * direct WhatsApp deep link with an infinite pulse ring to draw the eye; the
 * greeting bubble auto-opens once per session as a separate attention beat,
 * and can be dismissed without closing off the button itself.
 */
export function WhatsAppWidget() {
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setBubbleOpen(true), AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [dismissed]);

  function closeBubble() {
    setBubbleOpen(false);
    setDismissed(true);
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {bubbleOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-72 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl shadow-navy-950/20"
            role="dialog"
            aria-label="WhatsApp chat prompt"
          >
            <div className="flex items-center justify-between bg-whatsapp px-4 py-3">
              <span className="text-sm font-semibold text-white">DreamMaker</span>
              <button
                type="button"
                onClick={closeBubble}
                className="text-white/80 transition-colors hover:text-white"
                aria-label="Close chat prompt"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <a
              href={whatsappLink(GREETING_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              data-event="whatsapp_click"
              className="block p-4 hover:bg-navy-50"
            >
              <p className="text-sm text-ink-700">
                👋 Hi there! Need help finding the right estate or checking a title? Chat with us
                directly on WhatsApp — we respond within 2 hours, 8am–8pm WAT.
              </p>
              <span className="mt-3 flex items-center justify-center gap-2 rounded-md bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Start chat
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

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
    </div>
  );
}
