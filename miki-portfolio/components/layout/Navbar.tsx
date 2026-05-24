"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
  section: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  {label: "Home",      href: "#home",     section: "home"     },
  { label: "About",    href: "#about",    section: "about"    },
  { label: "Work",     href: "#work",     section: "work"     },
  { label: "Skills",   href: "#skills",   section: "skills"   },
  { label: "Projects", href: "#projects", section: "projects" },
  { label: "Contact",  href: "#contact",  section: "contact"  },
  { label: "Brain-Mode",  href: "#brain-mode",  section: "brain-mode"}, 
];

// ─── Smooth scroll helper ─────────────────────────────────────────────────────

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ─── Logo Mark ────────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <motion.a
      href="#"
      onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      className="flex items-center gap-3 group cursor-pointer select-none"
      whileHover="hover"
      initial="idle"
    >
      {/* Geometric hex logo */}
      <div className="relative w-9 h-9">
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #00d4ff 0%, #0066ff 50%, #7c3aed 100%)",
            boxShadow: "0 0 0px 0px rgba(0,212,255,0)",
          }}
          variants={{
            idle: { rotate: 0, boxShadow: "0 0 0px 0px rgba(0,212,255,0)" },
            hover: { rotate: 45, boxShadow: "0 0 20px 4px rgba(0,212,255,0.4)" },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-white font-black text-sm tracking-tighter z-10 relative"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            MB
          </span>
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col leading-none">
        <motion.span
          className="text-white font-semibold text-sm tracking-widest uppercase"
          style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.18em" }}
          variants={{
            idle: { color: "#ffffff" },
            hover: { color: "#00d4ff" },
          }}
          transition={{ duration: 0.2 }}
        >
          Michael Bacha
        </motion.span>
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(0,212,255,0.5)", fontFamily: "'Space Mono', monospace" }}
        >
          Portfolio
        </span>
      </div>
    </motion.a>
  );
}

// ─── Nav Link item ────────────────────────────────────────────────────────────

function NavItem({
  link,
  active,
  onClick,
}: {
  link: NavLink;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-1 py-2 group"
      whileHover="hover"
      initial="idle"
    >
      {/* Label */}
      <motion.span
        className="text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-200"
        style={{
          fontFamily: "'Space Mono', monospace",
          color: active ? "#00d4ff" : "rgba(255,255,255,0.55)",
        }}
        variants={{
          idle: {},
          hover: { color: "#00d4ff" },
        }}
      >
        {link.label}
      </motion.span>

      {/* Active underline */}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hover glow underline */}
      {!active && (
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)" }}
          variants={{
            idle: { scaleX: 0, opacity: 0 },
            hover: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 0.25 }}
        />
      )}

      {/* Top glow dot for active */}
      {active && (
        <motion.span
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: "#00d4ff", boxShadow: "0 0 8px 2px rgba(0,212,255,0.7)" }}
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

// ─── Hamburger icon ───────────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  const variants = {
    top: {
      closed: { rotate: 0, y: 0 },
      open:   { rotate: 45, y: 7 },
    },
    mid: {
      closed: { opacity: 1, scaleX: 1 },
      open:   { opacity: 0, scaleX: 0 },
    },
    bot: {
      closed: { rotate: 0, y: 0 },
      open:   { rotate: -45, y: -7 },
    },
  };

  return (
    <div className="flex flex-col gap-[5px] w-5 h-5 justify-center">
      {(["top", "mid", "bot"] as const).map((k) => (
        <motion.span
          key={k}
          className="block h-px w-full origin-center"
          style={{ background: open ? "#00d4ff" : "rgba(255,255,255,0.7)" }}
          variants={variants[k]}
          animate={open ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      className="relative w-8 h-8 rounded-lg flex items-center justify-center"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      whileHover={{ scale: 1.1, boxShadow: "0 0 14px 2px rgba(0,212,255,0.25)" }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {dark ? (
          <motion.svg
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="rgba(0,212,255,0.8)" strokeWidth="2" strokeLinecap="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,200,0,0.9)" strokeWidth="2" strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Resume Button ────────────────────────────────────────────────────────────

function ResumeButton() {
  return (
    <motion.a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="relative px-4 py-2 text-[10px] font-medium tracking-[0.25em] uppercase overflow-hidden group"
      style={{
        fontFamily: "'Space Mono', monospace",
        border: "1px solid rgba(0,212,255,0.35)",
        color: "#00d4ff",
        borderRadius: "6px",
      }}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      initial="idle"
    >
      {/* Sweep glow on hover */}
      <motion.span
        className="absolute inset-0 -z-0"
        style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.12) 0%, rgba(0,102,255,0.12) 100%)" }}
        variants={{
          idle: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute inset-0 -z-0 rounded"
        variants={{
          idle: { boxShadow: "0 0 0px 0px rgba(0,212,255,0)" },
          hover: { boxShadow: "0 0 16px 2px rgba(0,212,255,0.2)" },
        }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">Resume ↗</span>
    </motion.a>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({
  open,
  activeSection,
  onLinkClick,
}: {
  open: boolean;
  activeSection: string;
  onLinkClick: (href: string) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,5,12,0.7)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Slide panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
            style={{
              width: "min(320px, 85vw)",
              background: "linear-gradient(160deg, rgba(5,15,30,0.98) 0%, rgba(2,8,20,0.99) 100%)",
              borderLeft: "1px solid rgba(0,212,255,0.1)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.8)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Decorative top line */}
            <div
              className="h-px w-full"
              style={{ background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }}
            />

            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-5">
              <span
                className="text-[10px] tracking-[0.35em] uppercase"
                style={{ color: "rgba(0,212,255,0.5)", fontFamily: "'Space Mono', monospace" }}
              >
                Navigation
              </span>
              <div
                className="w-8 h-px"
                style={{ background: "rgba(0,212,255,0.2)" }}
              />
            </div>

            {/* Links */}
            <nav className="flex flex-col px-6 gap-1 flex-1">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.section;
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => onLinkClick(link.href)}
                    className="relative flex items-center gap-4 py-4 text-left group"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: "easeOut" }}
                    whileHover="hover"
                  >
                    {/* Index number */}
                    <span
                      className="text-[10px] w-5 tabular-nums"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        color: isActive ? "#00d4ff" : "rgba(255,255,255,0.2)",
                      }}
                    >
                      0{i + 1}
                    </span>

                    {/* Label */}
                    <motion.span
                      className="text-base font-medium tracking-wide"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        color: isActive ? "#00d4ff" : "rgba(255,255,255,0.7)",
                      }}
                      variants={{
                        hover: { color: "#00d4ff", x: 4 },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.span>

                    {/* Active dot */}
                    {isActive && (
                      <motion.span
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: "#00d4ff", boxShadow: "0 0 8px 2px rgba(0,212,255,0.6)" }}
                        layoutId="mobileActiveIndicator"
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <div className="px-6 py-8">
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 text-[11px] tracking-[0.25em] uppercase"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  border: "1px solid rgba(0,212,255,0.3)",
                  color: "#00d4ff",
                  borderRadius: "6px",
                  background: "rgba(0,212,255,0.05)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                whileTap={{ scale: 0.97 }}
              >
                Download Resume ↗
              </motion.a>
            </div>

            {/* Decorative bottom line */}
            <div
              className="h-px w-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)" }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen]           = useState(false);
  const [dark, setDark]                   = useState(true);
  const [scrolled, setScrolled]           = useState(false);
  const observerRef                       = useRef<IntersectionObserver | null>(null);

  // Track scroll for navbar glass intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver — active section tracking
  useEffect(() => {
    observerRef.current?.disconnect();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    NAV_LINKS.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) io.observe(el);
    });

    observerRef.current = io;
    return () => io.disconnect();
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLinkClick = useCallback((href: string) => {
    setMenuOpen(false);
    setTimeout(() => scrollToSection(href), 50);
  }, []);

  return (
    <>
      {/* Font import via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
      `}</style>

      <motion.header
        className="fixed top-0 left-0 right-0 z-30"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top edge glow line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, #00d4ff 30%, #0066ff 60%, transparent 100%)" }}
          animate={{ opacity: scrolled ? 0.7 : 0.3 }}
          transition={{ duration: 0.4 }}
        />

        {/* Glass panel */}
        <motion.div
          className="relative mx-auto max-w-6xl"
          animate={{
            background: scrolled
              ? "rgba(3, 8, 20, 0.85)"
              : "rgba(3, 8, 20, 0.4)",
          }}
          transition={{ duration: 0.4 }}
          style={{
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderBottom: "1px solid rgba(0,212,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between h-16 px-6 md:px-8">

            {/* Logo */}
            <LogoMark />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <NavItem
                  key={link.href}
                  link={link}
                  active={activeSection === link.section}
                  onClick={() => handleLinkClick(link.href)}
                />
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
              <ResumeButton />
            </div>

            {/* Mobile: theme + hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
              <motion.button
                onClick={() => setMenuOpen((o) => !o)}
                className="relative w-9 h-9 flex items-center justify-center rounded-lg"
                style={{
                  background: menuOpen ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${menuOpen ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                }}
                whileTap={{ scale: 0.93 }}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <HamburgerIcon open={menuOpen} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Scan line shimmer effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px overflow-hidden pointer-events-none"
          style={{ background: "rgba(0,212,255,0.08)" }}
        >
          <motion.div
            className="h-full w-24"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)" }}
            animate={{ x: ["-100px", "calc(100vw + 100px)"] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
          />
        </motion.div>
      </motion.header>

      {/* Mobile drawer */}
      <MobileMenu
        open={menuOpen}
        activeSection={activeSection}
        onLinkClick={handleLinkClick}
      />
    </>
  );
}






// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface NavLink {
//   label: string;
//   href: string;
//   section: string;
// }

// interface Theme {
//   dark: boolean;
//   // navbar glass
//   navBg: string;
//   navBgScrolled: string;
//   navBorder: string;
//   // text
//   textPrimary: string;
//   textMuted: string;
//   textSubtle: string;
//   // accent (cyan in dark, indigo in light)
//   accent: string;
//   accentGlow: string;
//   accentMuted: string;
//   // button / controls
//   btnBg: string;
//   btnBorder: string;
//   // mobile panel
//   panelBg: string;
//   panelBorder: string;
//   // hamburger lines
//   burgerColor: string;
//   burgerOpenColor: string;
// }

// // ─── Theme tokens ─────────────────────────────────────────────────────────────

// const DARK: Theme = {
//   dark: true,
//   navBg:         "rgba(3,8,20,0.45)",
//   navBgScrolled: "rgba(3,8,20,0.88)",
//   navBorder:     "rgba(0,212,255,0.10)",
//   textPrimary:   "#ffffff",
//   textMuted:     "rgba(255,255,255,0.55)",
//   textSubtle:    "rgba(255,255,255,0.22)",
//   accent:        "#00d4ff",
//   accentGlow:    "rgba(0,212,255,0.35)",
//   accentMuted:   "rgba(0,212,255,0.12)",
//   btnBg:         "rgba(255,255,255,0.04)",
//   btnBorder:     "rgba(255,255,255,0.09)",
//   panelBg:       "linear-gradient(160deg,rgba(5,15,30,0.98) 0%,rgba(2,8,20,0.99) 100%)",
//   panelBorder:   "rgba(0,212,255,0.12)",
//   burgerColor:      "rgba(255,255,255,0.70)",
//   burgerOpenColor:  "#00d4ff",
// };

// const LIGHT: Theme = {
//   dark: false,
//   navBg:         "rgba(240,245,255,0.60)",
//   navBgScrolled: "rgba(240,245,255,0.92)",
//   navBorder:     "rgba(79,70,229,0.15)",
//   textPrimary:   "#0f172a",
//   textMuted:     "rgba(15,23,42,0.60)",
//   textSubtle:    "rgba(15,23,42,0.30)",
//   accent:        "#4f46e5",        // indigo
//   accentGlow:    "rgba(79,70,229,0.25)",
//   accentMuted:   "rgba(79,70,229,0.08)",
//   btnBg:         "rgba(15,23,42,0.05)",
//   btnBorder:     "rgba(15,23,42,0.12)",
//   panelBg:       "linear-gradient(160deg,rgba(240,245,255,0.98) 0%,rgba(248,250,255,0.99) 100%)",
//   panelBorder:   "rgba(79,70,229,0.15)",
//   burgerColor:      "rgba(15,23,42,0.70)",
//   burgerOpenColor:  "#4f46e5",
// };

// // ─── Config ───────────────────────────────────────────────────────────────────

// const NAV_LINKS: NavLink[] = [
//   { label: "About",    href: "#about",    section: "about"    },
//   { label: "Work",     href: "#work",     section: "work"     },
//   { label: "Skills",   href: "#skills",   section: "skills"   },
//   { label: "Projects", href: "#projects", section: "projects" },
//   { label: "Contact",  href: "#contact",  section: "contact"  },
// ];

// function scrollToSection(href: string) {
//   const el = document.getElementById(href.replace("#", ""));
//   if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
// }

// // ─── Logo ─────────────────────────────────────────────────────────────────────

// function LogoMark({ t }: { t: Theme }) {
//   return (
//     <motion.a
//       href="#"
//       onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
//       className="flex items-center gap-3 cursor-pointer select-none"
//       whileHover="hover"
//       initial="idle"
//     >
//       <div className="relative w-9 h-9">
//         <motion.div
//           className="absolute inset-0 rounded-lg"
//           style={{
//             background: t.dark
//               ? "linear-gradient(135deg,#00d4ff 0%,#0066ff 50%,#7c3aed 100%)"
//               : "linear-gradient(135deg,#6366f1 0%,#4f46e5 50%,#7c3aed 100%)",
//           }}
//           variants={{
//             idle: { rotate: 0, boxShadow: `0 0 0px 0px ${t.accentGlow}` },
//             hover: { rotate: 45, boxShadow: `0 0 22px 5px ${t.accentGlow}` },
//           }}
//           transition={{ type: "spring", stiffness: 300, damping: 20 }}
//         />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <span className="text-white font-black text-sm z-10 relative" style={{ fontFamily: "'Space Mono',monospace" }}>
//             YN
//           </span>
//         </div>
//       </div>

//       <div className="flex flex-col leading-none gap-0.5">
//         <motion.span
//           className="font-semibold text-sm tracking-widest uppercase"
//           style={{ fontFamily: "'Space Mono',monospace", color: t.textPrimary, letterSpacing: "0.18em" }}
//           variants={{ idle: { color: t.textPrimary }, hover: { color: t.accent } }}
//           transition={{ duration: 0.2 }}
//         >
//           Your Name
//         </motion.span>
//         <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: t.accentMuted.replace("0.12","0.55"), fontFamily: "'Space Mono',monospace" }}>
//           Portfolio
//         </span>
//       </div>
//     </motion.a>
//   );
// }

// // ─── Nav Item ─────────────────────────────────────────────────────────────────

// function NavItem({ link, active, onClick, t }: { link: NavLink; active: boolean; onClick: () => void; t: Theme }) {
//   return (
//     <motion.button onClick={onClick} className="relative px-1 py-2" whileHover="hover" initial="idle">
//       <motion.span
//         className="text-xs font-medium tracking-[0.2em] uppercase"
//         style={{ fontFamily: "'Space Mono',monospace", color: active ? t.accent : t.textMuted }}
//         variants={{ idle: {}, hover: { color: t.accent } }}
//         transition={{ duration: 0.2 }}
//       >
//         {link.label}
//       </motion.span>

//       {/* Active underline */}
//       <motion.span
//         className="absolute bottom-0 left-0 right-0 h-px"
//         style={{ background: `linear-gradient(90deg,transparent,${t.accent},transparent)` }}
//         animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       />

//       {/* Hover underline */}
//       {!active && (
//         <motion.span
//           className="absolute bottom-0 left-0 right-0 h-px"
//           style={{ background: `linear-gradient(90deg,transparent,${t.accentGlow},transparent)` }}
//           variants={{ idle: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
//           transition={{ duration: 0.25 }}
//         />
//       )}

//       {/* Active top dot */}
//       {active && (
//         <motion.span
//           className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
//           style={{ background: t.accent, boxShadow: `0 0 8px 2px ${t.accentGlow}` }}
//           layoutId="activeIndicator"
//           transition={{ type: "spring", stiffness: 400, damping: 30 }}
//         />
//       )}
//     </motion.button>
//   );
// }

// // ─── Hamburger ────────────────────────────────────────────────────────────────

// function HamburgerIcon({ open, t }: { open: boolean; t: Theme }) {
//   const variants = {
//     top: { closed: { rotate: 0, y: 0 },    open: { rotate: 45,  y: 7  } },
//     mid: { closed: { opacity: 1, scaleX: 1 }, open: { opacity: 0, scaleX: 0 } },
//     bot: { closed: { rotate: 0, y: 0 },    open: { rotate: -45, y: -7 } },
//   };
//   return (
//     <div className="flex flex-col gap-[5px] w-5 h-5 justify-center">
//       {(["top","mid","bot"] as const).map((k) => (
//         <motion.span
//           key={k}
//           className="block h-px w-full origin-center"
//           style={{ background: open ? t.burgerOpenColor : t.burgerColor }}
//           variants={variants[k]}
//           animate={open ? "open" : "closed"}
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//         />
//       ))}
//     </div>
//   );
// }

// // ─── Theme Toggle ─────────────────────────────────────────────────────────────

// function ThemeToggle({ t, onToggle }: { t: Theme; onToggle: () => void }) {
//   return (
//     <motion.button
//       onClick={onToggle}
//       className="relative w-8 h-8 rounded-lg flex items-center justify-center"
//       style={{ background: t.btnBg, border: `1px solid ${t.btnBorder}` }}
//       whileHover={{ scale: 1.1, boxShadow: `0 0 14px 2px ${t.accentGlow}` }}
//       whileTap={{ scale: 0.95 }}
//       aria-label="Toggle theme"
//     >
//       <AnimatePresence mode="wait">
//         {t.dark ? (
//           /* Moon — shown in dark mode; clicking switches to light */
//           <motion.svg
//             key="moon"
//             initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
//             animate={{ opacity: 1, rotate: 0, scale: 1 }}
//             exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
//             transition={{ duration: 0.2 }}
//             width="14" height="14" viewBox="0 0 24 24" fill="none"
//             stroke={t.accent} strokeWidth="2" strokeLinecap="round"
//           >
//             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
//           </motion.svg>
//         ) : (
//           /* Sun — shown in light mode; clicking switches to dark */
//           <motion.svg
//             key="sun"
//             initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
//             animate={{ opacity: 1, rotate: 0, scale: 1 }}
//             exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
//             transition={{ duration: 0.2 }}
//             width="14" height="14" viewBox="0 0 24 24" fill="none"
//             stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"
//           >
//             <circle cx="12" cy="12" r="5" />
//             <line x1="12" y1="1"  x2="12" y2="3"  />
//             <line x1="12" y1="21" x2="12" y2="23" />
//             <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"   />
//             <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
//             <line x1="1" y1="12" x2="3"  y2="12" />
//             <line x1="21" y1="12" x2="23" y2="12" />
//             <line x1="4.22" y1="19.78"  x2="5.64" y2="18.36"  />
//             <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
//           </motion.svg>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   );
// }

// // ─── Resume Button ────────────────────────────────────────────────────────────

// function ResumeButton({ t }: { t: Theme }) {
//   return (
//     <motion.a
//       href="/resume.pdf"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="relative px-4 py-2 text-[10px] font-medium tracking-[0.25em] uppercase overflow-hidden"
//       style={{
//         fontFamily: "'Space Mono',monospace",
//         border: `1px solid ${t.accentGlow}`,
//         color: t.accent,
//         borderRadius: "6px",
//       }}
//       whileHover="hover"
//       whileTap={{ scale: 0.97 }}
//       initial="idle"
//     >
//       <motion.span
//         className="absolute inset-0"
//         style={{ background: t.accentMuted }}
//         variants={{ idle: { opacity: 0 }, hover: { opacity: 1 } }}
//         transition={{ duration: 0.2 }}
//       />
//       <motion.span
//         className="absolute inset-0 rounded"
//         variants={{
//           idle: { boxShadow: "0 0 0px 0px transparent" },
//           hover: { boxShadow: `0 0 16px 2px ${t.accentGlow}` },
//         }}
//         transition={{ duration: 0.3 }}
//       />
//       <span className="relative z-10">Resume ↗</span>
//     </motion.a>
//   );
// }

// // ─── Mobile Menu ──────────────────────────────────────────────────────────────

// function MobileMenu({
//   open, activeSection, onLinkClick, t,
// }: {
//   open: boolean; activeSection: string; onLinkClick: (href: string) => void; t: Theme;
// }) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div
//             className="fixed inset-0 z-40"
//             style={{
//               background: t.dark ? "rgba(0,5,12,0.65)" : "rgba(15,23,42,0.35)",
//               backdropFilter: "blur(4px)",
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.25 }}
//           />

//           <motion.div
//             className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
//             style={{
//               width: "min(320px,85vw)",
//               background: t.panelBg,
//               borderLeft: `1px solid ${t.panelBorder}`,
//               boxShadow: "-20px 0 60px rgba(0,0,0,0.3)",
//             }}
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <div className="h-px w-full" style={{ background: `linear-gradient(90deg,transparent,${t.accent},transparent)` }} />

//             <div className="flex items-center justify-between px-6 py-5">
//               <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: t.textSubtle, fontFamily: "'Space Mono',monospace" }}>
//                 Navigation
//               </span>
//               <div className="w-8 h-px" style={{ background: t.textSubtle }} />
//             </div>

//             <nav className="flex flex-col px-6 gap-1 flex-1">
//               {NAV_LINKS.map((link, i) => {
//                 const isActive = activeSection === link.section;
//                 return (
//                   <motion.button
//                     key={link.href}
//                     onClick={() => onLinkClick(link.href)}
//                     className="relative flex items-center gap-4 py-4 text-left"
//                     style={{ borderBottom: `1px solid ${t.btnBorder}` }}
//                     initial={{ x: 40, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: "easeOut" }}
//                     whileHover="hover"
//                   >
//                     <span className="text-[10px] w-5 tabular-nums" style={{ fontFamily: "'Space Mono',monospace", color: isActive ? t.accent : t.textSubtle }}>
//                       0{i + 1}
//                     </span>
//                     <motion.span
//                       className="text-base font-medium tracking-wide"
//                       style={{ fontFamily: "'Space Mono',monospace", color: isActive ? t.accent : t.textMuted }}
//                       variants={{ hover: { color: t.accent, x: 4 } }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {link.label}
//                     </motion.span>
//                     {isActive && (
//                       <motion.span
//                         className="ml-auto w-1.5 h-1.5 rounded-full"
//                         style={{ background: t.accent, boxShadow: `0 0 8px 2px ${t.accentGlow}` }}
//                         layoutId="mobileActiveIndicator"
//                       />
//                     )}
//                   </motion.button>
//                 );
//               })}
//             </nav>

//             <div className="px-6 py-8">
//               <motion.a
//                 href="/resume.pdf" target="_blank" rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-2 w-full py-3 text-[11px] tracking-[0.25em] uppercase"
//                 style={{
//                   fontFamily: "'Space Mono',monospace",
//                   border: `1px solid ${t.accentGlow}`,
//                   color: t.accent,
//                   borderRadius: "6px",
//                   background: t.accentMuted,
//                 }}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.35 }}
//                 whileTap={{ scale: 0.97 }}
//               >
//                 Download Resume ↗
//               </motion.a>
//             </div>

//             <div className="h-px w-full" style={{ background: `linear-gradient(90deg,transparent,${t.accentGlow},transparent)` }} />
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// // ─── Main Navbar ──────────────────────────────────────────────────────────────

// export default function Navbar() {
//   const [isDark, setIsDark]               = useState(true);
//   const [activeSection, setActiveSection] = useState<string>("");
//   const [menuOpen, setMenuOpen]           = useState(false);
//   const [scrolled, setScrolled]           = useState(false);
//   const observerRef                       = useRef<IntersectionObserver | null>(null);

//   // Derive full theme object from single boolean
//   const t: Theme = isDark ? DARK : LIGHT;

//   // Apply dark/light class to <html> for Tailwind dark mode + global bg
//   useEffect(() => {
//     const html = document.documentElement;
//     if (isDark) {
//       html.classList.add("dark");
//       html.style.background = "#020810";
//     } else {
//       html.classList.remove("dark");
//       html.style.background = "#f0f5ff";
//     }
//   }, [isDark]);

//   // Scroll depth
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Active section via IntersectionObserver
//   useEffect(() => {
//     observerRef.current?.disconnect();
//     const io = new IntersectionObserver(
//       (entries) => {
//         for (const entry of entries) {
//           if (entry.isIntersecting) setActiveSection(entry.target.id);
//         }
//       },
//       { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
//     );
//     NAV_LINKS.forEach(({ section }) => {
//       const el = document.getElementById(section);
//       if (el) io.observe(el);
//     });
//     observerRef.current = io;
//     return () => io.disconnect();
//   }, []);

//   // Close menu on desktop resize
//   useEffect(() => {
//     const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // Body scroll lock when mobile menu open
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [menuOpen]);

//   const handleLinkClick = useCallback((href: string) => {
//     setMenuOpen(false);
//     setTimeout(() => scrollToSection(href), 50);
//   }, []);

//   return (
//     <>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');`}</style>

//       <motion.header
//         className="fixed top-0 left-0 right-0 z-30"
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       >
//         {/* Top accent line */}
//         <motion.div
//           className="absolute top-0 left-0 right-0 h-px pointer-events-none"
//           style={{ background: `linear-gradient(90deg,transparent 0%,${t.accent} 30%,${t.accent} 70%,transparent 100%)` }}
//           animate={{ opacity: scrolled ? 0.8 : 0.3 }}
//           transition={{ duration: 0.4 }}
//         />

//         {/* Glass bar */}
//         <motion.div
//           className="relative mx-auto max-w-6xl"
//           animate={{ background: scrolled ? t.navBgScrolled : t.navBg }}
//           transition={{ duration: 0.35 }}
//           style={{
//             backdropFilter: "blur(22px) saturate(180%)",
//             WebkitBackdropFilter: "blur(22px) saturate(180%)",
//             borderBottom: `1px solid ${t.navBorder}`,
//           }}
//         >
//           <div className="flex items-center justify-between h-16 px-6 md:px-8">
//             <LogoMark t={t} />

//             <nav className="hidden md:flex items-center gap-7">
//               {NAV_LINKS.map((link) => (
//                 <NavItem
//                   key={link.href}
//                   link={link}
//                   active={activeSection === link.section}
//                   onClick={() => handleLinkClick(link.href)}
//                   t={t}
//                 />
//               ))}
//             </nav>

//             <div className="hidden md:flex items-center gap-3">
//               <ThemeToggle t={t} onToggle={() => setIsDark((d) => !d)} />
//               <ResumeButton t={t} />
//             </div>

//             <div className="flex md:hidden items-center gap-3">
//               <ThemeToggle t={t} onToggle={() => setIsDark((d) => !d)} />
//               <motion.button
//                 onClick={() => setMenuOpen((o) => !o)}
//                 className="relative w-9 h-9 flex items-center justify-center rounded-lg"
//                 style={{
//                   background: menuOpen ? t.accentMuted : t.btnBg,
//                   border: `1px solid ${menuOpen ? t.accentGlow : t.btnBorder}`,
//                 }}
//                 whileTap={{ scale: 0.93 }}
//                 aria-label="Toggle menu"
//                 aria-expanded={menuOpen}
//               >
//                 <HamburgerIcon open={menuOpen} t={t} />
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Shimmer sweep */}
//         <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden pointer-events-none" style={{ background: t.navBorder }}>
//           <motion.div
//             className="h-full w-24"
//             style={{ background: `linear-gradient(90deg,transparent,${t.accent},transparent)` }}
//             animate={{ x: ["-100px", "calc(100vw + 100px)"] }}
//             transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
//           />
//         </div>
//       </motion.header>

//       <MobileMenu open={menuOpen} activeSection={activeSection} onLinkClick={handleLinkClick} t={t} />
//     </>
//   );
// }