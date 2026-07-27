"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function InteractiveSkillBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-md border border-border bg-background p-4 flex flex-col items-center justify-center aspect-square group",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(167,243,208,0.15), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 dark:mix-blend-overlay"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(5,150,105,0.4), transparent 40%)`,
        }}
      />
      
      {/* Content wrapper to keep it above the glow */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
}
