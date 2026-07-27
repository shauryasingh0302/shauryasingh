"use client";

import { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import { Music, Code2, Github } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { useGsapReady } from "@/components/gsap/gsap-provider";
import { GlowingOrb } from "@/components/ui/glowing-orb";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Dashboard() {
  const { data: spotify } = useSWR("/api/spotify", fetcher, { refreshInterval: 10000 });
  const { data: wakatime } = useSWR("/api/wakatime", fetcher, { refreshInterval: 60000 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const githubScrollRef = useRef<HTMLDivElement>(null);
  const gsapReady = useGsapReady();

  // Wrap the SVG in a scrollable container and scroll to the right
  useEffect(() => {
    if (!githubScrollRef.current) return;

    let scrollInterval: NodeJS.Timeout;
    
    const observer = new MutationObserver(() => {
      if (!githubScrollRef.current) return;
      
      const svg = githubScrollRef.current.querySelector("svg");
      const footer = githubScrollRef.current.querySelector("footer");
      
      if (svg && footer && !svg.parentElement?.classList.contains("svg-scroller")) {
        // Create a scrollable wrapper just for the SVG
        const wrapper = document.createElement("div");
        wrapper.className = "svg-scroller overflow-x-auto pb-4 w-full flex justify-end [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";
        
        // Move the SVG into the wrapper
        svg.parentNode?.insertBefore(wrapper, svg);
        wrapper.appendChild(svg);
        
        // Add some margin to the footer so it looks nice
        footer.classList.add("mt-4", "px-2");
        
        // Now force the wrapper to scroll to the right
        scrollInterval = setInterval(() => {
          wrapper.scrollLeft = wrapper.scrollWidth;
        }, 500);
        
        setTimeout(() => clearInterval(scrollInterval), 5000);
      }
    });

    observer.observe(githubScrollRef.current, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      clearInterval(scrollInterval);
    };
  }, []);

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
          ".dashboard-title",
          { y: 50, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".dashboard-title",
              start: "top 85%",
            },
          }
        );

        // Cards sleek slide-up fade
        gsap.fromTo(
          ".dashboard-card",
          { y: 40, opacity: 0, clipPath: "inset(10% 0% 0% 0%)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            stagger: 0.15,
            ease: "power4.out",
          },
        );

        // Inner card content staggers in softly
        gsap.fromTo(
          ".dashboard-content",
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
        );
      }, el);
    }

    animate();

    return () => {
      ctx?.revert();
    };
  }, [gsapReady]);

  return (
    <section id="dashboard" className="py-24 border-t border-border relative overflow-hidden flex flex-col bg-background">
      <InteractiveMatrix className="absolute inset-0 w-full h-full pointer-events-auto z-0" />
      <div className="mx-auto max-w-7xl w-full px-6 flex-1 relative z-10 pointer-events-none">
        <div ref={sectionRef} className="relative z-10 pointer-events-none [&>*]:pointer-events-auto">
          <h2
            className="dashboard-title text-4xl font-display mb-12 uppercase"
            style={{ opacity: 0 }}
          >
            Live Dashboard
          </h2>

          <div className="dashboard-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex flex-col gap-6">
              {/* Spotify Card */}
              <div className="dashboard-card border border-border/50 bg-card/30 backdrop-blur-sm p-6 relative overflow-hidden group hover:bg-card/40 transition-colors" style={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2">
                    <Music className="size-4" /> 
                    {spotify?.isPlaying ? "NOW PLAYING" : "RECENTLY PLAYED"}
                  </h3>
                  {spotify?.isPlaying && (
                    <div className="flex gap-1 items-end h-4">
                      <div className="w-1 bg-primary animate-[bounce_1s_infinite] h-full"></div>
                      <div className="w-1 bg-primary animate-[bounce_1s_infinite_0.2s] h-2/3"></div>
                      <div className="w-1 bg-primary animate-[bounce_1s_infinite_0.4s] h-full"></div>
                    </div>
                  )}
                </div>

                {spotify?.title ? (
                  <a href={spotify.songUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 relative z-10 group-hover:opacity-80 transition-opacity">
                    {spotify.albumImageUrl && (
                      <img src={spotify.albumImageUrl} alt="Album Art" className="size-16 object-cover border border-border/50 shadow-lg" />
                    )}
                    <div className="flex flex-col">
                      <span className="font-bold text-lg truncate max-w-[180px] leading-tight">{spotify.title}</span>
                      <span className="text-sm text-muted-foreground truncate max-w-[180px]">{spotify.artist}</span>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 relative z-10 opacity-50">
                    <div className="size-16 bg-muted/20 border border-border/50"></div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-24 bg-muted/20"></div>
                      <div className="h-3 w-16 bg-muted/20"></div>
                    </div>
                  </div>
                )}
                {/* Background ambient glow based on spotify presence */}
                <div className="absolute -top-10 -right-10 size-40 bg-primary/10 rounded-full blur-[50px] pointer-events-none"></div>
              </div>

              {/* WakaTime Card */}
              <div className="dashboard-card border border-border/50 bg-card/30 backdrop-blur-sm p-6 relative overflow-hidden flex-1 group hover:bg-card/40 transition-colors" style={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2">
                    <Code2 className="size-4" /> 
                    WEEKLY CODING
                  </h3>
                </div>
                
                <div className="relative z-10">
                  {wakatime && !wakatime.error ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold tracking-tighter">{wakatime.human_readable_total_including_other_language || wakatime.human_readable_total || "0 hrs"}</span>
                      </div>
                      <div className="space-y-3">
                        {wakatime.languages?.slice(0, 3).map((lang: any) => (
                          <div key={lang.name} className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span>{lang.name}</span>
                              <span className="text-muted-foreground">{lang.text}</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted/30 overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${lang.percent}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground font-mono animate-pulse">
                      {wakatime?.error === "No API Key" ? "API Key required..." : "Connecting to WakaTime..."}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="dashboard-card md:col-span-2 border border-border/50 bg-card/30 backdrop-blur-sm p-6 relative overflow-hidden group hover:bg-card/40 transition-colors flex flex-col" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2">
                  <Github className="size-4" /> 
                  CONTRIBUTIONS
                </h3>
                <a href="https://github.com/shauryasingh0302" target="_blank" rel="noreferrer" className="text-xs font-mono text-primary hover:underline">
                  @shauryasingh0302
                </a>
              </div>

              <div ref={githubScrollRef} className="relative z-10 flex-1 flex flex-col justify-center w-full pb-4">
                <div className="w-full p-6 border border-border/30 bg-background/50 flex flex-col justify-center">
                  <GitHubCalendar 
                    username="shauryasingh0302" 
                    colorScheme="dark"
                    theme={{
                      dark: ['#1e1e1e', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                    fontSize={12}
                    blockSize={12}
                    blockMargin={4}
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-20 -left-20 size-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
