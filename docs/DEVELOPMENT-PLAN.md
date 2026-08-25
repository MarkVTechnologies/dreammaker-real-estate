# DreamMaker Rebrand — PRD Audit & Development Plan

Source PRD: `DreamMaker-Rebrand-PRD.md` (v1.0, draft for client sign-off, 18 Aug 2026).
This document audits that PRD and lays out how the monorepo in this repo implements it.

---

## 1. Audit summary

### What the PRD gets right
- The three-job priority order (Rank → Convert → Compound) gives every later decision a tiebreaker — genuinely useful when scope negotiations happen later.
- SSR/ISR as a non-negotiable is correct and specific: it names the actual failure mode (LLM crawlers don't execute JS) rather than asserting "SEO best practice."
- The objection-handling table (§10.3) maps each stated buyer fear to a concrete module, not a vague "build trust" instruction — this is directly implementable.
- Guardrails against fabricated scarcity/reviews (§10.2, §15) are the right call — a manual action or a credibility collapse would be far more expensive than slower growth.

### Gaps and open decisions this plan had to resolve
The PRD explicitly defers several implementation decisions. Building required picking defaults; these are **reversible but load-bearing**, and should be confirmed at client sign-off rather than assumed:

| Decision | PRD status | Default taken here | Why |
|---|---|---|---|
| CMS | "Sanity or Payload" (§11.1) | **Sanity**, for Guides/Insights/Locations/Authors only | Larger Next.js ecosystem, faster editorial UX; kept out of Estate/Plot data (see §3 below) |
| Auth | "Auth.js / Clerk" (§11.1) | **Clerk** | Hosted, fastest path to a working realtor portal with session verification on both client and server |
| Database | "PostgreSQL (Neon/Supabase)" (§11.1) | **Postgres via Prisma**, provider-agnostic | Prisma schema works unchanged against either Neon or Supabase |
| Payments | Paystack + Flutterwave fallback (§11.1) | **Paystack only, scaffolded** | Flutterwave is additive later; building two integrations before either is tested is premature |
| WhatsApp | "deep links at MVP" (§11.1) | **Deep links** | PRD already names this as the MVP path; Business API is a Phase 6+ upgrade |

### Risks the roadmap under-states
1. **Week 0 is a gate, not a parallel track.** §2.2's pre-work (robots.txt/WAF audit, GSC/GA export, backlink export, GBP ownership, legal entity confirmation) determines the redirect map and the entity data every JSON-LD block depends on. The 12-week estimate in §14 only works if Week 0 finishes *before* Phase 2 content-model work starts, not alongside it.
2. **§16's open questions block real copy, not just polish.** Items 1–3, 9 (auditable figures, inventory, RC number, legal entity name) gate the trust-strip, proof-numbers, and Organization/LocalBusiness schema — i.e., most of the homepage. Treat client sign-off on §16 as a Phase 0 exit criterion.
3. **Review/AggregateRating schema (§9.2, §15) has no acquisition flow yet.** Don't wire this schema until the post-allocation review-request flow (§10.4) is live and producing genuine reviews — shipping the markup first is the manual-action risk the PRD itself flags.
4. **ROI and buy-back copy needs legal review before it's written, not after.** §15 flags over-promising ROI as a high-impact risk; the scaffolded ROI calculator and `/invest/buy-back` page both carry inline TODOs blocking on this.
5. **Ecosystem lag found while scaffolding (new information, not in the PRD):** `next-sanity`'s peer range doesn't yet cover Next.js 16 (days-old release), and Sanity Studio v3 doesn't yet run embedded inside a Next 16 + Turbopack + React 19 route (`createContext` failure at build time — a real incompatibility, not a config error). **Resolution:** Studio runs standalone via the Sanity CLI (`npm run studio:dev` / `studio:deploy` in `client/`), decoupled from the Next.js build. Revisit embedding once Sanity ships React 19 support.

---

## 2. Architecture: why client/ and server/ split the way they do

```
dreammakers/
├── client/     Next.js 16 App Router — every indexable route, SSR/ISR (PRD §9.1 non-negotiable)
├── server/     Express + TypeScript API — leads, realtor/referrals, payments, webhooks
└── docs/
```

**client/** owns everything a visitor or search/AI crawler renders: all public routes from the PRD's
IA (§7), the design-token system (§6.2), the realtor portal's UI (auth via Clerk), and the embedded
fetch layer for Sanity content. Next.js's own SSR is what satisfies the PRD's crawler requirement —
splitting rendering into a separate "client" SPA would have defeated that requirement, so `client/`
is the full Next.js app, not a thin frontend.

**server/** owns state that is transactional, financial, or PII-bearing: leads, realtor accounts and
commission/referral tracking, and Paystack payment initialization + webhook verification. Keeping
this behind its own service (rather than Next.js Route Handlers) means:
- Payment webhook signature verification and rate limits live in one auditable place, not spread across API routes.
- The realtor commission ledger — the thing PRD §12 needs for offline-conversion attribution — has one source of truth independent of how the frontend is deployed or cached.
- NDPR-relevant PII (§11.3) sits behind a service boundary that can be reviewed/audited on its own.

**Content model split (a decision this plan made, not stated in the PRD):** the PRD's single "Estate"
entity (§11.2) actually has two different lifecycles — editorial (gallery captions, long-form
description, progress narrative) and transactional (plot availability, price, deposit, payment
status). This build keeps **Estate/Plot/Lead/Realtor/Referral/Payment in Postgres** (`server/prisma/schema.prisma`)
as the single source of truth for anything tied to money or availability, and uses **Sanity for
Guide/Post/Location/Author** — pure editorial content with no transactional state. This avoids a
dual-write problem on Estate data. Flag this for client sign-off alongside the CMS choice.

---

## 3. What's built (current state of this scaffold)

**server/** — builds and typechecks clean; boots and answers `GET /health`.
- `prisma/schema.prisma` — full data model: Estate, Plot, ProgressUpdate, Location, Author, Guide, Lead, Realtor, Referral, Payment, matching PRD §11.2 plus the operational tables §10/§12 need.
- Routes: `POST /leads` (4-field Book Inspection + virtual inspection, referral attribution), `POST /realtors/signup`, `GET /realtors/me` (Clerk-protected), `POST /bookings/calculate` (payment plan calculator), `POST /payments/initialize` (Paystack), `POST /webhooks/paystack` (HMAC-verified).
- Middleware: Clerk token verification, Zod body validation, rate limiting on public forms, Helmet, CORS scoped to `CLIENT_ORIGIN`.

**client/** — builds clean (`npm run build`), all 45 routes render, static generation passes.
- Full IA from PRD §7 scaffolded as real routes with **unique per-route metadata** (the duplicate-metadata mistake PRD §3.2 calls out is structurally prevented — every route sets its own title/description).
- Design tokens from §6.2 wired into Tailwind v4 (`globals.css`), Fraunces/Inter self-hosted via `next/font` at the exact weights specified (§6.3).
- Shared layout: `Header`, `Footer` (every link resolves — no `Kemchuta`-style dead links), `MobileStickyBar` (Call/WhatsApp/Book Inspection, every page), `WhatsAppLink` (pre-filled deep links per §10.2).
- Working interactive pieces: `InspectionForm` (posts to the server API), `RoiCalculator` (client-side, clearly labeled illustrative-only pending legal review), `EstateCard` (decision data on the card face per §3.1).
- `sitemap.ts` / `robots.ts` using Next's native file conventions, explicitly allowing the crawler list from §9.1.
- `src/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts` — a real breaking change, not a stylistic one) protects `/portal` via Clerk.
- Sanity schemas (`author`, `guide`, `post`, `location`) and `sanity.config.ts` ready for `npm run studio:dev`.

**Everything is still structurally scaffolded, not content-complete** — every stub page has a `PageStub`
component with a comment pointing at the PRD section it implements and what's still needed. Per PRD
§13's launch gate ("zero placeholder copy anywhere in the build"), none of this ships as-is.

---

## 4. Phased plan (mapped to PRD §14, updated for what's already done)

| Phase | PRD weeks | Status | Remaining work |
|---|---|---|---|
| **0 — Discovery** | 1 | **Not started — hard blocker** | Robots.txt/WAF/server-log audit, GSC/GA export, backlink export, GBP ownership, legal entity + RC confirmation (§2.2). Client must also answer §16 open questions. Nothing in Phase 1 content should start writing final copy before this closes. |
| **1 — Brand & design** | 2–3 | Tokens/type scale done in code | Hi-fi comps for the 8 key templates in a design tool for client sign-off (code tokens ≠ signed-off visual design); logo refinement if needed. |
| **2 — Core build** | 4–7 | **~60% scaffolded** | Wire real data: Prisma-backed `/estates` index + detail pages replacing `PageStub`; Cloudinary upload pipeline; provision Neon/Supabase Postgres and run `prisma migrate`; provision Sanity project and replace placeholder env; provision Clerk app. |
| **3 — SEO & content** | 6–9 | Structural hooks only | Write the 10 pillar guides + locality copy (400+ words each, hard rule §8.3) — this is the PRD's own flagged #1 slippage risk; start now in parallel with Phase 2, not after. JSON-LD components per §9.2 (Organization, LocalBusiness, Product/Offer, Article, Person) still to build once real entity data exists. Redirect map needs the Week 0 URL inventory first. |
| **4 — Portal & payments** | 8–10 | **Scaffolded, untested against real accounts** | Realtor signup → Clerk webhook → `POST /realtors/signup` wiring; Paystack live-mode approval (external, can take 1–3 weeks — start this early, it's not modeled as a lead time in §14); commission statement UI; email automation via Resend. |
| **5 — QA & launch** | 11–12 | Not started | Full §13 launch checklist; accessibility audit (WCAG 2.2 AA); Core Web Vitals field validation; cross-browser pass. |
| **6 — Growth** | Ongoing | N/A | Content cadence (§9.6), monthly AI-citation panel (§9.5 point 7), CRO testing. |

**Net effect on the 12-week estimate:** unchanged as a target, but two hidden dependencies now have
owners — Paystack live-mode approval and Sanity/Clerk/Neon account provisioning — that should start
in Week 1, not when Phase 2/4 nominally begin, or they become the actual critical path.

---

## 5. Immediate next steps (in order)

1. **Client sign-off** on the five default decisions in §1's table, and on the Estate content-model split in §2.
2. **Answer PRD §16** — without this, the homepage trust strip, proof numbers, and every JSON-LD Organization/Person block stay TODO.
3. **Provision accounts**: Neon (or Supabase) Postgres, Sanity project, Clerk application, Paystack business account (start live-mode verification now — it's the least controllable timeline in this whole plan), Cloudinary.
4. **Run `prisma migrate dev`** against a real `DATABASE_URL` once Postgres is provisioned.
5. **Start Week 0 pre-work** (§2.2) and the 10 pillar guides (§8.5) in parallel — both are on the PRD's own critical path.
