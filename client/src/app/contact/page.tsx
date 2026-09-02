import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { nap } from "@/lib/nav";

export const metadata = {
  title: "Contact DreamMaker Real Estate",
  description: "Contact DreamMaker Real Estate Ltd — phone, WhatsApp, email, and our office address.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h1 className="font-display text-4xl font-bold text-navy-900">Contact</h1>
        <p className="mt-4 text-lg text-ink-600">{nap.legalName}</p>

        <div className="mt-8 space-y-5">
          {nap.offices.map((office) => (
            <div key={office.slug} className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
              <div>
                <p className="font-semibold text-navy-900">{office.name}</p>
                <p className="text-ink-600">{office.address}</p>
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
            <div className="text-ink-600">
              <a href={`tel:${nap.phoneDisplay.replace(/\s+/g, "")}`} className="block hover:text-navy-900">
                {nap.phoneDisplay}
              </a>
              <a href={`tel:${nap.phoneDisplaySecondary.replace(/\s+/g, "")}`} className="block hover:text-navy-900">
                {nap.phoneDisplaySecondary}
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
            <a href={`mailto:${nap.email}`} className="text-ink-600 hover:text-navy-900">
              {nap.email}
            </a>
          </div>
        </div>

        <WhatsAppLink
          message="Hi DreamMaker, I'd like to get in touch."
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-whatsapp px-6 py-3 font-semibold text-white transition-colors hover:bg-whatsapp/90"
        >
          Chat on WhatsApp
        </WhatsAppLink>
      </Reveal>
    </div>
  );
}
