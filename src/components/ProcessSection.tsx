"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import useIsMobile from "@/hooks/useIsMobile";

const steps = [
  { num: "01", title: "DISCOVERY", desc: "Разбираем задачу, цель и контекст проекта, чтобы решение влияло на реальный результат." },
  { num: "02", title: "ART DIRECTION", desc: "Собираем настроение интерфейса, ритм экранов и визуальную линию продукта." },
  { num: "03", title: "ENGINEERING", desc: "Поднимаем frontend и backend: интерфейс, API, база, роли и связки с интеграциями." },
  { num: "04", title: "HARDENING", desc: "Прогоняем типы и сборку, проверяем UX, производительность и доводим детали перед релизом." },
  { num: "05", title: "LAUNCH", desc: "Запускаем, мониторим, собираем обратную связь и планируем следующую итерацию." },
];

const cardClass = "panel-glass group rounded-sm p-6 transition duration-500 hover:-translate-y-1";

function StepCard({ step }: { step: typeof steps[0] }) {
  return (
    <>
      <div className="mb-6 flex items-start justify-between">
        <span className="text-[10px] uppercase tracking-[0.34em] text-white/30">phase {step.num}</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/14 text-xs font-semibold text-white/50">
          {step.num}
        </div>
      </div>
      <h3 className="text-base font-bold uppercase tracking-[0.08em] text-white/90">{step.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-white/40">{step.desc}</p>
    </>
  );
}

export default function ProcessSection() {
  const isMobile = useIsMobile();

  return (
    <section id="process" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-white/40" />
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">как идёт проект</span>
          </div>
          <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
            От первого сигнала
            <span className="gradient-text"> до production-запуска</span>
            — без хаоса.
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, i) =>
            isMobile ? (
              <div key={step.num} className={cardClass}>
                <StepCard step={step} />
              </div>
            ) : (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 36, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6, delay: i * 0.09, ease: "easeOut" }}
                className={cardClass}
              >
                <StepCard step={step} />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
