"use client";

import { ReactNode, useEffect, createContext, useContext, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollContextType {
  getLenis: () => Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  getLenis: () => null,
});

export const useLenisScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6, // Buttery smooth, luxurious inertia duration
      easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic smooth deceleration curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const getLenis = () => lenisRef.current;

  return (
    <SmoothScrollContext.Provider value={{ getLenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
