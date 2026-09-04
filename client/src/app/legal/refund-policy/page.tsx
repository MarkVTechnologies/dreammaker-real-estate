import { nap } from "@/lib/nav";

export const metadata = {
  title: "Refund Policy — DreamMaker Real Estate",
  description: "DreamMaker Real Estate Ltd refund policy for deposits and instalments.",
};

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-navy-900">Refund policy</h1>
      <p className="mt-4 text-sm text-ink-600">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-8 space-y-8 text-ink-700">
        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">1. Deposits and reservations</h2>
          <p className="mt-2">
            A deposit or reservation payment reserves a specific plot or unit for you while the
            rest of the purchase is completed. The exact terms of your deposit — including
            whether and how it can be refunded — are set out in your sale agreement.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">2. Cancellations</h2>
          <p className="mt-2">
            If you wish to cancel a booking or purchase, contact our team as soon as possible.
            We will review your request against the terms of your specific agreement and respond
            with the outcome and any applicable refund.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">3. Processing</h2>
          <p className="mt-2">
            Approved refunds are paid back to the original payment method or account used, within
            a reasonable timeframe once your request has been reviewed and approved.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">4. Contact</h2>
          <p className="mt-2">
            To request a refund or ask about a payment, contact us at{" "}
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
