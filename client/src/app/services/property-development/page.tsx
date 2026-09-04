import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { services } from "@/lib/services";

export const metadata = {
  title: "Property Development Company in Lagos",
  description:
    "DreamMaker's property development capability on the Lekki–Epe corridor — land acquisition, layout planning, government approvals and phased release.",
};

export default function PropertyDevelopmentPage() {
  const service = services.find((s) => s.slug === "property-development")!;
  return <ServiceDetailPage service={service} />;
}
