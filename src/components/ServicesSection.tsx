"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import useIsMobile from "@/hooks/useIsMobile";

const TG = "https://t.me/versusire";

const services = [
  { num: "01", title: "САЙТЫ", desc: "Имиджевые и коммерческие сайты с сильной первой сценой, чистой сеткой и чёткой конверсией." },
  { num: "02", title: "ВЕБ-ПРИЛОЖЕНИЯ", desc: "Кабинеты, сервисы и панели управления под реальные рабочие процессы и данные." },
  { num: "03", title: "МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ", desc: "Клиентские приложения, работающие в связке с вашим API, CRM и базой данных." },
  { num: "04", title: "DISCORD-БОТЫ", desc: "Автоматизация комьюнити, кастомные команды, moderation-flow и интеграции." },
  { num: "05", title: "TELEGRAM-БОТЫ", desc: "Заказы, заявки, уведомления, личные кабинеты и связка с бизнес-логикой." },
  { num: "06", title: "SAAS-СИСТЕМЫ", desc: "От MVP до рабочей подписочной платформы: архитектура, биллинг, роли и рост." },
];

function TiltCard({ service, index }: { service: typeof services[0]; index: number }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  const rx = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const ry = useTransform(sx, [-0.5, 0.5], [-4, 4]);

  return (
    <motion.a
      ref={ref}
      href={TG}
      target="_blank"
      rel="noopener noreferrer"
      initial={isMobile ? false : { opacity: 0, y: 44, filter: "blur(6px)" }}
      whileInView={isMobile ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={isMobile ? undefined : { once: true, margin: "-70px" }}
      transition={isMobile ? undefined : { duration: 0.65, delay: index * 0.09, ease: "easeOut" }}
      style={isMobile ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onMouseMove={isMobile ? undefined : (e => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      })}
      onMouseLeave={isMobile ? undefined : (() => { x.set(0); y.set(0); })}
      className="panel-glass group relative block cursor-pointer overflow-hidden rounded-sm p-7 no-underline"
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/4 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-white/4 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-7 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.32em] text-white/30">module {service.num}</span>
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            className="block h-2 w-2 rounded-full bg-white/40"
          />
        </div>
        <h3 className="text-lg font-bold uppercase tracking-[0.08em] text-white/90">{service.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-white/40">{service.desc}</p>
        <div className="mt-7 flex items-center gap-3 text-sm font-medium text-white/50">
          <span className="block h-px w-8 bg-white/30 transition-all duration-400 group-hover:w-12 group-hover:bg-white/60" />
          <span className="transition group-hover:text-white/80">Написать в Telegram ↗</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <AnimatedSection>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-white/40" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">зоны запуска</span>
            </div>
            <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
              Экраны, сервисы
              <span className="gradient-text"> и логика</span>
              <br />как одна система.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.14} from="right">
            <p className="text-base leading-relaxed text-white/50 md:ml-auto md:text-lg">
              Torzen Code ведёт проект от первого пикселя до рабочего продакшна:
              фронтенд, API, хранилище и всё, что между ними.
            </p>
            <a
              href={TG}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-sm border border-white/14 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 no-underline transition hover:border-white/28 hover:bg-white/8 hover:text-white"
            >
              Обсудить в Telegram
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="11" x2="11" y2="2" /><polyline points="4 2 11 2 11 9" />
              </svg>
            </a>
          </AnimatedSection>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => <TiltCard key={s.num} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
