import { Building2, ClipboardList, FileCheck, HardHat, KeyRound, type LucideIcon } from "lucide-react";

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

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
  /** Service-specific workflow — shown on the individual service page. */
  process: ServiceProcessStep[];
  faqs: ServiceFaq[];
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
    process: [
      {
        title: "Site identification & due diligence",
        description: "Title, survey and land use are verified before we commit to acquiring a site — not after.",
      },
      {
        title: "Layout & infrastructure planning",
        description: "Roads, drainage and plot layout are designed up front, so buyers aren't just buying a coordinate on a map.",
      },
      {
        title: "Regulatory approvals",
        description: "Excision, Governor's Consent and other required approvals are secured before a layout goes on sale.",
      },
      {
        title: "Phased release",
        description: "Plots are released for sale in stages as infrastructure catches up, not sold all at once ahead of the ground.",
      },
    ],
    faqs: [
      {
        q: "Do you build on land you don't legally control yet?",
        a: "No — every estate we develop is on land we've verified and, where required, fully documented before it's listed for sale.",
      },
      {
        q: "How is a DreamMaker estate different from a plain land sale?",
        a: "We plan roads, drainage and allocation up front. Buyers are getting a laid-out estate, not just a fenced coordinate on a map.",
      },
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
    process: [
      {
        title: "Site mobilization",
        description: "Contractors, materials and a site safety plan are confirmed before ground is broken.",
      },
      {
        title: "Quality checkpoints",
        description: "Foundation, structure and finishing are inspected against spec at each stage, not just at the end.",
      },
      {
        title: "Schedule tracking",
        description: "Work runs against a published timeline, with any slippage communicated as it happens.",
      },
      {
        title: "Handover inspection",
        description: "A final walkthrough is completed before any structure is signed off as done.",
      },
    ],
    faqs: [
      {
        q: "Do you use your own contractors or hire out?",
        a: "We source and manage contractors directly, and supervise on-site ourselves — oversight doesn't stop once a contract is signed.",
      },
      {
        q: "What happens if a project falls behind schedule?",
        a: "We say so, in writing, with a revised date — not after buyers start asking what happened.",
      },
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
    process: [
      {
        title: "Scoping",
        description: "Land, construction, legal and sales workstreams are mapped against one shared timeline from day one.",
      },
      {
        title: "Coordination",
        description: "A single project lead tracks handoffs between teams, so nothing stalls between departments.",
      },
      {
        title: "Milestone reporting",
        description: "Buyers and stakeholders get progress updates at each phase, not just a status check at the end.",
      },
      {
        title: "Close-out",
        description: "Allocation, documentation and handover are managed as one coordinated event, not three separate ones.",
      },
    ],
    faqs: [
      {
        q: "Who do I talk to if something's unclear mid-project?",
        a: "One project lead owns your estate end-to-end — you're not routed between departments to get an answer.",
      },
      {
        q: "How do you handle delays between teams?",
        a: "Cross-team coordination runs on a shared timeline, so a delay in one area gets caught before it cascades into another.",
      },
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
    process: [
      {
        title: "Onboarding",
        description: "Estate infrastructure and access points are assessed and logged right after handover.",
      },
      {
        title: "Routine upkeep",
        description: "Roads, drainage, security and waste management are maintained on a set schedule, not on an ad hoc basis.",
      },
      {
        title: "Owner support",
        description: "Non-resident owners get administrative support without needing to be on-site themselves.",
      },
      {
        title: "Service charge accounting",
        description: "Costs are tracked and reported transparently — not billed as an unexplained lump sum.",
      },
    ],
    faqs: [
      {
        q: "I don't live near my plot — who looks after it?",
        a: "Our property management team maintains shared estate infrastructure and can support your individual plot directly.",
      },
      {
        q: "How are service charges calculated?",
        a: "Costs are tracked and accounted for per estate. You can request an itemized breakdown at any time.",
      },
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
    process: [
      {
        title: "Document review",
        description: "Existing survey, deed or allocation paperwork is checked against government records before we proceed.",
      },
      {
        title: "Regularization",
        description: "Excision, Gazette, Governor's Consent or C of O applications are filed and tracked through to completion.",
      },
      {
        title: "Verification",
        description: "Completed documents are cross-checked at the relevant Land Registry before they're handed over.",
      },
      {
        title: "Handover",
        description: "Original documents are delivered directly to the buyer — not held indefinitely \"in process.\"",
      },
    ],
    faqs: [
      {
        q: "How long does title perfection typically take?",
        a: "Timelines vary by document type and government processing speed. We give a written estimate before starting, not an open-ended promise.",
      },
      {
        q: "Can you perfect title on land I already own?",
        a: "Yes — this service isn't limited to DreamMaker estates. We take on title regularization independently.",
      },
    ],
  },
];
