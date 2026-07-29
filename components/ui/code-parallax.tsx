"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const snippets = [
  {
    code: `function optimize(ast) {\n  return traverse(ast, {\n    enter(node) {\n      if (isDeadCode(node)) {\n        remove(node);\n      }\n    }\n  });\n}`,
    top: "10%",
    left: "5%",
    depth: 0.8,
  },
  {
    code: `const fetcher = async (url) => {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error();\n  return res.json();\n};`,
    top: "60%",
    left: "10%",
    depth: 1.5,
  },
  {
    code: `export function middleware(req) {\n  const token = req.cookies.get('auth');\n  if (!token) return redirect('/login');\n  return NextResponse.next();\n}`,
    top: "20%",
    left: "70%",
    depth: 1.2,
  },
  {
    code: `interface Database {\n  users: Table<User>;\n  posts: Table<Post>;\n  metrics: Table<Metric>;\n}`,
    top: "70%",
    left: "65%",
    depth: 0.5,
  },
  {
    code: `const sum = arr.reduce(\n  (acc, curr) => acc + curr, \n  0\n);`,
    top: "40%",
    left: "40%",
    depth: 2.0,
  }
];

export function CodeParallax({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const snippetsRef = useRef<(HTMLPreElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let requestRef: number;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse position from -1 to 1
      target.x = (e.clientX / innerWidth) * 2 - 1;
      target.y = (e.clientY / innerHeight) * 2 - 1;
    };

    const animate = () => {
      // Smooth interpolation (easing)
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      snippetsRef.current.forEach((snippet, index) => {
        if (!snippet) return;
        const depth = snippets[index].depth;
        const moveX = current.x * depth * 30; // Max movement in pixels
        const moveY = current.y * depth * 30;
        
        snippet.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      requestRef = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    requestRef = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent z-10" />
      {snippets.map((snippet, i) => (
        <pre
          key={i}
          ref={(el) => {
            snippetsRef.current[i] = el;
          }}
          className="absolute text-[0.625rem] md:text-xs font-mono leading-relaxed text-primary/60 dark:text-primary/50 whitespace-pre z-0 transition-opacity duration-1000"
          style={{
            top: snippet.top,
            left: snippet.left,
            willChange: "transform",
          }}
        >
          {snippet.code}
        </pre>
      ))}
    </div>
  );
}
