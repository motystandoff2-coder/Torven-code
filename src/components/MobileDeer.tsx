"use client";

import useIsMobile from "@/hooks/useIsMobile";

export default function MobileDeer() {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  return (
    <div className="mobile-deer-layer" aria-hidden="true">
      <svg className="mobile-deer mobile-deer-left" viewBox="0 0 70 40" fill="none">
        <path d="M13 30L17 18L23 18L26 30M26 30L30 18L36 18L39 30M18 18C18 12 23 10 28 10H38C44 10 49 13 50 18M50 18L56 11M50 16L58 7M47 9L50 2M44 18C48 18 52 20 56 23M18 18C14 19 11 21 9 25M39 14L45 10L50 11" stroke="rgba(255,255,255,0.38)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <svg className="mobile-deer mobile-deer-right" viewBox="0 0 62 34" fill="none">
        <path d="M12 26L15 16L20 16L22 26M22 26L26 16L31 16L34 26M16 16C16 11 20 9 25 9H34C39 9 44 12 45 16M45 16L50 10M45 14L52 6M42 9L44 3M40 16C43 16 47 18 50 21M16 16C13 17 10 19 8 22M34 13L39 10L44 10" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
