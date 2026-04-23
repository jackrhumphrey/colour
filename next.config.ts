import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export',
  distDir: 'dist',
};

export default nextConfig;
