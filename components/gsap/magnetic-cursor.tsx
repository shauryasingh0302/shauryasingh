"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply on non-touch devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Use GSAP quickTo for highly performant, smooth follow
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });
    
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });

    // Show cursors smoothly on load
    gsap.set([cursor, dot], { opacity: 1 });

    const onMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const onEnterInteractive = () => {
      gsap.to(cursor, {
        scale: 2.2,
        backgroundColor: "var(--primary)",
        opacity: 0.15,
        borderColor: "transparent",
        duration: 0.3,
        ease: "back.out(1.5)",
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.2,
      });
    };

    const onLeaveInteractive = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        opacity: 1,
        borderColor: "var(--primary)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
      });
    };

    document.addEventListener("mousemove", onMove);

    // Event delegation for hover states to avoid manual attachment
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, [role='button'], .magnetic")) {
        onEnterInteractive();
      }
    };
    
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, [role='button'], .magnetic")) {
        onLeaveInteractive();
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
        style={{
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          borderRadius: "50%",
          border: "1.5px solid var(--primary)",
          willChange: "transform",
        }}
      />
      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          backgroundColor: "var(--primary)",
          willChange: "transform",
        }}
      />
    </>
  );
}
