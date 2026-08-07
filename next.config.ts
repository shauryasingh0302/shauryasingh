import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      // /resume serves a bare HTML shell around the PDF, purely so the
      // browser tab can show a real title instead of the filename.
      { source: "/resume", destination: "/resume.html" },
    ];
  },
};

export default nextConfig;
