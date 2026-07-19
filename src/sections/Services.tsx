"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Award, 
  Database, 
  Sparkles, 
  Layout, 
  Server,
  Smartphone,
  Mail,
  Cpu
} from "lucide-react";
import { SERVICES } from "../constants/portfolio";

// Icon lookup dictionary
const icons: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5 text-blue-400" />,
  Award: <Award className="w-5 h-5 text-purple-400" />,
  Database: <Database className="w-5 h-5 text-emerald-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-amber-400" />,
  Layout: <Layout className="w-5 h-5 text-rose-400" />,
  Server: <Server className="w-5 h-5 text-indigo-400" />,
  Smartphone: <Smartphone className="w-5 h-5 text-pink-400" />,
  Mail: <Mail className="w-5 h-5 text-cyan-400" />,
  Cpu: <Cpu className="w-5 h-5 text-red-400" />,
};

export default function Services() {
  return (
    <section id="services" className="relative py-32 overflow-hidden border-t border-white/5 bg-[#0a0a0a]/30">
      {/* Lights background */}
      <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-xs font-bold tracking-widest text-primary-color uppercase mb-4 block">
            Offerings
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Services.
          </h2>
          <p className="text-muted-text text-base max-w-md mx-auto">
            Engineered to deliver performant solutions tailored to modern specifications.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col items-start interactive-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Icon Container */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-6 group-hover:scale-105 transition-transform">
                {icons[service.iconName] || <Globe className="w-5 h-5" />}
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-3">
                {service.title}
              </h3>

              <p className="text-sm text-muted-text leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
