"use client";

import { useEffect, useRef } from "react";
import useIsMobile from "@/hooks/useIsMobile";

export default function ParticleBackground() {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Полностью выключаем canvas на мобильных
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Меньше частиц, нет линий между ними
    const COUNT = 50;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.08,
      vy: Math.random() * 0.12 + 0.02,
      size: Math.random() * 1.4 + 0.3,
      opacity: Math.random() * 0.15 + 0.03,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > canvas.height + 5) { p.y = -5; p.x = Math.random() * canvas.width; }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 6.28);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [isMobile]);

  if (isMobile) return null;

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
