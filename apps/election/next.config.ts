import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "election-66.s3.ap-southeast-7.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
