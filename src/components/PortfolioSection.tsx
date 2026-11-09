"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const TG = "https://t.me/versusire";

const projects = [
  { num: "01", title: "E-Commerce Platform", category: "Веб-приложение",
    desc: "Магазин с каталогом, Stripe-оплатой, кабинетом администратора и аналитикой продаж.",
    tags: ["Next.js", "PostgreSQL", "Stripe"] },
  { num: "02", title: "Telegram Bot доставки", category: "Telegram-бот",
    desc: "Бот для приёма заказов, уведомлений курьерам и live-отслеживания статусов.",
    tags: ["Node.js", "PostgreSQL", "Telegram API"] },
  { num: "03", title: "CRM Dashboard", category: "SaaS-система",
    desc: "Внутренний инструмент для управления клиентами, сделками и воронкой продаж.",
    tags: ["React", "TypeScript", "REST API"] },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 grid gap-10 lg:grid-cols-2 lg:items-end">
          <AnimatedSection>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-white/40" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">кейсы</span>
            </div>
            <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
              Несколько примеров
              <span className="gradient-text"> из реальной практики</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.14} from="right">
            <p className="text-base leading-relaxed text-white/50 md:text-lg">
              Новые кейсы добавляются по мере завершения. Если нужен проект похожего масштаба — напишите напрямую.
            </p>
            <a href={TG} target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/45 no-underline transition hover:text-white/80">
              <span className="h-px w-8 bg-white/30" />
              Обсудить в Telegram ↗
            </a>
          </AnimatedSection>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <motion.a key={p.num} href={TG} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 44, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="panel-glass group relative block cursor-pointer overflow-hidden rounded-sm no-underline">

              {/* Visual area */}
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#111] to-[#060606] flex items-center justify-center">
                <div className="text-center select-none">
                  <div className="text-6xl font-black text-white/5 group-hover:text-white/8 transition-colors duration-500 serif-display">
                    {p.num}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/25 mt-2 block">{p.category}</span>
                </div>
                <div className="absolute inset-0 opacity-0 bg-white/4 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-white/25 transition group-hover:bg-white/70" />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-base font-bold uppercase tracking-[0.08em] text-white/90 group-hover:text-white transition-colors">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/40">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map(tag => (
                    <span key={tag} className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-xs text-white/35">{tag}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 text-sm font-medium text-white/40 group-hover:text-white/70 transition-colors">
                  <span className="block h-px w-8 bg-white/25 group-hover:w-12 transition-all duration-400" />
                  Написать в Telegram ↗
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
