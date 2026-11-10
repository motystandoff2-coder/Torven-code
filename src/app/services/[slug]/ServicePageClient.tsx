"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ServicePage } from "@/lib/services-data";

const TG = "https://t.me/versusire";

export default function ServicePageClient({ service }: { service: ServicePage }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-black/60 text-sm font-semibold text-white">
              T
            </span>
            <span className="text-sm font-bold uppercase tracking-[0.28em] text-white">
              Torzen Code
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-white/50 no-underline transition hover:text-white"
          >
            ← На главную
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-24 md:px-6">
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="no-underline transition hover:text-white/70">
            Главная
          </Link>
          <span>›</span>
          <Link href="/#services" className="no-underline transition hover:text-white/70">
            Услуги
          </Link>
          <span>›</span>
          <span className="text-white/70">{service.label}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 md:px-6 md:pb-28 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">
              {service.label}
            </span>
          </div>

          <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.92] tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-white">{service.title}</span>
            <br />
            <span className="gradient-text">{service.accentTitle}</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
            {service.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={TG}
              target="_blank"
              rel="noopener noreferrer"
              className="white-btn inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm font-semibold tracking-[0.08em] no-underline"
            >
              Заказать
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="2" y1="11" x2="11" y2="2" />
                <polyline points="4 2 11 2 11 9" />
              </svg>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* What's included */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <h2 className="mb-12 text-3xl font-black uppercase tracking-tight md:text-4xl">
            ЧТО ВХОДИТ
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-sm border border-white/7 bg-white/3 px-6 py-5"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs text-white/60">
                  ✓
                </span>
                <span className="text-sm leading-relaxed text-white/70">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
        <div className="panel-glass rounded-sm p-8 text-center md:p-12">
          <h3 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
            Готовы обсудить проект?
          </h3>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
            Напишите нам — обсудим задачу и предложим решение под ваш бюджет и сроки.
          </p>
          <div className="mt-8">
            <a
              href={TG}
              target="_blank"
              rel="noopener noreferrer"
              className="white-btn inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm font-semibold tracking-[0.08em] no-underline"
            >
              Написать в Telegram ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-white/25 md:px-6">
          © {new Date().getFullYear()} Torzen Code. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
