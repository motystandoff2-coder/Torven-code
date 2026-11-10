"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const TG = "https://t.me/versusire";

export default function CTASection() {
  return (
    <section id="cta" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35 }}
            className="panel-glass relative overflow-hidden rounded-sm px-5 py-8 sm:p-8 md:p-14 lg:p-16"
          >
            <div className="absolute -right-10 top-0 h-64 w-64 rounded-full bg-white/4 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/3 blur-3xl" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/3 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            <div className="relative z-10 grid gap-8 md:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="min-w-0">
                <div className="mb-5 flex items-center gap-3 sm:mb-6">
                  <span className="animate-pulse-dot h-2 w-2 rounded-full bg-white/60" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50 sm:text-sm">
                    signal ready
                  </span>
                </div>

                <h2 className="max-w-full break-words text-[2.5rem] font-black uppercase leading-[0.88] tracking-tight text-white [overflow-wrap:anywhere] sm:text-[3rem] md:text-5xl lg:text-6xl">
                  Нужен проект с
                  <span className="gradient-text"> характером и фундаментом</span>
                  ?
                </h2>
              </div>

              <div className="min-w-0 lg:pl-8">
                <p className="max-w-xl text-[0.95rem] leading-relaxed text-white/50 sm:text-base md:text-lg">
                  Опишите задачу — соберём концепцию: визуальный тон, архитектуру,
                  стек и roadmap с адекватной оценкой.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                  <motion.a
                    href={TG}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="white-btn inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-4 text-center text-sm font-semibold tracking-[0.08em] no-underline sm:w-auto sm:px-8"
                  >
                    Написать в Telegram
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="2" y1="11" x2="11" y2="2" />
                      <polyline points="4 2 11 2 11 9" />
                    </svg>
                  </motion.a>

                  <motion.a
                    href="#services"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="outline-btn inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-4 text-center text-sm font-medium tracking-[0.08em] no-underline sm:w-auto sm:px-8"
                  >
                    Смотреть стек
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
