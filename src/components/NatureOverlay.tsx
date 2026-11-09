"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Full-page canvas: 3-D-ish green trees on the sides + birds
───────────────────────────────────────────────────────────── */

interface Branch {
  x: number; y: number;
  len: number; angle: number;
  depth: number; windPhase: number;
}

interface BirdData {
  x: number; y: number; vx: number; vy: number;
  phase: number; size: number; opacity: number;
}

function buildBranches(
  x: number, y: number,
  len: number, angle: number,
  depth: number,
  out: Branch[],
  phase: number,
) {
  if (depth === 0 || len < 4) return;
  out.push({ x, y, len, angle, depth, windPhase: phase });
  const nx = x + Math.cos(angle) * len;
  const ny = y + Math.sin(angle) * len;
  buildBranches(nx, ny, len * 0.72, angle - 0.38, depth - 1, out, phase + 0.4);
  buildBranches(nx, ny, len * 0.72, angle + 0.33, depth - 1, out, phase + 0.7);
  if (depth > 3) buildBranches(nx, ny, len * 0.6, angle, depth - 1, out, phase + 0.2);
}

export default function NatureOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── layout ── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── build tree skeletons ── */
    const leftBranches:  Branch[] = [];
    const rightBranches: Branch[] = [];
    const leftBranches2: Branch[] = [];
    const rightBranches2: Branch[] = [];

    // left tree 1  (tall, main)
    buildBranches(0, 0, 160, -Math.PI / 2, 10, leftBranches, 0);
    // left tree 2  (smaller, offset)
    buildBranches(0, 0, 110, -Math.PI / 2 + 0.12, 8, leftBranches2, 1.1);
    // right tree 1
    buildBranches(0, 0, 155, -Math.PI / 2, 10, rightBranches, 0.5);
    // right tree 2
    buildBranches(0, 0, 105, -Math.PI / 2 - 0.1, 8, rightBranches2, 1.6);

    /* ── birds ── */
    const birds: BirdData[] = Array.from({ length: 6 }, (_, i) => ({
      x:       -80 - i * 220,
      y:       80  + i * 35 + Math.random() * 60,
      vx:      0.55 + Math.random() * 0.4,
      vy:      0,
      phase:   Math.random() * Math.PI * 2,
      size:    10 + Math.random() * 7,
      opacity: 0.3 + Math.random() * 0.3,
    }));

    /* ── draw one branch with 3-D leaf cluster ── */
    const drawBranch = (
      b: Branch,
      windAngle: number,
      originX: number,
      originY: number,
      mirror: boolean,
    ) => {
      const wind   = Math.sin(Date.now() * 0.0007 + b.windPhase) * windAngle;
      const ang    = mirror ? Math.PI - b.angle + wind : b.angle + wind;
      const ex     = b.x + Math.cos(ang) * b.len;
      const ey     = b.y + Math.sin(ang) * b.len;
      const wx     = mirror ? originX - b.x : originX + b.x;
      const wy     = originY + b.y;
      const exAbs  = mirror ? originX - ex : originX + ex;
      const eyAbs  = originY + ey;

      // trunk / branch line
      const thick = Math.max(0.8, b.depth * 0.9);
      const brown = `rgba(30,18,8,${0.4 + b.depth * 0.04})`;
      ctx.beginPath();
      ctx.moveTo(wx, wy);
      ctx.lineTo(exAbs, eyAbs);
      ctx.lineWidth   = thick;
      ctx.strokeStyle = brown;
      ctx.stroke();

      // leaf cluster at tips
      if (b.depth <= 3) {
        const leafR = b.len * 1.8;
        const lx    = exAbs;
        const ly    = eyAbs;

        // shadow / depth layer
        const gShadow = ctx.createRadialGradient(lx + 6, ly + 6, 0, lx, ly, leafR * 1.1);
        gShadow.addColorStop(0, "rgba(0,0,0,0)");
        gShadow.addColorStop(1, "rgba(0,0,0,0.18)");
        ctx.beginPath();
        ctx.arc(lx, ly, leafR * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = gShadow;
        ctx.fill();

        // main leaf ball — multi-stop green gradient for 3-D volume
        const g = ctx.createRadialGradient(lx - leafR * 0.28, ly - leafR * 0.3, 0, lx, ly, leafR);
        g.addColorStop(0,   "rgba(90,170,55,0.82)");   // bright highlight
        g.addColorStop(0.35,"rgba(60,130,30,0.75)");   // mid green
        g.addColorStop(0.65,"rgba(35,90,15,0.70)");    // deep green
        g.addColorStop(1,   "rgba(15,50,5,0.4)");      // shadow edge
        ctx.beginPath();
        ctx.arc(lx, ly, leafR, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // specular highlight
        const gSpec = ctx.createRadialGradient(
          lx - leafR * 0.32, ly - leafR * 0.35, 0,
          lx, ly, leafR * 0.6,
        );
        gSpec.addColorStop(0,   "rgba(180,255,120,0.22)");
        gSpec.addColorStop(0.5, "rgba(120,210,70,0.08)");
        gSpec.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(lx, ly, leafR, 0, Math.PI * 2);
        ctx.fillStyle = gSpec;
        ctx.fill();
      }
    };

    /* ── draw bird ── */
    const drawBird = (b: BirdData) => {
      const flap = Math.sin(b.phase) * 5;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.globalAlpha = b.opacity;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth   = 1.2;
      ctx.lineCap     = "round";
      ctx.beginPath();
      ctx.moveTo(-b.size, 0);
      ctx.quadraticCurveTo(-b.size * 0.4, -flap, 0, 0);
      ctx.quadraticCurveTo( b.size * 0.4, -flap, b.size, 0);
      ctx.stroke();
      ctx.restore();
    };

    /* ── main loop ── */
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const W = canvas.width;
      const H = canvas.height;

      /* left tree 1 */
      const lx1 = -20, ly1 = H + 20;
      leftBranches.forEach(b => drawBranch(b, 0.14, lx1, ly1, false));

      /* left tree 2  (offset right, shorter) */
      const lx2 = 90, ly2 = H + 10;
      leftBranches2.forEach(b => drawBranch(b, 0.1, lx2, ly2, false));

      /* right tree 1 */
      const rx1 = W + 20, ry1 = H + 20;
      rightBranches.forEach(b => drawBranch(b, 0.14, rx1, ry1, true));

      /* right tree 2 */
      const rx2 = W - 90, ry2 = H + 10;
      rightBranches2.forEach(b => drawBranch(b, 0.1, rx2, ry2, true));

      /* ground fog at base */
      const fogL = ctx.createLinearGradient(0, H - 60, 0, H + 20);
      fogL.addColorStop(0, "rgba(5,20,2,0)");
      fogL.addColorStop(1, "rgba(5,20,2,0.55)");
      ctx.fillStyle = fogL;
      ctx.fillRect(0, H - 60, W, 80);

      /* birds */
      birds.forEach(b => {
        b.x     += b.vx;
        b.phase += 0.08;
        b.y     += Math.sin(b.phase * 0.3) * 0.25;
        if (b.x > W + 120) {
          b.x = -120;
          b.y = 60 + Math.random() * 160;
        }
        drawBird(b);
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}
