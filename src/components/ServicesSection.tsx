"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    num: "01",
    title: "САЙТЫ",
    desc: "Имиджевые и коммерческие сайты с сильной первой сценой, чистой сеткой и понятной конверсией.",
  },
  {
    num: "02",
    title: "ВЕБ-ПРИЛОЖЕНИЯ",
    desc: "Внутренние кабинеты, сервисы, панели управления и интерфейсы под реальные рабочие процессы.",
  },
  {
    num: "03",
    title: "МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ",
    desc: "Клиентские приложения, которые работают в связке с вашим API, CRM и базой данных.",
  },
  {
    num: "04",
    title: "DISCORD-БОТЫ",
    desc: "Автоматизация комьюнити, кастомные команды, moderation-flow и интеграции под ваши задачи.",
  },
  {
    num: "05",
    title: "TELEGRAM-БОТЫ",
    desc: "Заказы, заявки, уведомления, личные кабинеты и связка с существующей бизнес-логикой.",
  },
  {
    num: "06",
    title: "SAAS-СИСТЕМЫ",
    desc: "От MVP до рабочей подписочной платформы: архитектура, интерфейс, биллинг, роли и рост.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <AnimatedSection>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff5a1f]">
                зоны запуска
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
              Проектируем
              <span className="gradient-text"> экраны, сервисы и логику</span>
              как одну систему.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9a9a] md:ml-auto md:text-lg">
              Мы не делим продукт на “красивую обложку” и “где-то там backend”.
              Torven Code берёт на себя и визуальную сцену, и API, и хранение данных,
              и весь путь до продакшна.
            </p>
          </AnimatedSection>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="panel-glass group relative overflow-hidden rounded-sm p-7"
            >
              <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-[#ff5a1f]/8 blur-2xl transition duration-500 group-hover:bg-[#ff5a1f]/14" />
              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[#8f887b]">
                    module {service.num}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#e8ddc1]/70 transition group-hover:bg-[#ff5a1f]" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-[0.08em] text-[#f5efdf]">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#88827a]">{service.desc}</p>
                <div className="mt-7 flex items-center gap-3 text-sm font-medium text-[#cfc7b8]">
                  <span className="h-px w-8 bg-[#ff5a1f]/50 transition group-hover:w-12" />
                  Узнать детали
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
