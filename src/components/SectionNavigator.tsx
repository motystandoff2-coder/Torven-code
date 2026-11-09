"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const SECTIONS = ["hero","about","services","stats","process","portfolio","cta","contact"];

export default function SectionNavigator() {
  const [idx,     setIdx]     = useState(0);
  const [visible, setVisible] = useState(false);

  const sync = useCallback(() => {
    const mid = window.scrollY + window.innerHeight * 0.45;
    let found = 0;
    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i] ?? "");
      if (el && el.offsetTop <= mid) found = i;
    }
    setIdx(found);
  }, []);

  useEffect(() => {
    const fn = () => { setVisible(window.scrollY > window.innerHeight * 0.5); sync(); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [sync]);

  const goTo = (i: number) => {
    const id = SECTIONS[Math.max(0, Math.min(SECTIONS.length - 1, i))];
    if (!id) return;
    if (id === "hero") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.5 }}
          className="fixed right-5 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-3">

          {/* Up arrow */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => goTo(idx - 1)}
            disabled={idx === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/50 text-white/50 backdrop-blur-md transition disabled:opacity-20 hover:border-white/30 hover:text-white">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 9 7 4 12 9"/>
            </svg>
          </motion.button>

          {/* Dots */}
          <div className="flex flex-col items-center gap-[6px] py-1">
            {SECTIONS.map((id, i) => (
              <button key={id} onClick={() => goTo(i)}>
                <motion.span
                  animate={{
                    width:           i === idx ? 5  : 4,
                    height:          i === idx ? 14 : 4,
                    backgroundColor: i === idx ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.18)",
                    borderRadius:    999,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="block"
                />
              </button>
            ))}
          </div>

          {/* Down arrow */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => goTo(idx + 1)}
            disabled={idx === SECTIONS.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/50 text-white/50 backdrop-blur-md transition disabled:opacity-20 hover:border-white/30 hover:text-white">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 5 7 10 12 5"/>
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
