"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, PhoneCall, ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "../constants/portfolio";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const contactLinks = [
    {
      name: "Email",
      value: "shumailm106@gmail.com",
      url: SOCIAL_LINKS.email,
      icon: <Mail className="w-5 h-5 text-blue-400" />,
    },
    {
      name: "LinkedIn",
      value: "malik-shumail-b5a20523a",
      url: SOCIAL_LINKS.linkedin,
      icon: <LinkedinIcon className="w-5 h-5 text-purple-400" />,
    },
    {
      name: "GitHub",
      value: "shumail34",
      url: SOCIAL_LINKS.github,
      icon: <GithubIcon className="w-5 h-5 text-white" />,
    },
    {
      name: "WhatsApp",
      value: "Chat on WhatsApp",
      url: SOCIAL_LINKS.whatsapp,
      icon: <PhoneCall className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section id="contact" className="relative py-36 overflow-hidden border-t border-white/5">
      {/* Glow Backdrops */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-accent-color/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <span className="text-xs font-bold tracking-widest text-primary-color uppercase mb-6 block">
            Get In Touch
          </span>

          {/* Large CTA Heading */}
          <motion.h2
            className="font-display text-5xl sm:text-7xl xl:text-8xl font-black text-white tracking-tight leading-none mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Let&apos;s Build <br className="sm:hidden" />
            <span className="text-gradient-purple-blue glow-text-accent">Something Amazing.</span>
          </motion.h2>

          {/* Subtitle */}
          <p className="text-muted-text text-lg sm:text-xl font-medium max-w-xl mb-16 leading-relaxed">
            I am currently open to new opportunities, client engagements, and engineering collaborations.
          </p>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col items-center justify-center text-center group interactive-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-4 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <h3 className="font-display text-sm font-semibold text-white mb-1">
                  {link.name}
                </h3>
                <p className="text-xs text-muted-text truncate max-w-full mb-3">
                  {link.value}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary-color opacity-0 group-hover:opacity-100 transition-opacity">
                  Connect
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
