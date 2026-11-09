"use client";

import { motion } from "framer-motion";

const TG = "https://t.me/versusire";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 grid gap-10 md:grid-cols-[1fr_1fr_1fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-black/60 text-xs font-semibold text-[#f3ead8]">
                T
              </span>
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.28em] text-[#f3ead8]">Torven Code</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#6b6560]">fullstack studio</div>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#5a554e]">
              Строим атмосферные и технологичные цифровые продукты от первого пикселя до продакшна.
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="space-y-3"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#5a554e]">Навигация</p>
            {[
              { href: "#services", label: "Услуги" },
              { href: "#process", label: "Подход" },
              { href: "#portfolio", label: "Кейсы" },
              { href: "#contact", label: "Контакты" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm text-[#78726b] no-underline transition hover:text-[#c9c1b4]"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Telegram CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#5a554e]">Контакт</p>
            <div className="mt-4">
              <a
                href={TG}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-[#e8ddc1] px-6 py-3 text-sm font-semibold text-black no-underline transition hover:bg-[#f3ead8]"
              >
                Написать @versusire
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="2" y1="11" x2="11" y2="2" />
                  <polyline points="4 2 11 2 11 9" />
                </svg>
              </a>
              <p className="mt-3 text-xs text-[#5a554e]">Telegram: @versusire</p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#44403b]">
          <span>© {new Date().getFullYear()} Torven Code. All rights reserved.</span>
          <span className="text-[10px] uppercase tracking-[0.26em]">fullstack product studio</span>
        </div>
      </div>
    </footer>
  );
}
