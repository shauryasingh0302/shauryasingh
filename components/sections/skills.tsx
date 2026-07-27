"use client";

import { useEffect, useRef } from "react";
import { Code2, Database, Cpu, Terminal } from "lucide-react";
import { Container } from "@/components/zippystarter/container";
import { skills } from "@/lib/portfolio-data";
import { useGsapReady } from "@/components/gsap/gsap-provider";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { InteractiveSkillBox } from "@/components/ui/interactive-skill-box";

import { InteractiveFlow } from "@/components/ui/interactive-flow";

export function Skills() {
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
        // Left panel slides in from left
        gsap.fromTo(
          ".skills-left",
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".skills-left",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        // Icon boxes animate individually with rotation
        const iconBoxes = gsap.utils.toArray(".skills-icon-box");
        iconBoxes.forEach((box: any) => {
          gsap.fromTo(
            box,
            { y: 60, rotateX: -90, opacity: 0 },
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
              scrollTrigger: {
                trigger: box,
                start: "top 98%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

        // Skill columns animate individually
        const skillCols = gsap.utils.toArray(".skill-column");
        skillCols.forEach((col: any) => {
          gsap.fromTo(
            col,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: col,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

        // Individual skill items slide in from right individually
        const skillItems = gsap.utils.toArray(".skill-item");
        skillItems.forEach((item: any) => {
          gsap.fromTo(
            item,
            { x: 20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 95%",
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
      id="skills"
      className="py-16 md:py-24 border-t border-border relative overflow-hidden flex flex-col bg-background"
    >
      <InteractiveFlow />
      <div className="mx-auto max-w-7xl w-full px-6 flex-1 relative z-10">
        <div ref={sectionRef} className="grid md:grid-cols-12 gap-12 relative z-10 pointer-events-none [&>*]:pointer-events-auto">
          <div className="skills-left md:col-span-4" style={{ opacity: 0 }}>
          <h2 className="text-4xl font-display tracking-tighter mb-6">
            TECH_STACK
          </h2>
          <p className="text-muted-foreground mb-8">
            My preferred weapons of choice for building digital products.
            Always learning, always evolving.
          </p>
          <div className="skills-icon-grid grid grid-cols-2 gap-4">
            <InteractiveSkillBox className="skills-icon-box hover:border-primary/50 transition-colors" style={{ opacity: 0 }}>
              <Code2 className="h-8 w-8 mb-2 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs">CLEAN_CODE</span>
            </InteractiveSkillBox>
            <InteractiveSkillBox className="skills-icon-box hover:border-primary/50 transition-colors" style={{ opacity: 0 }}>
              <Database className="h-8 w-8 mb-2 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs">SCALABLE_DB</span>
            </InteractiveSkillBox>
            <InteractiveSkillBox className="skills-icon-box hover:border-primary/50 transition-colors" style={{ opacity: 0 }}>
              <Cpu className="h-8 w-8 mb-2 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs">GEN_AI</span>
            </InteractiveSkillBox>
            <InteractiveSkillBox className="skills-icon-box hover:border-primary/50 transition-colors" style={{ opacity: 0 }}>
              <Terminal className="h-8 w-8 mb-2 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs">RAG_PIPELINES</span>
            </InteractiveSkillBox>
          </div>
        </div>

        <div className="skills-right md:col-span-8 grid sm:grid-cols-3 gap-8">
          {skills.map((skillGroup, idx) => (
            <div
              key={idx}
              className="skill-column space-y-4"
              style={{ opacity: 0 }}
            >
              <h3 className="text-xl font-display border-b border-primary/30 pb-2 inline-block">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2.5">
                {(skillGroup.items ?? []).map((skill, sIdx) => (
                  <li
                    key={sIdx}
                    className="skill-item flex items-center gap-3 group"
                    style={{ opacity: 0 }}
                  >
                    {/* Brand icon */}
                    <span className="flex-shrink-0 size-5 flex items-center justify-center">
                      {skill.customSvg ? (
                        /* Pinecone custom SVG */
                        <svg width="18" height="18" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100 dark:opacity-70 dark:group-hover:opacity-100 transition-opacity">
                          <path d="M50 8 L62 32 L75 28 L63 50 L78 48 L58 72 L65 70 L50 92 L35 70 L42 72 L22 48 L37 50 L25 28 L38 32 Z" fill="currentColor" className="text-muted-foreground group-hover:text-foreground transition-colors" />
                          <rect x="44" y="88" width="12" height="10" rx="3" fill="currentColor" className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        </svg>
                      ) : (
                        <img
                          src={`https://cdn.simpleicons.org/${skill.icon}`}
                          alt={skill.name}
                          width={18}
                          height={18}
                          className={`object-contain opacity-100 dark:opacity-70 dark:group-hover:opacity-100 transition-opacity ${
                            skill.invertDark ? "dark:invert" : ""
                          }`}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                      )}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
