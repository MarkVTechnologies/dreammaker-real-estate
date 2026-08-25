import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";
import { client } from "@/sanity/lib/client";

interface Props {
  params: Promise<{ locality: string }>;
}

interface LocationSeo {
  name?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locality } = await params;
  const location = await client.fetch<LocationSeo | null>(
    `*[_type == "location" && slug.current == $locality][0]{ name, seoTitle, seoDescription }`,
    { locality }
  );

  return {
    title: location?.seoTitle ?? `${location?.name ?? locality} Area Guide`,
    description: location?.seoDescription,
  };
}

export default async function LocationGuidePage({ params }: Props) {
  const { locality } = await params;
  return (
    <PageStub
      title={`${locality} area guide`}
      intro="Informational area guide (PRD §7) — distinct from /land-for-sale/lagos/[locality] which is commercial-intent."
      prdRef="PRD §7"
    />
  );
}
