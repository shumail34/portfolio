"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle transparent background vs glass backdrop
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Handle show/hide navbar on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down, hide
      } else {
        setIsVisible(true); // Scrolling up, show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Services", id: "services" },
    { name: "Contact", id: "contact" },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const event = new CustomEvent("scroll-to-section", { detail: id });
    window.dispatchEvent(event);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#070707]/75 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleScrollTo("home")}
            className="group flex items-center gap-2 cursor-pointer font-display text-xl font-bold tracking-tight text-white"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden group-hover:scale-105 transition-transform flex-shrink-0">
              <Image src="/logo.png" alt="Muhammad Shumail Logo" fill className="object-cover" />
            </div>
            <span>Shumail<span className="text-primary-color">.</span></span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="relative py-2 text-sm text-muted-text font-medium hover:text-white transition-colors duration-300 cursor-pointer group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-color to-primary-color transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Resume CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume"))}
              className="relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 interactive-card cursor-pointer"
            >
              Resume
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-text" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-[72px] bg-[#070707]/95 backdrop-blur-lg z-30 md:hidden flex flex-col p-8 border-t border-white/5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-6 my-auto items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className="text-2xl font-semibold text-muted-text hover:text-white transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("open-resume"));
                }}
                className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-accent-color to-primary-color hover:opacity-90 transition-opacity cursor-pointer"
              >
                Download Resume
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
