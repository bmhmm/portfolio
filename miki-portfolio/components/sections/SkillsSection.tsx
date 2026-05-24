"use client";

import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Skill {
  name: string;
  level: number; // 0–100
  icon: string;  // inline SVG path or emoji fallback
}

interface SkillCategory {
  id: string;
  label: string;
  accent: string;       // tailwind color token (used via inline style)
  accentHex: string;    // raw hex for glow / gradient
  icon: React.ReactNode;
  skills: Skill[];
}

// ─── Icon Components (pure SVG, zero external deps) ──────────────────────────

const Icons = {
  Frontend: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 6l8-4 8 4v12l-8 4-8-4V6z" strokeLinejoin="round"/>
      <path d="M12 2v20M4 6l8 4 8-4" strokeLinejoin="round"/>
    </svg>
  ),
  Backend: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="3" width="20" height="5" rx="1"/>
      <rect x="2" y="10" width="20" height="5" rx="1"/>
      <rect x="2" y="17" width="20" height="4" rx="1"/>
      <circle cx="6" cy="5.5" r="1" fill="currentColor"/>
      <circle cx="6" cy="12.5" r="1" fill="currentColor"/>
      <circle cx="6" cy="19" r="1" fill="currentColor"/>
    </svg>
  ),
  Blockchain: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  Database: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.657-4.03 3-9 3s-9-1.343-9-3"/>
      <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/>
    </svg>
  ),
  Tools: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
};

// ─── Skills Data ──────────────────────────────────────────────────────────────

const CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    accent: "cyan",
    accentHex: "#06b6d4",
    icon: Icons.Frontend,
    skills: [
      { name: "React", level: 95, icon: "⚛" },
      { name: "Next.js", level: 92, icon: "▲" },
      { name: "TypeScript", level: 90, icon: "𝑇𝑆" },
      { name: "Tailwind CSS", level: 93, icon: "🌊" },
      { name: "Framer Motion", level: 85, icon: "✦" },
      { name: "Three.js", level: 72, icon: "🔷" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    accent: "violet",
    accentHex: "#8b5cf6",
    icon: Icons.Backend,
    skills: [
      { name: "Node.js", level: 90, icon: "🟢" },
      { name: "Rust", level: 70, icon: "⚙" },
      { name: "Go", level: 75, icon: "🐹" },
      { name: "GraphQL", level: 85, icon: "◈" },
      { name: "tRPC", level: 82, icon: "🔗" },
      { name: "WebSockets", level: 88, icon: "⚡" },
    ],
  },
  {
    id: "blockchain",
    label: "Blockchain",
    accent: "amber",
    accentHex: "#f59e0b",
    icon: Icons.Blockchain,
    skills: [
      { name: "Solidity", level: 88, icon: "Ξ" },
      { name: "Ethers.js", level: 85, icon: "🔷" },
      { name: "Hardhat", level: 80, icon: "🪖" },
      { name: "IPFS", level: 74, icon: "🌐" },
      { name: "Wagmi", level: 82, icon: "✊" },
      { name: "zkProofs", level: 65, icon: "🔐" },
    ],
  },
  {
    id: "database",
    label: "Database",
    accent: "emerald",
    accentHex: "#10b981",
    icon: Icons.Database,
    skills: [
      { name: "PostgreSQL", level: 88, icon: "🐘" },
      { name: "Redis", level: 85, icon: "🔴" },
      { name: "MongoDB", level: 82, icon: "🍃" },
      { name: "Prisma", level: 90, icon: "◆" },
      { name: "Drizzle", level: 80, icon: "💧" },
      { name: "ClickHouse", level: 68, icon: "⬡" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    accent: "rose",
    accentHex: "#f43f5e",
    icon: Icons.Tools,
    skills: [
      { name: "Docker", level: 88, icon: "🐋" },
      { name: "Kubernetes", level: 72, icon: "☸" },
      { name: "GitHub Actions", level: 85, icon: "⚙" },
      { name: "Turborepo", level: 80, icon: "🚀" },
      { name: "Vercel", level: 92, icon: "▲" },
      { name: "Terraform", level: 68, icon: "🏗" },
    ],
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const skillRowVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillBar({ level, accentHex }: { level: number; accentHex: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative h-1 w-full rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.07)" }}>
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{
          background: `linear-gradient(90deg, ${accentHex}99, ${accentHex})`,
          boxShadow: `0 0 8px ${accentHex}88`,
        }}
      />
    </div>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-default select-none"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: `1px solid ${hovered ? category.accentHex + "55" : "rgba(255,255,255,0.08)"}`,
        backdropFilter: "blur(16px)",
        boxShadow: hovered
          ? `0 0 40px ${category.accentHex}22, 0 0 80px ${category.accentHex}0d, inset 0 1px 0 rgba(255,255,255,0.1)`
          : "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        transition: "box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* Glow blob on hover */}
      <motion.div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(circle, ${category.accentHex}22 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Scan-line decoration */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)",
        }}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            animate={{ boxShadow: hovered ? `0 0 20px ${category.accentHex}66` : "none" }}
            transition={{ duration: 0.4 }}
            style={{
              background: `linear-gradient(135deg, ${category.accentHex}22, ${category.accentHex}11)`,
              border: `1px solid ${category.accentHex}44`,
              color: category.accentHex,
            }}
          >
            {category.icon}
          </motion.div>
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-0.5"
              style={{ color: category.accentHex + "aa" }}>
              0{CATEGORIES.findIndex(c => c.id === category.id) + 1}
            </p>
            <h3 className="text-white font-bold text-lg leading-none tracking-tight"
              style={{ fontFamily: "'Rajdhani', 'Orbitron', monospace" }}>
              {category.label}
            </h3>
          </div>
          {/* Corner accent */}
          <div className="ml-auto w-2 h-2 rounded-full animate-pulse"
            style={{ background: category.accentHex, boxShadow: `0 0 8px ${category.accentHex}` }} />
        </div>

        {/* Divider */}
        <div className="mb-5 h-px w-full"
          style={{ background: `linear-gradient(90deg, ${category.accentHex}33, transparent)` }} />

        {/* Skills list */}
        <motion.ul
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {category.skills.map((skill) => (
            <motion.li key={skill.name} variants={skillRowVariants}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none" style={{ fontFamily: "monospace" }}>
                    {skill.icon}
                  </span>
                  <span className="text-sm font-medium text-white/80 tracking-wide">
                    {skill.name}
                  </span>
                </div>
                <span className="text-xs font-mono tabular-nums"
                  style={{ color: category.accentHex + "cc" }}>
                  {skill.level}%
                </span>
              </div>
              <SkillBar level={skill.level} accentHex={category.accentHex} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-center mb-16"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-xs font-mono tracking-[0.4em] uppercase text-cyan-400/60 mb-4">
        &gt; system.query(skills)
      </p>
      <h2
        className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-4"
        style={{ fontFamily: "'Rajdhani', 'Orbitron', monospace" }}
      >
        TECH&nbsp;
        <span
          className="relative inline-block"
          style={{
            background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          STACK
        </span>
      </h2>
      <p className="text-white/40 text-sm font-mono max-w-md mx-auto">
        Tooling, frameworks and protocols powering production systems
      </p>

      {/* Decorative line */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-cyan-500/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-violet-500/40" />
      </div>
    </motion.div>
  );
}

// ─── Background Effects ───────────────────────────────────────────────────────

function BackgroundGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Corner blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #06b6d422, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #8b5cf622, transparent 70%)", filter: "blur(60px)" }} />
      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-10"
        style={{ background: "linear-gradient(90deg, transparent, #06b6d4, transparent)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ─── Filter Tabs ──────────────────────────────────────────────────────────────

function FilterTabs({
  active,
  onChange,
}: {
  active: string | null;
  onChange: (id: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {[{ id: null, label: "ALL" }, ...CATEGORIES.map(c => ({ id: c.id, label: c.label }))].map(tab => {
        const cat = CATEGORIES.find(c => c.id === tab.id);
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id ?? "all"}
            onClick={() => onChange(tab.id)}
            className="relative px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300"
            style={{
              background: isActive
                ? cat ? `${cat.accentHex}22` : "rgba(6,182,212,0.15)"
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${isActive ? (cat?.accentHex ?? "#06b6d4") + "55" : "rgba(255,255,255,0.08)"}`,
              color: isActive ? (cat?.accentHex ?? "#06b6d4") : "rgba(255,255,255,0.4)",
              boxShadow: isActive ? `0 0 16px ${(cat?.accentHex ?? "#06b6d4")}22` : "none",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? CATEGORIES.filter(c => c.id === activeFilter)
    : CATEGORIES;

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "#050812" }}
    >
      {/* Font imports via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      <BackgroundGrid />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader />

        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        <motion.div
          key={activeFilter ?? "all"}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filtered.map(category => (
            <SkillCard key={category.id} category={category} />
          ))}
        </motion.div>

        {/* Bottom status bar */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>SKILLS_COUNT: {CATEGORIES.reduce((n, c) => n + c.skills.length, 0)}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>CATEGORIES: {CATEGORIES.length}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-cyan-500/40">STATUS: OPERATIONAL</span>
        </motion.div>
      </div>
    </section>
  );
}