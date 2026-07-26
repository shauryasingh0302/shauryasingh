"use client";

import { useEffect, useRef } from "react";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    document.addEventListener("mousemove", onMove);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          borderRadius: "50%",
          border: "2px solid hsl(var(--primary))",
          transition: "transform 0.08s linear",
          willChange: "transform",
        }}
      />
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          borderRadius: "50%",
          backgroundColor: "hsl(var(--primary))",
          transition: "transform 0.03s linear",
          willChange: "transform",
        }}
      />
    </>
  );
}
