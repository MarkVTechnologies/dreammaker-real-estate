import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { services } from "@/lib/services";

export const metadata = {
  title: "Construction Management Company Lagos",
  description:
    "DreamMaker's construction management services across the Lekki–Epe corridor — in-house contractor supervision, quality control and schedule tracking.",
};

export default function ConstructionManagementPage() {
  const service = services.find((s) => s.slug === "construction-management")!;
  return <ServiceDetailPage service={service} />;
}
