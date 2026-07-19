"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Faster scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easeOutQuart
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.5, // Faster scroll wheel
      touchMultiplier: 2, // Faster touch scroll
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Sync Lenis scroll events with page-level features if necessary
    window.addEventListener("scroll-to-section", ((e: CustomEvent) => {
      const sectionId = e.detail;
      const target = document.getElementById(sectionId);
      if (target) {
        lenis.scrollTo(target, { offset: -80 });
      }
    }) as EventListener);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
