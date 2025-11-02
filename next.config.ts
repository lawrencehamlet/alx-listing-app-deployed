import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["example.com", "picsum.photos", "i.picsum.photos", "i.pravatar.cc"],
  },
};

export default nextConfig;
