"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";

const TG = "https://t.me/versusire";

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

function TiltCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 22 });
  const springY = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={TG}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 44, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="panel-glass group relative block cursor-pointer overflow-hidden rounded-sm p-7 no-underline"
    >
      {/* glow on hover */}
      <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-[#ff5a1f]/6 blur-2xl transition-all duration-500 group-hover:bg-[#ff5a1f]/16 group-hover:opacity-100" />

      {/* shine sweep */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/4 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="relative z-10">
        <div className="mb-7 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.32em] text-[#8f887b]">
            module {service.num}
          </span>
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            className="h-2 w-2 rounded-full bg-[#e8ddc1]/50 group-hover:bg-[#ff5a1f]"
            style={{ transition: "background-color 0.3s" }}
          />
        </div>

        <h3 className="text-lg font-bold uppercase tracking-[0.08em] text-[#f5efdf]">
          {service.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-[#88827a]">{service.desc}</p>

        <div className="mt-7 flex items-center gap-3 text-sm font-medium text-[#cfc7b8]">
          <motion.span
            className="block h-px bg-[#ff5a1f]/60"
            animate={{ width: "2rem" }}
            whileHover={{ width: "3.5rem" }}
            style={{ transition: "width 0.4s ease" }}
          />
          <span className="transition group-hover:text-[#f1e9d8]">
            Написать в Telegram ↗
          </span>
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
              <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff5a1f]">
                зоны запуска
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
              Экраны, сервисы
              <span className="gradient-text"> и логика</span>
              <br />
              как одна система.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.14} from="right">
            <p className="text-base leading-relaxed text-[#9a9a9a] md:ml-auto md:text-lg">
              Torven Code ведёт проект от первого пикселя до рабочего продакшна: 
              фронтенд, API, хранилище и всё, что между ними.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={TG}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-[#e8ddc1]/20 bg-[#e8ddc1]/8 px-5 py-2.5 text-sm font-medium text-[#e8ddc1] transition hover:bg-[#e8ddc1]/14 hover:border-[#e8ddc1]/35"
              >
                Обсудить проект в Telegram
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="2" y1="11" x2="11" y2="2" />
                  <polyline points="4 2 11 2 11 9" />
                </svg>
              </a>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <TiltCard key={service.num} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
