"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children,
  className,
  strength = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: any;
    
    async function loadGsap() {
      gsap = (await import("gsap")).default;
    }
    loadGsap();

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !gsap) return;
      
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      
      // Calculate distance from center
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      if (!ref.current || !gsap) return;
      gsap.to(ref.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("inline-flex", className)}>
      {children}
    </div>
  );
}
