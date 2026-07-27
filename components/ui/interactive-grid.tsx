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
    // Color of the dots
    const baseColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
    const highlightColor = isDark ? "rgba(167, 243, 208, 0.8)" : "rgba(5, 150, 105, 0.8)";
    
    const spacing = 40; // spacing between dots
    let dots: { x: number; y: number; baseX: number; baseY: number; size: number }[] = [];

    const mouse = { x: -1000, y: -1000 };
    const radius = 150; // radius of influence

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
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.baseX;
        let targetY = dot.baseY;
        let targetSize = 1;
        let color = baseColor;

        if (distance < radius) {
          const force = (radius - distance) / radius;
          // Pull slightly toward mouse
          targetX = dot.baseX + dx * force * 0.2;
          targetY = dot.baseY + dy * force * 0.2;
          // Increase size based on proximity
          targetSize = 1 + force * 2.5;
          
          // Interpolate color opacity for highlight
          const alpha = 0.1 + force * 0.7;
          color = isDark ? `rgba(167, 243, 208, ${alpha})` : `rgba(5, 150, 105, ${alpha})`;
        } else {
          // Slowly return to base size and position
          targetX = dot.baseX;
          targetY = dot.baseY;
          targetSize = 1;
        }

        // Smooth interpolation
        dot.x += (targetX - dot.x) * 0.1;
        dot.y += (targetY - dot.y) * 0.1;
        dot.size += (targetSize - dot.size) * 0.1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
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

    init();
    draw();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
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
