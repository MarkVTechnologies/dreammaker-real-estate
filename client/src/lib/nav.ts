/**
 * Single source of truth for primary nav + footer sitemap links.
 * PRD §3.1 flags Kemchuta's dead footer links (Refund Policy, T&Cs, socials
 * all pointing to `/`) as a mistake to avoid — every href here must resolve
 * to a real route in src/app.
 */

export const primaryNav = [
  { label: "Estates", href: "/estates" },
  { label: "Invest", href: "/invest" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

export const footerSitemap = [
  {
    heading: "Estates",
    links: [
      { label: "All estates", href: "/estates" },
      { label: "Land for sale in Ibeju-Lekki", href: "/land-for-sale/lagos/ibeju-lekki" },
      { label: "Land for sale in Awoyaya", href: "/land-for-sale/lagos/awoyaya" },
      { label: "Land for sale in Lakowe", href: "/land-for-sale/lagos/lakowe" },
      { label: "Land for sale in Epe", href: "/land-for-sale/lagos/epe" },
    ],
  },
  {
    heading: "Invest",
    links: [
      { label: "Land banking", href: "/invest/land-banking" },
      { label: "Off-plan", href: "/invest/off-plan" },
      { label: "Buy-back", href: "/invest/buy-back" },
      { label: "ROI calculator", href: "/invest/roi-calculator" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Property development", href: "/services/property-development" },
      { label: "Construction management", href: "/services/construction-management" },
      { label: "Project management", href: "/services/project-management" },
      { label: "Property management", href: "/services/property-management" },
      { label: "Title perfection", href: "/services/title-perfection" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Lakowe office", href: "/about/offices/lakowe" },
      { label: "Media & press", href: "/media" },
      { label: "Realtors", href: "/realtors" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Guides", href: "/guides" },
      { label: "Insights", href: "/insights" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Refund policy", href: "/legal/refund-policy" },
    ],
  },
] as const;

/** NAP — keep identical to Google Business Profile everywhere (PRD §9.4). */
export const nap = {
  legalName: "DreamMaker Real Estate Ltd",
  phoneDisplay: "+234 000 000 0000", // TODO: confirm live line before launch
  offices: [
    {
      slug: "lakowe",
      name: "Lakowe Office",
      address: "TODO: confirm exact address for Lakowe office (PRD §2.2)",
    },
  ],
} as const;
