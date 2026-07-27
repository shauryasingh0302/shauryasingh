"use client";

import { cn } from "@/lib/utils";

export function AnimatedGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 pointer-events-none overflow-hidden",
        className
      )}
    >
      <div
        className="absolute inset-[-100%] w-[300%] h-[300%] opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 10%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 10%, transparent 60%)",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes grid-move {
            0% { transform: translateY(0); }
            100% { transform: translateY(-60px); }
          }
          .animate-grid-move {
            animation: grid-move 3s linear infinite;
          }
        `}} />
        <div className="absolute inset-0 animate-grid-move bg-[inherit] [background-size:inherit]" />
      </div>
    </div>
  );
}
