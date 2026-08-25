import { whatsappLink } from "@/lib/whatsapp";

interface WhatsAppLinkProps {
  message: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/** WhatsApp is first-class in this funnel, not a secondary channel (PRD §10.1). */
export function WhatsAppLink({ message, className, children, onClick }: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-event="whatsapp_click"
      onClick={onClick}
    >
      {children}
    </a>
  );
}
