import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { GsapWrapper } from "@/components/gsap/gsap-wrapper";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.VERCEL_ENV === "preview"
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000";

const title = "Shaurya Singh";
const description =
  "Shaurya Singh is a full-stack developer and AI engineer specialising in Next.js, React, Node.js, and LLM-powered applications. Smart India Hackathon 2025 national winner. Explore projects, skills, and get in touch.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Shaurya Singh",
  },
  description,
  keywords: [
    "Shaurya Singh",
    "full-stack developer",
    "AI engineer",
    "Next.js developer",
    "React developer",
    "Node.js",
    "LangChain",
    "portfolio",
    "Smart India Hackathon winner",
    "TypeScript",
    "web developer",
    "software engineer",
    "RAG applications",
    "Pinecone",
    "Vercel",
  ],
  authors: [{ name: "Shaurya Singh", url: siteUrl }],
  creator: "Shaurya Singh",
  publisher: "Shaurya Singh",
  // Icons are generated from app/icon.png and app/apple-icon.png
  openGraph: {
    type: "website",
    locale: "en_US",
    title,
    description,
    url: siteUrl,
    siteName: "Shaurya Singh",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Shaurya Singh — Full-Stack Developer & AI Engineer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
    creator: "@shauryasingh0302",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

/* ── JSON-LD Structured Data ─────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shaurya Singh",
  url: siteUrl,
  image: `${siteUrl}/og.jpg`,
  jobTitle: "Full-Stack Developer & AI Engineer",
  description,
  email: "shauryasingh0302@icloud.com",
  sameAs: [
    "https://github.com/shauryasingh0302",
    "https://linkedin.com/in/shauryasingh0302",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "ABES Engineering College",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "LangChain",
    "Pinecone",
    "PostgreSQL",
    "Full-Stack Development",
    "AI Engineering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth shadcn">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`font-body antialiased select-none ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <LenisProvider>
            <GsapWrapper>
              <GrainOverlay />
              {children}
            </GsapWrapper>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

