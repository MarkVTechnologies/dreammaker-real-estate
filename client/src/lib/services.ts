import { Building2, ClipboardList, FileCheck, HardHat, KeyRound, type LucideIcon } from "lucide-react";

export interface Service {
  n: string;
  slug: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** One-line summary — used on compact cards (homepage teaser). */
  copy: string;
  /** Longer paragraph — used on the full services page. */
  description: string;
  included: string[];
}

/** Single source of truth for the five service routes (PRD §7) — homepage teaser and /services both read from this. */
export const services: Service[] = [
  {
    n: "01",
    slug: "property-development",
    label: "Property development",
    href: "/services/property-development",
    icon: Building2,
    copy: "Land acquisition, planning and estate development across the Lekki–Epe corridor.",
    description:
      "We identify, acquire and plan land across the Lekki–Epe and Ogun corridors, then take it from raw plot to a fully laid-out estate — survey, layout design, government approvals and infrastructure planning handled in-house before a single unit goes on sale.",
    included: [
      "Land acquisition and due diligence",
      "Estate layout and infrastructure planning",
      "Government approvals and regularization",
      "Phased release planning for sales",
    ],
  },
  {
    n: "02",
    slug: "construction-management",
    label: "Construction management",
    href: "/services/construction-management",
    icon: HardHat,
    copy: "Oversight of build quality, timelines and budget on every DreamMaker site.",
    description:
      "Every DreamMaker site is supervised by an in-house construction team, not a subcontractor left unchecked. We manage contractors, materials and site safety against a fixed schedule, with progress logged and shared — not just promised.",
    included: [
      "Contractor sourcing and supervision",
      "Quality control and materials verification",
      "Schedule and budget tracking",
      "Site safety compliance",
    ],
  },
  {
    n: "03",
    slug: "project-management",
    label: "Project management",
    href: "/services/project-management",
    icon: ClipboardList,
    copy: "Coordinated delivery from groundbreaking to allocation, phase by phase.",
    description:
      "From groundbreaking to allocation day, one team owns the timeline end-to-end — coordinating land development, construction, documentation and buyer communication so nothing falls through the cracks between departments.",
    included: [
      "Single point of accountability per project",
      "Milestone tracking and buyer updates",
      "Cross-team coordination (legal, construction, sales)",
      "Risk and delay management",
    ],
  },
  {
    n: "04",
    slug: "property-management",
    label: "Property management",
    href: "/services/property-management",
    icon: KeyRound,
    copy: "Ongoing upkeep and administration for delivered estates and occupied plots.",
    description:
      "Delivery doesn't end at allocation. We maintain common infrastructure — access roads, drainage, security and waste management — on our completed estates, and handle administrative support for owners who aren't resident on-site.",
    included: [
      "Estate infrastructure maintenance",
      "Security and access management",
      "Owner administrative support",
      "Service charge accounting",
    ],
  },
  {
    n: "05",
    slug: "title-perfection",
    label: "Title perfection",
    href: "/services/title-perfection",
    icon: FileCheck,
    copy: "Documentation and regularization of C of O, Excision, Gazette and Governor's Consent titles.",
    description:
      "Title is the single biggest fear in Nigerian real estate, so we handle it directly rather than outsourcing it to a buyer's own lawyer after the fact — processing and regularizing C of O, Excision, Gazette and Governor's Consent documentation in-house.",
    included: [
      "C of O and Governor's Consent processing",
      "Excision and Gazette regularization",
      "Survey plan verification",
      "Document handover to buyers",
    ],
  },
];
