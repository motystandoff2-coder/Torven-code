"use client";

import { motion } from "framer-motion";

const techs = ["Next.js","React","TypeScript","Node.js","PostgreSQL","Tailwind CSS","Drizzle ORM",
  "Docker","Vercel","Stripe","Telegram API","Discord.js","Redis","GraphQL","REST API","Framer Motion"];

export default function TechTicker() {
  return (
    <section className="py-10 border-y border-white/5 overflow-hidden">
      <p className="text-center text-[10px] font-semibold tracking-[0.34em] text-white/22 uppercase mb-7">
        работаем на технологиях, которым доверяем
      </p>
      <div className="relative">
        <motion.div className="flex gap-14 whitespace-nowrap"
          animate={{ x: [0, -2200] }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}>
          {[...techs, ...techs, ...techs].map((tech, i) => (
            <span key={i} className="text-base font-semibold text-white/18 hover:text-white/55 transition-colors duration-300 cursor-default">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
