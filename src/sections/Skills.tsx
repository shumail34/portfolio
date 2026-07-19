"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  Terminal, 
  Server, 
  Database, 
  Globe, 
  Cpu, 
  Layout, 
  GitBranch, 
  Layers 
} from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Skills() {
  const skills = [
    { name: "React", icon: <Cpu className="w-6 h-6 text-sky-400" />, glow: "hover:shadow-sky-500/20" },
    { name: "Next.js", icon: <Terminal className="w-6 h-6 text-white" />, glow: "hover:shadow-white/10" },
    { name: "Node.js", icon: <Server className="w-6 h-6 text-green-500" />, glow: "hover:shadow-green-500/20" },
    { name: "Express.js", icon: <Layers className="w-6 h-6 text-neutral-400" />, glow: "hover:shadow-neutral-400/20" },
    { name: "MongoDB", icon: <Database className="w-6 h-6 text-emerald-500" />, glow: "hover:shadow-emerald-500/20" },
    { name: "TypeScript", icon: <Code className="w-6 h-6 text-blue-500" />, glow: "hover:shadow-blue-500/20" },
    { name: "Tailwind CSS", icon: <Layout className="w-6 h-6 text-cyan-400" />, glow: "hover:shadow-cyan-400/20" },
    { name: "Git", icon: <GitBranch className="w-6 h-6 text-orange-500" />, glow: "hover:shadow-orange-500/20" },
    { name: "GitHub", icon: <GithubIcon className="w-6 h-6 text-purple-400" />, glow: "hover:shadow-purple-500/20" },
    { name: "REST API", icon: <Globe className="w-6 h-6 text-teal-400" />, glow: "hover:shadow-teal-500/20" },
  ];

  return (
    <section id="skills" className="relative py-32 overflow-hidden border-t border-white/5 bg-[#0a0a0a]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-bold tracking-widest text-primary-color uppercase mb-4 block">
            Capabilities
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Technical Arsenal.
          </h2>
          <p className="text-muted-text text-base max-w-md mx-auto">
            A curated stack optimized for speed, performance, and clean developer experience.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className={`glass-panel p-6 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 ${skill.glow} hover:border-white/20 hover:-translate-y-1.5 cursor-pointer interactive-card group`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
              <span className="font-display text-sm font-semibold tracking-wide text-white group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
