"use client";

import { useEffect, createContext, useContext, useState, type ReactNode } from "react";

const GsapContext = createContext<{ ready: boolean }>({ ready: false });

export function useGsapReady() {
  return useContext(GsapContext).ready;
}

export function GsapProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        setReady(true);
      } catch (err: any) {
        console.error("GSAP Initialization Error:", err);
        alert("GSAP Failed to load: " + err.message);
      }
    }
    init();
  }, []);

  return (
    <GsapContext.Provider value={{ ready }}>
      {children}
    </GsapContext.Provider>
  );
}
