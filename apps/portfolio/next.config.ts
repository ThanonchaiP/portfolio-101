import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  reactStrictMode: true,
  // reactCompiler: {
  //   compilationMode: "annotation",
  // },
};

export default nextConfig;
