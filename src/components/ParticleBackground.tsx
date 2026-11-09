"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  tone: string;
}

const tones = ["255, 90, 31", "232, 221, 193", "181, 163, 135"];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    const particles: Particle[] = [];
    const particleCount = 110;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    };

    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: Math.random() * 0.18 + 0.02,
          size: Math.random() * 1.9 + 0.35,
          opacity: Math.random() * 0.22 + 0.05,
          tone: tones[Math.floor(Math.random() * tones.length)] ?? tones[0],
        });
      }
    };

    resize();
    createParticles();

    const onResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener("resize", onResize);

    const drawNebula = () => {
      const gradientA = ctx.createRadialGradient(
        canvas.width * 0.25,
        canvas.height * 0.18,
        0,
        canvas.width * 0.25,
        canvas.height * 0.18,
        canvas.width * 0.22,
      );
      gradientA.addColorStop(0, "rgba(255, 90, 31, 0.08)");
      gradientA.addColorStop(1, "rgba(255, 90, 31, 0)");
      ctx.fillStyle = gradientA;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradientB = ctx.createRadialGradient(
        canvas.width * 0.82,
        canvas.height * 0.44,
        0,
        canvas.width * 0.82,
        canvas.height * 0.44,
        canvas.width * 0.17,
      );
      gradientB.addColorStop(0, "rgba(232, 221, 193, 0.05)");
      gradientB.addColorStop(1, "rgba(232, 221, 193, 0)");
      ctx.fillStyle = gradientB;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNebula();

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.y > canvas.height + 10) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.tone}, ${particle.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 95) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(232, 221, 193, ${0.03 * (1 - distance / 95)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
