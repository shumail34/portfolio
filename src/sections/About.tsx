"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, Smile } from "lucide-react";

export default function About() {
  const cards = [
    {
      title: "Completed Projects",
      value: "20+",
      desc: "Delivering clean code & premium UI",
      icon: <Briefcase className="w-5 h-5 text-blue-400" />,
    },
    {
      title: "Years of Experience",
      value: "3",
      desc: "In JavaScript full-stack ecosystems",
      icon: <Award className="w-5 h-5 text-purple-400" />,
    },
    {
      title: "Happy Clients",
      value: "16+",
      desc: "Across global markets and agencies",
      icon: <Smile className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Text Content */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold tracking-widest text-primary-color uppercase mb-4 block">
              About Me
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mb-8">
              Elegance in Engineering.
            </h2>
            <p className="text-muted-text text-lg leading-relaxed max-w-xl">
              I specialize in building modern, scalable, and high-performance web applications using React, Next.js, Node.js, Express.js, and MongoDB. I focus on clean architecture, responsive design, and exceptional user experiences.
            </p>
          </motion.div>

          {/* Metric Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col items-start text-left interactive-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-6">
                  {card.icon}
                </div>
                <h3 className="font-display text-3xl font-black text-white tracking-tight mb-1">
                  {card.value}
                </h3>
                <h4 className="text-sm font-semibold text-white mb-2">{card.title}</h4>
                <p className="text-xs text-muted-text leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
