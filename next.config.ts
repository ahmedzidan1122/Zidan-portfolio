import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
