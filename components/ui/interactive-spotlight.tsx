"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function InteractiveSpotlight({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isHovering = false;

    const updateMousePosition = (ev: MouseEvent) => {
      if (!containerRef.current || !glowRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;

      if (isHovering) {
        // Soft, wide radial spotlight in primary green
        glowRef.current.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.15), transparent 60%)`;
      }
    };

    const handleMouseEnter = () => {
      isHovering = true;
      if (glowRef.current) {
        glowRef.current.style.opacity = "1";
      }
    };
    
    const handleMouseLeave = () => {
      isHovering = false;
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
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
    </div>
  );
}
