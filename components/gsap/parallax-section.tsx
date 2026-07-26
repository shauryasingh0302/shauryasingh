"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useGsapReady } from "./gsap-provider";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Parallax speed multiplier (negative = opposite direction) */
  speed?: number;
  /** Direction of parallax */
  direction?: "vertical" | "horizontal";
}

export function ParallaxSection({
  children,
  className = "",
  speed = -0.3,
  direction = "vertical",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = useGsapReady();

  useEffect(() => {
    if (!ready || !ref.current) return;

    let ctx: { revert: () => void } | null = null;

    async function animate() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = ref.current;
      if (!el) return;

      ctx = gsap.context(() => {
        const moveAmount = speed * 100;

        gsap.to(el, {
          [direction === "vertical" ? "y" : "x"]: moveAmount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, el);
    }

    animate();

    return () => {
      ctx?.revert();
    };
  }, [ready, speed, direction]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
