"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const orbRef = useRef<HTMLDivElement | null>(null);
  const pos    = useRef({ x: -999, y: -999 });
  const render = useRef({ x: -999, y: -999 });
  const raf    = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      render.current.x = lerp(render.current.x, pos.current.x, 0.07);
      render.current.y = lerp(render.current.y, pos.current.y, 0.07);
      if (orbRef.current) {
        orbRef.current.style.transform =
          `translate(${render.current.x - 200}px, ${render.current.y - 200}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-20 h-[400px] w-[400px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.012) 45%, transparent 70%)",
        filter: "blur(1px)",
        willChange: "transform",
      }}
    />
  );
}
