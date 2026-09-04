import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";
import { client } from "@/sanity/lib/client";

interface Props {
  params: Promise<{ slug: string }>;
}

interface GuideSeo {
  title?: string;
  seoTitle?: string;
  seoDescription?: string;
  directAnswer?: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await client.fetch<GuideSeo | null>(
    `*[_type == "guide" && slug.current == $slug][0]{ title, seoTitle, seoDescription, directAnswer }`,
    { slug }
  );

  return {
    title: guide?.seoTitle ?? guide?.title ?? slug,
    description: guide?.seoDescription ?? guide?.directAnswer,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageStub
      title={slug}
      intro="This guide is being finalized — check back soon, or reach out to our team for the answer today."
    />
  );
}
