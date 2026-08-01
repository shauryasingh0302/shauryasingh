"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Logs } from "@/components/sections/logs";
import { Dashboard } from "@/components/sections/dashboard";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { SearchOverlay } from "@/components/search-overlay";
import {
  allSearchItems,
  defaultSections,
  type SearchItem,
} from "@/lib/portfolio-data";

export default function Home() {
  const [searchOpen, setSearchOpenRaw] = useState(false);
  const [searchQuery, setSearchQueryRaw] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const setSearchOpen = (open: React.SetStateAction<boolean>) => {
    setSearchOpenRaw(open);
    setActiveIndex(0);
  };

  const setSearchQuery = (q: React.SetStateAction<string>) => {
    setSearchQueryRaw(q);
    setActiveIndex(0);
  };

  const filteredItems: SearchItem[] = searchQuery.trim()
    ? allSearchItems.filter((item) => {
        const q = searchQuery.toLowerCase();
        if (item.label.toLowerCase().includes(q)) return true;
        if (item.category.toLowerCase().includes(q)) return true;
        if (item.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
        return false;
      })
    : [];

  const filteredSections: { title: string; items: SearchItem[] }[] = [];
  filteredItems.forEach((item) => {
    const existing = filteredSections.find((s) => s.title === item.category.toUpperCase());
    if (existing) existing.items.push(item);
    else filteredSections.push({ title: item.category.toUpperCase(), items: [item] });
  });

  const activeSections = searchQuery.trim() ? filteredSections : defaultSections;
  const flatItems: SearchItem[] = activeSections.flatMap((s) => s.items);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => { 
      document.body.style.overflow = "unset"; 
      document.documentElement.style.overflow = "unset";
    };
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        setSearchQuery("");
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
      if (!searchOpen) return;
      const len = flatItems.length;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % len);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + len) % len);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const item = flatItems[activeIndex];
        if (!item) return;
        setSearchOpen(false);
        setSearchQuery("");
        if (item.href) {
          window.open(item.href, "_blank", "noopener");
        } else if (item.sectionId) {
          document.getElementById(item.sectionId)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchOpen, activeIndex, flatItems]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Header setSearchOpen={setSearchOpen} />
      <Hero />
      <Projects />
      <Skills />
      <Logs />
      <Dashboard />
      <Contact />
      <Footer />
      {searchOpen && (
        <SearchOverlay
          setSearchOpen={setSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          sections={activeSections}
          flatItems={flatItems}
        />
      )}
    </div>
  );
}
