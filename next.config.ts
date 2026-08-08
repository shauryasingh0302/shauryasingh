import type { NextConfig } from "next";
import { findResumePdf } from "./scripts/resume-file.mjs";

// Resolved once at config load, so dropping shaurya_resume_06.pdf into public/
// repoints the route, the download filename and the header label together.
const resume = findResumePdf();

const nextConfig: NextConfig = {
  /* config options here */

  // Exposed to the client so the header button can label itself with the
  // current filename instead of a hardcoded version number.
  env: { NEXT_PUBLIC_RESUME_FILE: resume.name },

  async rewrites() {
    return [
      // /resume returns the PDF bytes directly. It must be the top-level
      // document, not embedded in an HTML shell — mobile browsers have no
      // plugin to render a PDF nested in <object>/<iframe>, but do render
      // one that is the response itself.
      { source: "/resume", destination: resume.url },
    ];
  },
  async headers() {
    return [
      {
        // Names the file when someone downloads rather than views it. The
        // viewer's on-screen title comes from the PDF's own /Title metadata,
        // stamped by scripts/stamp-resume-title.mjs.
        source: "/resume",
        headers: [
          {
            key: "Content-Disposition",
            value: `inline; filename="${resume.name}"`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
