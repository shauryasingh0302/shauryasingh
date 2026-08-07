"use client";

import { useState } from "react";
import useSWR from "swr";
import { Search, Sun, Moon, Menu, X, Eye } from "lucide-react";
import { useTheme } from "next-themes";
import { Container } from "@/components/zippystarter/container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

interface HeaderProps {
  setSearchOpen: (open: boolean) => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Header({ setSearchOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: analytics } = useSWR("/api/views", fetcher, { revalidateOnFocus: false });

  const scrollTo = (target: string) => {
    if (typeof window !== 'undefined') {
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(target === "top" ? 0 : target);
        setIsMobileMenuOpen(false);
        return;
      }
    }
    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(target.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <Container
      component="header"
      wrapperClassName="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
      className="mx-auto max-w-7xl flex items-center justify-between h-16 uppercase"
    >
      <div
        className="text-xl font-bold font-mono tracking-tighter cursor-pointer"
        onClick={() => scrollTo("top")}
      >
        Shaurya<span className="text-primary">_</span>Singh
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground ">
        <MagneticButton strength={0.2}>
          <button
            onClick={() => scrollTo("#projects")}
            className="hover:text-primary transition-colors block py-2"
          >
            Projects
          </button>
        </MagneticButton>
        <MagneticButton strength={0.2}>
          <button
            onClick={() => scrollTo("#skills")}
            className="hover:text-primary transition-colors block py-2"
          >
            Skills
          </button>
        </MagneticButton>
        <MagneticButton strength={0.2}>
          <button
            onClick={() => scrollTo("#logs")}
            className="hover:text-primary transition-colors block py-2"
          >
            Logs
          </button>
        </MagneticButton>
        <MagneticButton strength={0.2}>
          <button
            onClick={() => scrollTo("#contact")}
            className="hover:text-primary transition-colors block py-2"
          >
            Contact
          </button>
        </MagneticButton>
      </nav>
      <div className="flex items-center gap-1 md:gap-3">
        <MagneticButton strength={0.2}>
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70 hover:border-border/80 transition-all text-sm"
            aria-label="Search"
          >
            <Search className="size-3.5" />
            <span className="font-sans">Search</span>
            <kbd className="inline-flex items-center gap-0.5 text-[0.625rem] font-mono border border-border/70 rounded px-1 py-0.5 bg-background/50">
              <span>⌘</span>K
            </kbd>
          </button>
        </MagneticButton>
        <MagneticButton strength={0.2}>
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden size-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>
        </MagneticButton>

        {/* Minimalistic Views Counter */}
        {analytics && !analytics.error && (
          <MagneticButton strength={0.2}>
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-border bg-muted/20 text-muted-foreground transition-all text-xs font-mono"
              title="Total Portfolio Views"
            >
              <Eye className="size-3.5" />
              <span>{analytics.views.toLocaleString()}</span>
            </div>
          </MagneticButton>
        )}

        <MagneticButton strength={0.2}>
          <AnimatedThemeToggler
            theme={theme as "light" | "dark"}
            onThemeChange={setTheme}
            className="relative flex items-center justify-center size-9 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="size-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </AnimatedThemeToggler>
        </MagneticButton>
        <MagneticButton strength={0.2}>
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-lg font-mono text-xs tracking-wider uppercase text-foreground dark:text-white transition-colors bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/15 hover:bg-foreground/10 dark:hover:bg-white/10"
          >
            <span className="hidden sm:inline">SHAURYA_RESUME_05.PDF</span>
            <span className="sm:hidden">RESUME</span>
          </a>
        </MagneticButton>
        <MagneticButton strength={0.2}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative flex items-center justify-center size-9 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </MagneticButton>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border md:hidden flex flex-col p-4 shadow-lg">
          <nav className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
            <button
              onClick={() => scrollTo("#projects")}
              className="hover:text-primary transition-colors text-left py-2 border-b border-border/50"
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo("#skills")}
              className="hover:text-primary transition-colors text-left py-2 border-b border-border/50"
            >
              Skills
            </button>
            <button
              onClick={() => scrollTo("#logs")}
              className="hover:text-primary transition-colors text-left py-2 border-b border-border/50"
            >
              Logs
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="hover:text-primary transition-colors text-left py-2"
            >
              Contact
            </button>
          </nav>
        </div>
      )}
    </Container>
  );
}
