"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import useIsMobile from "@/hooks/useIsMobile";

const TG = "https://t.me/versusire";
const heroImage =
  "https://images.pexels.com/photos/16214065/pexels-photo-16214065.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2200";

/* ── Desktop hero with parallax ── */
function DesktopHero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.6], [0.9, 0.2]);

  return (
    <section id="hero" ref={ref} className="hero-grain scanline relative min-h-screen overflow-hidden">
      <motion.div style={{ backgroundImage: `url(${heroImage})`, y: imgY }} className="absolute inset-0 scale-110 bg-cover bg-center" />
      <div className="hero-top-fade absolute inset-0" />
      <div className="hero-left-fade absolute inset-0" />
      <div className="absolute inset-0 bg-black/30" />

      <motion.div style={{ opacity: beamOpacity }}
        className="light-beam absolute right-[14%] top-0 h-full w-[14vw] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.025),transparent)] blur-3xl" />

      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="cosmic-orb absolute left-[7%] top-[22%] h-28 w-28 rounded-full bg-white/4 blur-3xl" />
        <div className="cosmic-orb absolute right-[20%] top-[16%] h-44 w-44 rounded-full bg-white/3 blur-3xl" />
        <motion.span animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.4, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[10%] top-[15%] block h-1.5 w-1.5 rounded-full bg-white/70" />
        <motion.span animate={{ opacity: [0.08, 0.4, 0.08], scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute left-[83%] top-[19%] block h-1 w-1 rounded-full bg-white/60" />
        <motion.span animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute left-[72%] top-[34%] block h-1.5 w-1.5 rounded-full bg-white/50" />
      </div>

      <motion.div style={{ y: contentY, opacity: heroOpacity }} className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-16 pt-28 md:items-center md:pb-24">
        <div className="grid w-full gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="max-w-2xl">
            <HeroContent />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 44, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:flex lg:justify-end"
          >
            <StatsPanel />
          </motion.div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-5 left-0 right-0 z-10 hidden px-6 md:block">
        <div className="mx-auto flex max-w-7xl items-end justify-between text-[10px] uppercase tracking-[0.35em] text-white/25">
          <span>fullstack product direction</span>
          <span>beyond the interface</span>
          <span>design · backend · launch</span>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile hero: ZERO JS animations, zero blur, static bg ── */
function MobileHero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Static background — no scale, no motion, no blur */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex min-h-screen items-end px-5 pb-10 pt-24">
        <div className="w-full">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}

/* ── Shared content (no motion wrappers) ── */
function HeroContent() {
  return (
    <>
      <span className="inline-flex h-7 items-center rounded-full border border-white/14 px-3 text-[10px] uppercase tracking-[0.34em] text-white/55">
        cinematic fullstack studio
      </span>

      <div className="mb-3 mt-6 flex items-center gap-4">
        <span className="h-px w-10 bg-white/40" />
        <span className="text-[11px] uppercase tracking-[0.36em] text-white/45">
          systems crafted below the surface
        </span>
      </div>

      <h1 className="serif-display text-[4.5rem] leading-[0.86] text-white sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem]">
        TORZEN
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/50">
        <span className="text-xs uppercase tracking-[0.44em]">The Code Studio</span>
        <span className="h-1 w-1 rounded-full bg-white/40" />
        <span className="text-xs uppercase tracking-[0.3em]">websites · apps · automation</span>
      </div>

      <p className="mt-7 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg md:text-[1.18rem]">
        Строим атмосферные и технологичные цифровые продукты: от имиджевых
        лендингов до сложных SaaS-систем, ботов и внутренних платформ.
      </p>

      <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
        <a href={TG} target="_blank" rel="noopener noreferrer"
          className="white-btn inline-flex items-center gap-2 rounded-sm px-7 py-3.5 text-sm font-semibold tracking-[0.08em] no-underline sm:px-8 sm:py-4">
          Begin project
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="11" x2="11" y2="2" /><polyline points="4 2 11 2 11 9" />
          </svg>
        </a>
        <a href="#portfolio"
          className="outline-btn-static inline-flex items-center gap-2 rounded-sm px-7 py-3.5 text-sm font-medium tracking-[0.08em] no-underline sm:px-8 sm:py-4">
          Смотреть кейсы
        </a>
      </div>
    </>
  );
}

function StatsPanel() {
  return (
    <div className="panel-glass w-full max-w-sm rounded-sm p-8 text-right">
      <p className="text-[10px] uppercase tracking-[0.38em] text-white/35">
        atmospheric systems / fullstack production
      </p>
      <div className="mt-8 space-y-7">
        {[
          { val: "10+", label: "проектов, доведённых до релиза" },
          { val: "2—4", label: "недели на типовой launch-cycle" },
          { val: "24h", label: "среднее время первого ответа" },
        ].map(({ val, label }) => (
          <div key={val}>
            <p className="text-4xl font-semibold text-white">{val}</p>
            <p className="mt-1 text-sm text-white/40">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHero /> : <DesktopHero />;
}
