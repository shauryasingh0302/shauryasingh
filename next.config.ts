import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      // /resume returns the PDF bytes directly. It must be the top-level
      // document, not embedded in an HTML shell — mobile browsers have no
      // plugin to render a PDF nested in <object>/<iframe>, but do render
      // one that is the response itself.
      { source: "/resume", destination: "/shaurya_resume_05.pdf" },
    ];
  },
  async headers() {
    return [
      {
        // The PDF carries no /Title metadata, so viewers title the tab from
        // the filename — which this header supplies, keeping the tab readable
        // instead of showing "shaurya_resume_05.pdf".
        source: "/resume",
        headers: [
          {
            key: "Content-Disposition",
            // ASCII form first for older parsers; RFC 5987 filename* carries
            // the em dash, since header values can't hold non-Latin-1 bytes.
            value:
              "inline; filename=\"Shaurya Singh - Resume.pdf\"; filename*=UTF-8''Shaurya%20Singh%20%E2%80%94%20Resume.pdf",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
