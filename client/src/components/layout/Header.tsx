import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { primaryNav } from "@/lib/nav";
import { MobileNav } from "./MobileNav";
import { WhatsAppLink } from "./WhatsAppLink";

/** Desktop nav per PRD §7: Invest · Services · Projects · About · Insights → [Book Inspection] + WhatsApp. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-navy-900">
          <Image src="/logo/dreammaker-mark-navy.svg" alt="" width={28} height={28} className="h-7 w-7" aria-hidden="true" />
          Dream<span className="text-gold-600">Maker</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-1 text-sm font-medium text-ink-600 transition-colors hover:text-navy-900"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-gold-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppLink
            message="Hi DreamMaker, I'd like to know more about your estates."
            className="hidden items-center justify-center rounded-full p-2.5 text-whatsapp transition-colors hover:bg-navy-50 sm:inline-flex"
          >
            <span className="sr-only">Chat on WhatsApp</span>
            <MessageCircle className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
          </WhatsAppLink>
          <Link
            href="/book-inspection"
            className="hidden rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 shadow-sm transition-colors hover:bg-gold-600 sm:inline-block"
          >
            Book Inspection
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
