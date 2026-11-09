"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const SECTION_IDS = ["hero", "about", "services", "stats", "process", "portfolio", "cta", "contact"];

function ChevronUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2 9 7 4 12 9" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2 5 7 10 12 5" />
    </svg>
  );
}

export default function SectionNavigator() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  const findCurrentSection = useCallback(() => {
    const viewportMid = window.scrollY + window.innerHeight * 0.45;
    let found = 0;
    for (let i = 0; i < SECTION_IDS.length; i++) {
      const el = document.getElementById(SECTION_IDS[i] ?? "");
      if (!el) continue;
      if (el.offsetTop <= viewportMid) found = i;
    }
    setCurrentIdx(found);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
      findCurrentSection();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [findCurrentSection]);

  const scrollToSection = (idx: number) => {
    const clamped = Math.max(0, Math.min(SECTION_IDS.length - 1, idx));
    const id = SECTION_IDS[clamped];
    if (!id) return;
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed right-5 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-3"
        >
          {/* Up arrow */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,90,31,0.18)" }}
            whileTap={{ scale: 0.92 }}
            onClick={() => scrollToSection(currentIdx - 1)}
            disabled={currentIdx === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/50 text-[#c8c0b2] backdrop-blur-md transition disabled:opacity-20 hover:border-white/28 hover:text-white"
          >
            <ChevronUp />
          </motion.button>

          {/* Dot indicators */}
          <div className="flex flex-col items-center gap-[6px] py-1">
            {SECTION_IDS.map((id, i) => (
              <button
                key={id}
                onClick={() => scrollToSection(i)}
                className="relative flex items-center justify-center"
                title={id}
              >
                <motion.span
                  animate={{
                    width: i === currentIdx ? 6 : 4,
                    height: i === currentIdx ? 14 : 4,
                    backgroundColor: i === currentIdx ? "#ff5a1f" : "rgba(255,255,255,0.2)",
                    borderRadius: 999,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="block"
                />
              </button>
            ))}
          </div>

          {/* Down arrow */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,90,31,0.18)" }}
            whileTap={{ scale: 0.92 }}
            onClick={() => scrollToSection(currentIdx + 1)}
            disabled={currentIdx === SECTION_IDS.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/50 text-[#c8c0b2] backdrop-blur-md transition disabled:opacity-20 hover:border-white/28 hover:text-white"
          >
            <ChevronDown />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
