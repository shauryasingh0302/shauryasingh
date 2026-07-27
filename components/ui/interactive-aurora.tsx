"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function InteractiveAurora({ className }: { className?: string }) {
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
    let time = 0;

    const isDark = resolvedTheme === "dark";
    
    const mouse = { x: -1000, y: -1000, currentX: -1000, currentY: -1000 };

    const init = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      time += 0.005;
      
      mouse.currentX += (mouse.x - mouse.currentX) * 0.05;
      mouse.currentY += (mouse.y - mouse.currentY) * 0.05;

      const gradient1 = ctx.createRadialGradient(
        width * 0.2 + Math.sin(time) * 200, 
        height * 0.3 + Math.cos(time) * 200, 
        0, 
        width * 0.2 + Math.sin(time) * 200, 
        height * 0.3 + Math.cos(time) * 200, 
        width * 0.6
      );
      gradient1.addColorStop(0, isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.1)");
      gradient1.addColorStop(1, "transparent");

      const gradient2 = ctx.createRadialGradient(
        width * 0.8 + Math.cos(time * 0.8) * 250, 
        height * 0.7 + Math.sin(time * 0.8) * 250, 
        0, 
        width * 0.8 + Math.cos(time * 0.8) * 250, 
        height * 0.7 + Math.sin(time * 0.8) * 250, 
        width * 0.7
      );
      gradient2.addColorStop(0, isDark ? "rgba(5, 150, 105, 0.12)" : "rgba(5, 150, 105, 0.08)");
      gradient2.addColorStop(1, "transparent");

      const mouseGradient = ctx.createRadialGradient(
        mouse.currentX, 
        mouse.currentY, 
        0, 
        mouse.currentX, 
        mouse.currentY, 
        width * 0.4
      );
      mouseGradient.addColorStop(0, isDark ? "rgba(52, 211, 153, 0.15)" : "rgba(52, 211, 153, 0.1)");
      mouseGradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);
      
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = mouseGradient;
      ctx.fillRect(0, 0, width, height);
      
      ctx.globalCompositeOperation = "source-over";

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
        "absolute inset-0 z-0 overflow-hidden pointer-events-auto blur-[100px]",
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
