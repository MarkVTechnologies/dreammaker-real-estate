import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";
import { client } from "@/sanity/lib/client";

interface Props {
  params: Promise<{ slug: string }>;
}

interface PostSeo {
  title?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<PostSeo | null>(
    `*[_type == "post" && slug.current == $slug][0]{ title, seoTitle, seoDescription }`,
    { slug }
  );

  return {
    title: post?.seoTitle ?? post?.title ?? slug,
    description: post?.seoDescription,
  };
}

export default async function InsightPostPage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageStub
      title={slug}
      intro="Article JSON-LD: author as Person with real bio/credentials, datePublished, dateModified (PRD §9.2)."
      prdRef="PRD §8.5, §9.2"
    />
  );
}
