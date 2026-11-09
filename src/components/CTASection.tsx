"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function CTASection() {
  return (
    <section className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35 }}
            className="panel-glass relative overflow-hidden rounded-sm p-10 md:p-14 lg:p-16"
          >
            <div className="absolute -right-10 top-0 h-64 w-64 rounded-full bg-[#ff5a1f]/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#e8ddc1]/5 blur-3xl" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff5a1f]">
                    signal ready
                  </span>
                </div>
                <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
                  Если нужен проект
                  <span className="gradient-text"> с атмосферой и фундаментом</span>
                  , можно начинать прямо сейчас.
                </h2>
              </div>

              <div className="lg:pl-8">
                <p className="text-base leading-relaxed text-[#b7b0a3] md:text-lg">
                  Вы описываете задачу, а мы собираем первую концепцию: визуальный тон, архитектуру,
                  стек и примерный roadmap с адекватной оценкой.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="cream-button rounded-sm px-8 py-4 text-sm font-semibold tracking-[0.08em] transition hover:-translate-y-0.5"
                  >
                    Начать проект ↗
                  </a>
                  <a
                    href="#services"
                    className="rounded-sm border border-white/10 bg-black/30 px-8 py-4 text-sm font-medium tracking-[0.08em] text-[#efe7d6] transition hover:border-[#e8ddc1]/30 hover:bg-black/45"
                  >
                    Посмотреть стек
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
