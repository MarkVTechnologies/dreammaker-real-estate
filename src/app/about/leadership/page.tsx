import { PageStub } from "@/components/ui/PageStub";

export const metadata = {
  title: "Leadership — Ejieh Paradise, Managing Director",
  description:
    "Meet DreamMaker's Managing Director Ejieh Paradise and leadership team — press features, credentials and accountability.",
};

export default function LeadershipPage() {
  return (
    <PageStub
      title="Leadership"
      intro="DreamMaker's strongest underused asset: MD Ejieh Paradise's Guardian feature (PRD §3.2). Backs the Person + Organization JSON-LD (PRD §9.2)."
      prdRef="PRD §9.3 keyword: Ejieh Paradise DreamMaker"
      todo="Add jobTitle, sameAs (press/LinkedIn), award, and press mentions to the Person schema once confirmed."
    />
  );
}
