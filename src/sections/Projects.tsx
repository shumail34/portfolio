"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { PROJECTS } from "../constants/portfolio";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function getEmbedUrl(url: string | null): string | undefined {
  if (!url) return undefined;

  // YouTube URLs
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("youtube.com/embed/")) {
      return url;
    }
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0] || "";
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  }

  // Loom URLs
  if (url.includes("loom.com")) {
    if (url.includes("loom.com/embed/")) {
      return url;
    }
    const id = url.split("/share/")[1]?.split("?")[0] || "";
    return id ? `https://www.loom.com/embed/${id}?autoplay=1` : url;
  }

  // Vimeo URLs
  if (url.includes("vimeo.com")) {
    if (url.includes("player.vimeo.com/video/")) {
      return url;
    }
    const id = url.split("vimeo.com/")[1]?.split("?")[0] || "";
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : url;
  }

  return undefined; // Render native video tag if not standard embeddable host
}

export default function Projects() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary-color uppercase mb-4 block">
              Case Studies
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
              Featured Work.
            </h2>
          </div>
          <p className="text-muted-text text-base max-w-sm">
            A small, highly curated selection of premium platforms engineered for scale and speed.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              className="glass-panel rounded-3xl overflow-hidden flex flex-col group interactive-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              {/* Project Screenshot / Video Play Overlay Area */}
              <div className="relative aspect-video w-full overflow-hidden bg-secondary-bg border-b border-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100"
                />
                
                {/* Glow Overlay on Card Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Play Button Overlay on Hover */}
                {project.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedVideo(project.videoUrl);
                      }}
                      className="p-4 rounded-full bg-primary-color/90 hover:bg-primary-color text-black shadow-lg hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
                      title="Watch Project Video Demo"
                    >
                      <PlayIcon className="w-6 h-6 fill-current text-black" />
                    </button>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-muted-text"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-primary-color transition-colors inline-block">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="text-xs font-semibold text-primary-color mt-1 opacity-90 uppercase tracking-wider">
                      {project.subtitle}
                    </p>
                  )}
                </div>
                
                <p className="text-sm text-muted-text leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                {/* Project Links */}
                <div className="flex items-center gap-4 pt-4 mt-auto border-t border-white/5">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-primary-color transition-colors"
                  >
                    Live Demo
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {project.videoUrl && (
                    <button
                      onClick={() => setSelectedVideo(project.videoUrl)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-color hover:text-white transition-colors cursor-pointer"
                    >
                      <PlayIcon className="w-3 h-3 fill-current" />
                      Watch Video
                    </button>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-text hover:text-white transition-colors ml-auto"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setSelectedVideo(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-video bg-[#0c0c0c] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 z-20 cursor-pointer"
                aria-label="Close video"
              >
                <XIcon className="w-5 h-5 text-white" />
              </button>

              {/* Video Content */}
              <div className="w-full h-full p-2 md:p-4">
                {getEmbedUrl(selectedVideo) ? (
                  <iframe
                    src={getEmbedUrl(selectedVideo)}
                    title="Project Video Walkthrough"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full rounded-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                ) : (
                  <video
                    src={selectedVideo || undefined}
                    controls
                    autoPlay
                    className="w-full h-full rounded-2xl"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
