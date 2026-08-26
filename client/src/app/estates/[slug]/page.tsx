import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  FileText,
  MapPin,
  PlayCircle,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { EstateBookInspectionButton } from "@/components/estate/EstateBookInspectionButton";
import { EstateGallery } from "@/components/estate/EstateGallery";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal } from "@/components/ui/Reveal";
import { getEstateBySlug } from "@/lib/api";
import { estateInterestMessage } from "@/lib/whatsapp";
import { formatNgn, titleTypeLabel } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

const statusLabel = {
  PLANNING: "Planning",
  ONGOING: "Ongoing",
  DELIVERED: "Delivered",
} as const;

function youtubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const estate = await getEstateBySlug(slug);
  if (!estate) return { title: "Estate not found" };

  return {
    title: estate.seoTitle ?? `${estate.name} — ${estate.locality}, ${estate.lga}`,
    description:
      estate.seoDescription ??
      `Title status, pricing, and location details for ${estate.name} in ${estate.locality}, ${estate.lga}.`,
  };
}

export default async function EstateDetailPage({ params }: Props) {
  const { slug } = await params;
  const estate = await getEstateBySlug(slug);
  if (!estate) notFound();

  const gallery = estate.gallery ?? [];
  const coverImage = gallery[0];
  const restOfGallery = gallery.slice(1);
  const embedUrl = estate.videoUrl ? youtubeEmbedUrl(estate.videoUrl) : null;
  const whatsappMessage = estateInterestMessage(estate.name);

  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-navy pointer-events-none absolute inset-x-0 top-0 h-72 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      {/* Hero */}
      <div className="relative mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-950/90 px-3 py-1 text-xs font-medium text-white">
              <ShieldCheck className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
              {titleTypeLabel[estate.titleType]}
            </span>
            <span className="inline-flex items-center rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
              {statusLabel[estate.status]}
            </span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-navy-900 sm:text-5xl">
            {estate.name}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-lg text-ink-600">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {estate.locality}, {estate.lga}, {estate.state} State
          </p>
        </Reveal>

        {coverImage && (
          <Reveal delay={0.05}>
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-navy-100">
              <Image
                src={coverImage}
                alt={estate.name}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        )}
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* Main column */}
        <div className="lg:col-span-2">
          {/* Quick facts */}
          <Reveal>
            <dl className="grid grid-cols-2 gap-4 rounded-xl border border-navy-100 bg-white p-5 sm:grid-cols-4">
              <div>
                <dt className="text-xs text-ink-600">From</dt>
                <dd className="mt-1 tabular-nums text-lg font-semibold text-navy-900">
                  {formatNgn(estate.startingPriceNgn)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-600">Deposit</dt>
                <dd className="mt-1 tabular-nums text-lg font-semibold text-navy-900">
                  {estate.depositPercent}%
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-600">Plot sizes</dt>
                <dd className="mt-1 tabular-nums text-lg font-semibold text-navy-900">
                  {estate.plotSizesSqm.join(", ")} sqm
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-600">Availability</dt>
                <dd className="mt-1 tabular-nums text-lg font-semibold text-navy-900">
                  {estate.plotsAvailable} of {estate.plotsTotal}
                </dd>
              </div>
            </dl>
          </Reveal>

          {estate.seoDescription && (
            <Reveal delay={0.05}>
              <p className="mt-8 text-lg leading-relaxed text-ink-700">{estate.seoDescription}</p>
            </Reveal>
          )}

          {/* Video */}
          {embedUrl && (
            <Reveal delay={0.1}>
              <div className="mt-8">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-navy-900">
                  <PlayCircle className="h-5 w-5 text-gold-600" aria-hidden="true" />
                  Site walkthrough
                </h2>
                <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl bg-navy-950">
                  <iframe
                    src={embedUrl}
                    title={`${estate.name} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            </Reveal>
          )}

          {/* Gallery */}
          {restOfGallery.length > 0 && (
            <Reveal delay={0.15}>
              <div className="mt-8">
                <h2 className="font-display text-xl font-semibold text-navy-900">Gallery</h2>
                <EstateGallery images={restOfGallery} alt={estate.name} />
              </div>
            </Reveal>
          )}

          {/* Payment plans */}
          {estate.paymentPlans && estate.paymentPlans.length > 0 && (
            <Reveal delay={0.2}>
              <div className="mt-10">
                <h2 className="font-display text-xl font-semibold text-navy-900">Packages</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {estate.paymentPlans.map((plan) => (
                    <div key={plan.name} className="rounded-xl border border-navy-100 bg-white p-5">
                      <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                        {plan.name}
                      </p>
                      <p className="mt-2 tabular-nums text-2xl font-bold text-navy-900">
                        {formatNgn(plan.priceNgn)}
                      </p>
                      <p className="mt-1 text-sm text-ink-600">{plan.sizeSqm.toLocaleString()} sqm</p>
                      {plan.treesCount && (
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-600">
                          <Sprout className="h-4 w-4 text-success" aria-hidden="true" />
                          {plan.treesCount.toLocaleString()} hybrid cocoa trees
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Features */}
          {estate.features && estate.features.length > 0 && (
            <Reveal delay={0.25}>
              <div className="mt-10">
                <h2 className="font-display text-xl font-semibold text-navy-900">Highlights</h2>
                <ul className="mt-4 space-y-3">
                  {estate.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-ink-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* Documents */}
          {estate.documents && estate.documents.length > 0 && (
            <Reveal delay={0.3}>
              <div className="mt-10">
                <h2 className="font-display text-xl font-semibold text-navy-900">Title documents</h2>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {estate.documents.map((doc) => (
                    <li
                      key={doc}
                      className="inline-flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50 px-4 py-2 text-sm font-medium text-navy-900"
                    >
                      <FileText className="h-4 w-4 text-navy-700" aria-hidden="true" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* Landmarks */}
          {estate.landmarks && estate.landmarks.length > 0 && (
            <Reveal delay={0.35}>
              <div className="mt-10">
                <h2 className="font-display text-xl font-semibold text-navy-900">Location</h2>
                <ul className="mt-4 space-y-2">
                  {estate.landmarks.map((landmark) => (
                    <li key={landmark} className="flex items-start gap-2.5 text-ink-700">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy-700" aria-hidden="true" />
                      {landmark}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* FAQs */}
          {estate.faqs && estate.faqs.length > 0 && (
            <Reveal delay={0.4}>
              <div className="mt-10">
                <h2 className="font-display text-xl font-semibold text-navy-900">FAQs</h2>
                <div className="mt-4 space-y-4">
                  {estate.faqs.map((faq) => (
                    <div key={faq.q} className="rounded-xl border border-navy-100 bg-white p-5">
                      <p className="font-semibold text-navy-900">{faq.q}</p>
                      <p className="mt-1.5 text-sm text-ink-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* Sticky CTA sidebar */}
        <div className="lg:col-span-1">
          <Reveal delay={0.1}>
            <div className="sticky top-24 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <p className="text-sm text-ink-600">Starting from</p>
              <p className="mt-1 tabular-nums text-3xl font-bold text-navy-900">
                {formatNgn(estate.startingPriceNgn)}
              </p>
              <EstateBookInspectionButton
                estateId={estate.id}
                estateName={estate.name}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-600"
              />
              <WhatsAppLink
                message={whatsappMessage}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-whatsapp px-6 py-3 font-semibold text-whatsapp transition-colors hover:bg-whatsapp/5"
              >
                Chat on WhatsApp
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
