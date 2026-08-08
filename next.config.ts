import type { NextConfig } from "next";
import { RESUME_DOWNLOAD_NAME, RESUME_URL } from "./scripts/resume.mjs";

const nextConfig: NextConfig = {
  /* config options here */

  async rewrites() {
    return [
      // /resume returns the PDF bytes directly. It must be the top-level
      // document, not embedded in an HTML shell — mobile browsers have no
      // plugin to render a PDF nested in <object>/<iframe>, but do render
      // one that is the response itself.
      { source: "/resume", destination: RESUME_URL },
    ];
  },
  async headers() {
    return [
      {
        // Names the file on download, and is what Safari's viewer titles the
        // tab with — it ignores the PDF's own /Title. Chrome and Firefox read
        // /Title instead, stamped by scripts/stamp-resume-title.mjs.
        source: "/resume",
        headers: [
          {
            key: "Content-Disposition",
            value: `inline; filename="${RESUME_DOWNLOAD_NAME}"`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
