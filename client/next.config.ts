import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Estates moved under /projects — keep old URLs resolving (PRD §3.1 flags dead links as a
  // mistake to avoid) rather than leaving /estates/* to 404.
  async redirects() {
    return [
      { source: "/estates", destination: "/projects", permanent: true },
      { source: "/estates/:slug", destination: "/projects/:slug", permanent: true },
    ];
  },
  images: {
    // Cloudinary media pipeline (PRD §11.1) — AVIF/WebP responsive transforms.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
