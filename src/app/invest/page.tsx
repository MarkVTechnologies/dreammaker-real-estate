import { PageStub } from "@/components/ui/PageStub";

export const metadata = {
  title: "Invest — Land Banking, Off-Plan & Buy-Back",
  description:
    "DreamMaker's investment products: land banking, off-plan property and a structured buy-back product on the Lekki–Epe corridor.",
};

export default function InvestHubPage() {
  return (
    <PageStub
      title="Investment products"
      intro="Segment into land acquisition, off-plan, finished homes and structured short-term investments (PRD §3.2 adapted from houseofjulieta.org)."
      prdRef="PRD §7, §8.1 module 8"
      todo="Link to /invest/land-banking, /invest/off-plan, /invest/buy-back, /invest/roi-calculator."
    />
  );
}
