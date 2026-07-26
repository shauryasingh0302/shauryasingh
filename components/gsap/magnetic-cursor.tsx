"use client";

import { useEffect, useRef } from "react";
import { useGsapReady } from "./gsap-provider";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const ready = useGsapReady();
  const gsapRef = useRef<typeof import("gsap").default | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const onMove = (e: MouseEvent) => {
      if (gsapRef.current) {
        gsapRef.current.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out",
        });
        gsapRef.current.to(dot, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      } else {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      cursor.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const onEnterInteractive = () => {
      if (gsapRef.current) {
        gsapRef.current.to(cursor, {
          scale: 2.5,
          borderColor: "hsl(var(--primary))",
          duration: 0.3,
          ease: "power2.out",
        });
        gsapRef.current.to(dot, {
          scale: 0,
          duration: 0.3,
        });
      } else {
        cursor.style.transform += " scale(2.5)";
        dot.style.transform += " scale(0)";
      }
    };

    const onLeaveInteractive = () => {
      if (gsapRef.current) {
        gsapRef.current.to(cursor, {
          scale: 1,
          borderColor: "hsl(var(--muted-foreground) / 0.3)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsapRef.current.to(dot, {
          scale: 1,
          duration: 0.3,
        });
      } else {
        cursor.style.transform = cursor.style.transform.replace(" scale(2.5)", "");
        dot.style.transform = dot.style.transform.replace(" scale(0)", "");
      }
    };

    document.addEventListener("mousemove", onMove);

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, [role='button'], .magnetic-target"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    import("gsap").then((mod) => {
      gsapRef.current = mod.default;
    });
  }, [ready]);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: "50%",
          border: "1.5px solid hsl(var(--muted-foreground) / 0.3)",
          opacity: 0,
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          backgroundColor: "hsl(var(--primary))",
          opacity: 0,
          willChange: "transform",
        }}
      />
    </>
  );
}
