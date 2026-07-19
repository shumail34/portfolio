import React from "react";
import Navbar from "@/components/Navbar";
import CinematicBackground from "@/components/CinematicBackground";
import SmoothScroll from "@/components/SmoothScroll";
import ResumeModal from "@/components/ResumeModal";
import Hero from "@/sections/Hero";
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
