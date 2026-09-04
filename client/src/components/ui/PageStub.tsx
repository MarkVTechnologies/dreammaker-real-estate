import { Clock } from "lucide-react";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal } from "./Reveal";

interface PageStubProps {
  title: string;
  intro: string;
}

/** Clean "coming soon" placeholder for routes not yet built out — no internal build notes. */
export function PageStub({ title, intro }: PageStubProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-navy pointer-events-none absolute inset-x-0 top-0 h-72 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Coming soon
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-navy-900 sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-600">{intro}</p>
          <p className="mt-6 text-sm text-ink-600">
            In the meantime, reach our team directly and we&apos;ll help with this over WhatsApp or a call.
          </p>
          <WhatsAppLink
            message={`Hi DreamMaker, I was looking for more on "${title}" on your website.`}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90"
          >
            Chat on WhatsApp
          </WhatsAppLink>
        </Reveal>
      </div>
    </div>
  );
}
