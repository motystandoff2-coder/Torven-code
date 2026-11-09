"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SECTIONS = ["hero","about","services","stats","process","portfolio","cta","contact"];

export default function SectionNavigator() {
  const [idx,     setIdx]     = useState(0);
  const [visible, setVisible] = useState(false);
  // prevent double-click during scroll
  const scrolling = useRef(false);

  /* ── sync current section index ── */
  useEffect(() => {
    const sync = () => {
      setVisible(window.scrollY > window.innerHeight * 0.4);

      const viewCenter = window.scrollY + window.innerHeight * 0.5;
      let best = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const id = SECTIONS[i];
        if (!id) continue;
        const el = id === "hero"
          ? document.documentElement
          : document.getElementById(id);
        if (!el) continue;
        const top = id === "hero" ? 0 : (el as HTMLElement).offsetTop;
        if (top <= viewCenter) best = i;
      }
      setIdx(best);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  /* ── navigate exactly one section up / down ── */
  const goTo = (target: number) => {
    if (scrolling.current) return;
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, target));
    const id = SECTIONS[clamped];
    if (!id) return;

    scrolling.current = true;
    setIdx(clamped);

    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      }
    }

    // unlock after animation
    setTimeout(() => { scrolling.current = false; }, 900);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.45 }}
          className="fixed right-5 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-3"
        >
          {/* ↑ Up */}
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            onClick={() => goTo(idx - 1)}
            disabled={idx === 0}
            aria-label="Предыдущая секция"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/55 text-white/55 backdrop-blur-md transition hover:border-white/35 hover:bg-white/8 hover:text-white disabled:opacity-20"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 9 7 4 12 9"/>
            </svg>
          </motion.button>

          {/* Dots */}
          <div className="flex flex-col items-center gap-[5px] py-1">
            {SECTIONS.map((id, i) => (
              <button key={id} onClick={() => goTo(i)} aria-label={id}>
                <motion.span
                  animate={{
                    width:           i === idx ? 5 : 4,
                    height:          i === idx ? 16 : 4,
                    backgroundColor: i === idx ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.18)",
                    borderRadius:    999,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="block"
                />
              </button>
            ))}
          </div>

          {/* ↓ Down */}
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            onClick={() => goTo(idx + 1)}
            disabled={idx === SECTIONS.length - 1}
            aria-label="Следующая секция"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/55 text-white/55 backdrop-blur-md transition hover:border-white/35 hover:bg-white/8 hover:text-white disabled:opacity-20"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 5 7 10 12 5"/>
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
