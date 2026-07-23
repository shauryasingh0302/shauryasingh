"use client";

import { Search } from "lucide-react";
import type { SearchItem } from "@/lib/portfolio-data";

interface SearchOverlayProps {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  sections: { title: string; items: SearchItem[] }[];
  flatItems: SearchItem[];
}

export function SearchOverlay({
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  activeIndex,
  setActiveIndex,
  sections,
  flatItems,
}: SearchOverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] px-4">
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
      />

      {/* modal */}
      <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.08)" }}>

        {/* ── Input row ── */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <Search className="size-4 shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pages, writing, projects, talks…"
            className="flex-1 bg-transparent border-none outline-none text-white text-[15px] placeholder:text-white/30 font-sans"
          />
          <kbd
            className="inline-flex items-center font-mono cursor-pointer select-none px-2 py-0.5 rounded text-[11px]"
            style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)" }}
            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
          >
            ESC
          </kbd>
        </div>

        {/* ── Results ── */}
        <div className="overflow-y-auto" style={{ maxHeight: "520px" }}>
          {searchQuery.trim() && sections.every((s) => s.items.length === 0) ? (
            <div className="px-5 py-10 text-center text-sm font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
              No results for &ldquo;{searchQuery}&rdquo;
            </div>
          ) : (
            sections.map((section) => (
              <div key={section.title}>
                {/* Section header */}
                <div
                  className="px-5 pt-5 pb-2 text-[10px] font-mono tracking-widest uppercase"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {section.title}
                </div>

                {/* Section items */}
                {section.items.map((item, i) => {
                  const idx = flatItems.indexOf(item);
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
                      className="w-full flex items-center justify-between px-5 py-3 text-left text-[16px] font-sans transition-colors"
                      style={{
                        background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
                      }}
                    >
                      <span>{item.label}</span>
                      {item.href && (
                        <svg
                          width="12" height="12" viewBox="0 0 12 12"
                          fill="none" xmlns="http://www.w3.org/2000/svg"
                          style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0, marginLeft: "8px" }}
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
