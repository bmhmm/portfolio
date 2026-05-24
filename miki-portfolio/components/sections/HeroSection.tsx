// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// // ─── Font import ──────────────────────────────────────────────────────────────
// // Add to your layout.tsx or globals.css:
// // @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400;500&display=swap');

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface SocialLink {
//   label: string;
//   href: string;
//   icon: React.ReactNode;
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// const ROLES = [
//   "Full-Stack Engineer",
//   "UI/UX Architect",
//   "Open Source Builder",
//   "Systems Designer",
//   "Performance Nerd",
// ];

// const STATS = [
//   { value: "5+",  label: "Years Exp." },
//   { value: "40+", label: "Projects"   },
//   { value: "12+", label: "Clients"    },
// ];

// // ─── SVG Social Icons ─────────────────────────────────────────────────────────

// const GithubIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
//   </svg>
// );

// const LinkedInIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//   </svg>
// );

// const TwitterIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//   </svg>
// );

// const DribbbleIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"/>
//   </svg>
// );

// const SOCIAL_LINKS: SocialLink[] = [
//   { label: "GitHub",   href: "https://github.com",   icon: <GithubIcon />   },
//   { label: "LinkedIn", href: "https://linkedin.com", icon: <LinkedInIcon /> },
//   { label: "Twitter",  href: "https://twitter.com",  icon: <TwitterIcon />  },
//   { label: "Dribbble", href: "https://dribbble.com", icon: <DribbbleIcon /> },
// ];

// // ─── Stagger container ────────────────────────────────────────────────────────

// const STAGGER = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
// };

// const FADE_UP = {
//   hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
//   show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
// };

// const FADE_IN = {
//   hidden: { opacity: 0, filter: "blur(6px)" },
//   show:   { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
// };

// // ─── Animated role text ───────────────────────────────────────────────────────

// function RoleText() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <div className="relative h-10 overflow-hidden flex items-center" style={{ minWidth: 260 }}>
//       <AnimatePresence mode="wait">
//         <motion.span
//           key={ROLES[index]}
//           initial={{ y: 36, opacity: 0, filter: "blur(4px)" }}
//           animate={{ y: 0,  opacity: 1, filter: "blur(0px)" }}
//           exit={{   y: -36, opacity: 0, filter: "blur(4px)" }}
//           transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//           className="absolute text-lg md:text-xl font-medium tracking-wide"
//           style={{
//             fontFamily: "'DM Mono', monospace",
//             background: "linear-gradient(90deg, #00d4ff, #6366f1)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           {ROLES[index]}
//         </motion.span>
//       </AnimatePresence>
//     </div>
//   );
// }

// // ─── Floating visual orb / avatar area ───────────────────────────────────────

// function FloatingVisual({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
//   return (
//     <motion.div
//       className="relative flex items-center justify-center"
//       style={{ width: 360, height: 360 }}
//       animate={{ y: [0, -14, 0] }}
//       transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//     >
//       {/* Outer ring pulse */}
//       <motion.div
//         className="absolute rounded-full"
//         style={{
//           width: 340, height: 340,
//           border: "1px solid rgba(0,212,255,0.18)",
//         }}
//         animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.8, 0.4] }}
//         transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute rounded-full"
//         style={{
//           width: 300, height: 300,
//           border: "1px solid rgba(99,102,241,0.22)",
//         }}
//         animate={{ scale: [1.04, 1, 1.04], opacity: [0.3, 0.6, 0.3] }}
//         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
//       />

//       {/* Orbiting dot */}
//       <motion.div
//         className="absolute"
//         style={{ width: 340, height: 340 }}
//         animate={{ rotate: 360 }}
//         transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//       >
//         <div
//           className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
//           style={{ background: "#00d4ff", boxShadow: "0 0 12px 4px rgba(0,212,255,0.7)" }}
//         />
//       </motion.div>
//       <motion.div
//         className="absolute"
//         style={{ width: 300, height: 300 }}
//         animate={{ rotate: -360 }}
//         transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
//       >
//         <div
//           className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full"
//           style={{ background: "#6366f1", boxShadow: "0 0 10px 3px rgba(99,102,241,0.7)" }}
//         />
//       </motion.div>

//       {/* Glass avatar card */}
//       <motion.div
//         className="relative z-10 rounded-2xl overflow-hidden flex items-center justify-center"
//         style={{
//           width: 220, height: 220,
//           background: "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(99,102,241,0.12) 100%)",
//           backdropFilter: "blur(20px)",
//           border: "1px solid rgba(0,212,255,0.2)",
//           boxShadow: "0 0 60px rgba(0,212,255,0.12), inset 0 0 40px rgba(99,102,241,0.08)",
//           transform: `perspective(800px) rotateY(${(mouseX * 0.01).toFixed(2)}deg) rotateX(${(-mouseY * 0.01).toFixed(2)}deg)`,
//         }}
//       >
//         {/* Placeholder avatar — swap with <Image /> */}
//         <div className="flex flex-col items-center gap-3">
//           <div
//             className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black"
//             style={{
//               background: "linear-gradient(135deg,#00d4ff,#6366f1)",
//               fontFamily: "'Syne',sans-serif",
//               color: "#fff",
//               boxShadow: "0 0 30px rgba(0,212,255,0.4)",
//             }}
//           >
//             YN
//           </div>
//           <div className="flex flex-col items-center gap-1">
//             <div className="flex gap-1">
//               {[...Array(5)].map((_,i) => (
//                 <div key={i} className="w-1 h-1 rounded-full" style={{ background: i < 4 ? "#00d4ff" : "rgba(255,255,255,0.2)" }} />
//               ))}
//             </div>
//             <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(0,212,255,0.6)", fontFamily: "'DM Mono',monospace" }}>
//               Available
//             </span>
//           </div>
//         </div>

//         {/* Corner accents */}
//         {[
//           "top-2 left-2 border-t border-l",
//           "top-2 right-2 border-t border-r",
//           "bottom-2 left-2 border-b border-l",
//           "bottom-2 right-2 border-b border-r",
//         ].map((cls, i) => (
//           <div key={i} className={`absolute w-4 h-4 ${cls}`} style={{ borderColor: "rgba(0,212,255,0.4)" }} />
//         ))}
//       </motion.div>

//       {/* Ambient glow behind */}
//       <div
//         className="absolute inset-0 rounded-full pointer-events-none -z-10"
//         style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,212,255,0.08) 0%, transparent 70%)" }}
//       />
//     </motion.div>
//   );
// }

// // ─── CTA Button ───────────────────────────────────────────────────────────────

// function CTAButton({
//   label,
//   href,
//   variant,
//   icon,
// }: {
//   label: string;
//   href: string;
//   variant: "primary" | "secondary" | "ghost";
//   icon?: React.ReactNode;
// }) {
//   const styles = {
//     primary: {
//       background: "linear-gradient(135deg,#00d4ff 0%,#0066ff 60%,#6366f1 100%)",
//       border: "none",
//       color: "#fff",
//       shadow: "0 0 30px rgba(0,212,255,0.35), 0 4px 20px rgba(0,102,255,0.3)",
//       hoverShadow: "0 0 50px rgba(0,212,255,0.55), 0 8px 30px rgba(0,102,255,0.5)",
//     },
//     secondary: {
//       background: "rgba(0,212,255,0.06)",
//       border: "1px solid rgba(0,212,255,0.3)",
//       color: "#00d4ff",
//       shadow: "0 0 0px transparent",
//       hoverShadow: "0 0 24px rgba(0,212,255,0.25)",
//     },
//     ghost: {
//       background: "rgba(255,255,255,0.03)",
//       border: "1px solid rgba(255,255,255,0.1)",
//       color: "rgba(255,255,255,0.7)",
//       shadow: "none",
//       hoverShadow: "0 0 16px rgba(255,255,255,0.06)",
//     },
//   }[variant];

//   return (
//     <motion.a
//       href={href}
//       className="relative inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium tracking-wide overflow-hidden cursor-pointer"
//       style={{
//         background: styles.background,
//         border: styles.border ?? "none",
//         color: styles.color,
//         borderRadius: "10px",
//         boxShadow: styles.shadow,
//         fontFamily: "'DM Mono',monospace",
//         textDecoration: "none",
//       }}
//       whileHover={{ scale: 1.04, boxShadow: styles.hoverShadow }}
//       whileTap={{ scale: 0.97 }}
//       transition={{ type: "spring", stiffness: 400, damping: 25 }}
//     >
//       {variant === "primary" && (
//         <motion.span
//           className="absolute inset-0 opacity-0"
//           style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
//           whileHover={{ opacity: 1 }}
//           transition={{ duration: 0.3 }}
//         />
//       )}
//       {icon && <span className="relative z-10">{icon}</span>}
//       <span className="relative z-10">{label}</span>
//     </motion.a>
//   );
// }

// // ─── Social pill ──────────────────────────────────────────────────────────────

// function SocialPill({ link }: { link: SocialLink }) {
//   return (
//     <motion.a
//       href={link.href}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label={link.label}
//       className="relative w-10 h-10 rounded-xl flex items-center justify-center"
//       style={{
//         background: "rgba(255,255,255,0.04)",
//         border: "1px solid rgba(255,255,255,0.09)",
//         color: "rgba(255,255,255,0.5)",
//       }}
//       whileHover={{
//         scale: 1.12,
//         color: "#00d4ff",
//         background: "rgba(0,212,255,0.08)",
//         borderColor: "rgba(0,212,255,0.35)",
//         boxShadow: "0 0 20px rgba(0,212,255,0.2)",
//       }}
//       whileTap={{ scale: 0.95 }}
//       transition={{ type: "spring", stiffness: 400, damping: 20 }}
//     >
//       {link.icon}
//     </motion.a>
//   );
// }

// // ─── Stat pill ────────────────────────────────────────────────────────────────

// function StatPill({ value, label }: { value: string; label: string }) {
//   return (
//     <motion.div
//       className="flex flex-col items-center px-5 py-3 rounded-xl"
//       style={{
//         background: "rgba(0,212,255,0.04)",
//         border: "1px solid rgba(0,212,255,0.1)",
//       }}
//       whileHover={{
//         background: "rgba(0,212,255,0.08)",
//         borderColor: "rgba(0,212,255,0.25)",
//         boxShadow: "0 0 20px rgba(0,212,255,0.1)",
//       }}
//       transition={{ duration: 0.2 }}
//     >
//       <span
//         className="text-2xl font-black leading-none"
//         style={{
//           fontFamily: "'Syne',sans-serif",
//           background: "linear-gradient(135deg,#00d4ff,#6366f1)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         {value}
//       </span>
//       <span
//         className="text-[10px] tracking-[0.2em] uppercase mt-1"
//         style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono',monospace" }}
//       >
//         {label}
//       </span>
//     </motion.div>
//   );
// }

// // ─── Decorative grid lines ────────────────────────────────────────────────────

// function GridLines() {
//   return (
//     <div
//       className="absolute inset-0 pointer-events-none"
//       style={{
//         backgroundImage: `
//           linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
//           linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
//         `,
//         backgroundSize: "80px 80px",
//         maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 80%)",
//       }}
//     />
//   );
// }

// // ─── Ambient light blobs ──────────────────────────────────────────────────────

// function AmbientLights() {
//   return (
//     <>
//       <div className="absolute pointer-events-none"
//         style={{ top: "10%", left: "10%", width: "35%", height: "50%",
//           background: "radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)",
//           filter: "blur(60px)" }} />
//       <div className="absolute pointer-events-none"
//         style={{ bottom: "15%", right: "5%", width: "30%", height: "45%",
//           background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
//           filter: "blur(70px)" }} />
//       <div className="absolute pointer-events-none"
//         style={{ top: "40%", left: "40%", width: "25%", height: "30%",
//           background: "radial-gradient(ellipse, rgba(0,102,255,0.05) 0%, transparent 70%)",
//           filter: "blur(80px)" }} />
//     </>
//   );
// }

// // ─── Download icon ────────────────────────────────────────────────────────────

// const DownloadIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//     <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
//   </svg>
// );

// // ─── Arrow icon ───────────────────────────────────────────────────────────────

// const ArrowIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//     <path d="M5 12h14M12 5l7 7-7 7"/>
//   </svg>
// );

// // ─── Main HeroSection ─────────────────────────────────────────────────────────

// export default function HeroSection() {
//   const [mouseX, setMouseX] = useState(0);
//   const [mouseY, setMouseY] = useState(0);
//   const sectionRef          = useRef<HTMLElement>(null);
//   const rafRef              = useRef<number | null>(null);

//   // Client-only mouse tracking for 3D tilt
//   const handleMouseMove = useCallback((e: MouseEvent) => {
//     if (rafRef.current) return;
//     rafRef.current = requestAnimationFrame(() => {
//       const rect = sectionRef.current?.getBoundingClientRect();
//       if (rect) {
//         setMouseX(e.clientX - rect.left - rect.width  / 2);
//         setMouseY(e.clientY - rect.top  - rect.height / 2);
//       }
//       rafRef.current = null;
//     });
//   }, []);

//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el) return;
//     el.addEventListener("mousemove", handleMouseMove, { passive: true });
//     return () => el.removeEventListener("mousemove", handleMouseMove);
//   }, [handleMouseMove]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400;500&display=swap');
//       `}</style>

//       <section
//         ref={sectionRef}
//         id="hero"
//         className="relative min-h-screen flex items-center overflow-hidden"
//         style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,70,120,0.25) 0%, transparent 60%), #020810" }}
//       >
//         {/* Background elements */}
//         <AmbientLights />
//         <GridLines />

//         {/* Horizontal accent lines */}
//         <div className="absolute top-0 left-0 right-0 h-px"
//           style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.3),transparent)" }} />
//         <div className="absolute bottom-0 left-0 right-0 h-px"
//           style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.2),transparent)" }} />

//         {/* Content */}
//         <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

//             {/* ── Left column ── */}
//             <motion.div
//               className="flex-1 flex flex-col gap-8 lg:max-w-2xl"
//               variants={STAGGER}
//               initial="hidden"
//               animate="show"
//             >
//               {/* Status badge */}
//               <motion.div variants={FADE_IN} className="flex items-center gap-3">
//                 <div className="flex items-center gap-2 px-4 py-2 rounded-full"
//                   style={{
//                     background: "rgba(0,212,255,0.06)",
//                     border: "1px solid rgba(0,212,255,0.2)",
//                   }}>
//                   <motion.span
//                     className="w-2 h-2 rounded-full"
//                     style={{ background: "#00d4ff", boxShadow: "0 0 8px 2px rgba(0,212,255,0.7)" }}
//                     animate={{ opacity: [1, 0.3, 1] }}
//                     transition={{ duration: 1.6, repeat: Infinity }}
//                   />
//                   <span className="text-xs tracking-[0.2em] uppercase"
//                     style={{ color: "rgba(0,212,255,0.8)", fontFamily: "'DM Mono',monospace" }}>
//                     Open to opportunities
//                   </span>
//                 </div>
//                 <div className="h-px flex-1 max-w-20"
//                   style={{ background: "linear-gradient(90deg,rgba(0,212,255,0.3),transparent)" }} />
//               </motion.div>

//               {/* Name */}
//               <motion.div variants={FADE_UP} className="flex flex-col gap-2">
//                 <span className="text-sm tracking-[0.35em] uppercase"
//                   style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono',monospace" }}>
//                   Hello, I'm
//                 </span>
//                 <h1
//                   className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight"
//                   style={{ fontFamily: "'Syne',sans-serif" }}
//                 >
//                   <span
//                     style={{
//                       background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)",
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                     }}
//                   >
//                     Your
//                   </span>
//                   <br />
//                   <span
//                     style={{
//                       background: "linear-gradient(135deg,#00d4ff 0%,#0066ff 50%,#6366f1 100%)",
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                     }}
//                   >
//                     Name.
//                   </span>
//                 </h1>
//               </motion.div>

//               {/* Animated role */}
//               <motion.div variants={FADE_UP} className="flex items-center gap-3">
//                 <span className="text-sm" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono',monospace" }}>~/</span>
//                 <RoleText />
//               </motion.div>

//               {/* Bio */}
//               <motion.p
//                 variants={FADE_UP}
//                 className="text-base md:text-lg leading-relaxed max-w-xl"
//                 style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono',monospace", fontWeight: 300 }}
//               >
//                 I build{" "}
//                 <span style={{ color: "#00d4ff" }}>fast, accessible, and beautiful</span>{" "}
//                 digital experiences. Turning complex problems into elegant interfaces that{" "}
//                 <span style={{ color: "rgba(255,255,255,0.75)" }}>users actually love</span>.
//               </motion.p>

//               {/* CTAs */}
//               <motion.div variants={FADE_UP} className="flex flex-wrap gap-3">
//                 <CTAButton label="Hire Me"       href="#contact"  variant="primary"   icon={<ArrowIcon />}    />
//                 <CTAButton label="View Projects"  href="#projects" variant="secondary"                        />
//                 <CTAButton label="Download CV"    href="/cv.pdf"   variant="ghost"     icon={<DownloadIcon />} />
//               </motion.div>

//               {/* Stats + socials row */}
//               <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
//                 {/* Stats */}
//                 <div className="flex gap-3">
//                   {STATS.map((s) => <StatPill key={s.label} {...s} />)}
//                 </div>

//                 {/* Divider */}
//                 <div className="hidden sm:block w-px h-12 self-center"
//                   style={{ background: "rgba(255,255,255,0.08)" }} />

//                 {/* Socials */}
//                 <div className="flex gap-2">
//                   {SOCIAL_LINKS.map((l) => <SocialPill key={l.label} link={l} />)}
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* ── Right column — floating visual ── */}
//             <motion.div
//               className="flex-shrink-0 hidden lg:flex items-center justify-center"
//               initial={{ opacity: 0, x: 60, filter: "blur(20px)" }}
//               animate={{ opacity: 1, x: 0,  filter: "blur(0px)"  }}
//               transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
//             >
//               <FloatingVisual mouseX={mouseX} mouseY={mouseY} />
//             </motion.div>
//           </div>

//           {/* Scroll indicator */}
//           <motion.div
//             className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.5, duration: 0.6 }}
//           >
//             <span className="text-[10px] tracking-[0.3em] uppercase"
//               style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono',monospace" }}>
//               Scroll
//             </span>
//             <motion.div
//               className="w-px h-10"
//               style={{ background: "linear-gradient(180deg,rgba(0,212,255,0.5),transparent)" }}
//               animate={{ scaleY: [0, 1, 0], originY: 0 }}
//               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//             />
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }









"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform} from "framer-motion";
import {Send} from "lucide-react";

// ─── Font import ──────────────────────────────────────────────────────────────
// Add to your layout.tsx or globals.css:
// @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400;500&display=swap');

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLES = [
  "Full-Stack Engineer",
  "UI/UX Architect",
  "Open Source Builder",
  "Systems Designer",
  "Performance Nerd",
];

const STATS = [
  { value: "2+",  label: "Years Exp." },
  { value: "5+", label: "Projects"   },
//   { value: "12+", label: "Clients"    },
];

// ─── SVG Social Icons ─────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const DribbbleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"/>
  </svg>
);

const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub",   href: "https://github.com/bmhmm",   icon: <GithubIcon />   },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <LinkedInIcon /> },
  { label: "Twitter",  href: "https://twitter.com",  icon: <TwitterIcon />  },
  {label: "Telegram",  href: "https://t.me/MICHAEL_0px", icon: <Send />},
  { label: "Dribbble", href: "https://dribbble.com", icon: <DribbbleIcon /> },
];

// ─── Stagger container ────────────────────────────────────────────────────────

const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const FADE_IN = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  show:   { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
};

// ─── Animated role text ───────────────────────────────────────────────────────

function RoleText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-10 overflow-hidden flex items-center" style={{ minWidth: 260 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: 36, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0,  opacity: 1, filter: "blur(0px)" }}
          exit={{   y: -36, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute text-lg md:text-xl font-medium tracking-wide"
          style={{
            fontFamily: "'DM Mono', monospace",
            background: "linear-gradient(90deg, #00d4ff, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Floating visual orb / avatar area ───────────────────────────────────────

function FloatingVisual({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: 360, height: 360 }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer ring pulse */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 340, height: 340,
          border: "1px solid rgba(0,212,255,0.18)",
        }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300, height: 300,
          border: "1px solid rgba(99,102,241,0.22)",
        }}
        animate={{ scale: [1.04, 1, 1.04], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Orbiting dot */}
      <motion.div
        className="absolute"
        style={{ width: 340, height: 340 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
          style={{ background: "#00d4ff", boxShadow: "0 0 12px 4px rgba(0,212,255,0.7)" }}
        />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ width: 300, height: 300 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: "#6366f1", boxShadow: "0 0 10px 3px rgba(99,102,241,0.7)" }}
        />
      </motion.div>

      {/* Glass avatar card */}
      <motion.div
        className="relative z-10 rounded-2xl overflow-hidden flex items-center justify-center"
        style={{
          width: 220, height: 220,
          background: "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(99,102,241,0.12) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0,212,255,0.2)",
          boxShadow: "0 0 60px rgba(0,212,255,0.12), inset 0 0 40px rgba(99,102,241,0.08)",
          transform: `perspective(800px) rotateY(${(mouseX * 0.01).toFixed(2)}deg) rotateX(${(-mouseY * 0.01).toFixed(2)}deg)`,
        }}
      >
        {/* Placeholder avatar — swap with <Image /> */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#6366f1)",
              fontFamily: "'Syne',sans-serif",
              color: "#fff",
              boxShadow: "0 0 30px rgba(0,212,255,0.4)",
            }}
          >
            MB
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
              {[...Array(5)].map((_,i) => (
                <div key={i} className="w-1 h-1 rounded-full" style={{ background: i < 4 ? "#00d4ff" : "rgba(255,255,255,0.2)" }} />
              ))}
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(0,212,255,0.6)", fontFamily: "'DM Mono',monospace" }}>
              Available
            </span>
          </div>
        </div>

        {/* Corner accents */}
        {[
          "top-2 left-2 border-t border-l",
          "top-2 right-2 border-t border-r",
          "bottom-2 left-2 border-b border-l",
          "bottom-2 right-2 border-b border-r",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-4 h-4 ${cls}`} style={{ borderColor: "rgba(0,212,255,0.4)" }} />
        ))}
      </motion.div>

      {/* Ambient glow behind */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,212,255,0.08) 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────

function CTAButton({
  label,
  href,
  variant,
  icon,
}: {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
}) {
  const styles = {
    primary: {
      background: "linear-gradient(135deg,#00d4ff 0%,#0066ff 60%,#6366f1 100%)",
      border: "none",
      color: "#fff",
      shadow: "0 0 30px rgba(0,212,255,0.35), 0 4px 20px rgba(0,102,255,0.3)",
      hoverShadow: "0 0 50px rgba(0,212,255,0.55), 0 8px 30px rgba(0,102,255,0.5)",
    },
    secondary: {
      background: "rgba(0,212,255,0.06)",
      border: "1px solid rgba(0,212,255,0.3)",
      color: "#00d4ff",
      shadow: "0 0 0px transparent",
      hoverShadow: "0 0 24px rgba(0,212,255,0.25)",
    },
    ghost: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.7)",
      shadow: "none",
      hoverShadow: "0 0 16px rgba(255,255,255,0.06)",
    },
  }[variant];

  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium tracking-wide overflow-hidden cursor-pointer"
      style={{
        background: styles.background,
        border: styles.border ?? "none",
        color: styles.color,
        borderRadius: "10px",
        boxShadow: styles.shadow,
        fontFamily: "'DM Mono',monospace",
        textDecoration: "none",
      }}
      whileHover={{ scale: 1.04, boxShadow: styles.hoverShadow }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 opacity-0"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{label}</span>
    </motion.a>
  );
}

// ─── Social pill ──────────────────────────────────────────────────────────────

function SocialPill({ link }: { link: SocialLink }) {
  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        color: "rgba(255,255,255,0.5)",
      }}
      whileHover={{
        scale: 1.12,
        color: "#00d4ff",
        background: "rgba(0,212,255,0.08)",
        borderColor: "rgba(0,212,255,0.35)",
        boxShadow: "0 0 20px rgba(0,212,255,0.2)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {link.icon}
    </motion.a>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center px-5 py-3 rounded-xl"
      style={{
        background: "rgba(0,212,255,0.04)",
        border: "1px solid rgba(0,212,255,0.1)",
      }}
      whileHover={{
        background: "rgba(0,212,255,0.08)",
        borderColor: "rgba(0,212,255,0.25)",
        boxShadow: "0 0 20px rgba(0,212,255,0.1)",
      }}
      transition={{ duration: 0.2 }}
    >
      <span
        className="text-2xl font-black leading-none"
        style={{
          fontFamily: "'Syne',sans-serif",
          background: "linear-gradient(135deg,#00d4ff,#6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {value}
      </span>
      <span
        className="text-[10px] tracking-[0.2em] uppercase mt-1"
        style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono',monospace" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Decorative grid lines ────────────────────────────────────────────────────

function GridLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 80%)",
      }}
    />
  );
}

// ─── Ambient light blobs ──────────────────────────────────────────────────────

function AmbientLights() {
  return (
    <>
      <div className="absolute pointer-events-none"
        style={{ top: "10%", left: "10%", width: "35%", height: "50%",
          background: "radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)",
          filter: "blur(60px)" }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: "15%", right: "5%", width: "30%", height: "45%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(70px)" }} />
      <div className="absolute pointer-events-none"
        style={{ top: "40%", left: "40%", width: "25%", height: "30%",
          background: "radial-gradient(ellipse, rgba(0,102,255,0.05) 0%, transparent 70%)",
          filter: "blur(80px)" }} />
    </>
  );
}

// ─── Download icon ────────────────────────────────────────────────────────────

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
);

// ─── Arrow icon ───────────────────────────────────────────────────────────────

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// ─── Main HeroSection ─────────────────────────────────────────────────────────

export default function HeroSection() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const sectionRef          = useRef<HTMLElement>(null);
  const rafRef              = useRef<number | null>(null);

  // Client-only mouse tracking for 3D tilt
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMouseX(e.clientX - rect.left - rect.width  / 2);
        setMouseY(e.clientY - rect.top  - rect.height / 2);
      }
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400;500&display=swap');
      `}</style>

      <section
        ref={sectionRef}
        id="home"
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: "100dvh",
          paddingTop: "0px",
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,70,120,0.25) 0%, transparent 60%), #020810",
        }}
      >
        {/* Background elements */}
        <AmbientLights />
        <GridLines />

        {/* Horizontal accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.3),transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.2),transparent)" }} />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

            {/* ── Left column ── */}
            <motion.div
              className="flex-1 flex flex-col gap-8 lg:max-w-2xl"
              variants={STAGGER}
              initial="hidden"
              animate="show"
            >
              {/* Status badge */}
              <motion.div variants={FADE_IN} className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(0,212,255,0.06)",
                    border: "1px solid rgba(0,212,255,0.2)",
                  }}>
                  <motion.span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#00d4ff", boxShadow: "0 0 8px 2px rgba(0,212,255,0.7)" }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  <span className="text-xs tracking-[0.2em] uppercase"
                    style={{ color: "rgba(0,212,255,0.8)", fontFamily: "'DM Mono',monospace" }}>
                    Open to opportunities
                  </span>
                </div>
                <div className="h-px flex-1 max-w-20"
                  style={{ background: "linear-gradient(90deg,rgba(0,212,255,0.3),transparent)" }} />
              </motion.div>

              {/* Name */}
              <motion.div variants={FADE_UP} className="flex flex-col gap-2">
                <span className="text-sm tracking-[0.35em] uppercase"
                  style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono',monospace" }}>
                  Hello, I'm
                </span>
                {/* <h1
                  className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  <span
                    style={{
                      background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Michael
                  </span>
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg,#00d4ff 0%,#0066ff 50%,#6366f1 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Bacha.
                  </span>
                </h1> */}
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
              <span className="bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
                       Michael
                </span>
                   <span className="block bg-gradient-to-br from-[#00d4ff] via-[#0066ff] to-[#6366f1] bg-clip-text text-transparent">
                         Bacha.
                           </span>
                </h1>
              </motion.div>

              {/* Animated role */}
              <motion.div variants={FADE_UP} className="flex items-center gap-3">
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono',monospace" }}>~/</span>
                <RoleText />
              </motion.div>

              {/* Bio */}
              <motion.p
                variants={FADE_UP}
                className="text-base md:text-lg leading-relaxed max-w-xl"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono',monospace", fontWeight: 300 }}
              >
                I build{" "}
                <span style={{ color: "#00d4ff" }}>fast, accessible, and beautiful</span>{" "}
                digital experiences. Turning complex problems into elegant interfaces that{" "}
                <span style={{ color: "rgba(255,255,255,0.75)" }}>users actually love</span>.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={FADE_UP} className="flex flex-wrap gap-3">
                <CTAButton label="Hire Me"       href="#contact"  variant="primary"   icon={<ArrowIcon />}    />
                <CTAButton label="View Projects"  href="#projects" variant="secondary"                        />
                <CTAButton label="Download CV"    href="/cv.pdf"   variant="ghost"     icon={<DownloadIcon />} />
              </motion.div>

              {/* Stats + socials row */}
              <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Stats */}
                <div className="flex gap-3">
                  {STATS.map((s) => <StatPill key={s.label} {...s} />)}
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-12 self-center"
                  style={{ background: "rgba(255,255,255,0.08)" }} />

                {/* Socials */}
                <div className="flex gap-2">
                  {SOCIAL_LINKS.map((l) => <SocialPill key={l.label} link={l} />)}
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right column — floating visual ── */}
            <motion.div
              className="flex-shrink-0 hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, x: 60, filter: "blur(20px)" }}
              animate={{ opacity: 1, x: 0,  filter: "blur(0px)"  }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <FloatingVisual mouseX={mouseX} mouseY={mouseY} />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono',monospace" }}>
              Scroll
            </span>
            <motion.div
              className="w-px h-10"
              style={{ background: "linear-gradient(180deg,rgba(0,212,255,0.5),transparent)" }}
              animate={{ scaleY: [0, 1, 0], originY: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}