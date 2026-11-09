"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const features = [
  {
    id: "01",
    title: "АРХИТЕКТУРА С ЗАПАСОМ",
    desc: "Строим основу так, чтобы продукт пережил не только запуск, но и следующий виток роста.",
  },
  {
    id: "02",
    title: "ОБЩЕНИЕ БЕЗ ПРОКЛАДОК",
    desc: "Вы общаетесь с теми, кто проектирует и пишет код, поэтому решения принимаются быстрее.",
  },
  {
    id: "03",
    title: "ТЁМНЫЙ ПРЕМИАЛЬНЫЙ ВИЗУАЛ",
    desc: "Сильная подача, кинематографичная типографика, чистая анимация и внимательная работа с ритмом экрана.",
  },
  {
    id: "04",
    title: "РЕЛИЗ И ДАЛЬШЕ",
    desc: "Не исчезаем после запуска: дорабатываем, оптимизируем и превращаем MVP в рабочую систему.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <AnimatedSection>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff5a1f]">
                кто мы такие
              </span>
            </div>

            <h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
              Torven Code — это не потоковая студия,
              <span className="gradient-text"> а маленькая product-команда</span>
              , которая собирает систему от атмосферы до backend-логики.
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#9a9a9a] md:text-lg">
              Мы делаем сайты и приложения, у которых есть характер, ритм и технический фундамент.
              Поэтому визуал не живёт отдельно от UX, а серверная часть не отрывается от бизнес-задач.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="panel-glass rounded-sm p-7 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#8d8578]">
                mission brief / torven orbit
              </p>
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-[#d4cbba]">
                <p>
                  <span className="text-[#f3ebd8]">01.</span> Выстраиваем ощущение бренда через свет, типографику, воздух и движение.
                </p>
                <p>
                  <span className="text-[#f3ebd8]">02.</span> Привязываем каждую анимацию к смыслу, а не делаем движение ради движения.
                </p>
                <p>
                  <span className="text-[#f3ebd8]">03.</span> Пишем код так, чтобы его можно было спокойно развивать через месяцы и годы.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="panel-glass group rounded-sm p-7 transition duration-500 hover:-translate-y-1 hover:border-white/10"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-[#91897c]">{feature.id}</span>
                <span className="h-2 w-2 rounded-full bg-[#ff5a1f] opacity-70 transition group-hover:opacity-100" />
              </div>
              <h3 className="text-base font-bold uppercase tracking-[0.08em] text-[#f5efdf]">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#8c867d]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
