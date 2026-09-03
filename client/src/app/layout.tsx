import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { PartnersSection } from "@/components/layout/PartnersSection";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import "./globals.css";

// Self-hosted via next/font, Latin subset only, only the weights actually
// used — total font payload budget is 90KB (PRD §6.3).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dreammaker.com.ng"),
  title: {
    default: "DreamMaker Real Estate Ltd — Land & Homes on the Lekki–Epe Corridor",
    template: "%s | DreamMaker Real Estate Ltd",
  },
  description:
    "DreamMaker builds on the Lekki–Epe corridor — verified titles, documented allocations, and payment plans from 30% down.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
      >
        <body className="flex min-h-full flex-col bg-paper text-ink-900">
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <PartnersSection />
          <Footer />
          <MobileStickyBar />
          <WhatsAppWidget />
        </body>
      </html>
    </ClerkProvider>
  );
}
