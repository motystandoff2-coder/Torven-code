"use client";

import { motion } from "framer-motion";

const techs = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Prisma",
  "Docker",
  "Vercel",
  "Stripe",
  "Telegram API",
  "Discord.js",
  "Redis",
  "GraphQL",
  "REST API",
  "Framer Motion",
];

export default function TechTicker() {
  return (
    <section className="py-12 border-y border-[#1a1a1a] overflow-hidden">
      <p className="text-center text-xs font-semibold tracking-[0.3em] text-[#555] uppercase mb-8">
        Работаем на технологиях, которым доверяем
      </p>
      <div className="relative">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...techs, ...techs, ...techs].map((tech, i) => (
            <span
              key={i}
              className="text-lg font-semibold text-[#333] hover:text-[#ff5a1f] transition-colors duration-300 cursor-default"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
