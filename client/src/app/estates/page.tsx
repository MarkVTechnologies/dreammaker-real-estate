import { PageStub } from "@/components/ui/PageStub";

export const metadata = {
  title: "Estates for Sale in Lagos — Gated Estates, Ibeju-Lekki",
  description:
    "Browse DreamMaker's filterable estate inventory across the Lekki–Epe corridor — title status, starting price, deposit and plot size on every card.",
};

export default function EstatesIndexPage() {
  return (
    <PageStub
      title="All estates"
      intro="Filterable index by location, budget, plot size and title type (PRD §8.1 module 4, §11.1 search)."
      prdRef="PRD §7, §8.1"
      todo="Wire to server API /estates (Prisma) with query-param filtering; Algolia only if inventory exceeds ~200 items."
    />
  );
}
