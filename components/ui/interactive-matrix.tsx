"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function InteractiveMatrix({ className }: { className?: string }) {
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

    const characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];

    let mouse = { x: -1000, y: -1000 };
    const mouseRadius = 100;

    const isDark = resolvedTheme === "dark";
    const textColor = isDark ? "#10b981" : "#059669"; // Emerald 500/600

    const init = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;

      columns = Math.floor(width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100; // Start offscreen randomly
      }
    };

    const draw = () => {
      ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = textColor;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        let dropX = i * fontSize;
        let dropY = drops[i] * fontSize;

        // Mouse deflection logic
        const dx = mouse.x - dropX;
        const dy = mouse.y - dropY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const pushX = (dx / distance) * force * 50;
          dropX -= pushX; // Push away from mouse
        }

        // Draw character
        ctx.fillText(text, dropX, dropY);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
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
    container.addEventListener("mousemove", handleMouseMove);
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
        className="w-full h-full opacity-[0.15] dark:opacity-[0.25]"
      />
    </div>
  );
}
