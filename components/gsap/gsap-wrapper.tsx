"use client";

import { type ReactNode } from "react";
import { GsapProvider } from "@/components/gsap/gsap-provider";
import { MagneticCursor } from "@/components/gsap/magnetic-cursor";
import { ScrollProgress } from "@/components/gsap/scroll-progress";

export function GsapWrapper({ children }: { children: ReactNode }) {
  return (
    <GsapProvider>
      <ScrollProgress />
      <MagneticCursor />
      {children}
    </GsapProvider>
  );
}
