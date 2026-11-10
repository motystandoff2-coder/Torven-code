"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const SECTION_IDS = ["hero", "about", "services", "stats", "process", "portfolio", "cta", "contact"];

export default function SectionNavigator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionElementsRef = useRef<HTMLElement[]>([]);
  const isProgrammaticScrollRef = useRef(false);
  const scrollUnlockTimerRef = useRef<number | null>(null);

  const sections = useMemo(() => SECTION_IDS, []);

  useEffect(() => {
    const collectSections = () => {
      sectionElementsRef.current = sections
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));
    };

    const updateCurrentSection = () => {
      setVisible(window.scrollY > window.innerHeight * 0.22);

      const markerY = Math.min(window.innerHeight * 0.34, 260);
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      sectionElementsRef.current.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - markerY);
        const isReasonablyVisible = rect.bottom > markerY * 0.5;

        if (isReasonablyVisible && distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      setCurrentIndex(bestIndex);
    };

    const onScroll = () => {
      if (!isProgrammaticScrollRef.current) {
        updateCurrentSection();
      }
    };

    collectSections();
    updateCurrentSection();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", collectSections);
    window.addEventListener("resize", updateCurrentSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", collectSections);
      window.removeEventListener("resize", updateCurrentSection);
      if (scrollUnlockTimerRef.current) {
        window.clearTimeout(scrollUnlockTimerRef.current);
      }
    };
  }, [sections]);

  const goToSection = (targetIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(sectionElementsRef.current.length - 1, targetIndex));
    const target = sectionElementsRef.current[clampedIndex];
    if (!target) return;

    if (scrollUnlockTimerRef.current) {
      window.clearTimeout(scrollUnlockTimerRef.current);
    }

    isProgrammaticScrollRef.current = true;
    setCurrentIndex(clampedIndex);

    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });

    scrollUnlockTimerRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      const markerY = Math.min(window.innerHeight * 0.34, 260);
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      sectionElementsRef.current.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - markerY);
        const isReasonablyVisible = rect.bottom > markerY * 0.5;

        if (isReasonablyVisible && distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      setCurrentIndex(bestIndex);
    }, 900);
  };

  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= sectionElementsRef.current.length - 1;

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
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            onClick={() => goToSection(currentIndex - 1)}
            disabled={isFirst}
            aria-label="Предыдущая секция"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/55 text-white/55 backdrop-blur-md transition hover:border-white/35 hover:bg-white/8 hover:text-white disabled:opacity-20"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 9 7 4 12 9" />
            </svg>
          </motion.button>

          <div className="flex flex-col items-center gap-[5px] py-1">
            {sections.map((id, index) => (
              <button key={id} onClick={() => goToSection(index)} aria-label={id}>
                <motion.span
                  animate={{
                    width: index === currentIndex ? 5 : 4,
                    height: index === currentIndex ? 16 : 4,
                    backgroundColor:
                      index === currentIndex ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.18)",
                    borderRadius: 999,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="block"
                />
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            onClick={() => goToSection(currentIndex + 1)}
            disabled={isLast}
            aria-label="Следующая секция"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/55 text-white/55 backdrop-blur-md transition hover:border-white/35 hover:bg-white/8 hover:text-white disabled:opacity-20"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 5 7 10 12 5" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
