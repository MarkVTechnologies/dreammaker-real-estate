import { PageStub } from "@/components/ui/PageStub";

export const metadata = {
  title: "Buyer Guides — Titles, Diaspora Buying, Land Prices",
  description: "DreamMaker's pillar guides: how to verify titles, buy from abroad, land banking, and more.",
};

export default function GuidesIndexPage() {
  return (
    <PageStub
      title="Guides"
      intro="The SEO engine (PRD §8.5): 10 pillar pages, 1,500–2,500 words each, each answering its question in the first 40-60 words."
      prdRef="PRD §8.5"
      todo="Populate from Sanity 'guide' documents; every guide must link to 3+ estates (PRD §9.1 internal linking)."
    />
  );
}
