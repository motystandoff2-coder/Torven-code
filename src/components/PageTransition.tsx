"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useRef, useState } from "react";

interface TransitionCtx {
  navigate: (targetId: string) => void;
  navigateNext: () => void;
  navigatePrev: () => void;
}

const Ctx = createContext<TransitionCtx>({
  navigate: () => {},
  navigateNext: () => {},
  navigatePrev: () => {},
});

const SECTIONS = ["hero","about","services","stats","process","portfolio","faq","cta","contact"];

export function usePageTransition() {
  return useContext(Ctx);
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"idle"|"cover"|"reveal">("idle");
  const [direction, setDirection] = useState<1|-1>(1);
  const currentIdxRef = useRef(0);

  const doScroll = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop, behavior: "auto" });
  }, []);

  const navigateTo = useCallback((id: string, dir: 1|-1) => {
    setDirection(dir);
    setPhase("cover");
    setTimeout(() => {
      doScroll(id);
      setPhase("reveal");
      setTimeout(() => setPhase("idle"), 460);
    }, 380);
  }, [doScroll]);

  const findCurrentIdx = useCallback(() => {
    const mid = window.scrollY + window.innerHeight * 0.4;
    let found = 0;
    SECTIONS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= mid) found = i;
    });
    return found;
  }, []);

  const navigate = useCallback((targetId: string) => {
    if (phase !== "idle") return;
    const clean = targetId.replace("#","");
    const current = findCurrentIdx();
    const target = SECTIONS.indexOf(clean);
    const dir: 1|-1 = target >= current ? 1 : -1;
    currentIdxRef.current = target >= 0 ? target : 0;
    navigateTo(clean, dir);
  }, [phase, findCurrentIdx, navigateTo]);

  const navigateDir = useCallback((dir: 1|-1) => {
    if (phase !== "idle") return;
    const cur = findCurrentIdx();
    const idx = Math.max(0, Math.min(SECTIONS.length - 1, cur + dir));
    currentIdxRef.current = idx;
    navigateTo(SECTIONS[idx] ?? "hero", dir);
  }, [phase, findCurrentIdx, navigateTo]);

  const navigateNext = useCallback(() => navigateDir(1),  [navigateDir]);
  const navigatePrev = useCallback(() => navigateDir(-1), [navigateDir]);

  return (
    <Ctx.Provider value={{ navigate, navigateNext, navigatePrev }}>
      {children}
      <AnimatePresence>
        {phase === "cover" && (
          <motion.div
            key="cover"
            initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 1 }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.38, ease: [0.76,0,0.24,1] }}
            className="fixed inset-0 z-[100] bg-[#070f07]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,110,35,0.3),transparent_65%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.25 }}
                className="serif-display text-3xl text-white/60 md:text-5xl"
              >
                TORZEN
              </motion.span>
            </div>
          </motion.div>
        )}
        {phase === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ x: "0%", opacity: 1 }}
            animate={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.76,0,0.24,1], delay: 0.05 }}
            className="pointer-events-none fixed inset-0 z-[100] bg-[#070f07]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,110,35,0.2),transparent_65%)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
