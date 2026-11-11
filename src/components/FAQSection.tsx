"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import useIsMobile from "@/hooks/useIsMobile";

const TG = "https://t.me/versusire";

const faqs = [
  {
    q: "Сколько времени занимает проект?",
    a: "Обычный срок для сайта или MVP — 2–4 недели. Более сложные системы — дольше, но мы всегда разбиваем работу на понятные этапы.",
  },
  {
    q: "Можно ли доработать уже существующий проект?",
    a: "Да. Мы можем провести аудит, предложить план улучшений и взять проект на доработку без полного переписывания, если это оправдано.",
  },
  {
    q: "Как вы оцениваете стоимость?",
    a: "После короткого брифа определяем объём, стек, сроки и даём прозрачную оценку без скрытых платежей.",
  },
  {
    q: "Поддержка после запуска есть?",
    a: "Да. Можем остаться на сопровождении: правки, безопасность, обновления, новые модули и развитие продукта.",
  },
  {
    q: "Работаете ли вы напрямую без менеджеров-посредников?",
    a: "Да. Вы общаетесь напрямую с теми, кто проектирует и разрабатывает систему, поэтому решения принимаются быстрее.",
  },
];

function Item({ q, a, isMobile, index }: { q: string; a: string; isMobile: boolean; index: number }) {
  const [open, setOpen] = useState(false);
  const content = (
    <div className="border-b border-white/7">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-semibold text-white/85 md:text-lg">{q}</span>
        <motion.span
          animate={open ? { rotate: 45 } : { rotate: 0 }}
          transition={{ duration: 0.22 }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/50"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-6 text-sm leading-relaxed text-white/45 md:pr-10 md:text-[0.95rem]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isMobile) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}

export default function FAQSection() {
  const isMobile = useIsMobile();

  return (
    <section id="faq" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-white/40" />
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">частые вопросы</span>
          </div>
          <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
            Ответы до того,
            <span className="gradient-text"> как вы спросите</span>
          </h2>
        </AnimatedSection>

        <div className="mt-12 border-t border-white/7">
          {faqs.map((item, index) => (
            <Item key={index} q={item.q} a={item.a} isMobile={isMobile} index={index} />
          ))}
        </div>

        <AnimatedSection delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <p className="text-sm text-white/40">Не нашли ответ?</p>
            <a
              href={TG}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-white/14 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 no-underline transition hover:border-white/28 hover:bg-white/8 hover:text-white"
            >
              Задать вопрос в Telegram ↗
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
