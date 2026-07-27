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
    
    const mouse = { x: -1000, y: -1000, currentX: -1000, currentY: -1000, clientX: -1000, clientY: -1000 };

    const init = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      time += 0.005;
      
      const isMobile = window.innerWidth < 768;
      const rect = container.getBoundingClientRect();
      const viewportCenterY = (window.innerHeight / 2) - rect.top;
      const anchorY = isMobile ? viewportCenterY : height / 2;
      
      if (isMobile) {
        mouse.x = width * 0.5;
        mouse.y = anchorY;
      } else if (mouse.clientX === -1000) {
        // Simulate a gentle ambient moving mouse if user hasn't interacted (e.g. on desktop)
        mouse.x = width / 2 + Math.sin(time * 2) * width * 0.4;
        mouse.y = height / 2 + Math.cos(time * 1.5) * height * 0.4;
      }
      
      mouse.currentX += (mouse.x - mouse.currentX) * 0.05;
      mouse.currentY += (mouse.y - mouse.currentY) * 0.05;

      const swingX1 = width * (isMobile ? 0.15 : 0.1);
      const swingY1 = height * (isMobile ? 0.15 : 0.1);
      const swingX2 = width * (isMobile ? 0.2 : 0.12);
      const swingY2 = height * (isMobile ? 0.2 : 0.12);

      // On mobile, anchor to the center of the screen so it's always visible
      const base1X = isMobile ? width * 0.5 : width * 0.3;
      const base1Y = isMobile ? anchorY : height * 0.3;
      const base2X = isMobile ? width * 0.5 : width * 0.7;
      const base2Y = isMobile ? anchorY : height * 0.7;

      const g1X = base1X + Math.sin(time) * swingX1;
      const g1Y = base1Y + Math.cos(time) * swingY1;
      const g1Radius = width * (isMobile ? 0.8 : 0.6);

      const gradient1 = ctx.createRadialGradient(g1X, g1Y, 0, g1X, g1Y, g1Radius);
      gradient1.addColorStop(0, isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.15)");
      gradient1.addColorStop(1, "transparent");

      const g2X = base2X + Math.cos(time * 0.8) * swingX2;
      const g2Y = base2Y + Math.sin(time * 0.8) * swingY2;
      const g2Radius = width * (isMobile ? 0.9 : 0.7);

      const gradient2 = ctx.createRadialGradient(g2X, g2Y, 0, g2X, g2Y, g2Radius);
      gradient2.addColorStop(0, isDark ? "rgba(5, 150, 105, 0.18)" : "rgba(5, 150, 105, 0.12)");
      gradient2.addColorStop(1, "transparent");

      const mouseRadius = width * (isMobile ? 0.6 : 0.4);
      const mouseGradient = ctx.createRadialGradient(
        mouse.currentX, 
        mouse.currentY, 
        0, 
        mouse.currentX, 
        mouse.currentY, 
        mouseRadius
      );
      mouseGradient.addColorStop(0, isDark ? "rgba(52, 211, 153, 0.2)" : "rgba(52, 211, 153, 0.15)");
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

    const updateMousePosition = () => {
      if (mouse.clientX === -1000) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = mouse.clientX - rect.left;
      mouse.y = mouse.clientY - rect.top;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.clientX = e.clientX;
      mouse.clientY = e.clientY;
      updateMousePosition();
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.clientX = e.touches[0].clientX;
        mouse.clientY = e.touches[0].clientY;
        updateMousePosition();
      }
    };

    const handleScroll = () => {
      updateMousePosition();
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.clientX = -1000;
      mouse.clientY = -1000;
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
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("touchend", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchend", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-auto blur-[60px] md:blur-[100px] bg-background",
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
