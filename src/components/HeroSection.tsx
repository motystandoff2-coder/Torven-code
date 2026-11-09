"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const heroImage =
  "https://images.pexels.com/photos/16214065/pexels-photo-16214065.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2200";

export default function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const mistOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.35]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden hero-grain">
      <motion.div
        style={{ y: imageY, backgroundImage: `url(${heroImage})` }}
        className="absolute inset-0 scale-110 bg-cover bg-center"
      />

      <div className="hero-top-fade absolute inset-0" />
      <div className="hero-left-fade absolute inset-0" />
      <div className="absolute inset-0 bg-black/22" />

      <motion.div
        style={{ opacity: mistOpacity }}
        className="light-beam absolute right-[14%] top-0 h-full w-[16vw] bg-[linear-gradient(180deg,rgba(232,221,193,0.18),rgba(232,221,193,0.02),transparent)] blur-2xl"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="cosmic-orb absolute left-[8%] top-[22%] h-24 w-24 rounded-full bg-[#ff5a1f]/7 blur-3xl" />
        <div className="cosmic-orb absolute right-[18%] top-[18%] h-40 w-40 rounded-full bg-[#e8ddc1]/5 blur-3xl" />
        <div className="star-point absolute left-[10%] top-[15%] h-1.5 w-1.5 rounded-full bg-[#f5ecd7]" />
        <div className="star-point absolute left-[84%] top-[17%] h-1 w-1 rounded-full bg-[#f5ecd7]" />
        <div className="star-point absolute left-[73%] top-[33%] h-1.5 w-1.5 rounded-full bg-[#ff8c59]" />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-16 pt-28 md:items-center md:pb-24"
      >
        <div className="grid w-full gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="inline-flex h-7 items-center rounded-full border border-[#e8ddc1]/20 px-3 text-[10px] uppercase tracking-[0.34em] text-[#d2cab8]">
                black orbit / digital atelier
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-3 flex items-center gap-4 text-[#e8ddc1]">
                <span className="h-px w-10 bg-[#e8ddc1]/60" />
                <span className="text-[11px] uppercase tracking-[0.36em] text-[#d2cab8]">
                  systems crafted below the surface
                </span>
              </div>

              <h1 className="serif-display text-[5rem] leading-[0.86] text-[#f5efdf] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem]">
                TORVEN
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[#d7cebd]">
                <span className="text-xs uppercase tracking-[0.46em]">THE CODE STUDIO</span>
                <span className="hidden h-1 w-1 rounded-full bg-[#9b9488] md:block" />
                <span className="text-xs uppercase tracking-[0.32em] text-[#9b9488]">
                  websites · apps · automation
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-[#d6d0c3]/88 md:text-[1.22rem]"
            >
              Проектируем тёмные, атмосферные и технологичные цифровые продукты:
              от премиальных лендингов до сложных SaaS-систем, ботов и внутренних платформ.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.48 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="cream-button rounded-sm px-8 py-4 text-sm font-semibold tracking-[0.08em] transition hover:-translate-y-0.5"
              >
                Begin project ↗
              </a>
              <a
                href="#portfolio"
                className="rounded-sm border border-[#d7cfbe]/25 bg-black/25 px-8 py-4 text-sm font-medium tracking-[0.08em] text-[#f3ecdb] backdrop-blur transition hover:border-[#e8ddc1]/50 hover:bg-black/40"
              >
                Смотреть кейсы
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-10 flex items-center gap-3"
            >
              <div className="flex h-14 w-8 items-start justify-center rounded-full border border-[#f1e7d1]/15 pt-2">
                <span className="animate-line-scroll h-2.5 w-1 rounded-full bg-[#f1e7d1]/75" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.36em] text-[#9a9386]">scroll below</p>
                <p className="mt-1 text-sm text-[#cfc7b7]">Плавный спуск в структуру проекта</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="hidden lg:flex lg:justify-end"
          >
            <div className="panel-glass w-full max-w-sm rounded-sm p-8 text-right text-[#dfd6c4]">
              <p className="text-[10px] uppercase tracking-[0.38em] text-[#9f988c]">
                atmospheric systems / fullstack production
              </p>
              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-4xl font-semibold text-[#f1ead8]">10+</p>
                  <p className="mt-1 text-sm text-[#9e968a]">проектов, доведённых до релиза</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold text-[#f1ead8]">2—4</p>
                  <p className="mt-1 text-sm text-[#9e968a]">недели на типовой launch-cycle</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold text-[#f1ead8]">24h</p>
                  <p className="mt-1 text-sm text-[#9e968a]">среднее время первого ответа</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

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
