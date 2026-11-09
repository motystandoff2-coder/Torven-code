"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    num: "01",
    title: "DISCOVERY",
    desc: "Разбираем задачу, цель, контекст проекта и то, что должно реально повлиять на бизнес-результат.",
  },
  {
    num: "02",
    title: "ART DIRECTION",
    desc: "Собираем настроение интерфейса, ритм экранов, структуру блоков и визуальную линию продукта.",
  },
  {
    num: "03",
    title: "ENGINEERING",
    desc: "Поднимаем frontend и backend: интерфейс, API, база, админка, роли и связки с интеграциями.",
  },
  {
    num: "04",
    title: "HARDENING",
    desc: "Прогоняем типы, сборку, проверяем UX, производительность и доводим детали перед релизом.",
  },
  {
    num: "05",
    title: "LAUNCH",
    desc: "Запускаем, мониторим, собираем обратную связь и планируем следующую итерацию роста.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff5a1f]">
              как идёт проект
            </span>
          </div>

          <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
            От первого сигнала
            <span className="gradient-text"> до production-запуска</span>
            — без хаоса и лишних кругов.
          </h2>
        </AnimatedSection>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff5a1f]/60 via-[#e8ddc1]/10 to-transparent md:left-0 md:right-0 md:top-5 md:h-px md:w-auto" />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="relative pl-12 md:pl-0"
              >
                <div className="absolute left-0 top-1.5 h-8 w-8 rounded-full border border-[#e8ddc1]/25 bg-black md:relative md:top-0 md:mb-6 md:flex md:h-10 md:w-10 md:items-center md:justify-center">
                  <span className="absolute inset-2 rounded-full bg-[#ff5a1f]/85 md:static md:bg-transparent md:text-sm md:font-semibold md:text-[#f3ead8]">
                    <span className="hidden md:inline">{step.num}</span>
                  </span>
                </div>
                <div className="panel-glass rounded-sm p-6 md:min-h-[240px]">
                  <div className="mb-4 text-[10px] uppercase tracking-[0.34em] text-[#8a8377]">
                    phase {step.num}
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-[0.08em] text-[#f3ead8]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#88827a]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
