import { PageStub } from "@/components/ui/PageStub";

export const metadata = {
  title: "Delivered & Ongoing Projects — DreamMaker Real Estate",
  description: "DreamMaker's delivered and ongoing construction and development portfolio.",
};

export default function ProjectsIndexPage() {
  return (
    <PageStub
      title="Projects"
      intro="Proves the 'Built' pillar — we develop and construct, not just market (PRD §6.1)."
      prdRef="PRD §7"
      todo="Populate from real completed/ongoing project records; each links to a case study."
    />
  );
}
