"use client";

import { Search } from "lucide-react";
import type { SearchItem } from "@/lib/portfolio-data";

interface SearchOverlayProps {
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  sections: { title: string; items: SearchItem[] }[];
  flatItems: SearchItem[];
}

export function SearchOverlay({
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  activeIndex,
  setActiveIndex,
  sections,
  flatItems,
}: SearchOverlayProps) {
  const safeSections = sections ?? [];
  const safeFlatItems = flatItems ?? [];
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] px-4">
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
      />

      {/* modal */}
      <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">

        {/* ── Input row ── */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pages, writing, projects, talks…"
            className="flex-1 bg-transparent border-none outline-none text-foreground text-[0.9375rem] placeholder:text-muted-foreground font-sans"
          />
          <kbd
            className="inline-flex items-center font-mono cursor-pointer select-none px-2 py-0.5 rounded text-[0.6875rem] text-muted-foreground border border-border bg-muted/50 hover:bg-muted"
            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
          >
            ESC
          </kbd>
        </div>

        {/* ── Results ── */}
        <div className="overflow-y-auto" style={{ maxHeight: "32.5rem" }}>
          {searchQuery.trim() && safeSections.every((s) => s.items.length === 0) ? (
            <div className="px-5 py-10 text-center text-sm font-mono text-muted-foreground">
              No results for &ldquo;{searchQuery}&rdquo;
            </div>
          ) : (
            safeSections.map((section) => (
              <div key={section.title}>
                {/* Section header */}
                <div
                  className="px-5 pt-5 pb-2 text-[0.625rem] font-mono tracking-widest uppercase text-muted-foreground/70"
                >
                  {section.title}
                </div>

                {/* Section items */}
                {(section.items ?? []).map((item) => {
                  const idx = safeFlatItems.indexOf(item);
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.label}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        if (item.href) {
                          window.open(item.href, "_blank", "noopener");
                        } else if (item.sectionId) {
                          document.getElementById(item.sectionId)?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className={`w-full flex items-center justify-between px-5 py-3 text-left text-base font-sans transition-colors ${
                        isActive ? "bg-muted text-foreground" : "bg-transparent text-muted-foreground"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.href && (
                        <svg
                          width="12" height="12" viewBox="0 0 12 12"
                          fill="none" xmlns="http://www.w3.org/2000/svg"
                          className="text-muted-foreground/70 shrink-0 ml-2"
                        >
                          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
          {/* bottom padding */}
          <div className="h-3" />
        </div>
      </div>
    </div>
  );
}
