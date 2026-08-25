import { PageStub } from "@/components/ui/PageStub";

export const metadata = {
  title: "About DreamMaker Real Estate Ltd",
  description:
    "DreamMaker Real Estate Ltd — a Lagos developer on the Lekki–Epe corridor with two physical offices, real construction delivery and named leadership.",
};

export default function AboutPage() {
  return (
    <PageStub
      title="About"
      intro="Entity authority page — real company, real offices, real MD, real press (PRD §3.3)."
      prdRef="PRD §7"
      todo="Confirm exact legal entity name and RC number before publishing (PRD §16 open questions 3, 9)."
    />
  );
}
