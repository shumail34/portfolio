"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const dotXSpring = useSpring(cursorX, { damping: 40, stiffness: 400 });
  const dotYSpring = useSpring(cursorY, { damping: 40, stiffness: 400 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    // Track clickables
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .interactive-card');
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    // Watch for DOM changes to attach listeners
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
      
      const clickables = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .interactive-card');
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  // Disable on touch screens
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Primary ring cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border border-purple-500 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? "rgba(59, 130, 246, 0.8)" : "rgba(124, 58, 237, 0.8)",
          backgroundColor: isHovered ? "rgba(59, 130, 246, 0.1)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />
      {/* Inner dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          scale: isHovered ? 0 : 1,
          left: 7,
          top: 7,
        }}
      />
    </>
  );
}
