"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

interface EstateGalleryProps {
  images: string[];
  alt: string;
}

/** Gallery grid that opens a full-screen, keyboard-navigable lightbox on click. */
export function EstateGallery({ images, alt }: EstateGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));

  useEffect(() => {
    if (activeIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, images.length]);

  return (
    <>
      <RevealGroup className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <RevealItem key={src}>
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-lg bg-navy-100"
              aria-label={`Open image ${i + 1} of ${images.length}`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="240px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${alt} gallery`}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" aria-hidden="true" />
                </button>
              </>
            )}

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="relative h-full max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[activeIndex]} alt={alt} fill sizes="100vw" className="object-contain" priority />
            </motion.div>

            {images.length > 1 && (
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
                {activeIndex + 1} / {images.length}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
