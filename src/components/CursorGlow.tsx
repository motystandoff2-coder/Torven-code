"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const orbRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef({ x: -999, y: -999 });
  const renderRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      renderRef.current.x = lerp(renderRef.current.x, posRef.current.x, 0.065);
      renderRef.current.y = lerp(renderRef.current.y, posRef.current.y, 0.065);

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${renderRef.current.x - 180}px, ${renderRef.current.y - 180}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-20 h-[360px] w-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,90,31,0.07) 0%, rgba(255,90,31,0.025) 45%, transparent 70%)",
          filter: "blur(2px)",
          willChange: "transform",
        }}
      />
    </>
  );
}
