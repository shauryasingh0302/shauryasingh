"use client";

import { Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Container } from "@/components/zippystarter/container";

interface HeaderProps {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export function Header({ searchOpen, setSearchOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Container
      component="header"
      wrapperClassName="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
      className="mx-auto max-w-7xl flex items-center justify-between h-16 uppercase"
    >
      <div className="text-xl font-bold font-mono tracking-tighter">
        Shaurya<span className="text-primary">_</span>Singh
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground ">
        <button
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          className="hover:text-primary transition-colors"
        >
          Projects
        </button>
        <button
          onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
          className="hover:text-primary transition-colors"
        >
          Skills
        </button>
        <button
          onClick={() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" })}
          className="hover:text-primary transition-colors"
        >
          Logs
        </button>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="hover:text-primary transition-colors"
        >
          Contact
        </button>
      </nav>
      <div className="flex items-center gap-1 md:gap-3">
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70 hover:border-border/80 transition-all text-sm"
          aria-label="Search"
        >
          <Search className="size-3.5" />
          <span className="font-sans">Search</span>
          <kbd className="inline-flex items-center gap-0.5 text-[10px] font-mono border border-border/70 rounded px-1 py-0.5 bg-background/50">
            <span>⌘</span>K
          </kbd>
        </button>
        <button
          onClick={() => setSearchOpen(true)}
          className="md:hidden size-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
          aria-label="Search"
        >
          <Search className="size-4" />
        </button>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative flex items-center justify-center size-9 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle theme"
        >
          <Sun className="size-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
        <a
          href="/resume/shaurya_resume_04.pdf"
          download
          className="inline-flex items-center px-4 py-1.5 rounded-lg font-mono text-xs tracking-wider uppercase text-foreground dark:text-white transition-colors bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/15 hover:bg-foreground/10 dark:hover:bg-white/10"
        >
          shaurya_resume_04.pdf
        </a>
      </div>
    </Container>
  );
}
