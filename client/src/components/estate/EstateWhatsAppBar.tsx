import { ArrowRight, MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

interface EstateWhatsAppBarProps {
  estateName: string;
  message: string;
}

/**
 * Conversion bar for paid-traffic landing pages — Google/Facebook ads send
 * prospects directly to a project page, so the WhatsApp CTA has to be
 * visible without any scrolling and stay visible the whole time they read.
 * Fixed (not sticky) so it holds position regardless of ancestor overflow
 * quirks elsewhere on the page; pinned directly under the header (itself
 * `sticky top-0`) rather than at the bottom, so it never collides with the
 * bottom-fixed mobile bar/WhatsApp bubble already on every page. Also
 * reserves that same height at the top of the page content (via the
 * sibling spacer below) so nothing renders underneath it.
 */
export function EstateWhatsAppBar({ estateName, message }: EstateWhatsAppBarProps) {
  return (
    <>
      <div className="fixed inset-x-0 top-16 z-30 h-12 bg-gold-500 shadow-sm sm:h-14">
        <WhatsAppLink
          message={message}
          className="mx-auto flex h-full w-full max-w-7xl items-center justify-center gap-2.5 px-4 text-center text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-600 sm:text-base"
        >
          <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy-950/40"
              aria-hidden="true"
            />
            <MessageCircle className="relative h-5 w-5" aria-hidden="true" fill="currentColor" />
          </span>
          <span className="sm:hidden">
            Chat to invest in <span className="underline underline-offset-2">{estateName}</span>
          </span>
          <span className="hidden sm:inline">
            Chat on WhatsApp to invest in{" "}
            <span className="underline underline-offset-2">{estateName}</span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </WhatsAppLink>
      </div>
      {/* Reserves the fixed bar's height so page content doesn't render underneath it. */}
      <div className="h-12 sm:h-14" aria-hidden="true" />
    </>
  );
}
