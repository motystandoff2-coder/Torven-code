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

interface Deer {
  x: number;
  vx: number;
  dir: number;       // 1 = right, -1 = left
  legPhase: number;
  size: number;
  op: number;
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
      hue: 90 + Math.random() * 40,
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

    /* ── deer ── */
    const deer: Deer[] = [
      { x: c.width * 0.15,  vx: 0.18, dir: 1,  legPhase: 0,     size: 1,    op: 0.18 },
      { x: c.width * 0.75,  vx: 0.14, dir: -1, legPhase: 1.5,   size: 0.8,  op: 0.14 },
      { x: c.width * 0.45,  vx: 0.22, dir: 1,  legPhase: 3.0,   size: 0.65, op: 0.12 },
    ];

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
          cy - s.r, s.r * 2, s.r * 2,
        );
      });

      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = "rgba(80,180,50,1)";
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 5; i++) {
        const startY = H * (0.05 + i * 0.2);
        ctx.beginPath();
        ctx.moveTo(base, startY);
        ctx.bezierCurveTo(
          base + dir * (50 + Math.sin(t + i) * 20), startY + 80,
          base + dir * (30 + Math.cos(t + i * 0.7) * 15), startY + 160,
          base, startY + 220,
        );
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
      ctx.beginPath();
      ctx.moveTo(l.size, 0);
      ctx.quadraticCurveTo(0, -l.size * 0.55, -l.size, 0);
      ctx.quadraticCurveTo(0, l.size * 0.55, l.size, 0);
      ctx.fillStyle = `hsla(${l.hue},55%,32%,0.8)`;
      ctx.fill();
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
      ctx.beginPath();
      ctx.ellipse(0, 0, b.bodyLen, b.bodyLen * 0.4, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.quadraticCurveTo(-b.wingSpan * 0.5, -flap - 2, -b.wingSpan, -flap * 0.6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.quadraticCurveTo(b.wingSpan * 0.5, -flap - 2, b.wingSpan, -flap * 0.6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-b.bodyLen, 0);
      ctx.lineTo(-b.bodyLen - 3, 1.5);
      ctx.lineTo(-b.bodyLen - 3, -1.5);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fill();
      ctx.restore();
    };

    /* ── draw deer ── */
    const drawDeer = (d: Deer, H: number) => {
      const s = d.size * 28;        // base scale unit
      const groundY = H - 18;       // ground line
      const legSwing = Math.sin(d.legPhase) * 4 * d.size;

      ctx.save();
      ctx.translate(d.x, groundY);
      ctx.scale(d.dir, 1);          // flip if walking left
      ctx.globalAlpha = d.op;

      const col = "rgba(255,255,255,0.6)";
      ctx.strokeStyle = col;
      ctx.fillStyle   = col;
      ctx.lineWidth   = 1.4 * d.size;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";

      // ── legs (4) ──
      // front-left
      ctx.beginPath();
      ctx.moveTo(s * 0.3, -s * 0.15);
      ctx.lineTo(s * 0.3 + legSwing, 0);
      ctx.stroke();
      // front-right
      ctx.beginPath();
      ctx.moveTo(s * 0.35, -s * 0.18);
      ctx.lineTo(s * 0.35 - legSwing, 0);
      ctx.stroke();
      // back-left
      ctx.beginPath();
      ctx.moveTo(-s * 0.28, -s * 0.15);
      ctx.lineTo(-s * 0.28 - legSwing, 0);
      ctx.stroke();
      // back-right
      ctx.beginPath();
      ctx.moveTo(-s * 0.24, -s * 0.18);
      ctx.lineTo(-s * 0.24 + legSwing, 0);
      ctx.stroke();

      // ── body ── (elongated ellipse)
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.32, s * 0.44, s * 0.18, 0, 0, Math.PI * 2);
      ctx.fill();

      // ── neck + head ──
      ctx.beginPath();
      ctx.moveTo(s * 0.38, -s * 0.38);
      ctx.quadraticCurveTo(s * 0.48, -s * 0.7, s * 0.52, -s * 0.78);
      ctx.stroke();

      // head
      ctx.beginPath();
      ctx.ellipse(s * 0.54, -s * 0.82, s * 0.1, s * 0.07, 0.3, 0, Math.PI * 2);
      ctx.fill();

      // ear
      ctx.beginPath();
      ctx.moveTo(s * 0.52, -s * 0.88);
      ctx.lineTo(s * 0.48, -s * 1.0);
      ctx.lineTo(s * 0.55, -s * 0.92);
      ctx.stroke();

      // ── antlers ──
      ctx.lineWidth = 1 * d.size;
      // main branch right
      ctx.beginPath();
      ctx.moveTo(s * 0.56, -s * 0.9);
      ctx.quadraticCurveTo(s * 0.7, -s * 1.18, s * 0.68, -s * 1.3);
      ctx.stroke();
      // tine 1
      ctx.beginPath();
      ctx.moveTo(s * 0.64, -s * 1.12);
      ctx.lineTo(s * 0.74, -s * 1.18);
      ctx.stroke();
      // tine 2
      ctx.beginPath();
      ctx.moveTo(s * 0.67, -s * 1.22);
      ctx.lineTo(s * 0.78, -s * 1.24);
      ctx.stroke();

      // ── tail ──
      ctx.beginPath();
      ctx.moveTo(-s * 0.42, -s * 0.38);
      ctx.lineTo(-s * 0.52, -s * 0.45);
      ctx.stroke();

      ctx.restore();
    };

    /* ── main loop ── */
    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);

      drawEdge("l", c.width, c.height);
      drawEdge("r", c.width, c.height);

      // leaves
      leaves.forEach(l => {
        l.x += l.vx + Math.sin(Date.now() * 0.0008 + l.rot) * 0.18;
        l.y += l.vy;
        l.rot += l.rs;
        if (l.y > c.height + 20) { l.y = -20; l.x = Math.random() * c.width; }
        if (l.x < -20) l.x = c.width + 20;
        if (l.x > c.width + 20) l.x = -20;
        drawLeaf(l);
      });

      // birds
      birds.forEach(b => {
        b.x += b.vx;
        b.phase += 0.055;
        b.y += Math.sin(b.phase * 0.22) * 0.22;
        if (b.x > c.width + 160) { b.x = -140; b.y = 40 + Math.random() * 220; }
        drawBird(b);
      });

      // deer
      deer.forEach(d => {
        d.x += d.vx * d.dir;
        d.legPhase += 0.035;

        // wrap around edges
        if (d.dir === 1 && d.x > c.width + 60)  d.x = -60;
        if (d.dir === -1 && d.x < -60)           d.x = c.width + 60;

        drawDeer(d, c.height);
      });

      raf.current = requestAnimationFrame(loop);
    };

    loop();
    return () => { cancelAnimationFrame(raf.current); removeEventListener("resize", resize); };
  }, [ok]);

  if (!ok) return null;
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />;
}
