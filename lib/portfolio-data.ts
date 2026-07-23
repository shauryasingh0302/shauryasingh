export const CONTACT_EMAIL = "shauryasingh0302@icloud.com";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  repo: string;
};

export type Skill = {
  name: string;
  icon: string;
  invertDark?: boolean;
  customSvg?: boolean;
};

export type SkillGroup = {
  category: string;
  items: Skill[];
};

export type BlogPost = {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
};

export const projects: Project[] = [
  {
    title: "Navjivan",
    description:
      "AI-powered smoking cessation & wellness platform. Memory-augmented goal engine using Pinecone vector embeddings and an agentic AI coach for personalized fitness and cessation plans. Winner, Smart India Hackathon 2025.",
    tags: ["React Native", "Expo", "TypeScript", "Node.js", "Pinecone"],
    image: "/project-placeholder-1.jpg",
    link: "#",
    repo: "#",
  },
  {
    title: "ChatPDF",
    description:
      "Full-stack Retrieval-Augmented Generation (RAG) app for natural language querying over uploaded PDFs, powered by LangChain, Pinecone, and Google Gemini.",
    tags: ["Next.js", "LangChain", "Pinecone", "Gemini API", "Supabase"],
    image: "/project-placeholder-2.jpg",
    link: "#",
    repo: "#",
  },
  {
    title: "Cypress",
    description:
      "Real-time collaborative workspace SaaS with live multi-user co-editing, cursors, nested workspaces, a custom rich text editor, and subscription billing.",
    tags: ["Next.js", "WebSockets", "Drizzle ORM", "Clerk"],
    image: "/project-placeholder-3.jpg",
    link: "#",
    repo: "#",
  },
  {
    title: "ExecOS",
    description:
      "Autonomous AI executive assistant that reads unread emails on a schedule, understands intent via an LLM, and acts on the user's behalf — drafting replies, extracting tasks, and creating calendar events.",
    tags: ["Vercel AI SDK", "Groq", "Drizzle ORM", "Neon Postgres"],
    image: "/project-placeholder-4.jpg",
    link: "#",
    repo: "#",
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React.js",     icon: "react" },
      { name: "Next.js",      icon: "nextdotjs",   invertDark: true },
      { name: "TypeScript",   icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "HTML/CSS",     icon: "html5" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js",     icon: "nodedotjs" },
      { name: "Express.js",  icon: "express",   invertDark: true },
      { name: "REST APIs",   icon: "fastapi" },
      { name: "MongoDB",     icon: "mongodb" },
      { name: "PostgreSQL",  icon: "postgresql" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git",                  icon: "git" },
      { name: "GitHub",               icon: "github",   invertDark: true },
      { name: "Postman",              icon: "postman" },
      { name: "LangChain",            icon: "langchain" },
      { name: "Pinecone (Vector DB)", icon: "pinecone", customSvg: true },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: "Smart India Hackathon 2025 — National Winner",
    date: "2025",
    readTime: "Achievement",
    excerpt:
      "Won India's largest national hackathon for Navjivan, an AI-powered smoking cessation platform, recognized for real-world impact, technical innovation, and scalable architecture.",
  },
  {
    title: "Web Developer & Video Editor — Google Developer Groups (GDG) Noida",
    date: "2025 – Present",
    readTime: "Work Experience",
    excerpt:
      "Develop and maintain the community's website, shipping new features and UI updates and fixing bugs. Also produce and edit promotional and recap videos for developer meetups, and assist in organizing events.",
  },
  {
    title: "B.Tech in Computer Science Engineering — ABES Engineering College",
    date: "2023 – 2027",
    readTime: "Education",
    excerpt:
      "Final year Computer Science Engineering student, GPA 7.57/10.0, with hands-on experience in full-stack development, RESTful API design, and scalable backend systems.",
  },
];

export type SearchItem = {
  label: string;
  sectionId?: string;
  href?: string;
  category: string;
};

export const defaultSections: { title: string; items: SearchItem[] }[] = [
  {
    title: "PAGES",
    items: [
      { label: "Home",     sectionId: "hero",     category: "Pages" },
      { label: "Projects", sectionId: "projects", category: "Pages" },
      { label: "Skills",   sectionId: "skills",   category: "Pages" },
      { label: "Logs",     sectionId: "blog",     category: "Pages" },
      { label: "Contact",  sectionId: "contact",  category: "Pages" },
    ],
  },
  {
    title: "ELSEWHERE",
    items: [
      { label: "GitHub",    href: "https://github.com/shauryasingh0302",       category: "Elsewhere" },
      { label: "LinkedIn",  href: "https://linkedin.com/in/shauryasingh0302",  category: "Elsewhere" },
      { label: "Email",     href: "mailto:shauryasingh0302@icloud.com",        category: "Elsewhere" },
    ],
  },
];

export const allSearchItems: SearchItem[] = [
  ...projects.map((p) => ({ label: p.title, sectionId: "projects", category: "Projects" })),
  ...skills.map((s)   => ({ label: s.category, sectionId: "skills",   category: "Skills"   })),
  ...blogPosts.map((p) => ({ label: p.title, sectionId: "blog",      category: "Logs"     })),
  { label: "Home",     sectionId: "hero",     category: "Pages" },
  { label: "Projects", sectionId: "projects", category: "Pages" },
  { label: "Skills",   sectionId: "skills",   category: "Pages" },
  { label: "Logs",     sectionId: "blog",     category: "Pages" },
  { label: "Contact",  sectionId: "contact",  category: "Pages" },
  { label: "GitHub",   href: "https://github.com/shauryasingh0302",      category: "Elsewhere" },
  { label: "LinkedIn", href: "https://linkedin.com/in/shauryasingh0302", category: "Elsewhere" },
  { label: "Email",    href: "mailto:shauryasingh0302@icloud.com",       category: "Elsewhere" },
];
