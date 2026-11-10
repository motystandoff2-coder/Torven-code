"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import useIsMobile from "@/hooks/useIsMobile";

const features = [
  { id: "01", title: "АРХИТЕКТУРА С ЗАПАСОМ", desc: "Строим основу так, чтобы продукт пережил не только запуск, но и следующий виток роста." },
  { id: "02", title: "ОБЩЕНИЕ БЕЗ ПРОКЛАДОК", desc: "Вы общаетесь с теми, кто проектирует и пишет код — решения принимаются быстрее." },
  { id: "03", title: "ТЁМНЫЙ ПРЕМИАЛЬНЫЙ ВИЗУАЛ", desc: "Сильная подача, кинематографичная типографика, чистая анимация и внимание к ритму экрана." },
  { id: "04", title: "РЕЛИЗ И ДАЛЬШЕ", desc: "Не исчезаем после запуска: дорабатываем, оптимизируем и превращаем MVP в рабочую систему." },
];

export default function AboutSection() {
  const isMobile = useIsMobile();

  return (
    <section id="about" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <AnimatedSection>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-white/40" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">
                кто мы такие
              </span>
            </div>

            <h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
              Torzen Code — маленькая product-команда,
              <span className="gradient-text"> которая собирает систему от атмосферы до backend-логики</span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
              Мы делаем сайты и приложения с характером, ритмом и техническим фундаментом.
              Поэтому визуал не живёт отдельно от UX, а серверная часть не отрывается от бизнес-задач.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.14} from="right">
            <div className="panel-glass rounded-sm p-7 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-white/30">mission brief</p>
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-white/55">
                <p><span className="text-white/80">01.</span> Выстраиваем ощущение бренда через свет, типографику, воздух и движение.</p>
                <p><span className="text-white/80">02.</span> Привязываем каждую анимацию к смыслу, а не делаем движение ради движения.</p>
                <p><span className="text-white/80">03.</span> Пишем код так, чтобы его можно было спокойно развивать через месяцы и годы.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={isMobile ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={isMobile ? undefined : { once: true, margin: "-60px" }}
              transition={isMobile ? undefined : { duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
              className="panel-glass group rounded-sm p-7 transition duration-500 hover:-translate-y-1"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-white/30">{feature.id}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/25 transition group-hover:bg-white/70" />
              </div>
              <h3 className="text-base font-bold uppercase tracking-[0.08em] text-white/90">{feature.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/40">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
