import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { services } from "@/lib/services";

export const metadata = {
  title: "Property Management Services — Lagos",
  description:
    "DreamMaker's property management services for delivered estates and homes — infrastructure upkeep, security, and owner support.",
};

export default function PropertyManagementPage() {
  const service = services.find((s) => s.slug === "property-management")!;
  return <ServiceDetailPage service={service} />;
}
