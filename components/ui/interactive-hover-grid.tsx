"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function InteractiveHoverGrid({ className }: { className?: string }) {
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
    const lineColor = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
    const highlightColorRGB = isDark ? "167, 243, 208" : "5, 150, 105"; // emerald-200 / emerald-600
    
    const cellSize = 40; // Size of each grid cell

    interface Cell {
      col: number;
      row: number;
      intensity: number;
    }

    let cells: Cell[][] = [];
    let cols = 0;
    let rows = 0;

    const mouse = { x: -1000, y: -1000 };
    let lastHoveredCol = -1;
    let lastHoveredRow = -1;

    const init = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;

      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);

      cells = [];
      for (let i = 0; i < cols; i++) {
        cells[i] = [];
        for (let j = 0; j < rows; j++) {
          cells[i][j] = {
            col: i,
            row: j,
            intensity: 0
          };
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Faint background grid lines removed to ensure it is purely interactive and not visually repetitive

      // Determine currently hovered cell
      let currentHoveredCol = -1;
      let currentHoveredRow = -1;
      
      if (mouse.x !== -1000 && mouse.y !== -1000) {
        currentHoveredCol = Math.floor(mouse.x / cellSize);
        currentHoveredRow = Math.floor(mouse.y / cellSize);
      }

      // Update and draw illuminated cells
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cell = cells[i][j];

          // Boost intensity if hovered
          // Highlight adjacent cells slightly for a softer brush effect
          const distCol = Math.abs(currentHoveredCol - i);
          const distRow = Math.abs(currentHoveredRow - j);
          
          if (distCol === 0 && distRow === 0) {
            cell.intensity = 1.0;
          } else if (distCol <= 1 && distRow <= 1) {
            // adjacent cells get a smaller boost if not already brighter
            cell.intensity = Math.max(cell.intensity, 0.4);
          } else if (distCol <= 2 && distRow <= 2) {
            cell.intensity = Math.max(cell.intensity, 0.15);
          }

          // Fade out over time
          cell.intensity = Math.max(0, cell.intensity - 0.02); // Controls fade speed

          if (cell.intensity > 0) {
            ctx.fillStyle = `rgba(${highlightColorRGB}, ${cell.intensity * 0.4})`; // 0.4 max opacity
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
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
        style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "-webkit-linear-gradient(top, black 40%, transparent 100%)" }}
      />
    </div>
  );
}
