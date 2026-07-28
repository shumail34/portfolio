import React from "react";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/sections/Hero";

import dynamic from "next/dynamic";
import CinematicBackground from "@/components/CinematicBackground";
import ResumeModal from "@/components/ResumeModal";

// Dynamically import below-the-fold components for extreme performance
const About = dynamic(() => import("@/sections/About"), { ssr: true });
const Skills = dynamic(() => import("@/sections/Skills"), { ssr: true });
const Projects = dynamic(() => import("@/sections/Projects"), { ssr: true });
const Services = dynamic(() => import("@/sections/Services"), { ssr: true });
const Contact = dynamic(() => import("@/sections/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/sections/Footer"), { ssr: true });

export default function Home() {
  return (
    <SmoothScroll>
      <CinematicBackground />
      <Navbar />
      <ResumeModal />
      <main className="relative min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
