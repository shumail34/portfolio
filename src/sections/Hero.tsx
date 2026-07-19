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

  // Orbiting Technology Badges configurations
  const techBadges = [
    { name: "React", icon: "⚛️", angle: 0 },
    { name: "Next.js", icon: "▲", angle: 45 },
    { name: "Node.js", icon: "🟢", angle: 90 },
    { name: "MongoDB", icon: "🍃", angle: 135 },
    { name: "Tailwind", icon: "🌊", angle: 180 },
    { name: "TypeScript", icon: "TS", angle: 225 },
    { name: "JavaScript", icon: "JS", angle: 270 },
    { name: "GitHub", icon: "🐙", angle: 315 },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* 3D WebGL Torus and Particle Canvas */}
      <HeroThreeCanvas />

      {/* Lighting blobs */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

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
            className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-semibold text-blue-400 glow-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Full-Stack JavaScript Engineer
          </motion.div>

          {/* Large Title */}
          <h1 className="font-display text-6xl sm:text-7xl xl:text-8xl font-black tracking-tight leading-none mb-6 overflow-hidden">
            <motion.span 
              className="text-white block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Muhammad
            </motion.span>
            <motion.span 
              className="text-gradient-purple-blue glow-text-accent block mt-1"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Shumail
            </motion.span>
          </h1>

          {/* Tagline / Subtitle */}
          <motion.p 
            className="text-muted-text text-lg sm:text-xl font-medium max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Building scalable web applications with modern technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="relative px-8 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-accent-color to-primary-color text-white shadow-lg shadow-accent-color/20 hover:opacity-95 transition-opacity inline-flex items-center gap-2 cursor-pointer group interactive-card"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleScrollTo("contact")}
              className="px-8 py-4 rounded-full font-bold text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all inline-flex items-center gap-2 cursor-pointer interactive-card"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume"))}
              className="px-8 py-4 rounded-full font-bold text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all inline-flex items-center gap-2 cursor-pointer interactive-card"
            >
              <Download className="w-4 h-4" />
              Resume
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Interactive Avatar with orbiting tech and glowing rings */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center relative min-h-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`,
          }}
        >
          {/* Glowing Ring Backdrop */}
          <div className="absolute w-[360px] h-[360px] rounded-full border border-blue-500/20 bg-blue-500/5 animate-pulse -z-10 shadow-[0_0_80px_rgba(59,130,246,0.15)]" />
          
          {/* Orbital Container (slow rotation) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <motion.div
              className="relative w-[380px] h-[380px] flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {techBadges.map((badge) => {
                const radius = 180; // Distance from center
                const rad = (badge.angle * Math.PI) / 180;
                const x = radius * Math.cos(rad);
                const y = radius * Math.sin(rad);

                return (
                  <motion.div
                    key={badge.name}
                    className="absolute w-12 h-12 rounded-xl glass-panel flex items-center justify-center font-bold text-xs pointer-events-auto cursor-pointer"
                    style={{
                      left: `calc(50% + ${x}px - 24px)`,
                      top: `calc(50% + ${y}px - 24px)`,
                    }}
                    whileHover={{ scale: 1.2, borderColor: "rgba(124, 58, 237, 0.5)" }}
                    // Prevent badge from rotating on its own axis by counter-rotating
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                  >
                    <span className="text-white text-sm font-semibold">{badge.icon}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Full body Avatar with Breathing / Floating motion */}
          <motion.div
            className="relative z-10 w-[300px] h-[450px] flex items-center justify-center"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transform: `translate3d(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px, 0)`,
            }}
          >
            {/* Soft Shadow under avatar */}
            <div className="absolute bottom-[-10px] w-[200px] h-[15px] bg-[#000000]/60 rounded-full blur-[10px] -z-10" />

            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/avatar.png"
                alt="Muhammad Shumail"
                width={300}
                height={450}
                className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] filter brightness-[1.05]"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
