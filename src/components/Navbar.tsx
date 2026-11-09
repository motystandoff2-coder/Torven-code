"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TG = "https://t.me/versusire";

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <a href="#" className="relative z-50 flex items-center gap-3 no-underline">
            <motion.span
              whileHover={{ scale: 1.08 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-sm font-semibold text-[#f3ead8] backdrop-blur"
            >
              T
            </motion.span>
            <div className="leading-none">
              <div className="text-sm font-bold uppercase tracking-[0.28em] text-[#f3ead8]">
                Torven Code
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.34em] text-[#857f76]">
                cinematic fullstack studio
              </div>
            </div>
          </a>

          <div
            className={`hidden md:flex items-center gap-1 rounded-full border px-3 py-2 transition-all duration-500 ${
              scrolled
                ? "border-white/10 bg-black/72 shadow-[0_8px_32px_rgba(0,0,0,0.42)] backdrop-blur-xl"
                : "border-white/8 bg-black/30 backdrop-blur-md"
            }`}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-[#b9b1a3] transition-all duration-200 hover:bg-white/7 hover:text-[#f2ead9] no-underline"
              >
                {link.label}
              </a>
            ))}
            <motion.a
              href={TG}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="ml-2 rounded-full border border-[#e8ddc1]/50 bg-[#e8ddc1] px-5 py-2 text-sm font-semibold text-black no-underline transition hover:bg-[#f3ead8]"
            >
              Написать ↗
            </motion.a>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur md:hidden"
            aria-label="Открыть меню"
          >
            <div className="flex flex-col gap-[5px]">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 origin-center bg-white"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block h-0.5 w-5 bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 origin-center bg-white"
              />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/94 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-7 px-6 text-center">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                  className="text-3xl font-semibold text-[#f1e9d7] no-underline"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={TG}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-4 rounded-sm bg-[#e8ddc1] px-8 py-3.5 text-sm font-semibold text-black no-underline"
              >
                Написать в Telegram ↗
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
