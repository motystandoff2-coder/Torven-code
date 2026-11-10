"use client";

import { motion } from "framer-motion";

const TG = "https://t.me/versusire";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 grid gap-10 md:grid-cols-3">
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-black/60 text-xs font-semibold text-white">T</span>
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.28em] text-white">Torzen Code</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/25">fullstack studio</div>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/30">
              Строим атмосферные и технологичные цифровые продукты от первого пикселя до продакшна.
            </p>
          </motion.div>

          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.08}} className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">Навигация</p>
            {[{href:"#services",l:"Услуги"},{href:"#process",l:"Подход"},{href:"#portfolio",l:"Кейсы"},{href:"#contact",l:"Контакты"}].map(x=>(
              <a key={x.href} href={x.href} className="block text-sm text-white/30 no-underline transition hover:text-white/70">{x.l}</a>
            ))}
          </motion.div>

          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.16}}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">Контакт</p>
            <div className="mt-4">
              <a href={TG} target="_blank" rel="noopener noreferrer"
                className="white-btn inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold no-underline">
                Написать @versusire
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="2" y1="11" x2="11" y2="2"/><polyline points="4 2 11 2 11 9"/>
                </svg>
              </a>
              <p className="mt-3 text-xs text-white/25">Telegram: @versusire</p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/18">
          <span>© {new Date().getFullYear()} Torzen Code. All rights reserved.</span>
          <span className="text-[10px] uppercase tracking-[0.26em]">fullstack product studio</span>
        </div>
      </div>
    </footer>
  );
}
