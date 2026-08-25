import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category} — Insights`,
    description: `DreamMaker insights posts in the ${category} category.`,
  };
}

export default async function InsightsCategoryPage({ params }: Props) {
  const { category } = await params;
  return <PageStub title={`Category: ${category}`} intro="Filtered insights list." prdRef="PRD §7" />;
}
