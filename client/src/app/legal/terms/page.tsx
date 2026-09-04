import { nap } from "@/lib/nav";

export const metadata = {
  title: "Terms of Service — DreamMaker Real Estate",
  description: "DreamMaker Real Estate Ltd terms of service.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-navy-900">Terms of service</h1>
      <p className="mt-4 text-sm text-ink-600">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-8 space-y-8 text-ink-700">
        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">1. About these terms</h2>
          <p className="mt-2">
            These terms govern your use of the {nap.legalName} website. By browsing this site,
            submitting an enquiry, or booking an inspection through it, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">2. Property listings</h2>
          <p className="mt-2">
            We take care to keep property information, pricing and availability on this site
            accurate and up to date, but prices, plot sizes and availability can change without
            notice. Nothing on this website constitutes a binding offer to sell — a sale is only
            finalized once a formal sale agreement is signed by both parties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">3. Bookings and enquiries</h2>
          <p className="mt-2">
            Booking a site inspection or submitting an enquiry through this website does not
            obligate you to purchase, and does not obligate {nap.legalName} to sell, until a
            formal agreement is signed.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">4. Payments</h2>
          <p className="mt-2">
            Where this site allows you to make a deposit or instalment payment, the specific
            terms of that payment — including amount, schedule and what it secures — are set out
            in your sale agreement, not on this website.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">5. Intellectual property</h2>
          <p className="mt-2">
            All content on this site — text, photos, logos and layouts — belongs to{" "}
            {nap.legalName} or its licensors and may not be reproduced without permission.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">6. Governing law</h2>
          <p className="mt-2">These terms are governed by the laws of the Federal Republic of Nigeria.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">7. Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${nap.email}`} className="font-medium text-navy-700 hover:text-navy-900">
              {nap.email}
            </a>{" "}
            or {nap.phoneDisplay}.
          </p>
        </section>
      </div>
    </div>
  );
}
