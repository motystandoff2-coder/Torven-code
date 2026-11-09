"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
      particles.length = 0;
      for (let i = 0; i < 120; i++) {
        particles.push({
          x:       Math.random() * canvas.width,
          y:       Math.random() * canvas.height,
          vx:      (Math.random() - 0.5) * 0.1,
          vy:      Math.random() * 0.14 + 0.02,
          size:    Math.random() * 1.6 + 0.3,
          opacity: Math.random() * 0.18 + 0.04,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const drawNebula = () => {
      const g1 = ctx.createRadialGradient(
        canvas.width * 0.22, canvas.height * 0.16, 0,
        canvas.width * 0.22, canvas.height * 0.16, canvas.width * 0.22,
      );
      g1.addColorStop(0, "rgba(255,255,255,0.025)");
      g1.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const g2 = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.42, 0,
        canvas.width * 0.8, canvas.height * 0.42, canvas.width * 0.16,
      );
      g2.addColorStop(0, "rgba(200,200,200,0.018)");
      g2.addColorStop(1, "rgba(200,200,200,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNebula();

      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.y > canvas.height + 10) { p.y = -10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j];
          const dx = p.x - o.x, dy = p.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.025 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      });

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
