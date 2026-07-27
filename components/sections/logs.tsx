"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/zippystarter/container";
import { blogPosts } from "@/lib/portfolio-data";
import Link from "next/link";
import { useGsapReady } from "@/components/gsap/gsap-provider";
import { InteractiveAurora } from "@/components/ui/interactive-aurora";

export function Logs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gsapReady = useGsapReady();

  useEffect(() => {
    if (!gsapReady || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    async function animate() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = sectionRef.current;
      if (!el) return;

      ctx = gsap.context(() => {
        // Title slides up with clip-path
        gsap.fromTo(
          ".logs-title",
          { y: 50, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".logs-title",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        // Log entries slide in from left individually
        const logEntries = gsap.utils.toArray(".log-entry");
        logEntries.forEach((entry: any) => {
          gsap.fromTo(
            entry,
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

        // Separator lines grow from left individually
        const logSeparators = gsap.utils.toArray(".log-separator");
        logSeparators.forEach((sep: any) => {
          gsap.fromTo(
            sep,
            { scaleX: 0, transformOrigin: "left" },
            {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sep,
                start: "top 85%", // Adjusted slightly from 80% to sync with entry
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      }, el);
    }

    animate();

    return () => {
      ctx?.revert();
    };
  }, [gsapReady]);

  return (
    <section
      id="blog"
      className="py-24 border-t border-border relative overflow-hidden flex flex-col"
    >
      <InteractiveAurora />
      <div className="mx-auto max-w-7xl w-full px-6 flex-1 relative z-10">
        <div ref={sectionRef} className="relative z-10 pointer-events-none [&>*]:pointer-events-auto">
          <h2
            className="logs-title text-4xl font-display mb-12 uppercase"
            style={{ opacity: 0 }}
          >
            Achievements & Experience
          </h2>

          <div className="logs-grid grid gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="log-entry"
                style={{ opacity: 0 }}
              >
                <Link href="#" className="group">
                  <div className="grid gap-4 md:grid-cols-[1fr_auto] items-baseline justify-between mb-2">
                    <h3 className="text-2xl font-display group-hover:text-primary transition-colors text-balance">
                      {post.title}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {post.date}{" // "}{post.readTime}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 max-w-2xl">
                    {post.excerpt}
                  </p>
                  <div className="log-separator h-[1px] w-full bg-border group-hover:bg-primary/50 transition-colors" style={{ transform: "scaleX(0)" }}></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
