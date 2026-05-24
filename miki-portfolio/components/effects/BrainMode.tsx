"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";


// ─── Font import ──────────────────────────────────────────────────────────────
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=IBM+Plex+Mono:wght@300;400&display=swap');`;

// ─── Constants ────────────────────────────────────────────────────────────────

const KEYWORDS = [
  { text: "Solidity",   color: "#94a3b8", glow: "#64748b" },
  { text: "Next.js",    color: "#e2e8f0", glow: "#94a3b8" },
  { text: "TypeScript", color: "#60a5fa", glow: "#3b82f6" },
  { text: "Supabase",   color: "#34d399", glow: "#10b981" },
  { text: "Web3",       color: "#a78bfa", glow: "#8b5cf6" },
  { text: "DeFi",       color: "#fb923c", glow: "#f97316" },
  { text: "React",      color: "#67e8f9", glow: "#22d3ee" },
  { text: "Node.js",    color: "#86efac", glow: "#4ade80" },
];

const NODE_COUNT = 38;
const CONNECTION_RADIUS = 180;
const PARTICLE_COUNT = 22;

// ─── Types ────────────────────────────────────────────────────────────────────

interface NodeData {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  pulseDelay: number;
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface KeywordData {
  id: number;
  text: string;
  color: string;
  glow: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  amplitude: number;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface BrainModeContextValue {
  active: boolean;
  toggle: () => void;
}

const BrainModeContext = createContext<BrainModeContextValue>({
  active: false,
  toggle: () => {},
});

export function useBrainMode() {
  return useContext(BrainModeContext);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function seededNodes(): NodeData[] {
  return Array.from({ length: NODE_COUNT }, (_, i) => ({
    id: i,
    x: rand(2, 98),
    y: rand(2, 98),
    vx: (Math.random() - 0.5) * 0.012,
    vy: (Math.random() - 0.5) * 0.012,
    r: rand(1.5, 3.8),
    opacity: rand(0.3, 0.9),
    pulseDelay: rand(0, 6),
  }));
}

function seededParticles(): ParticleData[] {
  const palette = ["#22d3ee", "#818cf8", "#34d399", "#f472b6", "#60a5fa"];
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: rand(0, 100),
    y: rand(0, 100),
    size: rand(1.5, 4),
    duration: rand(8, 20),
    delay: rand(0, 12),
    color: palette[i % palette.length],
  }));
}

function seededKeywords(): KeywordData[] {
  // Deliberately place keywords so they don't cluster
  const positions = [
    { x: 8,  y: 15 }, { x: 75, y: 10 }, { x: 88, y: 40 },
    { x: 80, y: 78 }, { x: 12, y: 80 }, { x: 6,  y: 50 },
    { x: 50, y: 5  }, { x: 45, y: 90 },
  ];
  return KEYWORDS.map((kw, i) => ({
    id: i,
    ...kw,
    x: positions[i % positions.length].x,
    y: positions[i % positions.length].y,
    duration: rand(14, 26),
    delay: rand(0, 8),
    amplitude: rand(12, 28),
  }));
}

// ─── Neural Canvas ────────────────────────────────────────────────────────────

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<NodeData[]>(seededNodes());
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(ts: number) {
      if (!canvas || !ctx) return;
      timeRef.current = ts * 0.001;
      const t = timeRef.current;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 100) n.vx *= -1;
        if (n.y < 0 || n.y > 100) n.vy *= -1;
        n.x = Math.max(0, Math.min(100, n.x));
        n.y = Math.max(0, Math.min(100, n.y));
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ni = nodes[i], nj = nodes[j];
          const dx = (ni.x - nj.x) / 100 * W;
          const dy = (ni.y - nj.y) / 100 * H;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_RADIUS) {
            const alpha = (1 - dist / CONNECTION_RADIUS) * 0.28;
            const pulse = 0.85 + 0.15 * Math.sin(t * 0.9 + ni.pulseDelay);
            ctx.beginPath();
            ctx.moveTo(ni.x / 100 * W, ni.y / 100 * H);
            ctx.lineTo(nj.x / 100 * W, nj.y / 100 * H);
            const grad = ctx.createLinearGradient(
              ni.x / 100 * W, ni.y / 100 * H,
              nj.x / 100 * W, nj.y / 100 * H
            );
            grad.addColorStop(0, `rgba(34,211,238,${alpha * pulse})`);
            grad.addColorStop(0.5, `rgba(129,140,248,${alpha * pulse * 0.6})`);
            grad.addColorStop(1, `rgba(34,211,238,${alpha * pulse * 0.3})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const px = n.x / 100 * W;
        const py = n.y / 100 * H;
        const pulse = 0.7 + 0.3 * Math.sin(t * 1.2 + n.pulseDelay);
        const alpha = n.opacity * pulse;

        // Outer glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, n.r * 5);
        grd.addColorStop(0, `rgba(34,211,238,${alpha * 0.35})`);
        grd.addColorStop(1, "rgba(34,211,238,0)");
        ctx.beginPath();
        ctx.arc(px, py, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
    />
  );
}

// ─── Floating Particles ───────────────────────────────────────────────────────

function FloatingParticles() {
  const particles = useMemo(() => seededParticles(), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{
            y: [`${p.y}%`, `${p.y - 30}%`, `${p.y}%`],
            opacity: [0, 0.7, 0.4, 0.7, 0],
            scale: [0.5, 1, 0.8, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Floating Keywords ────────────────────────────────────────────────────────

function FloatingKeywords() {
  const keywords = useMemo(() => seededKeywords(), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {keywords.map(kw => (
        <motion.div
          key={kw.id}
          className="absolute"
          style={{ left: `${kw.x}%`, top: `${kw.y}%` }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: [0, 0.65, 0.45, 0.65, 0],
            y: [0, -kw.amplitude, 0],
            scale: [0.85, 1, 0.92, 1, 0.85],
          }}
          transition={{
            duration: kw.duration,
            delay: kw.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span
            className="text-xs font-mono tracking-widest uppercase whitespace-nowrap"
            style={{
              color: kw.color,
              fontFamily: "'IBM Plex Mono', monospace",
              textShadow: `0 0 16px ${kw.glow}, 0 0 32px ${kw.glow}55`,
              fontSize: "10px",
              letterSpacing: "0.18em",
            }}
          >
            {kw.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Cursor Glow ─────────────────────────────────────────────────────────────

function CursorGlow() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const springX = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 380,
        height: 380,
        background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, rgba(129,140,248,0.04) 40%, transparent 70%)",
      }}
    />
  );
}

// ─── Overlay Vignette ─────────────────────────────────────────────────────────

function OverlayVignette() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(1,6,15,0.65) 100%)",
      }}
    />
  );
}

// ─── Top Status Bar ───────────────────────────────────────────────────────────

function StatusBar({ onClose }: { onClose: () => void }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 py-3"
      style={{
        background: "linear-gradient(180deg, rgba(1,6,15,0.92) 0%, transparent 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Left — brand */}
      <div className="flex items-center gap-3">
        <div className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
        </div>
        <span
          className="text-[10px] tracking-[0.3em] uppercase text-cyan-400/80"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          brain.mode — active
        </span>
      </div>

      {/* Center — ticker */}
      <AnimatePresence mode="wait">
        <motion.span
          key={tick}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35 }}
          className="hidden sm:block text-[9px] tracking-[0.22em] uppercase text-white/20"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {["FOCUS PROTOCOL ENGAGED", "NEURAL NET ACTIVE", "DEEP WORK INITIATED", "SIGNAL STRONG", "STACK LOADED"][tick % 5]}
        </motion.span>
      </AnimatePresence>

      {/* Right — close */}
      <button
        onClick={onClose}
        className="group flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-1.5 text-[10px] tracking-widest uppercase text-white/40 transition-all duration-200 hover:border-white/20 hover:text-white/70"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        <span>EXIT</span>
        <span className="text-[11px]">⌥B</span>
      </button>
    </motion.div>
  );
}

// ─── Bottom HUD ───────────────────────────────────────────────────────────────

function BottomHud() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { label: "NODES", val: NODE_COUNT.toString() },
    { label: "FREQ", val: "88Hz" },
    { label: "DEPTH", val: "∞" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-[1000] flex items-end justify-between px-6 pb-4"
      style={{ pointerEvents: "none" }}
    >
      {/* Left stats */}
      <div className="flex items-center gap-5">
        {stats.map(s => (
          <div key={s.label} className="text-left">
            <div
              className="text-[8px] tracking-[0.25em] uppercase text-white/20"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {s.label}
            </div>
            <div
              className="text-[13px] font-medium tabular-nums text-white/40"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {s.val}
            </div>
          </div>
        ))}
      </div>

      {/* Right — clock */}
      <div
        className="text-[13px] tabular-nums text-white/30"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {time}
      </div>
    </motion.div>
  );
}

// ─── Corner Brackets ─────────────────────────────────────────────────────────

function CornerBrackets() {
  const corners = [
    { top: 60, left: 60, rotate: 0 },
    { top: 60, right: 60, rotate: 90 },
    { bottom: 60, right: 60, rotate: 180 },
    { bottom: 60, left: 60, rotate: 270 },
  ] as const;

  return (
    <>
      {corners.map((pos, i) => (
        <motion.div
          key={i}
          className="fixed z-[900] pointer-events-none"
          style={{ ...pos }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            width="28" height="28" viewBox="0 0 28 28" fill="none"
            style={{ transform: `rotate(${pos.rotate}deg)` }}
          >
            <path d="M2 26 L2 2 L26 2" stroke="rgba(34,211,238,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
            <circle cx="2" cy="2" r="2" fill="rgba(34,211,238,0.5)"/>
          </svg>
        </motion.div>
      ))}
    </>
  );
}

// ─── Glassmorphism Panel (center decoration) ─────────────────────────────────

function CenterPanel() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[800] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    >
      <div
        className="relative flex flex-col items-center gap-2 rounded-3xl px-10 py-6"
        style={{
          background: "rgba(1,6,15,0.35)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(34,211,238,0.08)",
          boxShadow: "0 0 60px rgba(34,211,238,0.05), inset 0 0 40px rgba(34,211,238,0.02)",
        }}
      >
        {/* Top thin line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px rounded-full"
          style={{
            width: "60%",
            background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)",
          }}
        />

        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-[9px] tracking-[0.4em] uppercase text-cyan-400/70"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          ◈ focus mode
        </motion.div>

        <div
          className="text-[11px] tracking-[0.15em] text-white/20"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          neural network active
        </div>

        {/* Bottom thin line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px rounded-full"
          style={{
            width: "40%",
            background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.4), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Full BrainMode Overlay ───────────────────────────────────────────────────

function BrainModeOverlay({ onClose }: { onClose: () => void }) {
  // Keyboard shortcut: Alt+B to exit
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "b") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[700]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: "rgba(1,6,15,0.96)" }}
    >
      {/* Neural canvas */}
      <NeuralCanvas />

      {/* Atmospheric gradient overlays */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 50% 60% at 20% 30%, rgba(34,211,238,0.04) 0%, transparent 70%)",
            "radial-gradient(ellipse 50% 60% at 80% 70%, rgba(129,140,248,0.04) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(52,211,153,0.02) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* Vignette */}
      <OverlayVignette />

      {/* Floating elements */}
      <FloatingParticles />
      <FloatingKeywords />

      {/* Cursor glow */}
      <CursorGlow />

      {/* UI chrome */}
      <StatusBar onClose={onClose} />
      <CornerBrackets />
      <BottomHud />

      {/* Center glass panel — fades out after 4s */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 3.5 }}
      >
        <CenterPanel />
      </motion.div>
    </motion.div>
  );
}

// ─── Toggle Button ────────────────────────────────────────────────────────────

export function BrainModeToggle() {
  const { active, toggle } = useBrainMode();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={toggle}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors duration-300"
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        letterSpacing: "0.12em",
        border: active ? "1px solid rgba(34,211,238,0.35)" : "1px solid rgba(255,255,255,0.08)",
        background: active
          ? "linear-gradient(135deg, rgba(34,211,238,0.1), rgba(129,140,248,0.08))"
          : "rgba(255,255,255,0.03)",
        color: active ? "#22d3ee" : "rgba(255,255,255,0.45)",
        boxShadow: active ? "0 0 24px rgba(34,211,238,0.15), inset 0 0 12px rgba(34,211,238,0.04)" : "none",
      }}
    >
      {/* Shimmer sweep on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ x: hovered ? "100%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.08), transparent)",
          width: "60%",
        }}
      />

      {/* Icon */}
      <motion.svg
  viewBox="0 0 20 20"
  fill="none"
  className="h-4 w-4 shrink-0"
  animate={active ? { rotate: [0, 360] } : { rotate: 0 }}
  transition={active ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
>
  {/* Brain-like shape simplified */}
  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
  <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.8"/>
  {[0, 60, 120, 180, 240, 300].map((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    // Round to 10 decimal places to ensure consistency
    const x1 = Number((10 + 3 * Math.cos(rad)).toFixed(10));
    const y1 = Number((10 + 3 * Math.sin(rad)).toFixed(10));
    const x2 = Number((10 + 7.5 * Math.cos(rad)).toFixed(10));
    const y2 = Number((10 + 7.5 * Math.sin(rad)).toFixed(10));
    
    return (
      <line 
        key={i} 
        x1={x1} 
        y1={y1} 
        x2={x2} 
        y2={y2}
        stroke="currentColor" 
        strokeWidth="0.8" 
        opacity="0.5"
      />
    );
  })}
</motion.svg>

      <span className="relative">{active ? "BRAIN.EXIT" : "BRAIN.MODE"}</span>

      {active && (
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="h-1.5 w-1.5 rounded-full bg-cyan-400"
          style={{ boxShadow: "0 0 6px #22d3ee" }}
        />
      )}
    </motion.button>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function BrainModeProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const toggle = useCallback(() => setActive(v => !v), []);

  // Keyboard shortcut: Alt+B to toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "b") toggle();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggle]);

  // Lock body scroll when active
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <BrainModeContext.Provider value={{ active, toggle }}>
      <style>{FONT_IMPORT}</style>
      {children}
      <AnimatePresence>
        {active && <BrainModeOverlay key="brain-overlay" onClose={() => setActive(false)} />}
      </AnimatePresence>
    </BrainModeContext.Provider>
  );
}

// ─── Demo Page ────────────────────────────────────────────────────────────────
// Remove this export and use BrainModeProvider + BrainModeToggle in your own layout.

export default function BrainModeDemo() {
  return (
    <BrainModeProvider>
      <DemoContent />
    </BrainModeProvider>
  );
}

function DemoContent() {
  const { active } = useBrainMode();

  return (
    <div
      id="brain-mode"
      className="relative min-h-screen overflow-hidden bg-[#01060f]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Background grid */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid " x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#22d3ee" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.05] blur-[120px] bg-cyan-400" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-cyan-400/50" />
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-cyan-400/60"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            developer.portfolio
          </span>
          <span className="h-px w-8 bg-cyan-400/50" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-3 text-5xl font-semibold leading-tight tracking-tight text-white"
          style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}
        >
          Build the future.
          <br />
          <span
            style={{
              background: "linear-gradient(90deg,#22d3ee,#818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            On-chain.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mb-10 max-w-md text-sm leading-relaxed text-white/35"
        >
          Full-stack engineer focused on Web3, DeFi protocols, and premium interfaces.
          Press{" "}
          <kbd
            className="rounded border border-white/10 px-1.5 py-0.5 text-[10px]"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.5)" }}
          >
            ⌥B
          </kbd>{" "}
          or click below to enter focus mode.
        </motion.p>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          <BrainModeToggle />
        </motion.div>

        {/* Status indicator */}
        <AnimatePresence>
          {active && (
            <motion.p
              key="active-hint"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 text-[10px] tracking-widest uppercase text-cyan-400/50"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Press ⌥B to exit
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}