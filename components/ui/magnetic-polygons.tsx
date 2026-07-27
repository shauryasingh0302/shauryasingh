"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function MagneticPolygons({ className }: { className?: string }) {
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
    // Faint subtle primary colors
    const color = isDark ? "rgba(167, 243, 208, 0.08)" : "rgba(5, 150, 105, 0.08)";
    const lineColor = isDark ? "rgba(167, 243, 208, 0.2)" : "rgba(5, 150, 105, 0.2)";

    const mouse = { x: -1000, y: -1000, active: false };

    interface Polygon {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      vRot: number;
      sides: number;
    }

    let polygons: Polygon[] = [];

    const init = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      polygons = [
        // Triangle
        { x: width * 0.2, y: height * 0.3, vx: 0.2, vy: 0.15, size: 80, rotation: 0, vRot: 0.002, sides: 3 },
        // Square
        { x: width * 0.8, y: height * 0.7, vx: -0.15, vy: -0.2, size: 100, rotation: 0, vRot: -0.0015, sides: 4 },
        // Pentagon
        { x: width * 0.5, y: height * 0.8, vx: 0.1, vy: -0.1, size: 120, rotation: 0, vRot: 0.001, sides: 5 },
        // Hexagon
        { x: width * 0.7, y: height * 0.2, vx: -0.1, vy: 0.1, size: 60, rotation: 0, vRot: -0.0025, sides: 6 },
        // Circle (many sides)
        { x: width * 0.1, y: height * 0.8, vx: 0.15, vy: -0.15, size: 90, rotation: 0, vRot: 0.003, sides: 30 }
      ];
    };

    const drawPolygon = (p: Polygon) => {
      ctx.beginPath();
      for (let i = 0; i < p.sides; i++) {
        const angle = p.rotation + (i * 2 * Math.PI) / p.sides;
        const px = p.x + p.size * Math.cos(angle);
        const py = p.y + p.size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < polygons.length; i++) {
        const p = polygons[i];

        // Magnetic effect
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 400) {
            // Pull towards mouse smoothly
            const force = (400 - dist) / 400;
            p.vx += (dx / dist) * force * 0.05;
            p.vy += (dy / dist) * force * 0.05;
          }
        }

        // Apply friction so they don't go too fast
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Base floating velocity if moving too slowly
        if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() > 0.5 ? 0.01 : -0.01);
        if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() > 0.5 ? 0.01 : -0.01);

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Bounce off walls gently
        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = height + p.size;
        if (p.y > height + p.size) p.y = -p.size;

        drawPolygon(p);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    
    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      init();
    };

    init();
    draw();

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
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
