"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useGsapReady } from "@/components/gsap/gsap-provider";

export function GlowingOrb({ className }: { className?: string }) {
  const orbRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gsapReady = useGsapReady();

  useEffect(() => {
    if (!gsapReady || !orbRef.current || !containerRef.current) return;

    let ctx: { revert: () => void } | null = null;

    async function animate() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Subtle parallax movement based on scroll
        gsap.to(orbRef.current, {
          yPercent: 50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Slow pulsing / floating animation
        gsap.to(orbRef.current, {
          scale: 1.2,
          xPercent: 10,
          rotation: 15,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }

    animate();

    return () => {
      ctx?.revert();
    };
  }, [gsapReady]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}
    >
      <div
        ref={orbRef}
        className="absolute top-1/4 left-1/4 w-[60vw] max-w-[600px] aspect-square rounded-full bg-black/5 dark:bg-primary/10 blur-[100px] md:blur-[140px] mix-blend-normal dark:mix-blend-screen"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      
      {/* Secondary colored orb */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-[40vw] max-w-[400px] aspect-square rounded-full bg-black/5 dark:bg-blue-500/5 blur-[80px] md:blur-[120px] mix-blend-normal dark:mix-blend-screen"
        style={{ transform: "translate(50%, 50%)" }}
      />
    </div>
  );
}
