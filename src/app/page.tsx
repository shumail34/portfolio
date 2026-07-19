import React from "react";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/sections/Hero";

// Dynamically import heavy canvas and modal components to reduce initial payload
const CinematicBackground = dynamic(() => import("@/components/CinematicBackground"), { ssr: false });
const ResumeModal = dynamic(() => import("@/components/ResumeModal"), { ssr: false });
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Services from "@/sections/Services";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

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
