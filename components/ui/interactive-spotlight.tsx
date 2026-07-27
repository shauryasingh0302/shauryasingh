"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function InteractiveSpotlight({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isHovering = false;

    const updateMousePosition = (ev: MouseEvent) => {
      if (!containerRef.current || !glowRef.current || !gridRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;

      if (isHovering) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(167,243,208,0.1), transparent 40%)`;
        gridRef.current.style.maskImage = `radial-gradient(400px circle at ${x}px ${y}px, black, transparent 100%)`;
        gridRef.current.style.webkitMaskImage = `radial-gradient(400px circle at ${x}px ${y}px, black, transparent 100%)`;
      }
    };

    const handleMouseEnter = () => {
      isHovering = true;
      if (glowRef.current && gridRef.current) {
        glowRef.current.style.opacity = "1";
        gridRef.current.style.opacity = "1";
      }
    };
    
    const handleMouseLeave = () => {
      isHovering = false;
      if (glowRef.current && gridRef.current) {
        glowRef.current.style.opacity = "0";
        gridRef.current.style.opacity = "0";
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", updateMousePosition, { passive: true });
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", updateMousePosition);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-auto",
        className
      )}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 pointer-events-none"
      />
      <div
        ref={gridRef}
        className="absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(5,150,105,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(5,150,105,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
