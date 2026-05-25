"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  id: number;
  x: number;          // % of container width
  size: number;       // px
  duration: number;   // seconds for one rise cycle
  delay: number;      // initial stagger delay
  opacity: number;    // base opacity
  blur: number;       // px blur for glow
  drift: number;      // horizontal drift amplitude in %
  driftSpeed: number; // drift cycle duration in seconds
}

interface MousePos {
  x: number;
  y: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 30; // Reduced count for better performance

const COLORS = [
  "rgba(0,191,255,VAR)",    // deep sky blue
  "rgba(0,128,255,VAR)",    // electric blue
  "rgba(64,224,255,VAR)",   // cyber cyan
  "rgba(120,80,255,VAR)",   // neon violet (accent)
  "rgba(0,255,200,VAR)",    // matrix teal (rare)
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),
    size: randomBetween(3, 8),
    duration: randomBetween(6, 15), // Faster rise time
    delay: randomBetween(0, 5),
    opacity: randomBetween(0.4, 0.9),
    blur: randomBetween(2, 6),
    drift: randomBetween(0.5, 3),
    driftSpeed: randomBetween(5, 12),
  }));
}

// ─── Single Particle ──────────────────────────────────────────────────────────

function ParticleNode({
  particle,
  mouse,
  containerSize,
}: {
  particle: Particle;
  mouse: MousePos;
  containerSize: { w: number; h: number };
}) {
  const color = COLORS[particle.id % COLORS.length].replace(
    "VAR",
    String(particle.opacity)
  );
  const colorDim = COLORS[particle.id % COLORS.length].replace("VAR", "0.3");

  // Random horizontal drift animation
  const driftX = useCallback(() => {
    const amplitude = particle.drift;
    return [0, amplitude, -amplitude, 0];
  }, [particle.drift]);

  // Mouse repulsion: push away when within 120px
  const [nudgeX, setNudgeX] = useState(0);
  const [nudgeY, setNudgeY] = useState(0);

  useEffect(() => {
    if (!containerSize.w || !containerSize.h) return;
    
    // This is a simplified version - for real-time mouse tracking,
    // you'd need to update this in an animation frame
    const dx = mouse.x - (particle.x / 100) * containerSize.w;
    const dy = mouse.y - (containerSize.h * 0.9); // Approximate particle Y
    const dist = Math.sqrt(dx * dx + dy * dy);
    const repulseRadius = 120;
    
    if (dist < repulseRadius && dist > 0) {
      const force = ((repulseRadius - dist) / repulseRadius) * 15;
      setNudgeX((dx / dist) * force);
      setNudgeY((dy / dist) * force);
    } else {
      setNudgeX(0);
      setNudgeY(0);
    }
  }, [mouse, particle.x, containerSize]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${particle.x}%`,
        width: particle.size,
        height: particle.size,
        background: color,
        boxShadow: `0 0 ${particle.blur * 2}px ${particle.blur}px ${color}, 0 0 ${particle.blur * 4}px ${particle.blur}px ${colorDim}`,
        filter: `blur(${particle.blur * 0.3}px)`,
        willChange: "transform",
        x: nudgeX,
        y: nudgeY,
      }}
      animate={{
        y: ["100%", "-10%"], // Start from bottom (100%), end at top (-10%)
        x: driftX(),
        opacity: [0, particle.opacity, particle.opacity, 0],
        scale: [0.3, 1, 1, 0.5],
      }}
      transition={{
        y: {
          duration: particle.duration,
          repeat: Infinity,
          delay: particle.delay,
          ease: "linear",
          repeatType: "loop",
        },
        x: {
          duration: particle.driftSpeed,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        },
        opacity: {
          duration: particle.duration,
          repeat: Infinity,
          delay: particle.delay,
          times: [0, 0.1, 0.7, 1],
          ease: "easeInOut",
        },
        scale: {
          duration: particle.duration,
          repeat: Infinity,
          delay: particle.delay,
          times: [0, 0.1, 0.7, 1],
          ease: "easeInOut",
        },
      }}
    />
  );
}

// ─── Decorative Layers ────────────────────────────────────────────────────────

function CyberGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,191,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,191,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      }}
    />
  );
}

function AmbientGlows() {
  return (
    <>
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "0%",
          left: "0%",
          width: "100%",
          height: "30%",
          background: "radial-gradient(ellipse at bottom, rgba(0,128,255,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-5%",
          right: "0%",
          width: "35%",
          height: "40%",
          background: "radial-gradient(ellipse, rgba(100,0,255,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </>
  );
}

function Scanlines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }}
    />
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ParticleBackground({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(buildParticles(PARTICLE_COUNT));
  }, []);

  const [mouse, setMouse] = useState<MousePos>({ x: -9999, y: -9999 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Track container size for repulsion math
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerSize({
        w: entry.contentRect.width,
        h: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // RAF-throttled mouse tracking
  const rafRef = useRef<number | null>(null);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
        rafRef.current = null;
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: -9999, y: -9999 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: "radial-gradient(ellipse at 50% 100%, #050d1a 0%, #020810 40%, #000508 100%)",
        minHeight: "1vh",
      }}
    >
      {/* Ambient depth */}
      <AmbientGlows />

      {/* Perspective grid */}
      <CyberGrid />

      {/* Rising particles - spawning from bottom */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <ParticleNode
            key={p.id}
            particle={p}
            mouse={mouse}
            containerSize={containerSize}
          />
        ))}
      </div>

      {/* Bottom glow effect to emphasize spawning point */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-5"
        style={{
          height: "100px",
          background: "linear-gradient(to top, rgba(0,128,255,0.1), transparent)",
        }}
      />

      {/* CRT scanlines */}
      <Scanlines />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Slot for page content */}
      {children && <div className="relative z-20">{children}</div>}
    </div>
  );
}

