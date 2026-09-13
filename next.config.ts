import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [64, 96, 160, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: []
  },
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  }
};

export default nextConfig;