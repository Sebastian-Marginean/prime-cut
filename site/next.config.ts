import type { NextConfig } from "next";

// Fully static export: no server, no database, nothing to write to.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  // The whole stylesheet is ~9 KB (Tailwind), so it goes straight into the
  // HTML instead of a render-blocking request.
  experimental: { inlineCss: true },
};

export default nextConfig;
