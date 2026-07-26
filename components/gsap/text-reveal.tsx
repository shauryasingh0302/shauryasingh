"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { useGsapReady } from "./gsap-provider";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  /** Animation type */
  variant?: "chars" | "words" | "lines" | "slide-up";
  /** Delay before animation starts */
  delay?: number;
  /** Duration per character/word */
  duration?: number;
  /** Stagger between each element */
  stagger?: number;
  /** Use ScrollTrigger */
  scrollTrigger?: boolean;
  /** HTML tag to render */
  as?: ElementType;
}

export function TextReveal({
  children,
  className = "",
  variant = "chars",
  delay = 0,
  duration = 0.8,
  stagger = 0.02,
  scrollTrigger = true,
  as: Tag = "div",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ready = useGsapReady();

  useEffect(() => {
    if (!ready || !containerRef.current) return;

    let ctx: { revert: () => void } | null = null;

    async function animate() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      if (!container) return;

      ctx = gsap.context(() => {
        if (variant === "slide-up") {
          // Simple slide up reveal with clip-path
          gsap.fromTo(
            container,
            {
              y: 60,
              opacity: 0,
              clipPath: "inset(100% 0% 0% 0%)",
            },
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: duration * 1.2,
              delay,
              ease: "power4.out",
              scrollTrigger: scrollTrigger
                ? { trigger: container, start: "top 85%", once: true }
                : undefined,
            }
          );
          return;
        }

        // Split text into individual elements
        const text = container.textContent || "";
        let elements: string[] = [];

        if (variant === "chars") {
          elements = text.split("");
        } else if (variant === "words") {
          elements = text.split(/(\s+)/);
        } else {
          elements = [text];
        }

        container.innerHTML = "";
        container.style.overflow = "hidden";

        const spans = elements.map((el) => {
          const wrapper = document.createElement("span");
          wrapper.style.display = "inline-block";
          wrapper.style.overflow = "hidden";

          const inner = document.createElement("span");
          inner.style.display = "inline-block";
          inner.textContent = el === " " ? "\u00A0" : el;

          wrapper.appendChild(inner);
          container.appendChild(wrapper);
          return inner;
        });

        gsap.fromTo(
          spans,
          {
            y: "110%",
            opacity: 0,
            rotateX: -80,
          },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            duration,
            stagger,
            delay,
            ease: "power4.out",
            scrollTrigger: scrollTrigger
              ? { trigger: container, start: "top 85%", once: true }
              : undefined,
          }
        );
      }, container);
    }

    animate();

    return () => {
      ctx?.revert();
    };
  }, [ready, variant, delay, duration, stagger, scrollTrigger]);

  const TagComponent = Tag;

  return (
    <TagComponent ref={containerRef} className={className}>
      {children}
    </TagComponent>
  );
}
