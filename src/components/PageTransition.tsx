"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useState } from "react";

const TransitionContext = createContext<(targetId: string) => void>(() => {});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");

  const navigate = useCallback((id: string) => {
    if (phase !== "idle") return;
    const cleanId = id.replace("#", "");
    setPhase("cover");

    setTimeout(() => {
      const el = document.getElementById(cleanId);
      if (el) {
        const top = cleanId === "hero" ? 0 : el.offsetTop;
        window.scrollTo({ top, behavior: "auto" });
      }
      setPhase("reveal");
      setTimeout(() => setPhase("idle"), 520);
    }, 420);
  }, [phase]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <AnimatePresence>
        {phase === "cover" && (
          <motion.div
            key="cover"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
            style={{ originY: 0 }}
            className="fixed inset-0 z-[100] bg-[#081108]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,110,35,0.28),transparent_62%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="serif-display text-3xl text-white/70 md:text-5xl">TORZEN</span>
            </div>
          </motion.div>
        )}
        {phase === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ scaleY: 1, opacity: 1 }}
            animate={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.46, ease: [0.76, 0, 0.24, 1] }}
            style={{ originY: 0 }}
            className="pointer-events-none fixed inset-0 z-[100] bg-[#081108]"
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
