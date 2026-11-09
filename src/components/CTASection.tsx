"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const TG = "https://t.me/versusire";

export default function CTASection() {
  return (
    <section id="cta" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35 }}
            className="panel-glass relative overflow-hidden rounded-sm p-10 md:p-14 lg:p-16">
            {/* Ambient glow spots */}
            <div className="absolute -right-10 top-0  h-64 w-64 rounded-full bg-white/4  blur-3xl" />
            <div className="absolute  bottom-0 left-0 h-48 w-48 rounded-full bg-white/3  blur-3xl" />
            {/* Shine sweep */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/3 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="animate-pulse-dot h-2 w-2 rounded-full bg-white/60" />
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">signal ready</span>
                </div>
                <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
                  Нужен проект с
                  <span className="gradient-text"> характером и фундаментом</span>
                  ?
                </h2>
              </div>

              <div className="lg:pl-8">
                <p className="text-base leading-relaxed text-white/50 md:text-lg">
                  Опишите задачу — соберём концепцию: визуальный тон, архитектуру,
                  стек и roadmap с адекватной оценкой.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <motion.a href={TG} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                    className="white-btn inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm font-semibold tracking-[0.08em] no-underline">
                    Написать в Telegram
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="2" y1="11" x2="11" y2="2"/><polyline points="4 2 11 2 11 9"/>
                    </svg>
                  </motion.a>
                  <motion.a href="#services"
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                    className="outline-btn inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm font-medium tracking-[0.08em] no-underline">
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
