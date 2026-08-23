import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} — Project Case Study`,
    description: `Case study: scope, timeline and delivery for the ${slug} project.`,
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageStub
      title={slug}
      intro="Corporate/institutional audience needs a capability statement and completed-project portfolio (PRD §5 P4)."
      prdRef="PRD §7"
    />
  );
}
