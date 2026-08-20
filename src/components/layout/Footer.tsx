import Link from "next/link";
import { footerSitemap, nap } from "@/lib/nav";

/**
 * Full sitemap + NAP-consistent contact info (PRD §8.1 module 13).
 * Every link here must resolve — Kemchuta's dead footer links (§3.1) are the
 * mistake this is built to avoid.
 */
export function Footer() {
  return (
    <footer className="mt-24 bg-navy-950 text-navy-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          {footerSitemap.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-semibold text-white">{section.heading}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-navy-100 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-navy-800 pt-8 sm:grid-cols-2">
          {nap.offices.map((office) => (
            <div key={office.slug} className="text-sm text-navy-100">
              <p className="font-semibold text-white">{office.name}</p>
              <p>{office.address}</p>
              <Link
                href={`/about/offices/${office.slug}`}
                className="mt-1 inline-block text-gold-500 hover:underline"
              >
                Get directions
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-navy-800 pt-8 text-sm text-navy-100 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {nap.legalName} · {nap.phoneDisplay} · RC: TODO (confirm before launch, PRD §16)
          </p>
          <p>&copy; {new Date().getFullYear()} {nap.legalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
