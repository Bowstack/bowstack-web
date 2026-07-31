import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Routes from the earlier on-prem-consulting positioning. Kept as
      // permanent redirects so any link already in the wild still lands
      // somewhere sensible rather than 404ing.
      { source: "/hardware", destination: "/", permanent: true },
      { source: "/confidentiality", destination: "/security", permanent: true },
    ];
  },
};

export default nextConfig;
