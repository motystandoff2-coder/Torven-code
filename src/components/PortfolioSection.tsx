"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Веб-приложение",
    desc: "Полноценный интернет-магазин с панелью управления, интеграциями оплаты и аналитикой.",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
    gradient: "from-[#ff5a1f]/20 to-[#1a1a1a]",
  },
  {
    title: "Telegram Bot для доставки",
    category: "Телеграм-бот",
    desc: "Автоматизированный бот для приёма заказов, уведомлений курьеров и отслеживания статусов.",
    tags: ["Node.js", "PostgreSQL", "Telegram API"],
    gradient: "from-[#ff5a1f]/15 to-[#1a1a1a]",
  },
  {
    title: "CRM Dashboard",
    category: "SaaS-система",
    desc: "Внутренний инструмент для управления клиентами, сделками и воронкой продаж.",
    tags: ["React", "TypeScript", "REST API"],
    gradient: "from-[#ff5a1f]/20 to-[#1a1a1a]",
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-[#ff5a1f] rounded-full" />
            <span className="text-sm font-semibold tracking-[0.2em] text-[#ff5a1f] uppercase">
              Портфолио
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight tracking-tight">
            <span className="text-white">ИЗБРАННЫЕ </span>
            <span className="gradient-text">ПРОЕКТЫ</span>
          </h2>

          <p className="mt-6 max-w-2xl text-[#9a9a9a] text-base md:text-lg leading-relaxed">
            Несколько примеров того, что мы делаем. Новые кейсы добавляются по мере завершения проектов.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#111] cursor-pointer"
            >
              {/* Gradient header */}
              <div className={`h-48 bg-gradient-to-br ${p.gradient} relative flex items-center justify-center`}>
                <div className="w-16 h-16 rounded-2xl bg-[#ff5a1f]/20 border border-[#ff5a1f]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="text-[#ff5a1f] text-2xl font-black">
                    {p.title.charAt(0)}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#ff5a1f]/0 group-hover:bg-[#ff5a1f]/10 transition-all duration-500" />
              </div>

              <div className="p-6">
                <span className="text-xs text-[#ff5a1f] font-semibold uppercase tracking-wider">
                  {p.category}
                </span>
                <h3 className="mt-2 text-lg font-bold text-white group-hover:text-[#ff5a1f] transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-[#777] leading-relaxed">{p.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-[#1a1a1a] text-[#999] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
