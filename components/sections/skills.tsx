"use client";

import { useEffect, useRef } from "react";
import { Code2, Database, Cpu, Terminal, Network, FileSearch, Box, Palette } from "lucide-react";
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

        // Individual skill items stagger in
        const skillItems = gsap.utils.toArray(".skill-item");
        gsap.fromTo(
          skillItems,
          { y: 20, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.03,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: ".skills-right",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
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
        <div ref={sectionRef} className="grid md:grid-cols-12 gap-8 lg:gap-12 relative z-10 pointer-events-none [&>*]:pointer-events-auto">
          {/* Visual Connector implemented via border on desktop */}
          <div className="skills-left md:col-span-4 md:pr-8 relative" style={{ opacity: 0 }}>
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
            {/* Vertical divider line */}
            <div className="hidden md:block absolute top-0 bottom-0 right-0 w-px bg-border" />
          </div>

          <div className="skills-right md:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, idx) => (
              <div
                key={idx}
                className="skill-column flex flex-col gap-4"
                style={{ opacity: 0 }}
              >
                <h3 className="text-lg font-display border-b border-border pb-2 inline-block self-start">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {(skillGroup.items ?? []).map((skill, sIdx) => {
                    let LucideIcon = null;
                    if (skill.isLucide) {
                      if (skill.icon === "Network") LucideIcon = Network;
                      else if (skill.icon === "Cpu") LucideIcon = Cpu;
                      else if (skill.icon === "FileSearch") LucideIcon = FileSearch;
                      else if (skill.icon === "Box") LucideIcon = Box;
                      else if (skill.icon === "Palette") LucideIcon = Palette;
                    }

                    return (
                      <div
                        key={sIdx}
                        className={`skill-item flex items-center gap-2 group px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-[1.03] ${
                          skillGroup.isLearning
                            ? "border-border/40 border-dashed bg-secondary/5 hover:bg-foreground/5 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] opacity-80 hover:opacity-100"
                            : "border-border/50 bg-secondary/10 hover:bg-foreground/5 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        }`}
                        style={{ opacity: 0 }}
                      >
                        <span className="flex-shrink-0 size-[18px] flex items-center justify-center">
                          {LucideIcon ? (
                            <LucideIcon className="w-full h-full text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                          ) : skill.customSvg ? (
                            <svg width="18" height="18" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                              <path d="M50 8 L62 32 L75 28 L63 50 L78 48 L58 72 L65 70 L50 92 L35 70 L42 72 L22 48 L37 50 L25 28 L38 32 Z" fill="currentColor" />
                              <rect x="44" y="88" width="12" height="10" rx="3" fill="currentColor" />
                            </svg>
                          ) : (
                            <div 
                              className="w-full h-full bg-muted-foreground group-hover:bg-foreground transition-colors duration-200"
                              style={{
                                WebkitMaskImage: `url(https://cdn.simpleicons.org/${skill.icon})`,
                                WebkitMaskSize: "contain",
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskPosition: "center",
                                maskImage: `url(https://cdn.simpleicons.org/${skill.icon})`,
                                maskSize: "contain",
                                maskRepeat: "no-repeat",
                                maskPosition: "center",
                              }}
                            />
                          )}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
