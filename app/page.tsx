"use client";

import { useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Database,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/zippystarter/container";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProjectImage } from "@/components/project-image";

const CONTACT_EMAIL = "shauryasingh0302@icloud.com";

function getTerminalResponse(rawCommand: string) {
  const cmd = rawCommand.trim().toLowerCase();
  if (!cmd) return null;
  if (cmd.includes("email") || cmd.includes("contact")) {
    return `→ ${CONTACT_EMAIL}`;
  }
  if (cmd === "help") {
    return "available: contact, help";
  }
  return `command not found: "${cmd}" — try 'contact'`;
}

export default function Home() {
  const [terminalValue, setTerminalValue] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<{ command: string; response: string }[]>([]);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const handleTerminalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const response = getTerminalResponse(terminalValue);
    if (response === null) return;
    setTerminalHistory((prev) => [
      ...prev,
      { command: terminalValue.trim(), response },
    ]);
    setTerminalValue("");
  };

  const projects = [
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

  const skills = [
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Postman", "LangChain", "Pinecone (Vector DB)"],
    },
  ];

  const blogPosts = [
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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Navigation / Header */}
      <Container
        component="header"
        wrapperClassName="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
        className="mx-auto max-w-7xl flex items-center justify-between h-16 uppercase"
      >
        <div className="text-xl font-bold font-mono tracking-tighter">
          Shaurya<span className="text-primary">_</span>Singh
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground ">
          <Link
            href="#projects"
            className="hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <Link href="#skills" className="hover:text-primary transition-colors">
            Skills
          </Link>
          <Link href="#blog" className="hover:text-primary transition-colors">
            Logs
          </Link>
          <Link
            href="#contact"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>
        <Button
          variant="outline"
          className="font-mono text-xs border-primary/50 hover:bg-primary/10 hover:text-primary hover:border-primary"
          asChild
        >
          <a href="/resume/shaurya_resume_04.pdf" download>
            shaurya_resume_04.pdf
          </a>
        </Button>
      </Container>

      {/* Hero Section */}
      <Container
        wrapperClassName="relative min-h-screen flex items-center pt-16 overflow-hidden"
        className="mx-auto max-w-7xl flex-1"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-[100vw] h-[100vh] bg-background overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/hero-bg.jpg')] before:absolute before:inset-0 before:bg-primary before:mix-blend-color-dodge dark:before:mix-blend-color" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              OPEN TO INTERNSHIP & FULL-TIME ROLES
            </div>
            <h1 className="text-6xl md:text-8xl font-display tracking-tighter leading-[0.9]">
              FULL
              <br />
              STACK
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground">
                DEV_
              </span>
            </h1>
            <p className="md:text-xl text-muted-foreground max-w-md leading-relaxed">
              Final year Computer Science Engineering student building
              full-stack and AI-integrated products. National-level hackathon
              winner with a track record of shipping production-ready
              applications.
            </p>
            <p className="font-mono text-xs text-primary/80 tracking-wide">
              NOW: shipping a final-year capstone project
            </p>
            <div className="flex gap-4 pt-4 items-center">
              <Link
                href="#projects"
                className={cn("uppercase", buttonVariants({ size: "lg" }))}
              >
                View projects <ArrowRight className="size-4" />
              </Link>
              <div className="flex gap-2">
                <Link
                  href="https://github.com/shauryasingh0302"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" })
                  )}
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com/in/shauryasingh0302"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" })
                  )}
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:shauryasingh0302@icloud.com"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" })
                  )}
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Abstract Element — terminal window */}
          <div className="hidden md:block relative h-[500px] w-full border border-border/30 bg-card/40 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute top-0 right-0 size-4 border-t-2 border-r-2 border-primary"></div>
            <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-primary"></div>

            {/* Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/40">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-500/70"></span>
                <span className="size-2.5 rounded-full bg-yellow-500/70"></span>
                <span className="size-2.5 rounded-full bg-green-500/70"></span>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                shaurya@dev:~
              </span>
              <span className="w-12"></span>
            </div>

            {/* Terminal body */}
            <style>{`
              @keyframes terminalLineIn {
                from { opacity: 0; transform: translateY(4px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes terminalType {
                from { width: 0; }
                to { width: var(--chars); }
              }
              .term-line {
                opacity: 0;
                animation: terminalLineIn 0.4s ease-out forwards;
              }
                .term-type {
                display: inline-block;
                overflow: hidden;
                white-space: nowrap;
                vertical-align: bottom;
                width: 0;
                animation: terminalType linear forwards;
              }
              @keyframes terminalCursor {
                0%, 49% { opacity: 1; }
                50%, 100% { opacity: 0; }
              }
              .cursor-block {
                animation: terminalCursor 1s step-end infinite;
              }
            `}</style>
            <div className="p-6 h-[calc(100%-49px)] overflow-y-auto font-mono text-[13px] leading-relaxed">
              <div className="term-line mb-4" style={{ animationDelay: "0.1s" }}>
                <span className="text-primary">shaurya@dev</span>
                <span className="text-muted-foreground">:~$</span>{" "}
                <span
                  className="term-type text-foreground"
                  style={{ "--chars": "6ch", animationDuration: "0.4s", animationDelay: "0.2s" } as React.CSSProperties}
                >
                  whoami
                </span>
              </div>
              <div
                className="term-line mb-4 pl-0 text-foreground"
                style={{ animationDelay: "0.9s" }}
              >
                Shaurya Singh —{" "}
                <span className="text-primary">Full-Stack Developer</span>
              </div>

              <div className="term-line mb-4" style={{ animationDelay: "1.3s" }}>
                <span className="text-primary">shaurya@dev</span>
                <span className="text-muted-foreground">:~$</span>{" "}
                <span
                  className="term-type text-foreground"
                  style={{ "--chars": "12ch", animationDuration: "0.6s", animationDelay: "1.4s" } as React.CSSProperties}
                >
                  cat now.json
                </span>
              </div>
              <div
                className="term-line mb-4 pl-4 text-muted-foreground"
                style={{ animationDelay: "2.2s" }}
              >
                <div>{"{"}</div>
                <div>
                  {"  "}{"\u0022building\u0022"}:{" "}
                  <span className="text-primary">
                    {"\u0022AI-integrated full-stack apps\u0022"}
                  </span>
                  ,
                </div>
                <div>
                  {"  "}{"\u0022exploring\u0022"}: [
                  <span className="text-primary">
                    {"\u0022Vector DBs\u0022"}, {"\u0022Applied AI Applications\u0022"}
                  </span>
                  ]
                </div>
                <div>{"}"}</div>
              </div>

              <div className="term-line mb-4" style={{ animationDelay: "2.7s" }}>
                <span className="text-primary">shaurya@dev</span>
                <span className="text-muted-foreground">:~$</span>{" "}
                <span
                  className="term-type text-foreground"
                  style={{ "--chars": "12ch", animationDuration: "0.6s", animationDelay: "2.8s" } as React.CSSProperties}
                >
                  ls projects/
                </span>
              </div>
              <div
                className="term-line mb-4 pl-0 text-primary"
                style={{ animationDelay: "3.5s" }}
              >
                navjivan/&nbsp;&nbsp;chatpdf/&nbsp;&nbsp;cypress/&nbsp;&nbsp;execos/
              </div>

              <div
                className="term-line"
                style={{ animationDelay: "3.9s" }}
                onClick={() => terminalInputRef.current?.focus()}
              >
                {terminalHistory.map((entry, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex items-center gap-0">
                      <span className="text-primary">shaurya@dev</span>
                      <span className="text-muted-foreground">:~$</span>{" "}&nbsp;
                      <span className="text-foreground">{entry.command}</span>
                    </div>
                    <div className="text-primary">{entry.response}</div>
                  </div>
                ))}
                <div className="flex items-center gap-0">
                  <span className="text-primary shrink-0">shaurya@dev</span>
                  <span className="text-muted-foreground shrink-0">:~$</span>{" "}&nbsp;
                  <div className="relative flex-1 min-h-[1em]">
                    <input
                      ref={terminalInputRef}
                      type="text"
                      value={terminalValue}
                      onChange={(e) => setTerminalValue(e.target.value)}
                      onKeyDown={handleTerminalKeyDown}
                      placeholder="try 'contact'"
                      spellCheck="false"
                      autoComplete="off"
                      className="relative z-10 w-full bg-transparent border-none outline-none text-transparent caret-transparent font-mono text-[13px] placeholder:text-muted-foreground/50"
                    />
                    <span className="absolute inset-0 flex items-center font-mono text-[13px] text-foreground pointer-events-none">
                      {terminalValue}
                      <span className="cursor-block">▌</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* Projects Section */}
      <Container
        id="projects"
        component="section"
        wrapperClassName="py-24 border-t border-border"
        className="mx-auto max-w-7xl flex-1"
      >
        <div className="grid justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-6xl font-display tracking-tighter mb-4">
              SELECTED
              <br />
              WORKS
            </h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <p className="text-muted-foreground max-w-sm text-left">
            A collection of full-stack, AI-integrated, and production-ready
            applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-[repeat(3,auto)] gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="pt-0 group bg-card border-border hover:border-primary/50 transition-all duration-300 rounded-none overflow-hidden grid grid-rows-subgrid row-span-3 content-start items-start"
            >
              <ProjectImage src={project.image} alt={project.title} />
              <div className="grid gap-4">
                <CardHeader className="grid gap-4">
                  <CardTitle className="text-2xl font-display group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </div>
              <CardFooter className="flex justify-between pt-0">
                <Link
                  href={project.link}
                  className="text-sm font-display flex items-center hover:text-primary transition-colors gap-2"
                >
                  LIVE DEMO <ExternalLink className="size-3" />
                </Link>
                <Link
                  href={project.repo}
                  className="text-sm font-display flex items-center hover:text-primary transition-colors gap-2"
                >
                  CODE <Github className="size-3" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
      {/* Skills Matrix */}
      <Container
        id="skills"
        component="section"
        wrapperClassName="py-24 bg-secondary/20 border-t border-border"
        className="mx-auto max-w-7xl flex-1"
      >
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-4xl font-display tracking-tighter mb-6">
              TECH_STACK
            </h2>
            <p className="text-muted-foreground mb-8">
              My preferred weapons of choice for building digital products.
              Always learning, always evolving.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
                <Code2 className="h-8 w-8 mb-2 text-primary" />
                <span className="font-mono text-xs">CLEAN_CODE</span>
              </div>
              <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
                <Database className="h-8 w-8 mb-2 text-primary" />
                <span className="font-mono text-xs">SCALABLE_DB</span>
              </div>
              <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
                <Cpu className="h-8 w-8 mb-2 text-primary" />
                <span className="font-mono text-xs">GEN_AI</span>
              </div>
              <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
                <Terminal className="h-8 w-8 mb-2 text-primary" />
                <span className="font-mono text-xs">RAG_PIPELINES</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 grid sm:grid-cols-3 gap-8">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="text-xl font-display border-b border-primary/30 pb-2 inline-block">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      className="flex items-center justify-between group"
                    >
                      <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill}
                      </span>
                      <div className="h-[2px] w-12 bg-secondary group-hover:bg-primary transition-colors"></div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
      {/* Logs Section */}
      <Container
        id="blog"
        className="py-24 border-t border-border max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-display mb-12 uppercase">
          Achievements & Experience
        </h2>

        <div className="grid gap-8">
          {blogPosts.map((post, index) => (
            <Link href="#" key={index} className="group">
              <div className="grid gap-4 md:grid-cols-[1fr_auto] items-baseline justify-between mb-2">
                <h3 className="text-2xl font-display group-hover:text-primary transition-colors text-balance">
                  {post.title}
                </h3>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {post.date}{" // "}{post.readTime}
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-2xl">
                {post.excerpt}
              </p>
              <div className="h-[1px] w-full bg-border group-hover:bg-primary/50 transition-colors"></div>
            </Link>
          ))}
        </div>
      </Container>
      {/* Contact Section */}
      <Container id="contact" className="py-24 bg-card border-t border-border">
        <div className="max-w-2xl justify-self-center">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display mb-4">INITIATE_CONTACT</h2>
            <p className="text-muted-foreground">
              Have a project in mind, an internship opening, or a role to
              discuss? Send a signal.
            </p>
          </div>

          <form className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs font-mono text-muted-foreground"
                >
                  NAME
                </label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-mono text-muted-foreground"
                >
                  EMAIL
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-xs font-mono text-muted-foreground"
              >
                MESSAGE
              </label>
              <Textarea
                id="message"
                placeholder="Enter your message..."
                className="min-h-[150px]"
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              SEND TRANSMISSION
            </Button>
          </form>
        </div>
      </Container>
      {/* Footer */}
      <Container
        component="footer"
        className="py-8 border-t border-border bg-background text-center max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs font-mono text-muted-foreground">
            © 2025 SHAURYA SINGH. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6 text-xs font-mono text-muted-foreground">
            <Link
              href="https://github.com/shauryasingh0302"
              className="hover:text-primary transition-colors"
            >
              GITHUB
            </Link>
            <Link
              href="https://linkedin.com/in/shauryasingh0302"
              className="hover:text-primary transition-colors"
            >
              LINKEDIN
            </Link>
            <Link
              href="mailto:shauryasingh0302@icloud.com"
              className="hover:text-primary transition-colors"
            >
              EMAIL
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}