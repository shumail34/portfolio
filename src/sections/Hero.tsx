"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
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
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* 3D WebGL Torus and Particle Canvas */}
      <HeroThreeCanvas />

      {/* Ambient Lighting Blobs tuned to match the Avatar's Blue Glowing Ring */}
      <div className="absolute top-[20%] right-[8%] w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse" />
      <div className="absolute bottom-[15%] left-[5%] w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[90px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* LEFT COLUMN: Texts and CTA */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Small Badge */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] sm:text-xs font-semibold text-blue-400 glow-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Full-Stack JavaScript Engineer & CTO
          </motion.div>

          {/* Large Title */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none mb-4 sm:mb-6 overflow-hidden">
            <motion.span 
              className="text-white block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Muhammad
            </motion.span>
            <motion.span 
              className="text-gradient-primary glow-text-accent block mt-1"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Shumail
            </motion.span>
          </h1>

          {/* Tagline / Subtitle */}
          <motion.p 
            className="text-muted-text text-base sm:text-lg lg:text-xl font-medium max-w-xl mb-8 sm:mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Building scalable web applications with modern technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="relative w-full sm:w-auto justify-center px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm bg-gradient-to-r from-accent-color to-primary-color text-black shadow-lg shadow-white/20 hover:opacity-95 transition-opacity inline-flex items-center gap-2 cursor-pointer group interactive-card"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full sm:w-auto justify-center px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all inline-flex items-center gap-2 cursor-pointer interactive-card"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume"))}
              className="w-full sm:w-auto justify-center px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all inline-flex items-center gap-2 cursor-pointer interactive-card"
            >
              <Download className="w-4 h-4" />
              Resume
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Futuristic CTO Avatar */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center relative min-h-[500px] lg:min-h-[680px] mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`,
          }}
        >
          {/* Responsive Scale Wrapper for Mobile */}
          <div className="scale-80 sm:scale-90 lg:scale-100 origin-bottom flex items-end justify-center">
            
            {/* Avatar Container tuned for 2:3 ratio composite image */}
            <motion.div
              className="relative w-[380px] h-[570px] lg:w-[420px] lg:h-[630px] flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Subtle Floor Glow */}
              <div className="absolute -bottom-6 w-[280px] h-[20px] bg-blue-500/30 rounded-full blur-[16px]" />

              {/* Avatar Image with smooth edge blending */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <Image
                  src="/avatar.png"
                  alt="Muhammad Shumail - Full-Stack Engineer & CTO"
                  fill
                  className="object-contain drop-shadow-[0_0_35px_rgba(59,130,246,0.3)]"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
