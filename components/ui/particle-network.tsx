"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    
    // Config
    // Use fewer particles on mobile devices to save performance and reduce visual clutter
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 60 : 120;
    const connectionDistance = isMobile ? 100 : 150;
    const mouseRadius = 200;
    const isDark = resolvedTheme === "dark";
    
    // Using the primary color roughly. We can extract it from CSS variables, 
    // but for canvas, it's easier to use a solid hex or rgba based on theme.
    // The current primary is an OKLCH vibrant green, so we use a similar hex or rgba for drawing.
    const particleColor = isDark ? "rgba(167, 243, 208, 0.4)" : "rgba(5, 150, 105, 0.3)";
    const lineColor = isDark ? "rgba(167, 243, 208, " : "rgba(5, 150, 105, ";

    let mouse = {
      x: -1000,
      y: -1000,
      clientX: -1000,
      clientY: -1000,
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      boundsWidth: number;
      boundsHeight: number;

      constructor(width: number, height: number) {
        this.boundsWidth = width;
        this.boundsHeight = height;
        this.x = Math.random() * this.boundsWidth;
        this.y = Math.random() * this.boundsHeight;
        this.vx = (Math.random() - 0.5) * 1.5; // slight drift
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        // Bounce off edges using logical bounds
        if (this.x < 0 || this.x > this.boundsWidth) this.vx *= -1;
        if (this.y < 0 || this.y > this.boundsHeight) this.vy *= -1;

        // Mouse interaction (repel)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius && mouse.x !== -1000) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseRadius - distance) / mouseRadius;
          const pushX = forceDirectionX * force * -5;
          const pushY = forceDirectionY * force * -5;
          
          this.x += pushX;
          this.y += pushY;
        }

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = particleColor;
        ctx!.fill();
      }
    }

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      // Set actual canvas size multiplied by devicePixelRatio for crispness
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Set CSS size to match window size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Scale context to match DPR
      ctx.scale(dpr, dpr);
      
      const currentIsMobile = window.innerWidth < 768;
      const currentParticleCount = currentIsMobile ? 60 : 120;
      
      particles = [];
      for (let i = 0; i < currentParticleCount; i++) {
        // Pass the unscaled width/height to particles so logic remains identical
        particles.push(new Particle(window.innerWidth, window.innerHeight));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentIsMobile = window.innerWidth < 768;
      const currentConnectionDistance = currentIsMobile ? 100 : 150;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw connections
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < currentConnectionDistance) {
            const opacity = 1 - distance / currentConnectionDistance;
            ctx.beginPath();
            ctx.strokeStyle = `${lineColor}${opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    const updateMousePosition = () => {
      if (mouse.clientX === -1000) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = mouse.clientX - rect.left;
      mouse.y = mouse.clientY - rect.top;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.clientX = e.clientX;
      mouse.clientY = e.clientY;
      updateMousePosition();
    };

    const handleScroll = () => {
      updateMousePosition();
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.clientX = -1000;
      mouse.clientY = -1000;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animationFrameId) animate();
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = 0;
          }
        }
      },
      { threshold: 0 }
    );

    init();
    observer.observe(canvas);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
