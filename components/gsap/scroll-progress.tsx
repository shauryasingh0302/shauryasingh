"use client";

import { useEffect, useRef } from "react";
import { useGsapReady } from "./gsap-provider";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const ready = useGsapReady();

  useEffect(() => {
    if (!ready || !barRef.current) return;

    let ctx: { revert: () => void } | null = null;

    async function animate() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const bar = barRef.current;
      if (!bar) return;

      ctx = gsap.context(() => {
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });
      });
    }

    animate();

    return () => {
      ctx?.revert();
    };
  }, [ready]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-primary via-primary/80 to-primary"
        style={{
          transform: "scaleX(0)",
          willChange: "transform",
          boxShadow: "0 0 10px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.2)",
        }}
      />
    </div>
  );
}
