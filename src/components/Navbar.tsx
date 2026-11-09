"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Подход" },
  { href: "#portfolio", label: "Кейсы" },
  { href: "#contact", label: "Связь" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <a href="#" className="relative z-50 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-sm font-semibold text-[#f3ead8] backdrop-blur">
              T
            </span>
            <div className="leading-none">
              <div className="text-sm font-bold uppercase tracking-[0.28em] text-[#f3ead8]">
                Torven Code
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.34em] text-[#857f76]">
                cinematic fullstack studio
              </div>
            </div>
          </a>

          <div
            className={`hidden md:flex items-center gap-2 rounded-full border px-3 py-2 transition-all duration-500 ${
              scrolled
                ? "border-white/10 bg-black/70 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                : "border-white/10 bg-black/35 backdrop-blur-md"
            }`}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-[#b9b1a3] transition hover:bg-white/6 hover:text-[#f2ead9]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 rounded-full border border-[#e8ddc1]/50 bg-[#e8ddc1] px-5 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#f3ead8]"
            >
              Написать ↗
            </a>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur md:hidden"
            aria-label="Открыть меню"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-white"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-5 bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-white"
              />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/92 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="text-3xl font-semibold text-[#f1e9d7]"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 rounded-full bg-[#e8ddc1] px-8 py-3 text-sm font-semibold text-black"
              >
                Написать
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
