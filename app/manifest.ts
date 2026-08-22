import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shaurya Singh — Full-Stack Developer & AI Engineer",
    short_name: "Shaurya Singh",
    description:
      "Shaurya Singh is a full-stack developer and AI engineer specialising in Next.js, React, Node.js, and LLM-powered applications. Smart India Hackathon 2025 national winner.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
