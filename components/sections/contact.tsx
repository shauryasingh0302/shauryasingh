"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/zippystarter/container";
import { useGsapReady } from "@/components/gsap/gsap-provider";
import { BackgroundMarquee } from "@/components/ui/background-marquee";

export function Contact() {
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });
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
        // Heading and description
        gsap.fromTo(
          ".contact-header",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".contact-header",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Form fields stagger in
        gsap.fromTo(
          ".contact-field",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-form",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Submit button scales in
        gsap.fromTo(
          ".contact-submit",
          { y: 20, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: ".contact-submit",
              start: "top 90%",
              once: true,
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
    <section id="contact" className="py-24 bg-card border-t border-border relative overflow-hidden flex flex-col">
      <BackgroundMarquee />
      <div className="mx-auto max-w-7xl w-full px-6 flex-1 relative z-10">
        <div ref={sectionRef} className="max-w-2xl mx-auto relative z-10 pointer-events-none [&>*]:pointer-events-auto">
        <div className="contact-header text-center mb-12" style={{ opacity: 0 }}>
          <h2 className="text-4xl font-display mb-4">INITIATE_CONTACT</h2>
          <p className="text-muted-foreground">
            Have a project in mind, an internship opening, or a role to
            discuss? Send a signal.
          </p>
        </div>

        <form
          className="contact-form grid gap-6 bg-card/90 backdrop-blur-sm p-8 border border-border shadow-2xl relative z-20"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const json: Record<string, string> = {};
            data.forEach((value, key) => { json[key] = value.toString(); });
            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(json),
              });
              const result = await res.json();
              if (result.success) {
                form.reset();
                setToast({ visible: true, message: "Your message has been communicated." });
              } else {
                setToast({ visible: true, message: "Failed to send. Please try again." });
              }
            } catch {
              setToast({ visible: true, message: "Failed to send. Please try again." });
            } finally {
              setTimeout(() => setToast({ visible: false, message: "" }), 4000);
            }
          }}
        >
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="contact-field grid md:grid-cols-2 gap-6" style={{ opacity: 0 }}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-xs font-mono text-muted-foreground"
              >
                NAME
              </label>
              <Input id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-mono text-muted-foreground"
              >
                EMAIL
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>
          <div className="contact-field space-y-2" style={{ opacity: 0 }}>
            <label
              htmlFor="message"
              className="text-xs font-mono text-muted-foreground"
            >
              MESSAGE
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter your message..."
              className="min-h-[150px]"
              required
            />
          </div>
          <div className="contact-submit" style={{ opacity: 0 }}>
            <Button type="submit" className="w-full" size="lg">
              SEND TRANSMISSION
            </Button>
          </div>
        </form>
        {/* Toast */}
        {toast.visible && (
          <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="bg-card border border-border shadow-lg px-6 py-4 flex items-center gap-3 text-sm">
              <svg
                className="size-5 text-primary shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-mono text-foreground">{toast.message}</span>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
