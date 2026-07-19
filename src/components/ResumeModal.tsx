"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Printer } from "lucide-react";
import { METADATA, SOCIAL_LINKS, PROJECTS } from "../constants/portfolio";

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

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-resume", handleOpen);
    return () => window.removeEventListener("open-resume", handleOpen);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md print:bg-white print:p-0 print:static print:block print:inset-auto">
          {/* Backdrop Click Dismiss (hidden when printing) */}
          <div className="absolute inset-0 print:hidden" onClick={() => setIsOpen(false)} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            data-lenis-prevent
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0f0f11] border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 z-10 print:border-none print:bg-white print:text-black print:p-0 print:max-w-full print:max-h-full print:shadow-none print:static print:rounded-none print:overflow-visible"
          >
            {/* Top Toolbar (hidden when printing) */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8 print:hidden">
              <h3 className="font-display text-xl font-bold text-white">Interactive Resume</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-color to-primary-color text-white rounded-full text-xs font-bold hover:opacity-95 transition-opacity cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"
                  aria-label="Close Resume"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Print Header Style (only visible when printing) */}
            <style jsx global>{`
              @media print {
                body * {
                  visibility: hidden;
                }
                .print\\:block, .print\\:block * {
                  visibility: visible;
                }
                html, body {
                  background: white !important;
                  color: black !important;
                }
              }
            `}</style>

            {/* Resume Document Content */}
            <div className="w-full text-left print:text-black">
              {/* Header Details */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 mb-8 print:border-neutral-200">
                <div>
                  <h1 className="font-display text-4xl font-extrabold text-white mb-2 print:text-black print:text-3xl">
                    {METADATA.name}
                  </h1>
                  <h2 className="text-lg font-bold text-primary-color print:text-neutral-800">
                    {METADATA.role}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-6 md:mt-0 text-sm text-muted-text print:text-neutral-700">
                  <a href={SOCIAL_LINKS.email} className="flex items-center gap-2 hover:text-white print:hover:text-neutral-700">
                    <Mail className="w-4 h-4 text-primary-color print:text-neutral-800" />
                    shumailm106@gmail.com
                  </a>
                  <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white print:hover:text-neutral-700">
                    <Phone className="w-4 h-4 text-emerald-400 print:text-neutral-800" />
                    +92 (WhatsApp)
                  </a>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white print:hover:text-neutral-700">
                    <GithubIcon className="w-4 h-4 text-purple-400 print:text-neutral-800" />
                    github.com/shumail34
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white print:hover:text-neutral-700">
                    <LinkedinIcon className="w-4 h-4 text-blue-400 print:text-neutral-800" />
                    linkedin.com/in/malik-shumail...
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wider mb-3 pb-1 border-b border-white/5 print:text-black print:border-neutral-200">
                  Professional Summary
                </h3>
                <p className="text-sm leading-relaxed text-muted-text print:text-neutral-800">
                  High-performing Full-Stack Developer and Mobile Engineer with 3 years of hands-on experience designing, developing, and deploying fully responsive web platforms and cross-platform mobile apps. Proficient in crafting robust Django backends, high-fidelity Next.js web applications, and optimized React Native/Flutter client applications. Passionate about writing dry, clean, and testable code while implementing rich micro-interactions and animations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Column (Experience & Education) */}
                <div className="md:col-span-8 space-y-8">
                  {/* Experience */}
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wider mb-4 pb-1 border-b border-white/5 print:text-black print:border-neutral-200">
                      Work Experience
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-white print:text-black">Chief Technology Officer (CTO)</h4>
                          <span className="text-xs font-semibold text-muted-text print:text-neutral-600">Feb 2026 - Present</span>
                        </div>
                        <p className="text-xs font-semibold text-primary-color mb-2">
                          <a href="https://www.a-s-solution.online/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white print:hover:text-neutral-800">A&S Solution</a>
                        </p>
                        <ul className="text-xs text-muted-text list-disc list-inside space-y-1.5 leading-relaxed print:text-neutral-800">
                          <li>Orchestrate the overall technical vision, architecture, and deployment standards across all A&S Solution products and platforms.</li>
                          <li>Lead engineering teams in building high-fidelity web applications with Next.js/React and robust Django backend infrastructures.</li>
                          <li>Establish CI/CD pipelines, lead database design and optimization strategies, and perform code reviews to enforce premium quality.</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-white print:text-black">Lead Full-Stack Freelance Engineer</h4>
                          <span className="text-xs font-semibold text-muted-text print:text-neutral-600">2023 - Feb 2026</span>
                        </div>
                        <p className="text-xs font-semibold text-primary-color mb-2">Self-Employed / Remote</p>
                        <ul className="text-xs text-muted-text list-disc list-inside space-y-1.5 leading-relaxed print:text-neutral-800">
                          <li>Architected and delivered custom full-stack solutions including SaaS models, e-commerce stores, and local marketplaces.</li>
                          <li>Designed an advanced email marketing system (OutreachPro) with automated campaigns, custom SMTP server integration, and analytics tracking.</li>
                          <li>Created rich landing page platforms (Eloviax) utilizing Next.js 15, Framer Motion, and GSAP, yielding high-performance scores and SEO ranking.</li>
                          <li>Engineered an AI-powered home service marketplace application featuring real-time client-booking systems and state management.</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-white print:text-black">Frontend Web Developer Projects</h4>
                          <span className="text-xs font-semibold text-muted-text print:text-neutral-600">2022 - 2023</span>
                        </div>
                        <p className="text-xs font-semibold text-primary-color mb-2">Independent Work</p>
                        <ul className="text-xs text-muted-text list-disc list-inside space-y-1.5 leading-relaxed print:text-neutral-800">
                          <li>Developed clean user interfaces using React, Next.js, and CSS Grid/Flexbox layouts.</li>
                          <li>Collaborated with design mocks to build modular, accessible, and responsive components.</li>
                          <li>Integrated REST APIs with state-management containers to sync frontend application states with remote databases.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wider mb-4 pb-1 border-b border-white/5 print:text-black print:border-neutral-200">
                      Key Projects
                    </h3>
                    <div className="space-y-4">
                      {PROJECTS.map((project) => (
                        <div key={project.title} className="text-xs text-muted-text print:text-neutral-800">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-white print:text-black">{project.title}</span>
                            <span className="text-[10px] text-primary-color font-semibold uppercase tracking-wider">{project.subtitle}</span>
                          </div>
                          <p className="leading-relaxed mb-1">{project.description}</p>
                          <p className="text-[10px] font-semibold text-muted-text/80 print:text-neutral-600">
                            Tech: {project.tech.join(", ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column (Skills & Education) */}
                <div className="md:col-span-4 space-y-8">
                  {/* Education */}
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wider mb-4 pb-1 border-b border-white/5 print:text-black print:border-neutral-200">
                      Education
                    </h3>
                    <div>
                      <h4 className="font-bold text-white print:text-black text-sm">BS in Computer Science (BSCS)</h4>
                      <p className="text-xs text-primary-color font-semibold my-0.5">University of South Asia</p>
                      <div className="flex justify-between text-[11px] text-muted-text print:text-neutral-600">
                        <span>Class: 2022 - 2026</span>
                        <span className="font-bold">CGPA: 3.04</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wider mb-4 pb-1 border-b border-white/5 print:text-black print:border-neutral-200">
                      Technical Skills
                    </h3>
                    <div className="space-y-3 text-xs text-muted-text print:text-neutral-800">
                      <div>
                        <strong className="block text-white print:text-black text-xs font-semibold mb-1">Frontend</strong>
                        React, Next.js 15, Tailwind CSS, TypeScript, JavaScript, HTML5/CSS3
                      </div>
                      <div>
                        <strong className="block text-white print:text-black text-xs font-semibold mb-1">Backend</strong>
                        Node.js, Express.js, Django REST Framework, JWT Auth, Custom SMTP Server API
                      </div>
                      <div>
                        <strong className="block text-white print:text-black text-xs font-semibold mb-1">Mobile</strong>
                        React Native, Flutter / Dart
                      </div>
                      <div>
                        <strong className="block text-white print:text-black text-xs font-semibold mb-1">Database & Devops</strong>
                        MongoDB, PostgreSQL, Git/GitHub, Vercel Deployment, REST APIs
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
