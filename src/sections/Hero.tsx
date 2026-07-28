"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, ExternalLink } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the heavy 3D canvas so it doesn't block initial page load
const HeroThreeCanvas = dynamic(() => import("../components/HeroThreeCanvas"), {
  ssr: false,
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse Parallax movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const x = (e.clientX / clientWidth - 0.5) * 40; // max 20px translation x
      const y = (e.clientY / clientHeight - 0.5) * 40; // max 20px translation y
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollTo = (id: string) => {
    const event = new CustomEvent("scroll-to-section", { detail: id });
    window.dispatchEvent(event);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative py-20 lg:py-24 overflow-hidden flex items-center justify-center"
    >
      {/* 3D WebGL Torus and Particle Canvas */}
      <HeroThreeCanvas />

      {/* Subtle Monochromatic Lighting Blobs */}
      <div className="absolute top-[10%] right-[8%] w-[350px] h-[350px] bg-white/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[280px] h-[280px] bg-zinc-500/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center z-10">
        
        {/* LEFT COLUMN: Texts and CTA */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* CTO @ A&S Solution Badge Link */}
          <motion.a
            href="https://www.a-s-solution.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 sm:mb-6 rounded-full border border-white/15 bg-white/5 text-[10px] sm:text-xs font-semibold text-zinc-300 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all cursor-pointer group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CTO @ <strong className="text-white underline decoration-white/30 group-hover:decoration-white transition-colors">A&S Solution</strong></span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          {/* Large Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-none mb-3 sm:mb-5 overflow-hidden">
            <motion.span 
              className="text-white block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Muhammad
            </motion.span>
            <motion.span 
              className="text-gradient-primary block mt-1"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Shumail
            </motion.span>
          </h1>

          {/* Tagline / Subtitle */}
          <motion.p 
            className="text-muted-text text-sm sm:text-base lg:text-lg font-medium max-w-xl mb-6 sm:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Building scalable web applications with modern technologies.
          </motion.p>

          {/* CTA Buttons - Vercel / Apple Minimalist */}
          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="relative w-full sm:w-auto justify-center px-7 py-3 rounded-full font-bold text-sm bg-white text-black hover:bg-zinc-200 transition-all shadow-md shadow-white/10 inline-flex items-center gap-2 cursor-pointer group interactive-card"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full sm:w-auto justify-center px-7 py-3 rounded-full font-bold text-sm text-white bg-white/5 border border-white/15 hover:bg-white/10 transition-all inline-flex items-center gap-2 cursor-pointer interactive-card"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume"))}
              className="w-full sm:w-auto justify-center px-7 py-3 rounded-full font-bold text-sm text-white bg-white/5 border border-white/15 hover:bg-white/10 transition-all inline-flex items-center gap-2 cursor-pointer interactive-card"
            >
              <Download className="w-4 h-4" />
              Resume
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Compact & Blended CTO Avatar */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center relative min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] mt-6 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`,
          }}
        >
          {/* Responsive Scale Wrapper */}
          <div className="scale-95 lg:scale-100 origin-bottom flex items-end justify-center">
            
            {/* Shorter Avatar Container */}
            <motion.div
              className="relative w-[200px] h-[280px] sm:w-[240px] sm:h-[320px] lg:w-[260px] lg:h-[360px] flex items-center justify-center mt-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Soft Floor Shadow */}
              <div className="absolute -bottom-2 w-[180px] h-[10px] bg-white/10 rounded-full blur-[12px]" />

              {/* Seamless Background Blend: Mix-blend-screen + aggressive mask & contrast to remove non-pure black backgrounds */}
              <div className="relative w-full h-full mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]">
                <img
                  src="/avatar.png?v=3"
                  alt="Muhammad Shumail - Full-Stack Engineer & CTO"
                  className="w-full h-full object-contain relative z-10 filter contrast-[1.25] brightness-[1.1]"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
