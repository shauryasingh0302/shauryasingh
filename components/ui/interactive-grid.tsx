"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function InteractiveGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const isDark = resolvedTheme === "dark";
    // We will use the primary color's RGB values for all dots to keep it clean.
    // The base dots will just have a very low opacity.
    const rgb = isDark ? "167, 243, 208" : "5, 150, 105";
    
    const spacing = 30; // Denser grid
    let dots: { x: number; y: number; baseX: number; baseY: number; size: number; alpha: number }[] = [];

    const mouse = { x: -1000, y: -1000, currentX: -1000, currentY: -1000 };
    const radius = 250; // Larger, softer radius of influence

    const init = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;

      dots = [];
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: 1, // Base radius
            alpha: 0.05, // Base alpha
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Smooth mouse interpolation
      mouse.currentX += (mouse.x - mouse.currentX) * 0.15;
      mouse.currentY += (mouse.y - mouse.currentY) * 0.15;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        const dx = mouse.currentX - dot.baseX;
        const dy = mouse.currentY - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetSize = 1;
        let targetAlpha = 0.05;

        if (distance < radius && mouse.x !== -1000) {
          // Inverse square for smoother, natural light falloff
          const force = Math.pow((radius - distance) / radius, 1.5);
          targetSize = 1 + force * 2.5;
          targetAlpha = 0.05 + force * 0.8;
        }

        // Smooth interpolation for BOTH size and alpha (creates trailing effect)
        dot.size += (targetSize - dot.size) * 0.15;
        dot.alpha += (targetAlpha - dot.alpha) * 0.15;

        ctx.beginPath();
        ctx.arc(dot.baseX, dot.baseY, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${dot.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      init();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animationFrameId) draw();
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = 0;
          }
        }
      },
      { threshold: 0 }
    );

    init();
    observer.observe(container);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-auto",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
