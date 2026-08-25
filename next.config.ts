import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // The canonical route is singular. Catch the plural form so any link
        // shared with /articles/... still lands rather than 404ing.
        source: "/articles/:slug",
        destination: "/article/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
