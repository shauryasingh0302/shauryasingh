"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function InteractiveSkillBox({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "relative overflow-hidden rounded-md border border-border bg-background p-4 flex flex-col items-center justify-center aspect-square group",
        className
      )}
    >
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
}
