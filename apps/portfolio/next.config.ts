import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  outputFileTracingRoot: path.join(__dirname, "../../"),
  reactStrictMode: true,
  // reactCompiler: {
  //   compilationMode: "annotation",
  // },
};

export default nextConfig;
