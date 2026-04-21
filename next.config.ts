import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["git-mdx-loader"],
  cacheComponents: true,
};

export default nextConfig;
