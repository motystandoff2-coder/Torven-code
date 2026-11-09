"use client";

import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────
   Subtle ambient canvas:
   • Soft foliage glow on both edges
   • Gentle floating leaves (small, minimal)
   • A few birds drifting across the sky
──────────────────────────────────────────────── */

interface Leaf {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; rotSpeed: number;
  size: number; opacity: number;
}

interface Bird {
  x: number; y: number;
  vx: number; phase: number;
  size: number; opacity: number;
}

export default function NatureOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── leaves ── */
    const leaves: Leaf[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * cvs.width,
      y: Math.random() * cvs.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: 0.15 + Math.random() * 0.25,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      size: 4 + Math.random() * 5,
      opacity: 0.08 + Math.random() * 0.12,
    }));

    /* ── birds ── */
    const birds: Bird[] = Array.from({ length: 4 }, (_, i) => ({
      x: -100 - i * 300,
      y: 60 + Math.random() * 140,
      vx: 0.4 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      size: 8 + Math.random() * 5,
      opacity: 0.12 + Math.random() * 0.12,
    }));

    /* ── draw helpers ── */
    const drawLeaf = (l: Leaf) => {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rot);
      ctx.globalAlpha = l.opacity;
      ctx.beginPath();
      ctx.ellipse(0, 0, l.size, l.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(60,120,35,0.7)";
      ctx.fill();
      ctx.restore();
    };

    const drawBird = (b: Bird) => {
      const flap = Math.sin(b.phase) * 4;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.globalAlpha = b.opacity;
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-b.size, 0);
      ctx.quadraticCurveTo(-b.size * 0.35, -flap, 0, 0);
      ctx.quadraticCurveTo(b.size * 0.35, -flap, b.size, 0);
      ctx.stroke();
      ctx.restore();
    };

    const drawFoliageEdge = (side: "left" | "right", W: number, H: number) => {
      const edgeX = side === "left" ? 0 : W;
      const dir = side === "left" ? 1 : -1;
      const time = Date.now() * 0.0004;

      // 3 layered soft blobs — gives depth
      const layers = [
        { offY: H * 0.15, r: 160, green: 45, alpha: 0.14, phase: 0 },
        { offY: H * 0.40, r: 200, green: 55, alpha: 0.11, phase: 1.2 },
        { offY: H * 0.70, r: 170, green: 40, alpha: 0.13, phase: 2.5 },
      ];

      layers.forEach(lay => {
        const sway = Math.sin(time + lay.phase) * 12;
        const cx = edgeX + dir * 30 + sway;
        const cy = lay.offY;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, lay.r);
        g.addColorStop(0, `rgba(30,${lay.green},12,${lay.alpha})`);
        g.addColorStop(0.5, `rgba(20,${lay.green - 10},8,${lay.alpha * 0.5})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(
          side === "left" ? 0 : W - lay.r * 2,
          cy - lay.r,
          lay.r * 2,
          lay.r * 2,
        );
      });
    };

    /* ── loop ── */
    const loop = () => {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      const W = cvs.width;
      const H = cvs.height;

      // foliage glow on edges
      drawFoliageEdge("left", W, H);
      drawFoliageEdge("right", W, H);

      // leaves
      leaves.forEach(l => {
        l.x += l.vx + Math.sin(Date.now() * 0.001 + l.rot) * 0.15;
        l.y += l.vy;
        l.rot += l.rotSpeed;
        if (l.y > H + 20) { l.y = -20; l.x = Math.random() * W; }
        if (l.x < -20) l.x = W + 20;
        if (l.x > W + 20) l.x = -20;
        drawLeaf(l);
      });

      // birds
      birds.forEach(b => {
        b.x += b.vx;
        b.phase += 0.06;
        b.y += Math.sin(b.phase * 0.25) * 0.2;
        if (b.x > W + 140) { b.x = -120; b.y = 50 + Math.random() * 160; }
        drawBird(b);
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, [ready]);

  if (!ready) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}
