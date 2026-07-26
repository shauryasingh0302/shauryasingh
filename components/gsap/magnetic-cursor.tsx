"use client";

import { useEffect, useRef } from "react";
import { useGsapReady } from "./gsap-provider";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const ready = useGsapReady();

  useEffect(() => {
    if (!ready) return;

    // Only show on non-touch devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let gsapInstance: typeof import("gsap").default;

    async function setup() {
      gsapInstance = (await import("gsap")).default;

      cursor!.style.opacity = "1";
      dot!.style.opacity = "1";

      const onMove = (e: MouseEvent) => {
        gsapInstance.to(cursor!, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out",
        });
        gsapInstance.to(dot!, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      };

      const onEnterInteractive = () => {
        gsapInstance.to(cursor!, {
          scale: 2.5,
          borderColor: "hsl(var(--primary))",
          duration: 0.3,
          ease: "power2.out",
        });
        gsapInstance.to(dot!, {
          scale: 0,
          duration: 0.3,
        });
      };

      const onLeaveInteractive = () => {
        gsapInstance.to(cursor!, {
          scale: 1,
          borderColor: "hsl(var(--muted-foreground) / 0.3)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsapInstance.to(dot!, {
          scale: 1,
          duration: 0.3,
        });
      };

      document.addEventListener("mousemove", onMove);

      // Attach hover listeners to interactive elements
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
    }

    const cleanupPromise = setup();

    return () => {
      cleanupPromise.then((cleanup) => cleanup?.());
    };
  }, [ready]);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
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
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
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
