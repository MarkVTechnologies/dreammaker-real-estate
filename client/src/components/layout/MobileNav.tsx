"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CalendarCheck, MessageCircle, Menu, X } from "lucide-react";
import { primaryNav } from "@/lib/nav";
import { WhatsAppLink } from "./WhatsAppLink";

/**
 * Mobile-only nav drawer. Without this, the primary IA (Invest ·
 * Services · Projects · About · Insights, PRD §7) was unreachable on mobile —
 * MobileStickyBar only surfaces Call/WhatsApp/Book Inspection.
 *
 * Closed via each link's onClick rather than a pathname-watching effect —
 * setState-in-effect causes cascading renders (react-hooks/set-state-in-effect).
 *
 * The overlay is portaled to document.body rather than rendered inline.
 * Header uses `backdrop-blur`, and per spec `backdrop-filter` (like
 * `transform`) creates a new containing block for `position: fixed`
 * descendants — left inline, `fixed inset-y-0` here resolved against
 * Header's own 64px box instead of the viewport, so the drawer rendered
 * squashed into the header's height and got covered by later page content.
 */
// React-recommended pattern for hydration-safe client detection — avoids
// the setState-in-effect that a plain `useState` + `useEffect(() => set...)`
// pair would trigger (react-hooks/set-state-in-effect).
const emptySubscribe = () => () => {};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-md text-navy-900 hover:bg-navy-50"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={close}
                  className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-sm"
                />
                <motion.div
                  key="panel"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-white shadow-2xl"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site menu"
                >
                  <div className="flex h-16 items-center justify-between border-b border-navy-100 px-5">
                    <span className="font-display text-lg font-bold text-navy-900">Menu</span>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Close menu"
                      className="flex h-10 w-10 items-center justify-center rounded-md text-navy-900 hover:bg-navy-50"
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <nav className="flex-1 overflow-y-auto px-5 py-6">
                    <ul className="space-y-1">
                      {primaryNav.map((item, i) => (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + i * 0.04, duration: 0.3 }}
                        >
                          <Link
                            href={item.href}
                            onClick={close}
                            className="block rounded-md px-3 py-3 font-display text-lg font-semibold text-navy-900 hover:bg-navy-50"
                          >
                            {item.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  <div className="space-y-3 border-t border-navy-100 px-5 py-6">
                    <WhatsAppLink
                      message="Hi DreamMaker, I'd like to know more about your estates."
                      className="flex items-center justify-center gap-2 rounded-md border border-whatsapp px-4 py-3 text-sm font-semibold text-whatsapp"
                      onClick={close}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Chat on WhatsApp
                    </WhatsAppLink>
                    <Link
                      href="/book-inspection"
                      onClick={close}
                      className="flex items-center justify-center gap-2 rounded-md bg-gold-500 px-4 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-600"
                    >
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      Book Inspection
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
