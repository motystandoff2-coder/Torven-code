"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const startedAt = Date.now();
    const duration = 1800;

    const tick = () => {
      const elapsed = Date.now() - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="gradient-text">
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Завершённых проектов", value: 10, suffix: "+" },
  { label: "Направлений в одной команде", value: 6, suffix: "" },
  { label: "Обычный срок реализации", display: "2-4 недели" },
];

export default function StatsSection() {
  return (
    <section id="stats" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff5a1f]">
              operational numbers
            </span>
          </div>
          <h2 className="text-4xl font-black uppercase leading-[0.96] tracking-tight text-white md:text-5xl lg:text-6xl">
            Не теория, а
            <span className="gradient-text"> рабочая дистанция до запуска</span>
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="panel-glass rounded-sm p-8 md:p-10"
            >
              <div className="text-4xl font-black md:text-5xl">
                {"display" in stat ? (
                  <span className="gradient-text">{stat.display}</span>
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <p className="mt-4 text-sm uppercase tracking-[0.16em] text-[#7f796f]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
