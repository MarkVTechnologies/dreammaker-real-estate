import { PageStub } from "@/components/ui/PageStub";

export const metadata = {
  title: "Insights — DreamMaker Real Estate Blog",
  description: "Market reports, estate progress updates and news from DreamMaker Real Estate Ltd.",
};

export default function InsightsIndexPage() {
  return (
    <PageStub
      title="Insights"
      intro="4 posts/month minimum, 1,200+ words, original data or firsthand observation (PRD §9.6)."
      prdRef="PRD §9.6"
      todo="Populate from Sanity 'post' documents."
    />
  );
}
