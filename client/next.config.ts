import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
