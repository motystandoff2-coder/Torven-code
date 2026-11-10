"use client";

import { useEffect, useRef } from "react";
import useIsMobile from "@/hooks/useIsMobile";

export default function NatureOverlay() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    // Полностью выключаем на мобильных
    if (isMobile) return;

    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize();
    addEventListener("resize", resize);

    // Листья
    const leaves = Array.from({ length: 20 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: 0.1 + Math.random() * 0.25,
      rot: Math.random() * 6.28,
      rs: (Math.random() - 0.5) * 0.015,
      size: 3 + Math.random() * 5,
      op: 0.08 + Math.random() * 0.12,
      hue: 90 + Math.random() * 40,
    }));

    // Птицы
    const birds = Array.from({ length: 4 }, (_, i) => ({
      x: -100 - i * 400,
      y: 50 + Math.random() * 180,
      vx: 0.3 + Math.random() * 0.3,
      phase: Math.random() * 6.28,
      size: 8 + Math.random() * 5,
      op: 0.12 + Math.random() * 0.12,
    }));

    // Олени
    const deer = [
      { x: c.width * 0.15, vx: 0.15, dir: 1,  legPhase: 0,   size: 1,   op: 0.16 },
      { x: c.width * 0.75, vx: 0.12, dir: -1, legPhase: 1.5, size: 0.7, op: 0.12 },
    ];

    const drawEdge = (side: "l" | "r", W: number, H: number) => {
      const t = Date.now() * 0.0003;
      const dir = side === "l" ? 1 : -1;
      const base = side === "l" ? 0 : W;
      const spots = [
        { yR: 0.1, r: 180, g: 48, a: 0.14, ph: 0 },
        { yR: 0.4, r: 200, g: 55, a: 0.12, ph: 1.5 },
        { yR: 0.7, r: 170, g: 45, a: 0.13, ph: 3 },
      ];
      spots.forEach(s => {
        const cx = base + dir * 35 + Math.sin(t + s.ph) * 12;
        const cy = H * s.yR;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, s.r);
        g.addColorStop(0, `rgba(22,${s.g},8,${s.a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(side === "l" ? 0 : W - s.r * 2, cy - s.r, s.r * 2, s.r * 2);
      });
    };

    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      drawEdge("l", c.width, c.height);
      drawEdge("r", c.width, c.height);

      // Листья
      for (const l of leaves) {
        l.x += l.vx; l.y += l.vy; l.rot += l.rs;
        if (l.y > c.height + 15) { l.y = -15; l.x = Math.random() * c.width; }
        ctx.save();
        ctx.translate(l.x, l.y); ctx.rotate(l.rot); ctx.globalAlpha = l.op;
        ctx.beginPath();
        ctx.moveTo(l.size, 0);
        ctx.quadraticCurveTo(0, -l.size * 0.5, -l.size, 0);
        ctx.quadraticCurveTo(0, l.size * 0.5, l.size, 0);
        ctx.fillStyle = `hsla(${l.hue},50%,30%,0.7)`;
        ctx.fill();
        ctx.restore();
      }

      // Птицы
      for (const b of birds) {
        b.x += b.vx; b.phase += 0.05;
        b.y += Math.sin(b.phase * 0.2) * 0.2;
        if (b.x > c.width + 120) { b.x = -100; b.y = 40 + Math.random() * 200; }
        const flap = Math.sin(b.phase) * 5;
        ctx.save(); ctx.translate(b.x, b.y); ctx.globalAlpha = b.op;
        ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(-b.size, 0);
        ctx.quadraticCurveTo(-b.size * 0.4, -flap, 0, 0);
        ctx.quadraticCurveTo(b.size * 0.4, -flap, b.size, 0);
        ctx.stroke(); ctx.restore();
      }

      // Олени
      for (const d of deer) {
        d.x += d.vx * d.dir; d.legPhase += 0.03;
        if (d.dir === 1 && d.x > c.width + 50) d.x = -50;
        if (d.dir === -1 && d.x < -50) d.x = c.width + 50;
        const s = d.size * 26;
        const gy = c.height - 16;
        const leg = Math.sin(d.legPhase) * 3.5 * d.size;
        ctx.save(); ctx.translate(d.x, gy); ctx.scale(d.dir, 1); ctx.globalAlpha = d.op;
        const col = "rgba(255,255,255,0.55)";
        ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.2 * d.size; ctx.lineCap = "round";
        // Ноги
        ctx.beginPath(); ctx.moveTo(s*0.3,-s*0.14); ctx.lineTo(s*0.3+leg,0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(s*0.34,-s*0.16); ctx.lineTo(s*0.34-leg,0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-s*0.26,-s*0.14); ctx.lineTo(-s*0.26-leg,0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-s*0.22,-s*0.16); ctx.lineTo(-s*0.22+leg,0); ctx.stroke();
        // Тело
        ctx.beginPath(); ctx.ellipse(0,-s*0.3,s*0.4,s*0.16,0,0,6.28); ctx.fill();
        // Шея+голова
        ctx.beginPath(); ctx.moveTo(s*0.35,-s*0.36); ctx.quadraticCurveTo(s*0.45,-s*0.65,s*0.5,-s*0.74); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(s*0.52,-s*0.78,s*0.09,s*0.06,0.3,0,6.28); ctx.fill();
        // Рога
        ctx.lineWidth = 0.8 * d.size;
        ctx.beginPath(); ctx.moveTo(s*0.54,-s*0.86); ctx.quadraticCurveTo(s*0.66,-s*1.1,s*0.64,-s*1.22); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(s*0.6,-s*1.06); ctx.lineTo(s*0.7,-s*1.1); ctx.stroke();
        ctx.restore();
      }

      raf.current = requestAnimationFrame(loop);
    };

    loop();
    return () => { cancelAnimationFrame(raf.current); removeEventListener("resize", resize); };
  }, [isMobile]);

  if (isMobile) return null;

  return <canvas ref={ref} className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />;
}
