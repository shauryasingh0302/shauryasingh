"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/zippystarter/container";
import { ProjectImage } from "@/components/project-image";
import { projects } from "@/lib/portfolio-data";
import Link from "next/link";
import { useGsapReady } from "@/components/gsap/gsap-provider";
import { InteractiveGrid } from "@/components/ui/interactive-grid";

export function Projects() {
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
        // Section heading reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        });

        tl.fromTo(
          ".projects-title-line",
          { y: 60, opacity: 0, rotateX: -20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }
        );        // Accent line grows
        tl.fromTo(
          ".projects-accent-line",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.6, ease: "power2.out" }
        );

        // Description fades in
        tl.fromTo(
          ".projects-desc",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );

        // Project cards stagger in with scale + rotation
        gsap.fromTo(
          ".project-card",
          {
            y: 80,
            opacity: 0,
            scale: 0.92,
            rotateX: 8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".projects-grid",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        // Card image parallax on scroll
        const cards = el.querySelectorAll(".project-card");
        cards.forEach((card) => {
          const img = card.querySelector(".project-card-image");
          if (img) {
            gsap.to(img, {
              y: -20,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
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
      id="projects"
      className="py-32 border-t border-border relative overflow-hidden flex flex-col bg-background"
    >
      <InteractiveGrid />
      <div className="mx-auto max-w-7xl w-full flex-1 relative z-10 px-6">
        <div ref={sectionRef} className="relative z-10 pointer-events-none [&>*]:pointer-events-auto">
          <div className="projects-header grid justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-display tracking-tighter mb-4" style={{ perspective: "400px" }}>
                <span className="projects-title-line block">SELECTED</span>
                <span className="projects-title-line block text-muted-foreground">WORKS</span>
              </h2>
              <div className="projects-accent-line h-1 w-24 bg-primary" style={{ transform: "scaleX(0)" }}></div>
            </div>
            <p className="projects-desc text-muted-foreground max-w-sm text-left" style={{ opacity: 0 }}>
              A collection of full-stack, AI-integrated, and production-ready
              applications.
            </p>
          </div>

          <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-[repeat(3,auto)] gap-6" style={{ perspective: "1000px" }}>
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card grid grid-rows-subgrid row-span-3"
                style={{ opacity: 0 }}
              >
                <Card
                  className="pt-0 group bg-card border-border hover:border-primary/50 transition-all duration-300 rounded-none overflow-hidden grid grid-rows-subgrid row-span-3 content-start items-start h-full"
                >
                <div className="overflow-hidden">
                  <ProjectImage src={project.image} alt={project.title} className="project-card-image" />
                </div>
                <div className="grid gap-4">
                  <CardHeader className="grid gap-4">
                    <CardTitle className="text-2xl font-display group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="font-mono text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                </div>
                <CardFooter className="flex justify-between pt-0">
                  <Link
                    href={project.link}
                    className="text-sm font-display flex items-center hover:text-primary transition-colors gap-2"
                  >
                    LIVE DEMO <ExternalLink className="size-3" />
                  </Link>
                  <Link
                    href={project.repo}
                    className="text-sm font-display flex items-center hover:text-primary transition-colors gap-2"
                  >
                    CODE <Github className="size-3" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
