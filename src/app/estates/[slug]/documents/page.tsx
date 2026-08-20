import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Title Documents — ${slug}`,
    description: `Watermarked title document previews and a plain-English explainer of what the title type means for ${slug}.`,
  };
}

export default async function EstateDocumentsPage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageStub
      title={`${slug} — Title & Documents`}
      intro="Actual watermarked document previews, plain-English title explainer — the direct answer to 'Is the title genuine?' (PRD §10.3)."
      prdRef="PRD §8.2 module 4"
      todo="Load watermarked document assets once legal/title documents are supplied by the client (PRD §16 open questions)."
    />
  );
}
