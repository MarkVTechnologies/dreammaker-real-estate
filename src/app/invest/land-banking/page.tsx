import { PageStub } from "@/components/ui/PageStub";

export const metadata = {
  title: "Land Banking in Nigeria — How It Works & Returns",
  description:
    "How DreamMaker's land banking product works on the Lekki–Epe corridor, realistic returns, and how allocation is documented.",
};

export default function LandBankingPage() {
  return (
    <PageStub
      title="Land banking"
      intro="Named investment product with an inline lead form and duration selector (PRD §3.1, modeled on Kemchuta's 'Buy2Sell')."
      prdRef="PRD §9.3 keyword: land banking in Nigeria"
      todo="Legal review required before publishing any return figures — no guaranteed language without contractual backing (PRD §15)."
    />
  );
}
