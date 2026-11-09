"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TG = "https://t.me/versusire";

const heroImage =
  "https://images.pexels.com/photos/16214065/pexels-photo-16214065.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2200";

function FadeUp({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.6], [0.9, 0.3]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen overflow-hidden hero-grain">
      {/* Parallax background */}
      <motion.div
        style={{ backgroundImage: `url(${heroImage})`, y: imageY }}
        className="absolute inset-0 scale-110 bg-cover bg-center"
      />

      {/* Gradients */}
      <div className="hero-top-fade absolute inset-0" />
      <div className="hero-left-fade absolute inset-0" />
      <div className="absolute inset-0 bg-black/24" />

      {/* Light beam */}
      <motion.div
        style={{ opacity: mistOpacity }}
        className="light-beam absolute right-[14%] top-0 h-full w-[14vw] bg-[linear-gradient(180deg,rgba(232,221,193,0.16),rgba(232,221,193,0.03),transparent)] blur-3xl"
      />

      {/* Star points */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="cosmic-orb absolute left-[7%] top-[22%] h-28 w-28 rounded-full bg-[#ff5a1f]/6 blur-3xl" />
        <div className="cosmic-orb absolute right-[20%] top-[16%] h-44 w-44 rounded-full bg-[#e8ddc1]/4 blur-3xl" />
        <motion.span
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[15%] block h-1.5 w-1.5 rounded-full bg-[#f5ecd7]"
        />
        <motion.span
          animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute left-[83%] top-[19%] block h-1 w-1 rounded-full bg-[#f5ecd7]"
        />
        <motion.span
          animate={{ opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute left-[72%] top-[34%] block h-1.5 w-1.5 rounded-full bg-[#ff9966]"
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: heroOpacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-16 pt-28 md:items-center md:pb-24"
      >
        <div className="grid w-full gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          {/* Left column */}
          <div className="max-w-2xl">
            <FadeUp delay={0.1}>
              <div className="mb-7">
                <span className="inline-flex h-7 items-center rounded-full border border-[#e8ddc1]/20 px-3 text-[10px] uppercase tracking-[0.34em] text-[#d2cab8]">
                  black orbit / digital atelier
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="mb-3 flex items-center gap-4 text-[#e8ddc1]">
                <span className="h-px w-10 bg-[#e8ddc1]/55" />
                <span className="text-[11px] uppercase tracking-[0.36em] text-[#d2cab8]">
                  systems crafted below the surface
                </span>
              </div>
              <h1 className="serif-display text-[5rem] leading-[0.86] text-[#f5efdf] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem]">
                TORVEN
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[#d7cebd]">
                <span className="text-xs uppercase tracking-[0.44em]">The Code Studio</span>
                <span className="h-1 w-1 rounded-full bg-[#ff5a1f]" />
                <span className="text-xs uppercase tracking-[0.3em] text-[#9b9488]">
                  websites · apps · automation
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.32}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#d6d0c3]/90 md:text-[1.2rem]">
                Проектируем тёмные, атмосферные и технологичные цифровые продукты:
                от премиальных лендингов до сложных SaaS-систем, ботов и внутренних платформ.
              </p>
            </FadeUp>

            <FadeUp delay={0.44}>
              <div className="mt-10 flex flex-wrap gap-4">
                <motion.a
                  href={TG}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="cream-button inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm font-semibold tracking-[0.08em] no-underline"
                >
                  Begin project
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="2" y1="11" x2="11" y2="2" />
                    <polyline points="4 2 11 2 11 9" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#portfolio"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-sm border border-[#d7cfbe]/25 bg-black/25 px-8 py-4 text-sm font-medium tracking-[0.08em] text-[#f3ecdb] no-underline backdrop-blur transition hover:border-[#e8ddc1]/45 hover:bg-black/40"
                >
                  Смотреть кейсы
                </motion.a>
              </div>
            </FadeUp>

            <FadeUp delay={0.56}>
              <div className="mt-10 flex items-center gap-3">
                <div className="flex h-14 w-8 items-start justify-center rounded-full border border-[#f1e7d1]/14 pt-2">
                  <span className="animate-line-scroll h-2.5 w-1 rounded-full bg-[#f1e7d1]/70" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.36em] text-[#9a9386]">scroll below</p>
                  <p className="mt-1 text-sm text-[#cfc7b7]">Плавный спуск в структуру проекта</p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 44, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:flex lg:justify-end"
          >
            <div className="panel-glass w-full max-w-sm rounded-sm p-8 text-right">
              <p className="text-[10px] uppercase tracking-[0.38em] text-[#9f988c]">
                atmospheric systems / fullstack production
              </p>
              <div className="mt-8 space-y-7">
                {[
                  { val: "10+", label: "проектов, доведённых до релиза" },
                  { val: "2—4", label: "недели на типовой launch-cycle" },
                  { val: "24h", label: "среднее время первого ответа" },
                ].map(({ val, label }, i) => (
                  <motion.div
                    key={val}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.65 + i * 0.1, ease: "easeOut" }}
                  >
                    <p className="text-4xl font-semibold text-[#f1ead8]">{val}</p>
                    <p className="mt-1 text-sm text-[#9e968a]">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom captions */}
      <div className="pointer-events-none absolute bottom-5 left-0 right-0 z-10 hidden px-6 md:block">
        <div className="mx-auto flex max-w-7xl items-end justify-between text-[10px] uppercase tracking-[0.35em] text-[#978f83]">
          <span>fullstack product direction</span>
          <span>beyond the interface</span>
          <span>design · backend · launch</span>
        </div>
      </div>
    </section>
  );
}
