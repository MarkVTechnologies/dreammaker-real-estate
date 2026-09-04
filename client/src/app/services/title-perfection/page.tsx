import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { services } from "@/lib/services";

export const metadata = {
  title: "Land Title Perfection Services — Lagos",
  description:
    "Title perfection services: C of O, Excision, Gazette and Governor's Consent processing and regularization in Lagos.",
};

export default function TitlePerfectionPage() {
  const service = services.find((s) => s.slug === "title-perfection")!;
  return <ServiceDetailPage service={service} />;
}
