"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
}

const variants = {
  hidden: (from: string) => ({
    opacity: 0,
    y: from === "bottom" ? 50 : 0,
    x: from === "left" ? -40 : from === "right" ? 40 : 0,
    filter: "blur(6px)",
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
  },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: Props) {
  return (
    <motion.div
      custom={from}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
