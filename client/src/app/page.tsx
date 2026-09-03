import { HomeView } from "@/components/home/HomeView";

// Estates render here via a live MongoDB read (edited any time via /admin) — never prerendered/cached.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Real Estate Company in Lagos | Land & Homes, Lekki–Epe Corridor",
  description:
    "DreamMaker Real Estate Ltd develops and builds on the Lekki–Epe corridor. Verified titles, documented allocations, payment plans from 30% down.",
};

export default function HomePage() {
  return <HomeView />;
}
