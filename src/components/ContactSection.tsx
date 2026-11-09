"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import CustomSelect from "./CustomSelect";

const serviceOptions = [
  "Сайты",
  "Веб-приложения",
  "Мобильные приложения",
  "Discord-боты",
  "Телеграм-боты",
  "SaaS-системы",
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Сайты",
    budget: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("submit failed");

      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "Сайты",
        budget: "",
        description: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const fieldClassName =
    "w-full rounded-[14px] border border-white/10 bg-[#111] px-4 py-3.5 text-white placeholder:text-[#565656] outline-none transition focus:border-[#ff5a1f]";

  return (
    <section id="contact" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff5a1f]">
                contact chamber
              </span>
            </div>

            <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
              Обсудим ваш проект
              <span className="gradient-text"> в нормальном человеческом формате</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#9a9a9a] md:text-lg">
              Без лишних писем и длинных анкет. Вы оставляете вводные — мы возвращаемся
              с понятным ответом, стеком и следующим шагом.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="panel-glass rounded-sm p-7 md:p-8"
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#8c8579]">torven relay</p>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-[#cfc6b5]">
              <p>— обычно отвечаем в течение 24 часов;</p>
              <p>— можем собрать landing, app, bot или SaaS;</p>
              <p>— backend, frontend и база — в одной связке;</p>
              <p>— финальная заявка сохраняется в PostgreSQL.</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="panel-glass rounded-sm p-7 md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">Имя</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className={fieldClassName}
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">Электронная почта</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className={fieldClassName}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">
                  Телефон <span className="text-[#676056]">(необязательно)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  className={fieldClassName}
                  placeholder="+7 (999) 999-99-99"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">
                  Компания <span className="text-[#676056]">(необязательно)</span>
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(event) => setForm({ ...form, company: event.target.value })}
                  className={fieldClassName}
                  placeholder="Название компании"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">Интересует</label>
                <CustomSelect
                  options={serviceOptions}
                  value={form.service}
                  onChange={(service) => setForm({ ...form, service })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">
                  Ориентировочный бюджет <span className="text-[#676056]">(необязательно)</span>
                </label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={(event) => setForm({ ...form, budget: event.target.value })}
                  className={fieldClassName}
                  placeholder="Например, 100 000 – 300 000 ₽"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-white">Описание проекта</label>
              <textarea
                required
                rows={6}
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                className={`${fieldClassName} resize-none`}
                placeholder="Опишите задачу, желаемый результат и дедлайн"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="cream-button rounded-sm px-8 py-4 text-sm font-semibold tracking-[0.08em] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Отправка..." : "Отправить заявку"}
              </button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-[#d9cfbc]"
                >
                  ✓ Заявка отправлена. Мы вернёмся с ответом в ближайшее время.
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-[#ff9a74]"
                >
                  Не удалось отправить форму. Попробуйте ещё раз.
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
