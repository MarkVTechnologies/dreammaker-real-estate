import { nap } from "@/lib/nav";

export const metadata = {
  title: "Privacy Policy — DreamMaker Real Estate",
  description: "DreamMaker Real Estate Ltd privacy policy — how we handle your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-navy-900">Privacy policy</h1>
      <p className="mt-4 text-sm text-ink-600">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-8 space-y-8 text-ink-700">
        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">1. Information we collect</h2>
          <p className="mt-2">
            When you book an inspection, submit an enquiry, or make a payment through this site,
            we collect information such as your name, phone number, email address and the
            property you are interested in.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">2. How we use it</h2>
          <p className="mt-2">
            We use this information to respond to your enquiry, schedule inspections, process
            payments and keep you updated on properties and offers you have expressed interest
            in. We do not sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">3. Payment information</h2>
          <p className="mt-2">
            Payments made on this site are processed by our payment provider. We do not store
            your card or bank details on our own servers.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">4. Data security</h2>
          <p className="mt-2">
            We take reasonable technical and organizational steps to protect your personal
            information from unauthorized access, loss or misuse.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">5. Your rights</h2>
          <p className="mt-2">
            Under the Nigeria Data Protection Act, you can ask us what personal data we hold about
            you, request a correction, or ask us to delete it, by contacting us using the details
            below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy-900">6. Contact</h2>
          <p className="mt-2">
            For any privacy questions or requests, contact us at{" "}
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
