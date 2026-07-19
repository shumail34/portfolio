"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Client-only wrapper helper
export default function HeroThreeCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 bg-[#070707]" />;
  }

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#7C3AED" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3B82F6" />
        
        {/* Glow Ring */}
        <GlowingRing />
        
        {/* Floating geometric particles */}
        <FloatingParticles count={120} />
        
        {/* 3D Glass Shapes */}
        <GlassShapes />
      </Canvas>
    </div>
  );
}

// 3D Glowing Torus Ring
function GlowingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    ringRef.current.rotation.x = t * 0.1;
    ringRef.current.rotation.y = t * 0.15;
    ringRef.current.position.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[2.5, 0.03, 16, 100]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#3B82F6"
        emissiveIntensity={4}
        roughness={0.1}
        metalness={0.9}
        wireframe
      />
    </mesh>
  );
}

// Sparkle particles moving in space
function FloatingParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate random positions
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = t * 0.01;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// 3D Glass geometries floating
function GlassShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Animate individual components
    groupRef.current.children.forEach((child, i) => {
      const speed = 0.2 + i * 0.1;
      child.rotation.x = t * speed * 0.5;
      child.rotation.y = t * speed;
      child.position.y = Math.sin(t * speed + i) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Floating Glass Torus */}
      <mesh position={[-2, 1.8, -1]} scale={[0.4, 0.4, 0.4]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshPhysicalMaterial
          color="#3B82F6"
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          metalness={0.1}
          clearcoat={1}
        />
      </mesh>

      {/* Floating Tetrahedron */}
      <mesh position={[2, -1.8, 0.5]} scale={[0.5, 0.5, 0.5]}>
        <tetrahedronGeometry args={[1]} />
        <meshPhysicalMaterial
          color="#7C3AED"
          roughness={0.2}
          transmission={0.85}
          thickness={0.8}
          metalness={0.05}
          clearcoat={0.8}
        />
      </mesh>

      {/* Floating Icosahedron */}
      <mesh position={[2.5, 1.5, -2]} scale={[0.3, 0.3, 0.3]}>
        <icosahedronGeometry args={[1]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.05}
          transmission={0.95}
          thickness={0.2}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}
