"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function InteractiveCrosshair({ className }: { className?: string }) {
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
    const baseColor = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
    const highlightColor = isDark ? "rgba(167, 243, 208, 0.5)" : "rgba(5, 150, 105, 0.5)";
    
    const mouse = { x: -1000, y: -1000, currentX: -1000, currentY: -1000 };
    const spacing = 40;

    const init = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.currentX += (mouse.x - mouse.currentX) * 0.15;
      mouse.currentY += (mouse.y - mouse.currentY) * 0.15;

      // Removed static background grid to keep it purely interactive and minimalist

      // Draw active crosshairs if mouse is on screen
      if (mouse.x >= 0 && mouse.x <= width && mouse.y >= 0 && mouse.y <= height) {
        const closestX = Math.round(mouse.currentX / spacing) * spacing;
        const closestY = Math.round(mouse.currentY / spacing) * spacing;

        ctx.beginPath();
        // Vertical line
        ctx.moveTo(closestX, 0);
        ctx.lineTo(closestX, height);
        // Horizontal line
        ctx.moveTo(0, closestY);
        ctx.lineTo(width, closestY);
        
        ctx.strokeStyle = highlightColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw intersection dot
        ctx.beginPath();
        ctx.arc(closestX, closestY, 3, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(167, 243, 208, 1)" : "rgba(5, 150, 105, 1)";
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
