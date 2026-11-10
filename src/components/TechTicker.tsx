"use client";

import useIsMobile from "@/hooks/useIsMobile";

const techs = ["Next.js","React","TypeScript","Node.js","PostgreSQL","Tailwind CSS","Drizzle ORM",
  "Docker","Vercel","Stripe","Telegram API","Discord.js","Redis","GraphQL","REST API","Framer Motion"];

export default function TechTicker() {
  const isMobile = useIsMobile();

  return (
    <section className="py-10 border-y border-white/5 overflow-hidden">
      <p className="text-center text-[10px] font-semibold tracking-[0.34em] text-white/22 uppercase mb-7">
        работаем на технологиях, которым доверяем
      </p>
      <div className="relative">
        {isMobile ? (
          /* На мобильных — CSS-анимация вместо JS framer-motion */
          <div className="mobile-ticker flex gap-10 whitespace-nowrap">
            {[...techs, ...techs].map((tech, i) => (
              <span key={i} className="text-sm font-semibold text-white/18">
                {tech}
              </span>
            ))}
          </div>
        ) : (
          <div className="desktop-ticker flex gap-14 whitespace-nowrap">
            {[...techs, ...techs, ...techs].map((tech, i) => (
              <span key={i} className="text-base font-semibold text-white/18 hover:text-white/55 transition-colors duration-300 cursor-default">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
