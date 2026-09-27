import type { NextConfig } from "next";

// Static export: the site is 100% prerendered, so it can be served as plain
// static files (out/) instead of going through the Vercel Next.js builder.
// ponytail: no server runtime needed here; drop `output`/`unoptimized` if the
// site ever needs ISR, middleware, or the Next image optimizer.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
