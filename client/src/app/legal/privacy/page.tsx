export const metadata = {
  title: "Privacy Policy",
  description: "DreamMaker Real Estate Ltd privacy policy — NDPR-compliant data handling.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-navy-900">Privacy policy</h1>
      <p className="mt-4 text-ink-600">
        Must be NDPR-compliant, covering cookie consent and encrypted PII at rest (PRD §11.3). Legal
        review pending — do not launch with placeholder legal copy (PRD §13).
      </p>
    </div>
  );
}
