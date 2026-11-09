"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Bird = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{ x: "-10vw", y: "20vh", opacity: 0 }}
      animate={{
        x: "110vw",
        y: ["20vh", "15vh", "25vh", "20vh"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 25,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="fixed z-0 pointer-events-none"
    >
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="text-white/20">
        <path
          d="M0 6C4 6 8 0 12 6C16 12 20 6 24 6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

const TreeSilhouette = ({ x, scale, delay }: { x: string; scale: number; delay: number }) => {
  return (
    <motion.div
      className="fixed bottom-0 pointer-events-none z-0 opacity-10"
      style={{ left: x, scale: scale }}
      animate={{
        rotate: [-1, 1, -1],
        skewX: [-0.5, 0.5, -0.5],
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width="120" height="400" viewBox="0 0 120 400" fill="none">
        <path
          d="M60 400L60 100M60 150L20 200M60 180L100 230M60 250L15 320M60 280L105 350"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="60" cy="80" r="40" fill="white" fillOpacity="0.2" />
        <circle cx="40" cy="120" r="30" fill="white" fillOpacity="0.1" />
        <circle cx="80" cy="130" r="35" fill="white" fillOpacity="0.1" />
      </svg>
    </motion.div>
  );
};

export default function NatureOverlay() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <Bird delay={0} />
      <Bird delay={12} />
      
      <TreeSilhouette x="2vw" scale={1.2} delay={0} />
      <TreeSilhouette x="15vw" scale={0.8} delay={1} />
      <TreeSilhouette x="85vw" scale={1.1} delay={2} />
      <TreeSilhouette x="92vw" scale={0.7} delay={3} />

      {/* Floating particles (pollen/dust) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
          }}
          animate={{
            x: [null, (Math.random() - 0.5) * 200 + "px"],
            y: [null, (Math.random() - 0.5) * 200 + "px"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
