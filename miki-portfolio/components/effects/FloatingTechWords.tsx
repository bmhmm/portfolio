"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const techWords = [
  "Next.js",
  "TypeScript",
  "Solidity",
  "Web3",
  "Supabase",
  "Node.js",
  "DeFi",
  "PostgreSQL",
  "React",
  "Blockchain",
];

// Fixed positions for SSR (deterministic)
const getFixedPositions = () => {
  return techWords.map((_, index) => ({
    x: 100 + (index * 80) % 1000,
    y: 50 + (index * 120) % 600,
  }));
};

export default function FloatingTechWords() {
  const [positions, setPositions] = useState(() => getFixedPositions());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Only randomize on client after hydration
    const randomPositions = techWords.map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setPositions(randomPositions);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {techWords.map((word, index) => (
        <motion.div
          key={word}
          className="absolute text-sm font-semibold text-blue-400/10"
          initial={positions[index]}
          animate={{
            y: [0, -80, 0],
          }}
          transition={{
            duration: 12 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {word}
        </motion.div>
      ))}
    </div>
  );
}