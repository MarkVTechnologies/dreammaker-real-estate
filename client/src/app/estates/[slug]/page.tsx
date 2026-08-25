import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";

interface Props {
  params: Promise<{ slug: string }>;
}

// TODO: fetch the real estate record from the server API and build unique
// metadata per estate (name + locality + title status) — PRD §9.1 canonicals.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} — Estate Details`,
    description: `Title status, pricing, plot sizes, gallery, documents and location intelligence for ${slug}.`,
  };
}

export default async function EstateDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageStub
      title={slug}
      intro="The money page (PRD §8.2): above-the-fold decision data, gallery, payment plan calculator, title documents, location intelligence, progress log, price history, comparison, FAQ, sticky CTA bar."
      prdRef="PRD §8.2"
      todo="Fetch estate by slug from the server API; render all 11 modules from §8.2 once real content exists."
    />
  );
}
