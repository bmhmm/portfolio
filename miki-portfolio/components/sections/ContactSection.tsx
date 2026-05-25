"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, Variants  } from "framer-motion";
import { submitContactForm } from "@/services/contact.service";


// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  telegram: string;
  message: string;
}

type FieldKey = keyof FormState;

interface StatusState {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// const itemVariants = {
//   hidden: { opacity: 0, y: 28 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
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

// const fadeUp = {
//   hidden: { opacity: 0, y: 18 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: (i: number) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

// ─── Contact Info Data ─────────────────────────────────────────────────────────

const contactLinks = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "mikibacha45@gmail.com",
    href: "mailto:mikibacha45@gmail.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/bmhmm",
    href: "https://github.com/bmhmm",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    label: "Telegram",
    value: "t.me/MICHAEL_0px",
    href: "https://t.me/MICHAEL_0px",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Location",
    value: "Addis Ababa, Ethiopia",
    href: null,
  },
];

// ─── Floating Label Field ──────────────────────────────────────────────────────

function FloatingField({
  id,
  label,
  type = "text",
  value,
  onChange,
  multiline = false,
  rows = 5,
}: {
  id: FieldKey;
  label: string;
  type?: string;
  value: string;
  onChange: (id: FieldKey, val: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const sharedClass =
    "peer w-full bg-transparent border rounded-xl px-4 pt-6 pb-2 text-sm text-white/90 outline-none resize-none transition-all duration-300 " +
    (active
      ? "border-blue-500/60 shadow-[0_0_0_1px_rgba(59,130,246,0.25)]"
      : "border-white/10 hover:border-white/20") +
    " focus:border-blue-500/70 focus:shadow-[0_0_16px_rgba(59,130,246,0.15)]";

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={sharedClass}
          style={{ caretColor: "#60a5fa" }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={sharedClass}
          autoComplete="off"
          style={{ caretColor: "#60a5fa" }}
        />
      )}

      <label
        htmlFor={id}
        className={
          "absolute left-4 transition-all duration-250 pointer-events-none select-none " +
          (active
            ? "top-2 text-[10px] font-semibold tracking-widest uppercase text-blue-400/80"
            : "top-1/2 -translate-y-1/2 text-sm text-white/30") +
          (multiline && !active ? " !top-4 translate-y-0" : "")
        }
      >
        {label}
      </label>

      {/* Glow line at bottom on focus */}
      <motion.span
        className="absolute bottom-0 left-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full pointer-events-none"
        animate={{ width: focused ? "80%" : "0%", x: focused ? "-40%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    telegram: "",
    message: "",
  });

  const [status, setStatus] = useState<StatusState>({ type: "idle" });

  const handleChange = (id: FieldKey, val: string) =>
    setForm((prev) => ({ ...prev, [id]: val }));

  // ── Supabase-ready submit handler ──────────────────────────────────────────
 const handleSubmit = async () => {
  if (!form.name || !form.email || !form.message) {
    setStatus({
      type: "error",
      message: "Please fill in all required fields.",
    });

    return;
  }

  setStatus({ type: "loading" });

  try {
    await submitContactForm(form);

    setStatus({
      type: "success",
      message: "Message sent! I'll get back to you soon.",
    });

    setForm({
      name: "",
      email: "",
      telegram: "",
      message: "",
    });

  } catch {
    setStatus({
      type: "error",
      message: "Something went wrong. Please try again.",
    });
  }

  setTimeout(() => {
    setStatus({ type: "idle" });
  }, 4000);
};

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#060810] py-28 px-6"
    >
      {/* ── Background atmospheric layers ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Deep blue nebula glow — top left */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-700/10 blur-[120px]" />
        {/* Cyan accent — bottom right */}
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[100px]" />
        {/* Center subtle radial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-blue-900/10 blur-[140px]" />

        {/* Fine grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(100,180,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(100,180,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── Content wrapper ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start"
      >
        {/* ════════════════════════════════════════════
            LEFT COLUMN — Intro & Contact Info
        ════════════════════════════════════════════ */}
        <div className="flex flex-col gap-8">

          {/* Section label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="inline-block w-6 h-[1.5px] bg-blue-400/70" />
            <span className="text-[11px] tracking-[0.22em] uppercase text-blue-400/80 font-medium font-mono">
              Get In Touch
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold leading-[1.1] text-white"
            style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
          >
            Let&apos;s Build{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Something
              </span>
              <span
                aria-hidden
                className="absolute -inset-1 rounded-md bg-blue-500/10 blur-md pointer-events-none"
              />
            </span>{" "}
            <br className="hidden sm:block" />
            Great Together
          </motion.h2>

          {/* CTA paragraphs */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <p className="text-[15px] leading-relaxed text-white/50">
              Have an idea, project, or opportunity?{" "}
              <span className="text-white/75">
                Let&apos;s build something great together.
              </span>
            </p>
            <p className="text-[15px] leading-relaxed text-white/50">
              Interested in{" "}
              <span className="text-cyan-400/80">Web3</span>,{" "}
              <span className="text-blue-400/80">backend systems</span>, or{" "}
              <span className="text-indigo-400/80">modern web apps</span>?{" "}
              <span className="text-white/75">Let&apos;s connect.</span>
            </p>
          </motion.div>

          {/* Availability badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[13px] text-emerald-300/90 font-medium tracking-wide">
                Available for Freelance Opportunities
              </span>
            </div>
          </motion.div>

          {/* Contact links */}
          <motion.ul variants={itemVariants} className="flex flex-col gap-3 mt-2">
            {contactLinks.map((item, i) => (
              <motion.li
                key={item.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 text-white/45 hover:text-white/90 transition-colors duration-200"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/8 bg-white/3 group-hover:border-blue-500/30 group-hover:bg-blue-500/8 transition-all duration-250 text-white/40 group-hover:text-blue-400/90 flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-[13.5px] font-mono tracking-wide group-hover:translate-x-0.5 transition-transform duration-200">
                      {item.value}
                    </span>
                  </a>
                ) : (
                  <span className="flex items-center gap-3.5 text-white/40">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/8 bg-white/3 flex-shrink-0 text-white/35">
                      {item.icon}
                    </span>
                    <span className="text-[13.5px] font-mono tracking-wide">
                      {item.value}
                    </span>
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* ════════════════════════════════════════════
            RIGHT COLUMN — Contact Form
        ════════════════════════════════════════════ */}
        <motion.div variants={itemVariants}>
          {/* Glass card */}
          <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl p-8 sm:p-10 shadow-[0_8px_60px_rgba(0,0,0,0.5)]">
            {/* Inner top highlight line */}
            <div
              aria-hidden
              className="absolute top-0 left-8 right-8 h-[1px] rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />

            {/* Corner accent */}
            <div
              aria-hidden
              className="absolute top-0 right-0 w-24 h-24 rounded-tr-2xl overflow-hidden pointer-events-none"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-blue-500/5" />
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full border border-blue-400/20" />
            </div>

            <div className="flex flex-col gap-6">
              {/* Form header */}
              <div className="mb-1">
                <h3
                  className="text-lg font-semibold text-white/90 mb-1"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Send a Message
                </h3>
                <p className="text-[12.5px] text-white/30 font-mono tracking-wide">
                  I typically respond within 24 hours
                </p>
              </div>

              {/* Fields */}
              <FloatingField
                id="name"
                label="Your Name *"
                value={form.name}
                onChange={handleChange}
              />
              <FloatingField
                id="email"
                label="Email Address *"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <FloatingField
                id="telegram"
                label="Telegram Username (optional)"
                value={form.telegram}
                onChange={handleChange}
              />
              <FloatingField
                id="message"
                label="Your Message *"
                value={form.message}
                onChange={handleChange}
                multiline
                rows={5}
              />

              {/* Status feedback */}
              <AnimatePresence mode="wait">
                {status.type !== "idle" && status.type !== "loading" && (
                  <motion.div
                    key={status.type}
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={
                      "text-[13px] px-4 py-3 rounded-xl border font-mono tracking-wide " +
                      (status.type === "success"
                        ? "bg-emerald-500/8 border-emerald-500/20 text-emerald-300/80"
                        : "bg-red-500/8 border-red-500/20 text-red-300/80")
                    }
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                onClick={handleSubmit}
                disabled={status.type === "loading"}
                whileHover={status.type !== "loading" ? { scale: 1.015 } : {}}
                whileTap={status.type !== "loading" ? { scale: 0.985 } : {}}
                className="relative group w-full py-4 rounded-xl font-semibold text-[14.5px] tracking-wide text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0ea5e9 100%)",
                }}
              >
                {/* Hover shimmer */}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #22d3ee 100%)",
                  }}
                />

                {/* Glow behind button */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b82f6, #0ea5e9)",
                  }}
                />

                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  {status.type === "loading" ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4 opacity-80"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.svg
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        className="w-4 h-4"
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </>
                  )}
                </span>
              </motion.button>

              <p className="text-center text-[11.5px] text-white/20 font-mono tracking-wide">
                Your data is never shared with third parties.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}