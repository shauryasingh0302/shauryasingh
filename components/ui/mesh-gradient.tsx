"use client";

import { cn } from "@/lib/utils";

export function MeshGradient({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.4] dark:opacity-[0.2]",
        className
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mesh-blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10vw, -10vh) scale(1.1); }
          66% { transform: translate(-10vw, 10vh) scale(0.9); }
        }
        @keyframes mesh-blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-15vw, 15vh) scale(1.2); }
          66% { transform: translate(15vw, -15vh) scale(0.8); }
        }
        .animate-mesh-1 { animation: mesh-blob-1 12s infinite cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-mesh-2 { animation: mesh-blob-2 15s infinite cubic-bezier(0.4, 0, 0.2, 1); }
      `}} />
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] rounded-full bg-primary/40 blur-[100px] mix-blend-screen animate-mesh-1" />
      <div className="absolute bottom-0 right-1/4 w-[60vw] h-[60vh] rounded-full bg-blue-500/30 blur-[120px] mix-blend-screen animate-mesh-2" />
    </div>
  );
}
