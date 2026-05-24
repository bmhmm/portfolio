"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
  tags?: string[];
  link?: { label: string; href: string };
  highlight?: boolean; // draws extra attention (e.g. current role)
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIMELINE: TimelineEntry[] = [
  {
    id: "exp-01",
    year: "2024",
    title: "Started Web Development Journey",
    description:
      "Began learning HTML, CSS, JavaScript, PHP, Node.js, and relational & non-relational databases — laying the foundation for full-stack engineering.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "Node.js", "SQL"],
  },
  {
    id: "exp-02",
    year: "2024",
    title: "Backend Systems Focus",
    description:
      "Specialized in backend architecture, RESTful API design, and scalable web systems. Deepened understanding of server-side performance and data modeling.",
    tags: ["Backend", "REST APIs", "Architecture", "Databases"],
  },
  {
    id: "exp-03",
    year: "2025",
    title: "Blockchain Development Journey",
    description:
      "Started learning Solidity, smart contract development, ERC-20 tokens, NFT standards, and decentralized finance (DeFi) protocols.",
    tags: ["Solidity", "ERC-20", "NFTs", "DeFi", "Web3"],
  },
  {
    id: "exp-04",
    year: "2025",
    title: "Completed Cyfrin Courses",
    description:
      "Completed structured blockchain engineering curriculum focused on smart contract development, audit fundamentals, and Web3 security best practices.",
    tags: ["Smart Contracts", "Web3 Security", "Cyfrin"],
    link: {
      label: "View Certificate ↗",
      href: "https://profiles.cyfrin.io/u/mikibacha45/achievements/blockchain-basics",
    },
  },
  {
    id: "exp-05",
    year: "2025",
    title: "AI-Based Reminder Internship Project",
    description:
      "Developed an AI-powered reminder application as part of an internship project — integrating natural language processing with task scheduling logic.",
    tags: ["AI", "NLP", "Internship", "Node.js"],
  },
  {
    id: "exp-06",
    year: "2025",
    title: "TirufatBirr Hackathon Idea",
    description:
      "Contributed to TirufatBirr — an AI and blockchain-powered agriculture export platform concept aimed at empowering Ethiopian farmers with transparent supply chains.",
    tags: ["Hackathon", "AI", "Blockchain", "AgriTech"],
  },
  {
    id: "exp-07",
    year: "2026",
    title: "Final Year Computer Science Student",
    description:
      "Completing a BSc in Computer Science at Jimma University, synthesizing software engineering, algorithms, and distributed systems knowledge.",
    tags: ["BSc CS", "Jimma University", "Final Year"],
  },
  {
    id: "exp-08",
    year: "2026",
    title: "Currently Building SkillChain",
    description:
      "Architecting SkillChain — a blockchain-based skill verification platform that issues on-chain credentials, leveraging Next.js, Solidity, and Supabase.",
    tags: ["Next.js", "Solidity", "Supabase", "SkillChain"],
    highlight: true,
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── Timeline Node (center dot) ───────────────────────────────────────────────

function TimelineNode({ highlight }: { highlight?: boolean }) {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0 z-10">
      {/* Outer ring */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: highlight
            ? "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(99,102,241,0.2))"
            : "rgba(255,255,255,0.04)",
          border: highlight
            ? "1px solid rgba(56,189,248,0.45)"
            : "1px solid rgba(255,255,255,0.1)",
          boxShadow: highlight ? "0 0 20px rgba(56,189,248,0.2)" : "none",
        }}
      >
        {/* Inner dot */}
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            background: highlight
              ? "linear-gradient(135deg, #38bdf8, #818cf8)"
              : "rgba(148,163,184,0.5)",
            boxShadow: highlight ? "0 0 10px rgba(56,189,248,0.6)" : "none",
          }}
        />
      </div>
      {/* Pulse ring for highlight */}
      {highlight && (
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: "rgba(56,189,248,0.08)",
            animationDuration: "2.5s",
          }}
        />
      )}
    </div>
  );
}

// ─── TimelineCard ─────────────────────────────────────────────────────────────

function TimelineCard({
  entry,
  side,
  index,
}: {
  entry: TimelineEntry;
  side: "left" | "right";
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variant = side === "left" ? fadeLeft : fadeRight;

  return (
    <motion.div
      ref={ref}
      custom={index * 0.05}
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative rounded-2xl p-6 flex-1"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = entry.highlight
          ? "rgba(56,189,248,0.3)"
          : "rgba(255,255,255,0.13)";
        el.style.boxShadow = entry.highlight
          ? "0 0 40px rgba(56,189,248,0.1), 0 8px 40px rgba(0,0,0,0.4)"
          : "0 0 30px rgba(148,163,184,0.06), 0 8px 40px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.boxShadow = "0 4px 32px rgba(0,0,0,0.35)";
      }}
    >
      {/* Subtle top-edge gradient shimmer */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{
          background: entry.highlight
            ? "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* Year chip */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs font-mono tracking-widest px-2.5 py-1 rounded-full"
          style={{
            background: entry.highlight
              ? "rgba(56,189,248,0.1)"
              : "rgba(255,255,255,0.05)",
            border: entry.highlight
              ? "1px solid rgba(56,189,248,0.25)"
              : "1px solid rgba(255,255,255,0.08)",
            color: entry.highlight ? "#38bdf8" : "rgba(148,163,184,0.7)",
          }}
        >
          {entry.year}
        </span>
        {entry.highlight && (
          <span
            className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full animate-pulse"
            style={{
              background: "rgba(56,189,248,0.08)",
              border: "1px solid rgba(56,189,248,0.2)",
              color: "rgba(56,189,248,0.7)",
            }}
          >
            CURRENT
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-base font-semibold text-white mb-2.5 leading-snug"
        style={{ fontFamily: "'DM Sans', 'Syne', sans-serif", letterSpacing: "-0.01em" }}
      >
        {entry.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "rgba(148,163,184,0.7)", fontFamily: "'DM Sans', sans-serif" }}
      >
        {entry.description}
      </p>

      {/* Tags */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono tracking-wide px-2 py-0.5 rounded"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(148,163,184,0.55)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Link */}
      {entry.link && (
        <a
          href={entry.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wide transition-all duration-300"
          style={{ color: "rgba(56,189,248,0.65)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(56,189,248,1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(56,189,248,0.65)")
          }
        >
          {entry.link.label}
        </a>
      )}
    </motion.div>
  );
}

// ─── Animated Timeline Line ───────────────────────────────────────────────────

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px z-0">
      {/* Static base line */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />
      {/* Animated fill line */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{
          bottom: 0,
          scaleY,
          background:
            "linear-gradient(to bottom, rgba(56,189,248,0.6), rgba(99,102,241,0.4), rgba(56,189,248,0.1))",
          boxShadow: "0 0 8px rgba(56,189,248,0.3)",
        }}
      />
    </div>
  );
}

// ─── Mobile Timeline Card ─────────────────────────────────────────────────────

function MobileTimelineCard({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index * 0.05}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative pl-10"
    >
      {/* Left border accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{
          background: entry.highlight
            ? "linear-gradient(to bottom, rgba(56,189,248,0.6), rgba(99,102,241,0.3))"
            : "rgba(255,255,255,0.07)",
        }}
      />
      {/* Node */}
      <div className="absolute left-0 top-5 -translate-x-1/2">
        <TimelineNode highlight={entry.highlight} />
      </div>

      <div
        className="rounded-2xl p-5 mb-4"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
          border: entry.highlight
            ? "1px solid rgba(56,189,248,0.2)"
            : "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: entry.highlight
                ? "rgba(56,189,248,0.1)"
                : "rgba(255,255,255,0.05)",
              border: entry.highlight
                ? "1px solid rgba(56,189,248,0.25)"
                : "1px solid rgba(255,255,255,0.08)",
              color: entry.highlight ? "#38bdf8" : "rgba(148,163,184,0.7)",
            }}
          >
            {entry.year}
          </span>
          {entry.highlight && (
            <span
              className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-full animate-pulse"
              style={{
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.2)",
                color: "rgba(56,189,248,0.7)",
              }}
            >
              CURRENT
            </span>
          )}
        </div>
        <h3
          className="text-sm font-semibold text-white mb-2 leading-snug"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {entry.title}
        </h3>
        <p
          className="text-xs leading-relaxed mb-3"
          style={{ color: "rgba(148,163,184,0.65)" }}
        >
          {entry.description}
        </p>
        {entry.tags && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(148,163,184,0.5)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {entry.link && (
          <a
            href={entry.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono"
            style={{ color: "rgba(56,189,248,0.65)" }}
          >
            {entry.link.label}
          </a>
        )}
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
      className="text-center mb-20"
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <p
        className="text-xs font-mono tracking-[0.4em] uppercase mb-4"
        style={{ color: "rgba(56,189,248,0.45)" }}
      >
        journey
      </p>
      <h2
        className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
        style={{ fontFamily: "'Syne', 'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
      >
        Experience &amp;{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Growth
        </span>
      </h2>
      <p
        className="text-sm max-w-sm mx-auto leading-relaxed"
        style={{ color: "rgba(148,163,184,0.55)", fontFamily: "'DM Sans', sans-serif" }}
      >
        A chronological record of milestones, skills acquired, and systems built
      </p>

      {/* Decorative rule */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <div
          className="h-px w-16"
          style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.3))" }}
        />
        <div
          className="w-1 h-1 rounded-full"
          style={{ background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }}
        />
        <div
          className="h-px w-16"
          style={{ background: "linear-gradient(270deg, transparent, rgba(129,140,248,0.3))" }}
        />
      </div>
    </motion.div>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────

function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Very subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Blue ambient blobs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-64 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-64 translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

/**
 * ExperienceSection — App Router compatible.
 * Drop into any Next.js page. No props required; edit TIMELINE above.
 */
export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "#06090f" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      <Background />

      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeader />

        {/* ── Desktop alternating timeline ── */}
        <div className="hidden md:block relative">
          <TimelineLine />

          <div className="space-y-10">
            {TIMELINE.map((entry, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={entry.id} className="relative flex items-center gap-0">
                  {/* Left slot */}
                  <div className="flex-1 flex justify-end pr-8">
                    {isLeft ? (
                      <div className="w-full max-w-sm">
                        <TimelineCard entry={entry} side="left" index={i} />
                      </div>
                    ) : (
                      <div className="w-full max-w-sm opacity-0 pointer-events-none" />
                    )}
                  </div>

                  {/* Center node */}
                  <TimelineNode highlight={entry.highlight} />

                  {/* Right slot */}
                  <div className="flex-1 pl-8">
                    {!isLeft ? (
                      <div className="w-full max-w-sm">
                        <TimelineCard entry={entry} side="right" index={i} />
                      </div>
                    ) : (
                      <div className="w-full max-w-sm opacity-0 pointer-events-none" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile single-column timeline ── */}
        <div className="md:hidden relative pl-4">
          {TIMELINE.map((entry, i) => (
            <MobileTimelineCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {/* Footer count */}
        <motion.div
          className="mt-20 flex items-center justify-center gap-6 text-xs font-mono"
          style={{ color: "rgba(148,163,184,0.2)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>{TIMELINE.length} MILESTONES</span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(148,163,184,0.2)" }}
          />
          <span>2024 — 2026</span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(148,163,184,0.2)" }}
          />
          <span style={{ color: "rgba(56,189,248,0.35)" }}>IN PROGRESS</span>
        </motion.div>
      </div>
    </section>
  );
}