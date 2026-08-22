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
  isLucide?: boolean;
};

export type SkillGroup = {
  category: string;
  items: Skill[];
  isLearning?: boolean;
};

export type BlogPost = {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
};

export const projects: Project[] = [
  {
    title: "Slate",
    description:
      "Real-time collaborative workspace SaaS with live multi-user co-editing, cursors, nested workspaces, a custom rich text editor, and subscription billing.",
    tags: ["Next.js", "WebSockets", "Drizzle ORM", "Clerk"],
    image: "/images/projects/project-placeholder-3.jpg",
    link: "https://slate.shauryasingh.dev",
    repo: "https://www.github.com/shauryasingh0302/slate",
  },
  {
    title: "Kortex",
    description:
      "Full-stack Retrieval-Augmented Generation (RAG) app for natural language querying over uploaded PDFs, powered by LangChain, Pinecone, and Google Gemini.",
    tags: ["Next.js", "LangChain", "Pinecone", "Gemini API", "Supabase"],
    image: "/images/projects/project-placeholder-2.jpg",
    link: "https://kortex.shauryasingh.dev",
    repo: "https://www.github.com/shauryasingh0302/kortex",
  },
  {
    title: "ExecOS",
    description:
      "Autonomous AI executive assistant that reads unread emails on a schedule, understands intent via an LLM, and acts on the user's behalf — drafting replies, extracting tasks, and creating calendar events.",
    tags: ["Vercel AI SDK", "Groq", "Drizzle ORM", "Neon Postgres"],
    image: "/images/projects/project-placeholder-4.jpg",
    link: "https://execos.shauryasingh.dev",
    repo: "https://www.github.com/shauryasingh0302/execos",
  },
  {
    title: "Navjivan",
    description:
      "AI-powered smoking cessation & wellness platform. Memory-augmented goal engine using Pinecone vector embeddings and an agentic AI coach for personalized fitness and cessation plans. Winner, Smart India Hackathon 2025.",
    tags: ["React Native", "Expo", "TypeScript", "Node.js", "Pinecone"],
    image: "/images/projects/navjivan.svg",
    link: "#",
    repo: "https://www.github.com/shauryasingh0302/navjivan",
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React.js",          icon: "react" },
      { name: "Next.js",           icon: "nextdotjs",   invertDark: true },
      { name: "TypeScript",        icon: "typescript" },
      { name: "JavaScript (ES6+)", icon: "javascript" },
      { name: "Tailwind CSS",      icon: "tailwindcss" },
      { name: "Framer Motion",     icon: "framer",      invertDark: true },
      { name: "React Query",       icon: "reactquery" },
      { name: "Shadcn/UI",         icon: "shadcnui",    invertDark: true },
      { name: "HTML5",             icon: "html5" },
      { name: "CSS3",              icon: "Palette",     isLucide: true },
    ],
  },
  {
    category: "Backend & AI",
    items: [
      { name: "Node.js",           icon: "nodedotjs" },
      { name: "Express.js",        icon: "express",     invertDark: true },
      { name: "REST APIs",         icon: "Network",     isLucide: true },
      { name: "WebSockets",        icon: "socketdotio", invertDark: true },
      { name: "JWT Auth",          icon: "jsonwebtokens", invertDark: true },
      { name: "LangChain",         icon: "langchain",   invertDark: true },
      { name: "Gemini API",        icon: "googlegemini" },
      { name: "Groq",              icon: "Cpu",         isLucide: true },
      { name: "Pinecone",          icon: "pinecone",    customSvg: true },
      { name: "RAG",               icon: "FileSearch",  isLucide: true },
      { name: "Vercel AI SDK",     icon: "vercel",      invertDark: true },
    ],
  },
  {
    category: "Databases & Tools",
    items: [
      { name: "PostgreSQL",        icon: "postgresql" },
      { name: "MongoDB",           icon: "mongodb" },
      { name: "Prisma ORM",        icon: "prisma",      invertDark: true },
      { name: "Drizzle ORM",       icon: "drizzle" },
      { name: "Supabase",          icon: "supabase" },
      { name: "Neon",              icon: "neon" },
      { name: "Render",            icon: "Box",         isLucide: true },
      { name: "Vercel",            icon: "vercel",      invertDark: true },
      { name: "Clerk",             icon: "clerk",       invertDark: true },
      { name: "Git",               icon: "git" },
      { name: "GitHub",            icon: "github",      invertDark: true },
      { name: "Postman",           icon: "postman" },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: "Developer & Product Manager Intern — SPACENOS",
    date: "July 2026 – Present",
    readTime: "Work Experience",
    excerpt:
      "Recently joined — learning the ropes across development and product strategy.",
  },
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
  keywords?: string[];
};

export const defaultSections: { title: string; items: SearchItem[] }[] = [
  {
    title: "PAGES",
    items: [
      { label: "Home",     sectionId: "hero",     category: "Pages" },
      { label: "Projects", sectionId: "projects", category: "Pages" },
      { label: "Skills",   sectionId: "skills",   category: "Pages" },
      { label: "Experience", sectionId: "logs", category: "Pages" },
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
  ...projects.map((p) => ({ 
    label: p.title, 
    sectionId: "projects", 
    category: "Projects",
    keywords: [...p.tags, p.description],
  })),
  ...skills.map((s)   => ({ 
    label: s.category, 
    sectionId: "skills",   
    category: "Skills",
    keywords: s.items.map(i => i.name),
  })),
  ...blogPosts.map((p) => ({ 
    label: p.title, 
    sectionId: "logs",      
    category: "Experience",
    keywords: [p.excerpt, p.readTime],
  })),
  { label: "Home",     sectionId: "hero",     category: "Pages" },
  { label: "Projects", sectionId: "projects", category: "Pages" },
  { label: "Skills",   sectionId: "skills",   category: "Pages" },
  { label: "Experience", sectionId: "logs", category: "Pages" },
  { label: "Contact",  sectionId: "contact",  category: "Pages" },
  { label: "GitHub",   href: "https://github.com/shauryasingh0302",      category: "Elsewhere" },
  { label: "LinkedIn", href: "https://linkedin.com/in/shauryasingh0302", category: "Elsewhere" },
  { label: "Email",    href: "mailto:shauryasingh0302@icloud.com",       category: "Elsewhere" },
];
