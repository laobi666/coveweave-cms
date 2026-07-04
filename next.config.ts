import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  experimental: {},

  poweredByHeader: false,

  reactStrictMode: true,
};

export default nextConfig;