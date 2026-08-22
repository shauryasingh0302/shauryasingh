"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AnimatedGrid({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = -1000;
    let mouseY = -1000;

    const updateMousePosition = () => {
      if (mouseX === -1000) return;
      const rect = container.getBoundingClientRect();
      const x = mouseX - rect.left;
      const y = mouseY - rect.top;
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    // Coalesce to one layout read + style write per frame. Firing these on
    // every event thrashed layout, and the mask only repaints per frame anyway.
    let rafId = 0;
    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        updateMousePosition();
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      scheduleUpdate();
    };

    const handleScroll = () => {
      scheduleUpdate();
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      // When mouse leaves, we can set the mask to center or just hide it
      // Hiding it by pushing it far away:
      container.style.setProperty("--mouse-x", `-1000px`);
      container.style.setProperty("--mouse-y", `-1000px`);
    };

    // Set initial off-screen
    container.style.setProperty("--mouse-x", `-1000px`);
    container.style.setProperty("--mouse-y", `-1000px`);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 pointer-events-none overflow-hidden",
        className
      )}
    >
      {/* The original moving grid */}
      <div
        className="absolute inset-[-100%] w-[300%] h-[300%] opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 10%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 10%, transparent 60%)",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes grid-move {
            0% { transform: translateY(0); }
            100% { transform: translateY(-60px); }
          }
          .animate-grid-move {
            animation: grid-move 3s linear infinite;
          }
        `}} />
        <div className="absolute inset-0 animate-grid-move bg-[inherit] [background-size:inherit]" />
      </div>

      {/* The new mouse hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          opacity: 1, // Will only be visible when mouse is in range due to radial gradient transparent fade
          background: "radial-gradient(circle 350px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(16, 185, 129, 0.15), transparent 100%)",
        }}
      />
    </div>
  );
}
