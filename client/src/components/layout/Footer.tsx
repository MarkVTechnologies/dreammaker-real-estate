import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerSitemap, nap } from "@/lib/nav";

/**
 * Full sitemap + NAP-consistent contact info (PRD §8.1 module 13).
 * Every link here must resolve — Kemchuta's dead footer links (§3.1) are the
 * mistake this is built to avoid.
 */
export function Footer() {
  return (
    <footer className="mt-24 bg-navy-950 text-navy-50">
      <div className="h-px bg-gradient-to-r from-transparent via-navy-700 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-1">
            <span className="font-display text-lg font-bold text-white">
              Dream<span className="text-gold-500">Maker</span>
            </span>
            <p className="mt-3 max-w-[22ch] text-sm text-navy-100">
              Building on the Lekki–Epe corridor since day one.
            </p>
          </div>
          {footerSitemap.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-semibold text-white">{section.heading}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-100 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid max-w-sm gap-6 border-t border-navy-800 pt-8">
          {nap.offices.map((office) => (
            <div key={office.slug} className="flex gap-3 text-sm text-navy-100">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">{office.name}</p>
                <p>{office.address}</p>
                <Link
                  href={`/about/offices/${office.slug}`}
                  className="mt-1 inline-block text-gold-500 hover:underline"
                >
                  Get directions
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-navy-800 pt-8 text-sm text-navy-100 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{nap.legalName}</span>
            <span aria-hidden="true">·</span>
            <a href={`tel:${nap.phoneDisplay.replace(/\s+/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {nap.phoneDisplay}
            </a>
            <span aria-hidden="true">·</span>
            <a href={`tel:${nap.phoneDisplaySecondary.replace(/\s+/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {nap.phoneDisplaySecondary}
            </a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${nap.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {nap.email}
            </a>
            <span aria-hidden="true">·</span>
            <span>RC: TODO (confirm before launch, PRD §16)</span>
          </p>
          <p>&copy; {new Date().getFullYear()} {nap.legalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
