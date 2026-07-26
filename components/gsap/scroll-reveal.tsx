"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useGsapReady } from "./gsap-provider";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Direction to animate from */
  direction?: "up" | "down" | "left" | "right";
  /** Animation distance in px */
  distance?: number;
  /** Duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Stagger children elements with this selector */
  staggerChildren?: string;
  /** Stagger delay between children */
  staggerDelay?: number;
  /** Scale from this value */
  scaleFrom?: number;
  /** Rotation in degrees */
  rotateFrom?: number;
  /** ScrollTrigger start position */
  start?: string;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  distance = 60,
  duration = 0.8,
  delay = 0,
  staggerChildren,
  staggerDelay = 0.1,
  scaleFrom,
  rotateFrom,
  start = "top 85%",
}: ScrollRevealProps) {
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
        const from: gsap.TweenVars = { opacity: 0 };
        const to: gsap.TweenVars = {
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        };

        // Direction
        if (direction === "up") {
          from.y = distance;
          to.y = 0;
        } else if (direction === "down") {
          from.y = -distance;
          to.y = 0;
        } else if (direction === "left") {
          from.x = distance;
          to.x = 0;
        } else if (direction === "right") {
          from.x = -distance;
          to.x = 0;
        }

        // Optional scale
        if (scaleFrom !== undefined) {
          from.scale = scaleFrom;
          to.scale = 1;
        }

        // Optional rotation
        if (rotateFrom !== undefined) {
          from.rotation = rotateFrom;
          to.rotation = 0;
        }

        if (staggerChildren) {
          const targets = el.querySelectorAll(staggerChildren);
          if (targets.length > 0) {
            gsap.fromTo(targets, from, {
              ...to,
              stagger: staggerDelay,
            });
            return;
          }
        }

        gsap.fromTo(el, from, to);
      }, el);
    }

    animate();

    return () => {
      ctx?.revert();
    };
  }, [ready, direction, distance, duration, delay, staggerChildren, staggerDelay, scaleFrom, rotateFrom, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
