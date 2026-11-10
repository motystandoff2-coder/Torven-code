"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import useIsMobile from "@/hooks/useIsMobile";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (isMobile) { setN(target); return; }
    if (!inView) return;
    const t0 = Date.now(), dur = 1800;
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, isMobile]);

  return <span ref={ref} className="gradient-text">{n}{suffix}</span>;
}

const stats = [
  { label: "Завершённых проектов",        value: 10, suffix: "+" },
  { label: "Направлений в одной команде", value: 6,  suffix: ""  },
  { label: "Обычный срок реализации",     display: "2—4 нед."     },
];

function StatCard({ s }: { s: typeof stats[0] }) {
  return (
    <div className="panel-glass rounded-sm p-8 md:p-10">
      <div className="text-4xl font-black md:text-5xl">
        {"display" in s
          ? <span className="gradient-text">{s.display}</span>
          : <Counter target={s.value} suffix={s.suffix} />
        }
      </div>
      <p className="mt-4 text-sm uppercase tracking-[0.16em] text-white/35">{s.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const isMobile = useIsMobile();

  return (
    <section id="stats" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-white/40" />
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">реальные цифры</span>
          </div>
          <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
            Не теория, а<span className="gradient-text"> рабочая дистанция до запуска</span>
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {stats.map((s, i) =>
            isMobile ? (
              <StatCard key={s.label} s={s} />
            ) : (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              >
                <StatCard s={s} />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
