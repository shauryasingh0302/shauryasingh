"use client";

import { cn } from "@/lib/utils";

export function Scanlines({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.15] dark:opacity-[0.25]",
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))`,
          backgroundSize: "100% 4px",
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline-anim {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scanline {
          animation: scanline-anim 8s linear infinite;
        }
      `}} />
      <div
        className="absolute inset-0 h-[20%] w-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-scanline"
      />
    </div>
  );
}
