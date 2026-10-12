import type { NextConfig } from "next";

// Fully static export: no server, no database, nothing to write to.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
