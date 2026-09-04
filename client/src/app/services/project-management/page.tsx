import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { services } from "@/lib/services";

export const metadata = {
  title: "Real Estate Project Management — Lagos",
  description:
    "Coordinated project management for real estate development in Lagos — one point of accountability from groundbreaking to allocation.",
};

export default function ProjectManagementPage() {
  const service = services.find((s) => s.slug === "project-management")!;
  return <ServiceDetailPage service={service} />;
}
