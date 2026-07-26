"use client";

import { useState, useRef, useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Container } from "@/components/zippystarter/container";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL } from "@/lib/portfolio-data";
import { useGsapReady } from "@/components/gsap/gsap-provider";

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

export function Hero() {
  const [terminalValue, setTerminalValue] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<{ command: string; response: string }[]>([]);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [terminalReady, setTerminalReady] = useState(false);
  const gsapReady = useGsapReady();

  // GSAP entrance animation for hero content
  useEffect(() => {
    if (!gsapReady || !heroContentRef.current) return;

    let ctx: { revert: () => void } | null = null;

    async function runAnimation() {
      const gsap = (await import("gsap")).default;
      const el = heroContentRef.current;
      if (!el) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Badge slides in from left
        tl.fromTo(
          ".hero-badge",
          { x: -40, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8 },
          0.2
        );

        // Heading lines stagger in with clip-path reveal
        tl.fromTo(
          ".hero-heading-line",
          { y: 80, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            stagger: 0.15,
          },
          0.3
        );

        // Description paragraph fades up
        tl.fromTo(
          ".hero-desc",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.9
        );

        // NOW line slides in
        tl.fromTo(
          ".hero-now",
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
          1.1
        );

        // CTA buttons scale up
        tl.fromTo(
          ".hero-cta",
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6 },
          1.2
        );

        // Terminal window slides in from right
        tl.fromTo(
          ".hero-terminal",
          { x: 60, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          0.5
        );
      }, el);
    }

    runAnimation();

    return () => {
      ctx?.revert();
    };
  }, [gsapReady]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setTerminalReady(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!heroVisible || !terminalReady) return;
    terminalInputRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      terminalInputRef.current?.focus();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [heroVisible, terminalReady]);

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

  return (
    <div ref={heroRef}>
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

      <div ref={heroContentRef} className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono" style={{ opacity: 0 }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            OPEN TO INTERNSHIP & FULL-TIME ROLES
          </div>
          <h1 className="text-6xl md:text-8xl font-display tracking-tighter leading-[0.9]">
            <span className="hero-heading-line inline-block" style={{ opacity: 0 }}>FULL</span>
            <br />
            <span className="hero-heading-line inline-block" style={{ opacity: 0 }}>STACK</span>
            <br />
            <span className="hero-heading-line inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground" style={{ opacity: 0 }}>
              DEV_
            </span>
          </h1>
          <p className="hero-desc md:text-xl text-muted-foreground max-w-md leading-relaxed" style={{ opacity: 0 }}>
            Final year Computer Science Engineering student building
            full-stack and AI-integrated products. National-level hackathon
            winner with a track record of shipping production-ready
            applications.
          </p>
          <p className="hero-now font-mono text-xs text-primary/80 tracking-wide" style={{ opacity: 0 }}>
            NOW: shipping a final-year capstone project
          </p>
          <div className="hero-cta flex gap-4 pt-4 items-center" style={{ opacity: 0 }}>
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
        <div className="hero-terminal hidden md:block relative h-[500px] w-full border border-border/30 bg-card/40 backdrop-blur-sm overflow-hidden" style={{ opacity: 0 }}>
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
    </div>
  );
}
