"use client";

import { useEffect, useRef, useState } from "react";

interface Leaf {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; rs: number;
  size: number; op: number;
  hue: number;
}

interface Bird {
  x: number; y: number;
  vx: number; phase: number;
  size: number; op: number;
  wingSpan: number; bodyLen: number;
}

export default function NatureOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(true), []);

  useEffect(() => {
    if (!ok) return;
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize();
    addEventListener("resize", resize);

    /* ── leaves ── */
    const leaves: Leaf[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: 0.12 + Math.random() * 0.3,
      rot: Math.random() * Math.PI * 2,
      rs: (Math.random() - 0.5) * 0.018,
      size: 3 + Math.random() * 6,
      op: 0.1 + Math.random() * 0.18,
      hue: 90 + Math.random() * 40,          // green range
    }));

    /* ── birds ── */
    const birds: Bird[] = Array.from({ length: 8 }, (_, i) => ({
      x: -100 - i * 260 - Math.random() * 200,
      y: 50 + Math.random() * 200,
      vx: 0.35 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      size: 9 + Math.random() * 6,
      op: 0.15 + Math.random() * 0.2,
      wingSpan: 12 + Math.random() * 8,
      bodyLen: 4 + Math.random() * 3,
    }));

    /* ── foliage edge glow ── */
    const drawEdge = (side: "l" | "r", W: number, H: number) => {
      const t = Date.now() * 0.00035;
      const dir = side === "l" ? 1 : -1;
      const base = side === "l" ? 0 : W;

      const spots = [
        { yRatio: 0.08, r: 220, g: 50, a: 0.18, ph: 0 },
        { yRatio: 0.25, r: 280, g: 60, a: 0.14, ph: 1 },
        { yRatio: 0.45, r: 240, g: 55, a: 0.16, ph: 2 },
        { yRatio: 0.62, r: 200, g: 45, a: 0.13, ph: 3 },
        { yRatio: 0.80, r: 260, g: 65, a: 0.17, ph: 4 },
        { yRatio: 0.92, r: 190, g: 50, a: 0.15, ph: 5 },
      ];

      spots.forEach(s => {
        const sway = Math.sin(t + s.ph) * 16;
        const cx = base + dir * 40 + sway;
        const cy = H * s.yRatio;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, s.r);
        grad.addColorStop(0,   `rgba(25,${s.g},10,${s.a})`);
        grad.addColorStop(0.4, `rgba(18,${s.g - 12},6,${s.a * 0.55})`);
        grad.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(
          side === "l" ? 0 : W - s.r * 2,
          cy - s.r,
          s.r * 2,
          s.r * 2,
        );
      });

      // thin vine-like highlight lines
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = `rgba(80,180,50,1)`;
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 5; i++) {
        const startY = H * (0.05 + i * 0.2);
        ctx.beginPath();
        ctx.moveTo(base, startY);
        const cp1x = base + dir * (50 + Math.sin(t + i) * 20);
        const cp1y = startY + 80;
        const cp2x = base + dir * (30 + Math.cos(t + i * 0.7) * 15);
        const cp2y = startY + 160;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, base, startY + 220);
        ctx.stroke();
      }
      ctx.restore();
    };

    /* ── draw leaf ── */
    const drawLeaf = (l: Leaf) => {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rot);
      ctx.globalAlpha = l.op;

      // leaf shape — pointy ellipse
      ctx.beginPath();
      ctx.moveTo(l.size, 0);
      ctx.quadraticCurveTo(0, -l.size * 0.55, -l.size, 0);
      ctx.quadraticCurveTo(0, l.size * 0.55, l.size, 0);
      ctx.fillStyle = `hsla(${l.hue},55%,32%,0.8)`;
      ctx.fill();

      // vein line
      ctx.beginPath();
      ctx.moveTo(-l.size * 0.8, 0);
      ctx.lineTo(l.size * 0.8, 0);
      ctx.strokeStyle = `hsla(${l.hue},40%,45%,0.4)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    /* ── draw bird ── */
    const drawBird = (b: Bird) => {
      const flap = Math.sin(b.phase) * 6;
      const tilt = Math.sin(b.phase * 0.3) * 0.08;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(tilt);
      ctx.globalAlpha = b.op;

      // body
      ctx.beginPath();
      ctx.ellipse(0, 0, b.bodyLen, b.bodyLen * 0.4, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fill();

      // wings
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";
      // left wing
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.quadraticCurveTo(-b.wingSpan * 0.5, -flap - 2, -b.wingSpan, -flap * 0.6);
      ctx.stroke();
      // right wing
      ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.quadraticCurveTo(b.wingSpan * 0.5, -flap - 2, b.wingSpan, -flap * 0.6);
      ctx.stroke();

      // tail
      ctx.beginPath();
      ctx.moveTo(-b.bodyLen, 0);
      ctx.lineTo(-b.bodyLen - 3, 1.5);
      ctx.lineTo(-b.bodyLen - 3, -1.5);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fill();

      ctx.restore();
    };

    /* ── main loop ── */
    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);

      drawEdge("l", c.width, c.height);
      drawEdge("r", c.width, c.height);

      leaves.forEach(l => {
        l.x += l.vx + Math.sin(Date.now() * 0.0008 + l.rot) * 0.18;
        l.y += l.vy;
        l.rot += l.rs;
        if (l.y > c.height + 20) { l.y = -20; l.x = Math.random() * c.width; }
        if (l.x < -20) l.x = c.width + 20;
        if (l.x > c.width + 20) l.x = -20;
        drawLeaf(l);
      });

      birds.forEach(b => {
        b.x += b.vx;
        b.phase += 0.055;
        b.y += Math.sin(b.phase * 0.22) * 0.22;
        if (b.x > c.width + 160) { b.x = -140; b.y = 40 + Math.random() * 220; }
        drawBird(b);
      });

      raf.current = requestAnimationFrame(loop);
    };

    loop();
    return () => { cancelAnimationFrame(raf.current); removeEventListener("resize", resize); };
  }, [ok]);

  if (!ok) return null;
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />;
}
