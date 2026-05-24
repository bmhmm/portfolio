"use client";

import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  index: number;               // display number, e.g. 01
  title: string;
  description: string;
  techStack: string[];
  accentHex: string;           // card glow / badge color
  imageAlt?: string;
  githubUrl: string;
  liveUrl: string;
  /** Optional: pass a real image src; defaults to a gradient placeholder */
  imageSrc?: string;
  featured?: boolean;
}

// ─── Placeholder Data (replace each object with real project data) ────────────

const PROJECTS: Project[] = [
  {
    id: "project-01",
    index: 1,
    title: "Project Title One",
    description:
      "A short, punchy description of what this project does and the core problem it solves. Replace with your actual project summary.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    accentHex: "#06b6d4",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "project-02",
    index: 2,
    title: "Project Title Two",
    description:
      "Describe the core functionality here. What makes this project interesting? What tech decisions were involved?",
    techStack: ["React", "Node.js", "GraphQL", "Redis"],
    accentHex: "#8b5cf6",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "project-03",
    index: 3,
    title: "Project Title Three",
    description:
      "Highlight the impact or scale. Did this serve real users? Solve a performance bottleneck? Add context that tells a story.",
    techStack: ["Solidity", "Ethers.js", "Hardhat", "IPFS"],
    accentHex: "#f59e0b",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "project-04",
    index: 4,
    title: "Project Title Four",
    description:
      "A one-to-two sentence description that captures the essence of this project. Keep it clear, direct and benefit-focused.",
    techStack: ["Rust", "WebAssembly", "Three.js", "WebGL"],
    accentHex: "#10b981",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "project-05",
    index: 5,
    title: "Project Title Five",
    description:
      "What makes this project stand out technically? Mention architecture choices, scale challenges, or interesting design patterns.",
    techStack: ["Python", "FastAPI", "Docker", "Kubernetes"],
    accentHex: "#f43f5e",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "project-06",
    index: 6,
    title: "Project Title Six",
    description:
      "Round out your portfolio with a project that shows breadth. This could be a tool, experiment, or open-source contribution.",
    techStack: ["Go", "gRPC", "Kafka", "Terraform"],
    accentHex: "#a78bfa",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

// ─── Hex alpha helper ─────────────────────────────────────────────────────────

function alpha(hex: string, opacity: number): string {
  return hex + Math.round(opacity * 255).toString(16).padStart(2, "0");
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// ─── Image Placeholder ────────────────────────────────────────────────────────

function ImagePlaceholder({ project, hovered }: { project: Project; hovered: boolean }) {
  if (project.imageSrc) {
    return (
      <img
        src={project.imageSrc}
        alt={project.imageAlt ?? project.title}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
      />
    );
  }

  // Generative gradient placeholder — unique per project
  const gradients: Record<number, string> = {
    1: `linear-gradient(135deg, #050812 0%, ${alpha(project.accentHex, 0.25)} 50%, #0c1428 100%)`,
    2: `linear-gradient(160deg, #080d1c 0%, ${alpha(project.accentHex, 0.2)} 60%, #050812 100%)`,
    3: `linear-gradient(120deg, #050812 0%, ${alpha(project.accentHex, 0.3)} 40%, #060c1e 100%)`,
    4: `linear-gradient(145deg, #06091a 0%, ${alpha(project.accentHex, 0.22)} 55%, #050812 100%)`,
    5: `linear-gradient(155deg, #050812 20%, ${alpha(project.accentHex, 0.28)} 65%, #08102a 100%)`,
    6: `linear-gradient(130deg, #08102a 0%, ${alpha(project.accentHex, 0.2)} 50%, #050812 100%)`,
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden transition-transform duration-700"
      style={{
        background: gradients[project.index] ?? gradients[1],
        transform: hovered ? "scale(1.06)" : "scale(1)",
      }}
    >
      {/* Circuit-board decorative lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMid slice"
      >
        <line x1="0" y1="110" x2="150" y2="110" stroke={project.accentHex} strokeWidth="0.8"/>
        <line x1="150" y1="110" x2="150" y2="60" stroke={project.accentHex} strokeWidth="0.8"/>
        <line x1="150" y1="60" x2="260" y2="60" stroke={project.accentHex} strokeWidth="0.8"/>
        <line x1="260" y1="60" x2="260" y2="150" stroke={project.accentHex} strokeWidth="0.8"/>
        <line x1="260" y1="150" x2="400" y2="150" stroke={project.accentHex} strokeWidth="0.8"/>
        <line x1="80" y1="0" x2="80" y2="80" stroke={project.accentHex} strokeWidth="0.5"/>
        <line x1="80" y1="80" x2="320" y2="80" stroke={project.accentHex} strokeWidth="0.5"/>
        <line x1="320" y1="80" x2="320" y2="220" stroke={project.accentHex} strokeWidth="0.5"/>
        <circle cx="150" cy="110" r="3" fill={project.accentHex} fillOpacity="0.8"/>
        <circle cx="260" cy="60" r="3" fill={project.accentHex} fillOpacity="0.8"/>
        <circle cx="260" cy="150" r="3" fill={project.accentHex} fillOpacity="0.8"/>
        <circle cx="80" cy="80" r="2.5" fill={project.accentHex} fillOpacity="0.6"/>
        <circle cx="320" cy="80" r="2.5" fill={project.accentHex} fillOpacity="0.6"/>
      </svg>

      {/* Center index label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-6xl font-black opacity-10 select-none"
          style={{
            fontFamily: "'Orbitron', 'Rajdhani', monospace",
            color: project.accentHex,
          }}
        >
          {String(project.index).padStart(2, "0")}
        </span>
      </div>

      {/* Glow spot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${alpha(project.accentHex, 0.25)} 0%, transparent 70%)`,
          filter: "blur(20px)",
          opacity: hovered ? 1 : 0.4,
        }}
      />
    </div>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

export function ProjectCard({
  project,
  animDelay = 0,
}: {
  project: Project;
  animDelay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 44, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: animDelay },
    },
  };

  return (
    <motion.article
      ref={ref}
      variants={cardVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
        border: `1px solid ${hovered ? alpha(project.accentHex, 0.35) : "rgba(255,255,255,0.08)"}`,
        backdropFilter: "blur(18px)",
        boxShadow: hovered
          ? `0 0 48px ${alpha(project.accentHex, 0.18)}, 0 0 100px ${alpha(project.accentHex, 0.07)}, inset 0 1px 0 rgba(255,255,255,0.09)`
          : "0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* Scan-line texture */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.012) 3px,rgba(255,255,255,0.012) 4px)",
        }}
      />

      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase"
          style={{
            background: alpha(project.accentHex, 0.18),
            border: `1px solid ${alpha(project.accentHex, 0.45)}`,
            color: project.accentHex,
          }}
        >
          <StarIcon />
          Featured
        </div>
      )}

      {/* Image area */}
      <div className="relative h-48 overflow-hidden bg-[#070c1c]">
        <ImagePlaceholder project={project} hovered={hovered} />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(5,8,18,0.95), transparent)",
          }}
        />
        {/* Index tag */}
        <div
          className="absolute bottom-3 right-3 font-mono text-[11px] px-2 py-0.5 rounded"
          style={{
            background: "rgba(5,8,18,0.75)",
            border: `1px solid ${alpha(project.accentHex, 0.3)}`,
            color: alpha(project.accentHex, 0.9),
          }}
        >
          {String(project.index).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 p-5">
        {/* Title */}
        <h3
          className="text-lg font-bold text-white mb-2 leading-snug tracking-tight"
          style={{ fontFamily: "'Rajdhani', 'Orbitron', monospace" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full tracking-wide uppercase"
              style={{
                background: alpha(project.accentHex, 0.1),
                border: `1px solid ${alpha(project.accentHex, 0.28)}`,
                color: alpha(project.accentHex, 0.85),
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mb-4 h-px"
          style={{
            background: `linear-gradient(90deg, ${alpha(project.accentHex, 0.25)}, transparent)`,
          }}
        />

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 flex-1 justify-center py-2 rounded-xl text-xs font-mono tracking-wide uppercase transition-all duration-300"
            style={{
              background: hovered ? alpha(project.accentHex, 0.12) : "rgba(255,255,255,0.05)",
              border: `1px solid ${hovered ? alpha(project.accentHex, 0.35) : "rgba(255,255,255,0.1)"}`,
              color: hovered ? project.accentHex : "rgba(255,255,255,0.5)",
            }}
          >
            <GithubIcon />
            GitHub
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 flex-1 justify-center py-2 rounded-xl text-xs font-mono tracking-wide uppercase transition-all duration-300"
            style={{
              background: hovered ? alpha(project.accentHex, 0.2) : alpha(project.accentHex, 0.08),
              border: `1px solid ${hovered ? alpha(project.accentHex, 0.6) : alpha(project.accentHex, 0.25)}`,
              color: hovered ? "#fff" : alpha(project.accentHex, 0.75),
              boxShadow: hovered ? `0 0 18px ${alpha(project.accentHex, 0.25)}` : "none",
            }}
          >
            <ExternalLinkIcon />
            Live Demo
          </a>
        </div>
      </div>
    </motion.article>
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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-xs font-mono tracking-[0.4em] uppercase text-violet-400/60 mb-4">
        &gt; system.load(projects)
      </p>
      <h2
        className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-4"
        style={{ fontFamily: "'Rajdhani','Orbitron',monospace" }}
      >
        SELECTED{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          WORK
        </span>
      </h2>
      <p className="text-white/40 text-sm font-mono max-w-md mx-auto">
        A curated collection of projects spanning full-stack, blockchain & systems engineering
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-violet-500/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#8b5cf6]" />
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-cyan-500/40" />
      </div>
    </motion.div>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────

function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute -top-48 left-1/4 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle,#8b5cf622,transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-48 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle,#06b6d422,transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-10"
        style={{
          background: "linear-gradient(90deg,transparent,#8b5cf6,transparent)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

/**
 * ProjectsSection — drop into any Next.js App Router page.
 *
 * To customise: edit the PROJECTS array at the top of this file,
 * or pass your own array via the `projects` prop.
 */
export default function ProjectsSection({
  projects = PROJECTS,
}: {
  projects?: Project[];
}) {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "#050812" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@700;900&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      <Background />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              animDelay={i * 0.1}
            />
          ))}
        </div>

        {/* Footer status bar */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span>PROJECT_COUNT: {String(projects.length).padStart(2, "0")}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>STACK_COVERAGE: FULL</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-violet-500/40">RENDER: COMPLETE</span>
        </motion.div>
      </div>
    </section>
  );
}