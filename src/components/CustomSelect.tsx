"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CustomSelectProps { options: string[]; value: string; onChange: (v: string) => void; }

export default function CustomSelect({ options, value, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={root} className="relative">
      <button type="button" onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between rounded-sm border border-white/35 bg-white/4 px-4 py-3.5 text-left text-base text-white outline-none transition hover:border-white/55 focus:border-white/55">
        <span>{value}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-sm text-white/40">⌄</motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-[calc(100%+5px)] z-30 overflow-hidden rounded-sm border border-[#4a4a4a] shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
            <div className="bg-[#5e5e5e]">
              {options.map(opt => (
                <button key={opt} type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`block w-full px-4 py-3 text-left text-sm transition ${
                    opt === value ? "bg-[#787878] font-semibold text-white" : "bg-white text-black hover:bg-[#f0f0f0]"
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
