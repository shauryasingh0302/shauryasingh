"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const bootLogs = [
  "shauryaOS v1.0.0 initializing...",
  "[OK] Booting kernel... 0.0.0.0",
  "[OK] Mounting root file system...",
  "[OK] Starting hardware abstraction layer",
  "Checking memory... 32768MB OK",
  "Initializing CPU cores... 16 cores detected",
  "[OK] CPU scheduler running",
  "[OK] Loading network drivers...",
  "TCP/IP stack loaded",
  "[OK] Establishing uplink connection...",
  "Fetching neural pathways... 24% complete",
  "Fetching neural pathways... 67% complete",
  "Fetching neural pathways... 100% complete",
  "[OK] Initializing graphics subsystem...",
  "Compiling shaders... [1/15]",
  "Compiling shaders... [7/15]",
  "Compiling shaders... [15/15]",
  "[OK] Display driver loaded",
  "[OK] Connecting to main server node...",
  "Authenticating user SHAURYA...",
  "Access Granted: Admin Privileges Enabled",
  "[OK] Loading portfolio modules...",
  "Module [Hero] loaded",
  "Module [Projects] loaded",
  "Module [Skills] loaded",
  "Module [Logs] loaded",
  "[OK] Verifying system integrity...",
  "System integrity verified. 0 errors found.",
  "[OK] Boot sequence complete.",
  "Preparing visual interface...",
  "Welcome to Shaurya's Portfolio."
];

export function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  
  useEffect(() => {
    // Disable scrolling while booting
    document.body.style.overflow = "hidden";
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootLogs.length) {
        setLines(prev => [...prev, bootLogs[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          // Restore scrolling
          document.body.style.overflow = "";
          setTimeout(onComplete, 700); // Wait for fade out animation
        }, 500); // Small pause before sliding away
      }
    }, 150); // Adjusted typing speed for a 5 second total boot
    
    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div className={cn(
      "fixed inset-0 z-[9999] bg-background flex flex-col justify-end p-6 font-mono text-sm sm:text-base text-primary/90 transition-all duration-700 ease-in-out",
      isDone ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
    )}>
      <div className="max-w-3xl w-full mx-auto flex flex-col gap-1.5 pb-20 sm:pb-32">
        {lines.map((line, i) => (
          <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {line}
          </div>
        ))}
        {!isDone && (
          <div className="animate-pulse mt-1 w-3 h-5 bg-primary" />
        )}
      </div>
    </div>
  );
}
