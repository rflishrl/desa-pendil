import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Keep in sync with ALLOWED_IMAGE_HOSTS in src/lib/images.ts
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      // Local backend (desa-pendil-backend) serving /uploads in development
      { protocol: "http", hostname: "localhost", port: "4000" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
