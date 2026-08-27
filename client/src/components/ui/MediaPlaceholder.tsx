"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, type LucideIcon } from "lucide-react";
import { Skeleton } from "./Skeleton";

interface MediaPlaceholderProps {
  label: string;
  icon?: LucideIcon;
  className?: string;
  /** Stagger multiple placeholders on one page so they don't all resolve in lockstep. */
  delay?: number;
}

/**
 * Honest "photography pending" slot (matches EstateCard's pattern) dressed up with a brief
 * skeleton-loading phase for perceived polish before settling into its pending state.
 */
export function MediaPlaceholder({ label, icon: Icon = Camera, className = "", delay = 0 }: MediaPlaceholderProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500 + delay * 1000 + Math.random() * 350);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-navy-100 ${className}`}>
      <AnimatePresence mode="wait">
        {!loaded ? (
          <motion.div key="skeleton" exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0">
            <Skeleton className="h-full w-full rounded-2xl" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-navy-100 via-navy-50 to-navy-100 text-navy-400"
          >
            <Icon className="h-7 w-7" aria-hidden="true" strokeWidth={1.5} />
            <span className="text-xs font-medium">{label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
