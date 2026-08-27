export interface InsightPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
  author: string;
  publishedAt: string;
  readMinutes: number;
  featured?: boolean;
}

export const categories = ["Buying Guides", "Market Reports", "Location Guides", "Estate Updates"] as const;

/**
 * Placeholder editorial content — PRD §9.6 calls for Sanity-backed posts with original data;
 * these run as static content until the Sanity project is provisioned (NEXT_PUBLIC_SANITY_PROJECT_ID
 * unset). Byline is a team credit, not a fabricated named author with invented credentials.
 */
export const insightPosts: InsightPost[] = [
  {
    slug: "how-to-verify-land-title-lagos",
    title: "How to Verify Land Title in Lagos: C of O, Excision, and Governor's Consent Explained",
    category: "Buying Guides",
    excerpt:
      "The single biggest fear buyers raise before paying a deposit is title. Here's how to actually check it — not just take a developer's word for it.",
    body: [
      "Every land dispute we've seen traces back to the same root cause: a buyer paid before understanding what title they were actually getting. In Lagos and Ogun State, land can carry several different kinds of documentation — Certificate of Occupancy (C of O), Excision, Gazette, Governor's Consent, or a Registered Survey — and each one means something different for how secure your ownership actually is.",
      "A Certificate of Occupancy is issued by the state government and is generally considered the strongest form of title, since it confirms the land has been formally allocated and is free of overlapping government acquisition. An Excision is the process by which land is formally removed from a larger government-acquired area and returned to the original community or family — it's a necessary precursor in many Lagos and Ogun corridors before a C of O can even be processed.",
      "Governor's Consent applies when land already has an existing title that's being transferred to a new owner — it's the government's formal approval of that transfer, and skipping it is one of the most common ways buyers end up with an unenforceable title years later. A Registered Survey, on its own, only confirms the boundaries and dimensions of a plot — it is not proof of ownership and should never be presented to you as a substitute for one of the documents above.",
      "Before paying anything beyond a refundable inspection fee, ask for the specific title type in writing, and verify it independently at the relevant Land Registry rather than relying on the seller's paperwork alone. A developer that resists this request, or gets defensive when asked, is telling you something important.",
      "At DreamMaker, every estate we list states its title type plainly on the listing page — no estate goes on sale until that documentation exists or is actively being processed, and we say so explicitly when it's still in progress.",
    ],
    author: "DreamMaker Research Desk",
    publishedAt: "2026-07-14",
    readMinutes: 6,
    featured: true,
  },
  {
    slug: "ago-iwoye-vs-ijebu-ode-where-to-buy",
    title: "Ago-Iwoye vs Ijebu Ode: Where Should You Buy Land in Ogun State?",
    category: "Location Guides",
    excerpt:
      "Both towns sit along the same growth corridor, but they attract very different kinds of buyers. Here's how to think about the choice.",
    body: [
      "Ogun State's land market has grown fast on the back of two anchor towns along the Epe/Ijebu-Ode axis: Ago-Iwoye, home to Olabisi Onabanjo University, and Ijebu Ode, the older and more established commercial center of the wider Ijebu region. Both are attracting land buyers priced out of Lagos proper, but for different reasons.",
      "Ago-Iwoye's appeal is largely institutional — a resident student and staff population at OOU creates steady rental demand, and agricultural land in the surrounding area (including cocoa farmland) benefits from established access roads and a lower entry price than closer-in Lagos suburbs. It suits buyers thinking in terms of long-horizon investment: farmland, rental income, or land banking ahead of further institutional expansion.",
      "Ijebu Ode, by contrast, is a functioning town with existing residential density, markets and infrastructure — land here suits buyers who want to build sooner rather than later, and who value proximity to services over raw appreciation potential. Plots along the Epe/Ijebu-Ode Expressway specifically benefit from being dry, elevated land, in contrast to some low-lying, flood-prone areas closer to the Lagos border.",
      "Neither town is inherently the 'better' buy — the right answer depends on your timeline. If you're building a home in the next 12–24 months, Ijebu Ode's existing infrastructure does more work for you. If you're buying to hold for a decade, Ago-Iwoye's lower entry price and institutional demand driver carry a different kind of upside.",
    ],
    author: "DreamMaker Research Desk",
    publishedAt: "2026-06-02",
    readMinutes: 5,
  },
  {
    slug: "buy-and-build-vs-waterlogged-land-epe",
    title: "Why 'Buy and Build' Land Beats Waterlogged Plots in the Epe Corridor",
    category: "Buying Guides",
    excerpt:
      "Not all cheap land is a bargain. Here's what waterlogging actually costs you after you've already paid for the plot.",
    body: [
      "Some of the least expensive land along the Lagos-Epe corridor is cheap for a specific, discoverable reason: it floods, or sits low enough that the water table makes foundation work significantly more expensive than the sale price implies. Buyers who don't visit the site during rainy season — or don't ask the right questions — often find this out only after they've already paid.",
      "Building on waterlogged or low-lying land typically requires substantial sand-filling before foundation work can even begin, and that cost is rarely disclosed upfront by sellers of distressed or discounted plots. Depending on how low the land sits, filling alone can add a meaningful percentage on top of the original purchase price — before a single block is laid.",
      "'Buy and build' land — dry, elevated, ready for immediate foundation work — costs more per square metre at the point of sale, but that premium is often smaller than the hidden cost of preparing a cheaper, lower-lying alternative. The honest comparison isn't price per plot; it's total cost to a habitable structure.",
      "When inspecting any plot in this corridor, ask directly whether the land has ever flooded, and visit — or ask a trusted third party to visit — during or shortly after rainy season if you can't verify any other way. A seller unwilling to answer plainly is answering the question anyway.",
    ],
    author: "DreamMaker Research Desk",
    publishedAt: "2026-05-18",
    readMinutes: 4,
  },
  {
    slug: "add-cocoa-farm-estate-site-update",
    title: "ADD Cocoa Farm Estate: Site Update and What's Next",
    category: "Estate Updates",
    excerpt:
      "An update on planting progress, farm management milestones, and what buyers can expect over the next planting cycle.",
    body: [
      "ADD Cocoa Farm Estate in Ago-Iwoye continues active planting and farm management across allocated acreage, with the 500-hybrid-tree-per-acre density maintained across newly onboarded plots. Buyers who have completed allocation are receiving farm management updates directly, and this post summarizes the same milestones for prospective buyers evaluating the estate.",
      "Cocoa trees typically begin bearing fruit within 2–3 years of planting, with yields increasing progressively over the following decade as trees mature — which is why the estate's revenue-share model (70% to the landowner, 30% to farm management) is structured as a long-horizon return rather than an immediate one. Early-allocation buyers are furthest along in that maturation curve.",
      "On the documentation side, Deed of Assignment and Registered Survey processing continues on a rolling basis as new plots are allocated — buyers should expect this to be completed within the standard processing window from the point of full payment, not before.",
      "We'll continue posting site updates here as farm management milestones are reached. Prospective buyers can review current pricing and package availability on the estate's project page.",
    ],
    author: "DreamMaker Research Desk",
    publishedAt: "2026-08-20",
    readMinutes: 3,
  },
  {
    slug: "five-questions-before-land-deposit",
    title: "5 Questions to Ask Before Paying a Deposit on Nigerian Land",
    category: "Buying Guides",
    excerpt:
      "A short checklist that has saved buyers from the most common — and most expensive — land-purchase mistakes.",
    body: [
      "1. What is the exact title type, and can I verify it independently? A verbal assurance is not documentation. Ask for the specific title (C of O, Excision, Governor's Consent, etc.) in writing, and confirm it yourself at the relevant Land Registry rather than trusting the seller's copy alone.",
      "2. Has this land ever flooded? Low-lying and waterlogged plots are sold at a discount for a reason that only becomes obvious — and expensive — once you try to build. Ask directly, and if possible, inspect during rainy season.",
      "3. What exactly does my deposit secure, and is that written down? A deposit should correspond to a specific, documented plot number or allocation — not a vague promise of 'a plot in the estate.' Get the plot number in writing before paying anything.",
      "4. Who is the developer, and can I verify they've delivered before? A company with named leadership, a physical office, and a track record of completed estates carries meaningfully less risk than one operating only through social media and third-party agents.",
      "5. What happens if the project stalls? Ask what recourse exists — refund policy, alternate allocation, or timeline guarantees — before you need the answer, not after.",
    ],
    author: "DreamMaker Research Desk",
    publishedAt: "2026-04-09",
    readMinutes: 5,
  },
  {
    slug: "q3-2026-land-price-report-lekki-epe",
    title: "DreamMaker Q3 2026 Market Report: Land Prices Across the Lekki–Epe Corridor",
    category: "Market Reports",
    excerpt:
      "A snapshot of asking prices across Ibeju-Lekki, Awoyaya, Lakowe and Epe — and what's driving the spread between them.",
    body: [
      "Land prices along the Lekki–Epe corridor continue to diverge based primarily on proximity to completed infrastructure rather than raw distance from Lagos Island. Areas with confirmed road access and nearby completed estates command a premium over comparably-located plots without either.",
      "Ibeju-Lekki remains the most expensive zone in the corridor, driven by continued industrial and residential development nearby. Awoyaya and Lakowe sit in a middle band, benefiting from an established residential base and shorter commute times relative to areas further out. Epe, at the corridor's far end, remains the most affordable entry point, with pricing more sensitive to individual site quality (drainage, road access) than to location alone.",
      "The gap between titled, dry, buy-and-build-ready land and untitled or waterlogged alternatives has widened this quarter, reflecting growing buyer awareness of the hidden costs discussed in our buying guides. We expect this gap to continue widening rather than closing as more buyers do title and site-quality diligence before purchasing.",
      "This report reflects DreamMaker's own listing and inquiry data across the corridor and is illustrative rather than a formal valuation — figures will be replaced with audited market data as our reporting program matures.",
    ],
    author: "DreamMaker Research Desk",
    publishedAt: "2026-08-01",
    readMinutes: 5,
  },
];

export function getAllPosts(): InsightPost[] {
  return [...insightPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedPost(): InsightPost {
  return insightPosts.find((p) => p.featured) ?? getAllPosts()[0];
}

export function getPostBySlug(slug: string): InsightPost | undefined {
  return insightPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): InsightPost[] {
  return getAllPosts().filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getRelatedPosts(post: InsightPost, limit = 3): InsightPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit);
}

export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" });
}
