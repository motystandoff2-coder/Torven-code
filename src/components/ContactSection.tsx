"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import CustomSelect from "./CustomSelect";
import useIsMobile from "@/hooks/useIsMobile";

const TG = "https://t.me/versusire";

const serviceOptions = ["Сайты","Веб-приложения","Мобильные приложения","Discord-боты","Телеграм-боты","SaaS-системы"];

export default function ContactSection() {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name:"", email:"", phone:"", company:"", service:"Сайты", budget:"", description:"" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const r = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      if (!r.ok) throw new Error();
      setStatus("success");
      setForm({ name:"", email:"", phone:"", company:"", service:"Сайты", budget:"", description:"" });
    } catch {
      setStatus("error");
    }
  };

  const field = "w-full rounded-sm border border-white/10 bg-white/4 px-4 py-3.5 text-white placeholder:text-white/25 outline-none transition focus:border-white/35 focus:bg-white/6";

  return (
    <section id="contact" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <div className="text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-white/40" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">contact chamber</span>
              <span className="h-px w-8 bg-white/40" />
            </div>
            <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
              Обсудим ваш проект
              <span className="gradient-text"> напрямую</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
              Или напишите сразу в Telegram <a href={TG} target="_blank" rel="noopener noreferrer" className="text-white/70 no-underline transition hover:text-white">@versusire</a>{" "}
              — отвечаем обычно в течение 24 часов.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.55 }}
            className="panel-glass rounded-sm p-7 md:p-8"
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/30">torzen relay</p>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-white/50">
              <p>— отвечаем в течение 24 часов;</p>
              <p>— landing, app, bot или SaaS;</p>
              <p>— backend, frontend и база в одной связке;</p>
            </div>
            <div className="mt-10">
              <a href={TG} target="_blank" rel="noopener noreferrer" className="white-btn inline-flex items-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold no-underline">
                Написать @versusire ↗
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={isMobile ? false : { opacity: 0, y: 35, filter: "blur(6px)" }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.65, delay: 0.1 }}
            className="panel-glass space-y-6 rounded-sm p-7 md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/70">Имя</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Ваше имя" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/70">Электронная почта</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} placeholder="email@example.com" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/70">Телефон <span className="text-white/25">(необязательно)</span></label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} placeholder="+7 (999) 999-99-99" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/70">Компания <span className="text-white/25">(необязательно)</span></label>
                <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={field} placeholder="Название компании" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/70">Интересует</label>
                <CustomSelect options={serviceOptions} value={form.service} onChange={(v) => setForm({ ...form, service: v })} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/70">Бюджет <span className="text-white/25">(необязательно)</span></label>
                <input type="text" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={field} placeholder="100 000 – 300 000 ₽" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">Описание проекта</label>
              <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${field} resize-none`} placeholder="Опишите задачу и дедлайн" />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === "loading"} className="white-btn rounded-sm px-8 py-4 text-sm font-semibold tracking-[0.08em] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">
                {status === "loading" ? "Отправка..." : "Отправить заявку"}
              </button>
              {status === "success" && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-medium text-white/70">
                  ✓ Заявка отправлена.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-medium text-white/50">
                  Ошибка. Попробуйте снова.
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
