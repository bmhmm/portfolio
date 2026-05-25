"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {Variants} from "framer-motion";

// ─── Nav Links ─────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "About", href: "#about" },
  { label: "project", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

// ─── Social Links ──────────────────────────────────────────────────────────────

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/bmhmm",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-[15px] h-[15px]">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/MICHAEL_0px",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:mikibacha45@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-[15px] h-[15px]">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

// const itemVariants = {
//   hidden: { opacity: 0, y: 14 },
//   visible: {
//     opacity: 1,
//     y: 0,
//    transition: {
//   duration: 0.6,
//   ease: "easeOut",
// }
//   },
// };

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden bg-[#060810]"
      aria-label="Site footer"
    >
      {/* ── Top separator glow line ── */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(59,130,246,0.25) 30%, rgba(96,165,250,0.4) 50%, rgba(59,130,246,0.25) 70%, transparent 100%)",
        }}
      />

      {/* ── Atmospheric glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── Fine grid ── */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,180,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(100,180,255,.6) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 max-w-6xl mx-auto px-6 py-14"
      >
        {/* Top row: brand + nav + social */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-6">

          {/* Brand block */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 md:max-w-xs">
            {/* Wordmark */}
            <div className="flex items-center gap-2.5">
              {/* Logo mark — a minimal bracket motif */}
              <div
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-blue-500/25 bg-blue-500/6"
                aria-hidden
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M5 2L2 8l3 6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 2l3 6-3 6" stroke="#67e8f9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span
                className="text-[17px] font-semibold tracking-tight text-white/90"
                style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
              >
                Miki
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(to right, #60a5fa, #67e8f9)" }}
                >
                  .dev
                </span>
              </span>
            </div>

            <p
              className="text-[12.5px] leading-relaxed text-white/32 max-w-[200px]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Web3 · Backend · Modern Web
            </p>

            {/* Availability dot */}
            <div className="flex items-center gap-2 mt-0.5">
              <span className="relative flex h-[7px] w-[7px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-55" />
                <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-emerald-400" />
              </span>
              <span
                className="text-[11px] text-emerald-300/70 tracking-wide"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Open to opportunities
              </span>
            </div>
          </motion.div>

          {/* Center: Nav links */}
          <motion.nav variants={itemVariants} aria-label="Footer navigation">
            <p
              className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-4 font-medium"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Navigate
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[13.5px] text-white/40 hover:text-white/82 transition-colors duration-200"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    <span
                      className="w-0 h-[1px] bg-blue-400/60 transition-all duration-250 group-hover:w-3 rounded-full"
                      aria-hidden
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Right: Social links */}
          <motion.div variants={itemVariants}>
            <p
              className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-4 font-medium"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Connect
            </p>
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-[13.5px] text-white/40 hover:text-white/82 transition-colors duration-200"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    <span className="text-white/28 group-hover:text-blue-400/80 transition-colors duration-200 flex-shrink-0">
                      {link.icon}
                    </span>
                    {link.label}
                    {/* External arrow */}
                    {!link.href.startsWith("mailto") && (
                      <svg
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="w-[9px] h-[9px] opacity-0 group-hover:opacity-40 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                        aria-hidden
                      >
                        <path d="M1 9L9 1M9 1H3M9 1v6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          variants={itemVariants}
          className="my-10 h-[1px] w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
          }}
        />

        {/* Bottom row: copyright + built with */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <p
            className="text-[12px] text-white/22 tracking-wide"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2026 Miki. All rights reserved.
          </p>

          {/* Built-with badge */}
          <div className="flex items-center gap-1.5">
            <span
              className="text-[11.5px] text-white/20 tracking-wide"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Built with
            </span>
            <TechBadge label="Next.js" />
            <span className="text-white/15 text-[11px]">&</span>
            <TechBadge label="Supabase" color="emerald" />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

// ─── TechBadge sub-component ───────────────────────────────────────────────────

function TechBadge({
  label,
  color = "blue",
}: {
  label: string;
  color?: "blue" | "emerald";
}) {
  const styles =
    color === "emerald"
      ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-300/60"
      : "border-blue-500/20 bg-blue-500/5 text-blue-300/60";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-medium tracking-wide ${styles}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {label}
    </span>
  );
}