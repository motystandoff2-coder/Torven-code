"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1"
          >
            <span className="text-xl font-black text-white">TORVEN</span>
            <span className="text-xl font-black text-[#ff5a1f]">CODE.</span>
          </motion.div>

          <div className="flex items-center gap-8 text-sm text-[#666]">
            <a href="#services" className="hover:text-[#ff5a1f] transition-colors">
              Услуги
            </a>
            <a href="#process" className="hover:text-[#ff5a1f] transition-colors">
              Процесс
            </a>
            <a href="#portfolio" className="hover:text-[#ff5a1f] transition-colors">
              Портфолио
            </a>
            <a href="#contact" className="hover:text-[#ff5a1f] transition-colors">
              Контакты
            </a>
          </div>

          <p className="text-sm text-[#444]">
            © {new Date().getFullYear()} Torven Code. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
