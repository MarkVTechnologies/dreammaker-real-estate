const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2349158221658";

/**
 * Builds a WhatsApp deep link pre-filled with page context (PRD §10.2):
 * "Hi DreamMakers, I'm interested in [Estate] — [plot size]".
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function estateInterestMessage(estateName: string, plotSize?: string): string {
  return plotSize
    ? `Hi DreamMakers, I'm interested in ${estateName} — ${plotSize}`
    : `Hi DreamMakers, I'm interested in ${estateName}`;
}

export function estateSubscribeMessage(estateName: string): string {
  return `Hi DreamMakers, please subscribe me for updates on ${estateName}.`;
}
