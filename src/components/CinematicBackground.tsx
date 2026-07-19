"use client";

import React, { useEffect, useRef } from "react";

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener("resize", resizeCanvas);

    const createParticles = () => {
      // Optimized density for smooth 60fps performance alongside Lenis
      const density = Math.min(85, Math.floor((canvas.width * canvas.height) / 18000));
      particles = [];
      for (let i = 0; i < density; i++) {
        // Randomly assign blue or purple color type
        const isPurple = Math.random() > 0.5;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 1.5, // Larger size: 1.5px to 4px
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.2) * 0.2,
          opacity: Math.random() * 0.6 + 0.3, // Brighter opacity: 0.3 to 0.9
          fadeSpeed: (Math.random() * 0.003) + 0.001,
          color: isPurple ? "124, 58, 237" : "59, 130, 246", // Purple vs Blue
        });
      }
    };

    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around screens
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Animate opacity (breathing glow)
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.9 || p.opacity < 0.25) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.fill();

        // Connect close particles (Constellation Effect)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // More visible lines: max 0.25 opacity
            const lineOpacity = (1 - distance / 130) * 0.22;
            // Mix stroke colors or use purple
            ctx.strokeStyle = `rgba(124, 58, 237, ${lineOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to Mouse if close
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < 200) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const mouseLineOpacity = (1 - distMouse / 200) * 0.45;
          ctx.strokeStyle = `rgba(59, 130, 246, ${mouseLineOpacity})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Slight magnetic pull towards mouse
          p.x -= dxMouse * 0.006;
          p.y -= dyMouse * 0.006;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#070707]">
      {/* Dynamic particles network */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Blurred background blobs */}
      <div className="bg-blob bg-blob-blue top-[-10%] left-[-10%]" />
      <div className="bg-blob bg-blob-purple bottom-[10%] right-[-10%]" />
      
      {/* Moving overlay grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] animate-[pulse_4s_ease-in-out_infinite]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }}
      />
    </div>
  );
}

