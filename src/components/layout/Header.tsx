import Link from "next/link";
import { primaryNav } from "@/lib/nav";
import { WhatsAppLink } from "./WhatsAppLink";

/** Desktop nav per PRD §7: Estates · Invest · Services · Projects · About · Insights → [Book Inspection] + WhatsApp. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-bold text-navy-900">
          DreamMaker
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <WhatsAppLink
            message="Hi DreamMaker, I'd like to know more about your estates."
            className="hidden rounded-full p-2 text-whatsapp hover:bg-navy-50 sm:inline-flex"
          >
            <span className="sr-only">Chat on WhatsApp</span>
            WhatsApp
          </WhatsAppLink>
          <Link
            href="/book-inspection"
            className="rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-gold-600"
          >
            Book Inspection
          </Link>
        </div>
      </div>
    </header>
  );
}
